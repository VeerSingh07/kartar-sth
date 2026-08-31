# Build a Complete Retail Price Management Tool for Kartar Sports and Toys House

## 1. PROJECT OVERVIEW

Build a simple, modern, easy-to-understand web application for my shop:

**Shop Name:** Kartar Sports and Toys House

The main purpose of this application is to help me manage products that I purchase at wholesale prices and decide their retail selling prices.

I do NOT want a complicated accounting or ERP system.

The application should be extremely simple so that a shop owner with basic computer/mobile knowledge can understand it immediately.

The main workflow should be:

**Add Product → Enter Wholesale Cost → Choose Pricing Method → Calculate Retail Price → Save Product → Search/View Products → Update Price When Needed**

The application should work beautifully on:
- Desktop
- Laptop
- Tablet
- Mobile phone

Use a clean, professional interface suitable for a sports and toys retail shop.

---

# 2. MAIN GOAL

I buy products from wholesalers at different prices.

For example:

Product: Football  
Wholesale Price: ₹400  
Desired Profit Margin: 30%

The application should calculate the suggested retail price automatically.

The user should be able to choose between different pricing methods:

1. Add a percentage markup to wholesale cost
2. Set desired profit margin
3. Manually enter retail price

The application should clearly show:

- Wholesale Price
- Markup
- Retail Price
- Expected Profit per Item
- Profit Percentage
- Quantity
- Total Wholesale Value
- Total Potential Sales Value
- Total Potential Profit

All calculations should update instantly.

---

# 3. IMPORTANT PRICING LOGIC

Support both:

## A. MARKUP METHOD

If wholesale cost = ₹400

Markup = 30%

Retail Price:

₹400 + (₹400 × 30 / 100)

= ₹520

Profit = ₹120

Markup percentage = 30%

---

## B. PROFIT MARGIN METHOD

If wholesale cost = ₹400

Desired profit margin = 30%

Retail Price should be:

Wholesale Cost / (1 - Margin / 100)

₹400 / (1 - 0.30)

= ₹571.43

Profit = ₹171.43

Actual margin = 30%

Make it very clear in the interface that:

**Markup % and Profit Margin % are NOT the same thing.**

Use simple explanations/tooltips.

---

# 4. ROUNDING RETAIL PRICE

Add an optional "Smart Price Rounding" feature.

Examples:

₹571.43 → ₹575  
₹523 → ₹525  
₹997 → ₹999  
₹1,246 → ₹1,250

Allow the user to choose:

- No rounding
- Nearest ₹5
- Nearest ₹10
- Nearest ₹50
- Nearest ₹100
- Psychological pricing (.99 / .95) if appropriate

Default should be:

**Nearest ₹5**

Show both:

Calculated Price: ₹571.43  
Suggested Retail Price: ₹575

The user must always be able to manually override the suggested price.

---

# 5. PRODUCT INFORMATION

Each product should support these fields:

### Basic Information

- Product Name
- SKU / Product Code
- Category
- Brand
- Size
- Color
- Variant
- Supplier
- Purchase Date
- Notes

### Pricing

- Wholesale Price
- Other Purchase Cost (optional)
- Total Cost
- Pricing Method
- Markup %
- Desired Profit Margin %
- Calculated Retail Price
- Final Retail Price

### Stock

- Quantity Purchased
- Current Quantity
- Minimum Stock Alert

---

# 6. CATEGORIES

Create default categories suitable for Kartar Sports and Toys House:

### Sports

- Cricket
- Football
- Basketball
- Volleyball
- Badminton
- Table Tennis
- Tennis
- Hockey
- Sports Accessories
- Fitness
- Outdoor Games
- Indoor Games

### Toys

- Cars
- Remote Control Toys
- Dolls
- Soft Toys
- Educational Toys
- Board Games
- Building Toys
- Outdoor Toys
- Baby Toys
- Action Figures
- Toy Weapons
- Other Toys

Also allow the user to create custom categories.

