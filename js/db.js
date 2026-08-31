/**
 * KARTAR SPORTS & TOYS HOUSE - MULTI-FILE INDEXEDDB PERSISTENCE & REVISION CONTROL ENGINE
 * Saves main database in data/database_file.json and individual revision commits in data/revisions/REV-XXX.json
 */

// --- INDEXEDDB SETUP (SCHEMA V4) ---
const db = new Dexie('KartarSportsDB');
db.version(4).stores({
  products: '++id, catalogTag, itemNo, name, sku, category, brand, supplierId, retailPrice, wholesalePrice, currentQuantity, minStockAlert, updatedAt',
  suppliers: '++id, name, phone, address',
  settings: 'key, value',
  revisions: '++id, revId, timestamp, note, totalProducts, totalWholesaleCost, totalRetailVal, snapshotData'
});

window.db = db;

// --- FORMATTER HELPERS ---
function formatINR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  const num = Math.round(amount * 100) / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(num);
}
window.formatINR = formatINR;

function calculatePrices(wholesalePrice, additionalCost, pricingMethod, markupPercent, marginPercent, manualRetailPrice, roundingMethod) {
  const wholesale = parseFloat(wholesalePrice) || 0;
  const extraCost = parseFloat(additionalCost) || 0;
  const totalCost = wholesale + extraCost;

  let calculatedPrice = totalCost;

  if (pricingMethod === 'markup') {
    const percent = parseFloat(markupPercent) || 0;
    calculatedPrice = totalCost * (1 + percent / 100);
  } else if (pricingMethod === 'margin') {
    const percent = parseFloat(marginPercent) || 0;
    if (percent >= 100) {
      calculatedPrice = totalCost * 2;
    } else {
      calculatedPrice = totalCost / (1 - percent / 100);
    }
  }

  let suggestedRetailPrice = calculatedPrice;

  if (roundingMethod === 'nearest5') {
    suggestedRetailPrice = Math.round(calculatedPrice / 5) * 5;
  } else if (roundingMethod === 'nearest10') {
    suggestedRetailPrice = Math.round(calculatedPrice / 10) * 10;
  } else if (roundingMethod === 'ending9') {
    suggestedRetailPrice = Math.floor(calculatedPrice / 10) * 10 + 9;
  } else if (roundingMethod === 'exact') {
    suggestedRetailPrice = Math.round(calculatedPrice * 100) / 100;
  }

  const finalRetailPrice = pricingMethod === 'manual'
    ? Math.max(0, parseFloat(manualRetailPrice) || 0)
    : suggestedRetailPrice;

  const profit = finalRetailPrice - totalCost;
  const actualMarginPercent = finalRetailPrice > 0 ? (profit / finalRetailPrice) * 100 : 0;
  const actualMarkupPercent = totalCost > 0 ? (profit / totalCost) * 100 : 0;

  return {
    wholesale,
    extraCost,
    totalCost,
    calculatedPrice: Math.round(calculatedPrice * 100) / 100,
    suggestedRetailPrice,
    finalRetailPrice,
    profit: Math.round(profit * 100) / 100,
    actualMarginPercent: Math.round(actualMarginPercent * 100) / 100,
    actualMarkupPercent: Math.round(actualMarkupPercent * 100) / 100
  };
}
window.calculatePrices = calculatePrices;

// --- PHYSICAL FILE SYSTEM SYNC ENGINE ---

/**
 * Saves active database state to data/database_file.json
 * Revisions index stored in database_file.json remains lightweight without duplicate product snapshots!
 */
async function syncToPhysicalFile() {
  try {
    const products = await db.products.toArray();
    const suppliers = await db.suppliers.toArray();
    const rawRevisions = await db.revisions.toArray();
    
    // Clean revisions index for database_file.json (omit heavy snapshotData array to save disk space)
    const revisionIndex = rawRevisions.map(r => ({
      revId: r.revId,
      timestamp: r.timestamp,
      note: r.note,
      totalProducts: r.totalProducts,
      totalWholesaleCost: r.totalWholesaleCost,
      totalRetailVal: r.totalRetailVal
    }));

    const dbPayload = {
      version: 'KartarSportsDB_v4',
      updatedAt: new Date().toISOString(),
      products,
      suppliers,
      revisions: revisionIndex
    };

    const jsonStr = JSON.stringify(dbPayload, null, 2);

    // Save to LocalStorage persistent cache
    localStorage.setItem('kartar_master_db_backup', jsonStr);

    // Send live save request to Local Server
    try {
      await fetch('http://localhost:3001/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonStr
      });
      console.log('[Disk Sync] Saved active database to data/database_file.json!');
    } catch (e) {
      console.log('[Disk Sync] Server offline or direct mode');
    }
  } catch (err) {
    console.error('[Disk Sync] Warning:', err);
  }
}
window.syncToPhysicalFile = syncToPhysicalFile;

