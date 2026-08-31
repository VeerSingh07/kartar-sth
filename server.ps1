# KARTAR SPORTS & TOYS HOUSE - HIGH-PERFORMANCE PHYSICAL FILE PERSISTENCE SERVER
# Multi-file version control engine with dedicated per-revision commit files!

$port = 3001
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "=================================================================="
    Write-Host "  Kartar Sports Multi-File Persistence Server Running!"
    Write-Host "  App URL: http://localhost:$port/index.html"
    Write-Host "  Admin URL: http://localhost:$port/admin.html"
    Write-Host "  Revision Commits Directory: data/revisions/"
    Write-Host "=================================================================="
} catch {
    Write-Host "Failed to start listener on port $port : $_"
    exit
}

$dbPath        = "d:\Sukhwinder Singh\Billing Management\data\database_file.json"
$dbJsPath      = "d:\Sukhwinder Singh\Billing Management\data\database_file.js"
$revisionsDir  = "d:\Sukhwinder Singh\Billing Management\data\revisions"
$rootPath      = "d:\Sukhwinder Singh\Billing Management"

if (-not (Test-Path -Path $revisionsDir)) {
    New-Item -ItemType Directory -Path $revisionsDir -Force | Out-Null
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    # Enable CORS & Private Network Access
    $response.AddHeader("Access-Control-Allow-Origin", "*")
    $response.AddHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    $response.AddHeader("Access-Control-Allow-Headers", "Content-Type")
    $response.AddHeader("Access-Control-Allow-Private-Network", "true")

    if ($request.HttpMethod -eq "OPTIONS") {
        $response.StatusCode = 200
        $response.Close()
        continue
    }

    $urlPath = $request.Url.AbsolutePath

    try {
        # GET /api/db - Returns clean main active database file
        if ($urlPath -eq "/api/db" -and $request.HttpMethod -eq "GET") {
            if (Test-Path -Path $dbPath) {
                $json = Get-Content -Path $dbPath -Raw -Encoding UTF8
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
                $response.ContentType = "application/json; charset=utf-8"
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } else {
                $response.StatusCode = 404
            }
        }
        # POST /api/save - Saves active database directly to data/database_file.json and data/database_file.js
        elseif ($urlPath -eq "/api/save" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $body = $reader.ReadToEnd()
            $reader.Close()

            if ($body -and $body.Length -gt 10) {
                Set-Content -Path $dbPath -Value $body -Encoding UTF8
                $jsContent = "window.PHYSICAL_DATABASE_FILE = $body;"
                Set-Content -Path $dbJsPath -Value $jsContent -Encoding UTF8
                Write-Host "[MAIN DB PERSIST] Saved active database update to data/database_file.json and database_file.js!"

                $resText = '{"success": true, "message": "Main database file saved!"}'
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($resText)
                $response.ContentType = "application/json"
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            } else {
                $response.StatusCode = 400
            }
        }
        # POST /api/revision - Saves individual version commit snapshot to data/revisions/REV-XXX.json!
        elseif ($urlPath -eq "/api/revision" -and $request.HttpMethod -eq "POST") {
            $reader = New-Object System.IO.StreamReader($request.InputStream, $request.ContentEncoding)
            $body = $reader.ReadToEnd()
            $reader.Close()

            if ($body) {
                $revObj = $body | ConvertFrom-Json
                $revId = $revObj.revId
                if ($revId) {
                    $revFilePath = Join-Path -Path $revisionsDir -ChildPath "$revId.json"
                    Set-Content -Path $revFilePath -Value $body -Encoding UTF8
                    Write-Host "[REVISION COMMIT] Created dedicated commit file data/revisions/$revId.json"

                    $resText = '{"success": true, "revId": "' + $revId + '"}'
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes($resText)
                    $response.ContentType = "application/json"
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                } else {
                    $response.StatusCode = 400
                }
            }
        }
        # GET /api/revision?id=REV-001 - Loads specific revision commit snapshot file
        elseif ($urlPath.StartsWith("/api/revision") -and $request.HttpMethod -eq "GET") {
            $revId = $request.QueryString["id"]
            if ($revId) {
                $revFilePath = Join-Path -Path $revisionsDir -ChildPath "$revId.json"
                if (Test-Path -Path $revFilePath) {
                    $json = Get-Content -Path $revFilePath -Raw -Encoding UTF8
                    $buffer = [System.Text.Encoding]::UTF8.GetBytes($json)
                    $response.ContentType = "application/json; charset=utf-8"
                    $response.ContentLength64 = $buffer.Length
                    $response.OutputStream.Write($buffer, 0, $buffer.Length)
                } else {
                    $response.StatusCode = 404
                }
            } else {
                $response.StatusCode = 400
            }
        }
        # Serve Static Files (index.html, admin.html, js, css, etc.)
        else {
            $relPath = $urlPath.TrimStart("/").Replace("/", "\")
            if ([string]::IsNullOrWhiteSpace($relPath)) {
                $relPath = "index.html"
            }

            $localFilePath = Join-Path -Path $rootPath -ChildPath $relPath

            if (Test-Path -Path $localFilePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($localFilePath)

                if ($localFilePath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
                elseif ($localFilePath.EndsWith(".js")) { $response.ContentType = "application/javascript; charset=utf-8" }
                elseif ($localFilePath.EndsWith(".json")) { $response.ContentType = "application/json; charset=utf-8" }
                elseif ($localFilePath.EndsWith(".css")) { $response.ContentType = "text/css; charset=utf-8" }
                else { $response.ContentType = "application/octet-stream" }

                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 File Not Found")
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
        }
    } catch {
        Write-Host "Server Error: $_"
        $response.StatusCode = 500
    } finally {
        $response.Close()
    }
}