Do not force these categories if the shop owner wants to use different categories.

---

# 7. DASHBOARD

Create a simple dashboard called:

**Kartar Sports and Toys House**

Dashboard should show useful summary cards.

### Cards

**Total Products**
Number of products saved.

**Total Stock Items**
Sum of current quantities.

**Total Wholesale Value**
Current stock × wholesale cost.

**Potential Retail Value**
Current stock × retail price.

**Potential Profit**
Potential Retail Value - Wholesale Value.

**Low Stock**
Number of products below minimum stock level.

---

# 8. DASHBOARD PROFIT SUMMARY

Show a simple visual summary:

Wholesale Value  
₹XX,XXX

Potential Retail Value  
₹XX,XXX

Potential Profit  
₹XX,XXX

Potential Profit Margin  
XX%

Use a simple chart if useful, but do not make the dashboard complicated.

---

# 9. PRODUCT LIST

Create a main page called:

**Products**

Display products in a clean table on desktop.

Columns:

- Product
- Category
- SKU
- Wholesale
- Retail
- Profit
- Margin
- Stock
- Status
- Actions

On mobile, automatically convert the table into product cards.

Each product card should clearly display:

**Football**
Wholesale: ₹400  
Retail: ₹575  
Profit: ₹175  
Margin: 30.4%  
Stock: 12

---

# 10. SEARCH

Add a prominent search bar.

Search by:

- Product name
- SKU
- Brand
- Category
- Supplier
- Variant

Search results should update instantly.

Add filters:

- Category
- Brand
- Supplier
- Low Stock
- Out of Stock
- Highest Profit
- Lowest Profit
- Highest Retail Price
- Lowest Retail Price

---

# 11. ADD PRODUCT PAGE

Create a very simple "Add Product" form.

Organize it into sections:

## Product Details

Product Name  
SKU  
Category  
Brand  
Size  
Color  
Variant  
Supplier

## Purchase Details

Wholesale Price  
Other Cost  
Quantity Purchased  
Purchase Date

## Pricing

Pricing Method:

[ Markup ]  
[ Profit Margin ]  
[ Manual Price ]

If Markup is selected:

Wholesale Price: ₹400  
Markup: 30%

Show:

Calculated Retail Price: ₹520  
Profit per Item: ₹120

If Profit Margin is selected:

Wholesale Price: ₹400  
Desired Margin: 30%

Show:

Calculated Retail Price: ₹571.43  
Profit per Item: ₹171.43

If Manual Price is selected:

Wholesale Price: ₹400  
Retail Price: ₹575

Show:

Profit: ₹175  
Actual Margin: 30.43%

---

# 12. LIVE CALCULATOR

The pricing calculator should update immediately whenever the user changes:

- Wholesale price
- Other cost
- Markup %
- Profit margin %
- Retail price
- Rounding method

No "Calculate" button should be required.

The result should be visually prominent.

Example:

--------------------------------

WHOLESALE COST

₹400

↓

PRICING

30% Margin

↓

CALCULATED PRICE

₹571.43

↓

SUGGESTED RETAIL PRICE

₹575

↓

PROFIT PER ITEM

₹175

--------------------------------

---

# 13. TOTAL COST

Allow an optional additional cost field.

For example:

Wholesale Price = ₹400  
Transport = ₹10  
Packaging = ₹5

Total Cost = ₹415

The pricing calculation should use:

**Total Cost**

instead of only the wholesale price.

Make this optional because sometimes there are no additional costs.

---

# 14. PRODUCT DETAIL PAGE

When a product is opened, show:

Product Name  
Image placeholder  
Category  
Brand  
SKU  
Supplier

### Purchase Information

Wholesale Cost  
Other Costs  
Total Cost  
Purchase Date

### Selling Information

Retail Price  
Pricing Method  
Markup  
Profit Margin

### Profit Analysis

Profit per Item  
Profit %  
Total Stock  
Total Cost of Current Stock  
Potential Revenue  
Potential Profit