/**
 * Imports physical database dataset into active storage
 */
async function importPhysicalData(data) {
  if (!data || !data.products || !Array.isArray(data.products)) return;

  await db.products.clear();
  await db.suppliers.clear();

  for (const p of data.products) {
    const { id, ...rest } = p;
    await db.products.add(rest);
  }

  if (data.suppliers && Array.isArray(data.suppliers)) {
    for (const s of data.suppliers) {
      const { id, ...rest } = s;
      await db.suppliers.add(rest);
    }
  }

  if (data.revisions && Array.isArray(data.revisions)) {
    for (const r of data.revisions) {
      const existing = await db.revisions.where('revId').equals(r.revId).first();
      if (!existing) {
        const { id, ...rest } = r;
        await db.revisions.add(rest);
      }
    }
  }

  await db.settings.put({ key: 'db_seeded_v4', value: 'true' });
}
window.importPhysicalData = importPhysicalData;

// --- DATABASE PERSISTENCE INITIALIZATION ENGINE ---
async function initDatabaseIfNeeded() {
  let existingCount = await db.products.count();

  let physicalData = null;

  // 1st Priority: Try fetching main database from Local Server
  try {
    const res = await fetch('http://localhost:3001/api/db');
    if (res.ok) {
      physicalData = await res.json();
    }
  } catch (err) {
    try {
      const res = await fetch('data/database_file.json');
      if (res.ok) {
        physicalData = await res.json();
      }
    } catch (e) {}
  }

  if (physicalData && physicalData.products && Array.isArray(physicalData.products)) {
    if (existingCount === 0 || existingCount !== physicalData.products.length) {
      console.log(`[DB Init] Loading database_file.json (${physicalData.products.length} products)...`);
      await importPhysicalData(physicalData);
      return;
    }
  }

  if (existingCount > 0) {
    return;
  }

  // 2nd Priority: LocalStorage backup
  let localBackup = localStorage.getItem('kartar_master_db_backup');
  if (localBackup) {
    try {
      const parsed = JSON.parse(localBackup);
      await importPhysicalData(parsed);
      return;
    } catch (e) {
      console.error(e);
    }
  }
}
window.initDatabaseIfNeeded = initDatabaseIfNeeded;

// --- MULTI-FILE VERSION CONTROL ENGINE ---

/**
 * Creates a new revision commit snapshot.
 * Saves the full product snapshot into an isolated, dedicated file: data/revisions/REV-XXX.json!
 */
async function createRevisionSnapshot(note = 'Manual Snapshot') {
  try {
    const products = await db.products.toArray();
    let totalWholesaleCost = 0;
    let totalRetailVal = 0;

    products.forEach(p => {
      const qty = p.currentQuantity || 0;
      totalWholesaleCost += (p.wholesalePrice + (p.additionalCost || 0)) * qty;
      totalRetailVal += p.retailPrice * qty;
    });

    const revCount = await db.revisions.count();
    const revId = `REV-${String(revCount + 1).padStart(3, '0')}`;

    const revSnapshotPayload = {
      revId,
      timestamp: new Date().toISOString(),
      note,
      totalProducts: products.length,
      totalWholesaleCost: Math.round(totalWholesaleCost * 100) / 100,
      totalRetailVal: Math.round(totalRetailVal * 100) / 100,
      snapshotData: JSON.parse(JSON.stringify(products))
    };

    // Save individual revision file data/revisions/REV-XXX.json via Server
    try {
      await fetch('http://localhost:3001/api/revision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(revSnapshotPayload, null, 2)
      });
      console.log(`[Version Control] Saved dedicated commit file data/revisions/${revId}.json`);
    } catch (err) {
      console.log('[Version Control] Server offline, storing snapshot in IndexedDB');
    }

    // Save lightweight index entry in local IndexedDB
    await db.revisions.add(revSnapshotPayload);
    await syncToPhysicalFile();

    return revSnapshotPayload;
  } catch (err) {
    console.error('Failed to create revision snapshot:', err);
    throw err;
  }
}
window.createRevisionSnapshot = createRevisionSnapshot;