Example:

Wholesale Cost: ₹400  
Retail Price: ₹575  
Profit: ₹175  
Profit Margin: 30.43%

Stock: 20

Stock Cost:
₹8,000

Potential Revenue:
₹11,500

Potential Profit:
₹3,500

---

# 15. EDIT PRODUCT

Every product must have an Edit button.

Allow the user to change:

- Product details
- Wholesale price
- Additional costs
- Retail price
- Markup
- Margin
- Stock quantity
- Supplier
- Notes

When wholesale price changes, recalculate the suggested retail price.

Ask before overwriting a manually entered retail price if appropriate.

---

# 16. DUPLICATE PRODUCT

Add a "Duplicate" option.

This is useful when several products are similar.

Example:

Football Size 4  
Football Size 5  
Football Size 3

The user can duplicate an existing product and only change the size/price.

---

# 17. STOCK MANAGEMENT

Keep stock management simple.

For each product:

- Current Stock
- Add Stock
- Remove Stock
- Minimum Stock

Buttons:

**+ Add Stock**

**− Remove Stock**

When stock reaches the minimum stock level, show:

**Low Stock**

When stock reaches 0:

**Out of Stock**

Use clear visual indicators.

---

# 18. INVENTORY VALUE

Calculate:

### Cost Value

Current Stock × Total Cost

### Retail Value

Current Stock × Retail Price

### Potential Profit

Retail Value - Cost Value

Example:

Stock = 20  
Cost = ₹400  
Retail = ₹575

Cost Value = ₹8,000  
Retail Value = ₹11,500  
Potential Profit = ₹3,500

---

# 19. PRICE UPDATE FEATURE

Create a page:

**Price Manager**

This allows the shop owner to update prices for multiple products.

Example:

Select category:

Cricket

Current markup:

25%

New markup:

30%

Show a preview before applying changes.

Preview:

| Product | Current Retail | New Retail |
|---|---:|---:|
| Cricket Bat | ₹1,200 | ₹1,300 |
| Tennis Ball | ₹80 | ₹90 |
| Cricket Gloves | ₹450 | ₹500 |

Buttons:

**Apply Changes**

**Cancel**

Never change prices without confirmation.

---

# 20. BULK PRICE CALCULATOR

Create a useful bulk calculator.

The user can select:

- Category
- Products
- Markup %
OR
- Profit Margin %

Then calculate new suggested retail prices.

Allow:

**Apply to Selected Products**

Do not automatically save bulk changes.

Always show confirmation.

---

# 21. PRICE HISTORY

For every product, keep a simple price history.

Example:

Football

| Date | Wholesale | Retail | Reason |
|---|---:|---:|---|
| 01 Aug 2026 | ₹380 | ₹550 | Initial |
| 20 Aug 2026 | ₹400 | ₹575 | Supplier increase |

This helps the shop owner understand how prices changed.

---

# 22. SUPPLIER MANAGEMENT

Create a simple Suppliers page.

Fields:

- Supplier Name
- Phone
- Address
- Notes

Show products purchased from each supplier.

Do not create complicated purchase-order functionality.

---

# 23. REPORTS

Create a simple Reports page.

Reports:

### Inventory Report

Show:

- Product
- Stock
- Cost
- Retail Value
- Potential Profit

### Profit Report

Show:

- Product
- Cost
- Retail
- Profit
- Margin

### Low Stock Report

Show products requiring restocking.

### Category Report

Show:

Category  
Number of Products  
Stock Value  
Retail Value  
Potential Profit

Allow export to:

**CSV**

and preferably:

**Excel (.xlsx)**

---

# 24. PRINT PRICE LIST

Add a button:

**Print Price List**

Generate a clean printable price list containing:

KARTAR SPORTS AND TOYS HOUSE

Product Name | SKU | Retail Price

Allow filtering by category before printing.

Example:

KARTAR SPORTS AND TOYS HOUSE

SPORTS PRICE LIST

Football — ₹575  
Cricket Bat — ₹1,250  
Badminton Racket — ₹850

The print version should be clean and suitable for A4 paper.

---

# 25. PRODUCT LABEL / PRICE TAG

Add an optional feature:

**Create Price Tag**

For a product generate a simple printable price tag:

KARTAR SPORTS AND TOYS HOUSE

Football

MRP / Retail Price

₹575

SKU: FB-001

Make it suitable for printing.

---

# 26. DATA STORAGE

The application should save data reliably.

Prefer a simple architecture.

If building as a local-first application, use:

**IndexedDB**

for product and inventory data.

Do NOT rely only on temporary React state.

The data must remain after refreshing the browser.

Structure the application so that a database backend can be added later.

Use clean service/repository functions for data access.

---

# 27. BACKUP AND RESTORE

This is VERY IMPORTANT.

Create:

**Settings → Backup & Restore**

Buttons:

**Export Backup**

Download all shop data as JSON.

**Import Backup**

Allow the user to restore a previous JSON backup.

Before importing, show:

"Importing this backup may replace existing data."

Require confirmation.

Also provide:

**Export Products CSV**

---

# 28. SETTINGS

Create a simple Settings page.

Settings:

### Shop Information

Shop Name:
Kartar Sports and Toys House

Shop Address:
Optional

Phone:
Optional

GST Number:
Optional

Currency:

₹ INR

### Pricing Defaults

Default Pricing Method:
Markup / Margin

Default Markup:
25%

Default Margin:
20%

Default Rounding:
Nearest ₹5

Allow these defaults to be changed.

When adding a new product, automatically use the saved defaults.

---

# 29. USER INTERFACE DESIGN

The design should be:

- Modern
- Clean
- Professional
- Simple
- Fast
- Mobile-friendly

Do NOT make it look like complicated accounting software.

The shop owner should understand the screen immediately.

Use:

- Large readable numbers
- Clear buttons
- Simple forms
- Good spacing
- Clear labels
- Helpful tooltips
- Minimal unnecessary decoration

The most important information should always be visually obvious.

---

# 30. NAVIGATION

Use a simple sidebar on desktop.

Navigation:

🏠 Dashboard

📦 Products

➕ Add Product

💰 Price Manager

📊 Reports

🏪 Suppliers

⚙️ Settings

On mobile, use a responsive navigation system.

---

# 31. DASHBOARD QUICK ACTIONS

Add large buttons:

**+ Add Product**

**💰 Calculate Price**

**📦 View Products**

**📊 Reports**

**🔄 Update Prices**

---

# 32. QUICK PRICE CALCULATOR

Add a calculator accessible from the dashboard.

Inputs:

Wholesale Cost  
Additional Cost  
Pricing Method  
Markup / Margin  
Rounding

Output:

Total Cost  
Calculated Retail  
Suggested Retail  
Profit  
Profit Margin

Add:

**Save as Product**

button.

This allows the shop owner to quickly calculate a price without first creating a product.

---

# 33. IMPORTANT VALIDATION

Prevent incorrect data.

Examples:

Wholesale price cannot be negative.

Retail price cannot be negative.

Quantity cannot be negative.

Markup cannot be negative.

Profit margin must be below 100%.

Product name is required.

Show friendly error messages.

Do not show technical error messages to the user.

Example:

Instead of:

"NaN"

show:

"Please enter a valid wholesale price."

---

# 34. CURRENCY

Use Indian Rupees everywhere.

Format numbers using Indian numbering style.

Examples:

₹500  
₹1,250  
₹12,500  
₹1,25,000  
₹12,50,000

Use proper INR formatting throughout the application.

---

# 35. SAMPLE DATA

On first launch, provide an option:

**Load Demo Products**

Add realistic demo products such as:

Football  
Cricket Bat  
Badminton Racket  
Tennis Ball  
Basketball  
Toy Car  
Remote Control Car  
Doll  
Board Game  
Soft Toy