async function getRevisionHistory() {
  return await db.revisions.orderBy('id').reverse().toArray();
}
window.getRevisionHistory = getRevisionHistory;

/**
 * Fetches a specific revision snapshot (from server data/revisions/REV-XXX.json or local IndexedDB)
 */
async function loadRevisionSnapshot(revId) {
  // Try fetching from server revision file
  try {
    const res = await fetch(`http://localhost:3001/api/revision?id=${revId}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.snapshotData) return data;
    }
  } catch (e) {}

  // Fallback to IndexedDB
  const localRev = await db.revisions.where('revId').equals(revId).first();
  return localRev;
}
window.loadRevisionSnapshot = loadRevisionSnapshot;

function compareSnapshots(oldSnapshot, newSnapshot) {
  const oldMap = new Map();
  oldSnapshot.forEach(p => oldMap.set(p.sku || p.name, p));

  const newMap = new Map();
  newSnapshot.forEach(p => newMap.set(p.sku || p.name, p));

  const comparison = [];
  let priceIncreases = 0;
  let priceDrops = 0;
  let wholesaleChanges = 0;

  newSnapshot.forEach(newP => {
    const oldP = oldMap.get(newP.sku || newP.name);
    if (!oldP) {
      comparison.push({
        sku: newP.sku,
        name: newP.name,
        catalogTag: newP.catalogTag,
        status: 'NEW_ITEM',
        oldWholesale: 0,
        newWholesale: newP.wholesalePrice,
        oldRetail: 0,
        newRetail: newP.retailPrice,
        retailDelta: newP.retailPrice,
        percentDelta: 100
      });
    } else {
      const retailDelta = newP.retailPrice - oldP.retailPrice;
      const wholesaleDelta = newP.wholesalePrice - oldP.wholesalePrice;
      const percentDelta = oldP.retailPrice > 0 ? (retailDelta / oldP.retailPrice) * 100 : 0;

      let status = 'UNCHANGED';
      if (retailDelta > 0) { status = 'PRICE_INCREASED'; priceIncreases++; }
      else if (retailDelta < 0) { status = 'PRICE_DROPPED'; priceDrops++; }
      else if (wholesaleDelta !== 0) { status = 'WHOLESALE_CHANGED'; wholesaleChanges++; }

      comparison.push({
        sku: newP.sku,
        name: newP.name,
        catalogTag: newP.catalogTag,
        status,
        oldWholesale: oldP.wholesalePrice,
        newWholesale: newP.wholesalePrice,
        oldRetail: oldP.retailPrice,
        newRetail: newP.retailPrice,
        retailDelta: Math.round(retailDelta * 100) / 100,
        percentDelta: Math.round(percentDelta * 10) / 10
      });
    }
  });

  return {
    comparison,
    summary: {
      totalItems: comparison.length,
      priceIncreases,
      priceDrops,
      wholesaleChanges
    }
  };
}
window.compareSnapshots = compareSnapshots;

async function restoreRevisionSnapshot(revId) {
  const rev = await loadRevisionSnapshot(revId);
  if (!rev || !rev.snapshotData) {
    throw new Error(`Revision ${revId} file not found or corrupted`);
  }

  await createRevisionSnapshot(`Pre-Rollback Safety Backup (Before restoring ${revId})`);

  await db.products.clear();
  for (const item of rev.snapshotData) {
    const { id, ...rest } = item;
    await db.products.add(rest);
  }

  await createRevisionSnapshot(`Restored Database to ${revId} (${rev.note})`);
  await syncToPhysicalFile();
  console.log(`[Version Control] Successfully rolled back to ${revId}`);
  return true;
}
window.restoreRevisionSnapshot = restoreRevisionSnapshot;