Use realistic example prices.

Make it easy for the shop owner to delete demo data later.

---

# 36. EMPTY STATES

If there are no products:

Show:

"No products yet"

"Add your first product to start managing wholesale and retail prices."

Button:

**+ Add Product**

Do not show an empty confusing table.

---

# 37. CONFIRMATION DIALOGUES

For destructive actions:

Delete Product  
Delete Supplier  
Clear All Data  
Import Backup  
Bulk Price Update

Always ask for confirmation.

Example:

"Are you sure you want to delete this product?"

Buttons:

Cancel  
Delete

---

# 38. RESPONSIVE MOBILE DESIGN

The application must work extremely well on mobile.

On mobile:

- Sidebar becomes bottom navigation or hamburger menu
- Tables become cards
- Forms become single-column
- Buttons become touch-friendly
- Price figures remain large and readable
- Search remains easily accessible

The Add Product screen should be comfortable to use with one hand.

---

# 39. PERFORMANCE

Keep the application fast.

Avoid unnecessary libraries.

Use reusable components.

Use proper state management.

Do not make unnecessary API calls.

Calculations should happen instantly.

Search/filtering should feel instant even with thousands of products.

---

# 40. ARCHITECTURE

Use a clean maintainable architecture.

Suggested structure:

src/
  components/
  pages/
  layouts/
  services/
  database/
  utils/
  hooks/
  types/
  data/

Separate:

- UI
- Business logic
- Pricing calculations
- Database access
- Formatting utilities

Create a dedicated pricing utility/service.

For example:

calculateMarkupPrice()
calculateMarginPrice()
calculateProfit()
calculateMargin()
roundRetailPrice()

Do not duplicate pricing formulas throughout the application.

---

# 41. PRICING CALCULATION RULES

Implement and test these formulas carefully.

### Total Cost

totalCost = wholesalePrice + additionalCost

### Markup Pricing

retailPrice = totalCost + (totalCost × markup / 100)

### Margin Pricing

retailPrice = totalCost / (1 - margin / 100)

### Profit

profit = retailPrice - totalCost

### Profit Margin

margin = (profit / retailPrice) × 100

### Markup

markup = (profit / totalCost) × 100

Make sure division-by-zero errors are handled.

---

# 42. ROUNDING LOGIC

Implement reusable rounding functions.

Examples:

Nearest ₹5:

575.23 → 575

578.20 → 580

Nearest ₹10:

571 → 570

576 → 580

Nearest ₹50:

571 → 550

576 → 600

Nearest ₹100:

571 → 600

Make the rounding method configurable.

---

# 43. ACCESSIBILITY

Use:

- Proper labels
- Keyboard navigation
- Accessible buttons
- Good contrast
- Focus states
- Screen-reader-friendly form controls

Do not rely only on color to communicate status.

For example:

Low Stock

should display both:

Badge + text

---

# 44. SECURITY / DATA SAFETY

Do not expose unnecessary data.

Do not put sensitive information into URLs.

Validate imported JSON data before saving it.

Handle malformed backup files gracefully.

Never silently overwrite data.

---

# 45. TECHNOLOGY

Use a modern frontend stack appropriate for Antigravity IDE.

Preferred:

- React
- TypeScript
- Tailwind CSS
- Modern component architecture
- IndexedDB for local persistence

Use a lightweight chart library only if genuinely useful.

Avoid overengineering.

---

# 46. FIRST-RUN EXPERIENCE

When the application opens for the first time:

Show a simple welcome screen:

**Welcome to Kartar Sports and Toys House**

"Manage wholesale costs and retail prices easily."

Buttons:

**Start Using App**

**Load Demo Products**

After entering the app, take the user to Dashboard.

---

# 47. IMPORTANT USER EXPERIENCE RULE

The application is primarily a:

**WHOLESALE → RETAIL PRICE MANAGEMENT TOOL**

Do not turn it into a full accounting application.

The core experience must always remain:

**What did I pay?**

↓

**What should I sell it for?**

↓

**How much profit will I make?**

Make these three answers extremely easy to see.

---

# 48. PRODUCT PRICE CARD

Create a reusable visual price card.

Example:

--------------------------------

⚽ FOOTBALL

Wholesale
₹400

Retail
₹575

Profit
₹175

Margin
30.43%

Stock
20

--------------------------------

This card can be used on:

- Dashboard
- Product detail
- Search results
- Mobile product list

---

# 49. PRICE COMPARISON

When editing a product, show:

Current Price: ₹575

New Calculated Price: ₹600

Difference: +₹25

Percentage Change: +4.35%

Use this to prevent accidental pricing mistakes.

---

# 50. ERROR HANDLING

The app must never crash because of invalid user input.

Handle:

- Empty fields
- Invalid numbers
- Negative numbers
- Invalid imported files
- Duplicate SKUs
- Missing categories
- Broken database records

Show friendly messages.

---

# 51. TESTING

Before considering the project complete, test:

1. Add product
2. Edit product
3. Delete product
4. Duplicate product
5. Search product
6. Filter products
7. Calculate markup
8. Calculate profit margin
9. Manual retail price
10. Price rounding
11. Stock addition
12. Stock removal
13. Low stock warning
14. Out of stock
15. Bulk price update
16. Price history
17. Supplier creation
18. CSV export
19. JSON backup
20. JSON restore
21. Print price list
22. Mobile layout
23. Browser refresh persistence
24. Empty states
25. Invalid input handling

---

# 52. SEED DATA / EXAMPLE

Create demo data like:

Product:
Football

Wholesale:
₹400

Markup:
30%

Calculated Retail:
₹520

Stock:
20

Another product:

Cricket Bat

Wholesale:
₹900

Margin:
30%

Calculated Retail:
₹1,285.71

Rounded Retail:
₹1,290

Profit:
₹390

Use these only as demo data.

---

# 53. VISUAL PRIORITY

On every product screen, prioritize:

### 1. RETAIL PRICE

Large

### 2. WHOLESALE COST

Clearly visible

### 3. PROFIT

Clearly visible

### 4. MARGIN

Clearly visible

### 5. STOCK

Clearly visible

Everything else should have lower visual priority.

---

# 54. FINAL REQUIREMENT

Do not merely create a mockup.

Build the actual working application.

All buttons should work.

All forms should work.

All calculations should work.

Data should persist after page refresh.

Search should work.

Filtering should work.

Stock changes should work.

Backup/restore should work.

CSV export should work.

Printing should work.

Responsive design should work.

Use realistic sample data.

Do not leave TODO placeholders for core functionality.

If a technical decision is required, choose the simplest reliable implementation.

The final application should feel like a small, polished custom software product made specifically for:

**Kartar Sports and Toys House**

---

# 55. DEVELOPMENT INSTRUCTION

Build the project incrementally but ensure that each stage remains functional.

Recommended order:

1. Set up project
2. Create application layout/navigation
3. Create database/data models
4. Create pricing calculation engine
5. Build Add Product
6. Build Products list
7. Build Product Details/Edit
8. Build Dashboard
9. Build Stock Management
10. Build Quick Price Calculator
11. Build Price Manager
12. Build Price History
13. Build Suppliers
14. Build Reports
15. Build Print Price List
16. Build Backup/Restore
17. Build Settings
18. Add validation/error handling
19. Add responsive mobile design
20. Add demo data
21. Test all workflows
22. Fix all errors
23. Polish UI

At every stage, keep the existing functionality working.

---

# 56. FINAL UI MESSAGE

The branding should consistently display:

**KARTAR SPORTS AND TOYS HOUSE**

Subtitle:

**Simple Retail Price Manager**

The application should feel trustworthy, practical, fast, and easy enough for daily shop use.

Do not add unnecessary features just to make the application bigger.

Focus on making wholesale price, retail price, profit, and stock management exceptionally easy.