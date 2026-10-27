# Shop Billing PWA — Kerala Catalog V5 (850 product templates)

**500 newly added product templates:** 120 bakery, 100 sweets, 110 branded snacks/chocolates/biscuits, 170 branded grocery. Together with the earlier 350 catalog products, total = **850 presets**.

- Two names (Malayalam / English), category, brand and editable pack/variant fields.
- Add category or Add All 850 copies presets to **this device's IndexedDB only**; it does not overwrite existing edits or local custom products.
- Catalog entries have ₹0 price and disabled billing until shopkeeper sets correct details. **Catalog suggestions are NOT verified retail SKUs or live availability/prices; check actual packet label and barcode.**
- New-product image upload stores a resized image locally (not a brand-provided image feed); existing backup exports include metadata and images.
- Old seven-column CSV imports still work. A new optional brand and packSize 9-column CSV format is supported.
- Same browser on the same device can access the stored data. It is NOT a private signed-in account.
- Offline app caches need first online load. Always export backups. No automatic cloud or cross-device sync.

## Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 and choose Products & Stock. Use category presets or **Add All 850 Products**. For price and stock, edit each item and save.

## QA

```bash
npm run typecheck
npm test
npm run build
```

## Catalog sources

Brand examples were selected with reference to Kerala supermarkets and manufacturers, including https://samrudhionline.in/products?data_from=category&page=1&sub_category_id=34 , https://www.britannia.co.in/ , https://parleproducts.com/parle-brands , https://itcportal.com/itc-businesses/fmcg/food.html and https://www.keralatourism.org/faq/what-are-the-must-try-local-desserts-and-snacks . Individual brand-variant/pack templates are **examples to customize**, not manufacturer-certified SKU lists.

# Free Shop Billing — Kerala Catalog Edition V4 (Next.js Offline PWA)

A **single-device, offline-first** billing + stock + expenses + customers + reports application. The data is stored on the user's own device in **IndexedDB (Dexie)**. A server/database account is **not** required to use the app.

> **Status:** Functional starter MVP source, not certified production accounting / GST billing software. Dependencies cannot be installed or the browser tested inside the artifact-generation environment; run the commands and checklist below before deploying to a real shop.

## Requirements

- Node.js 20.9+ (Node 22 LTS recommended)
- npm
- Android Chrome or iPhone Safari for PWA installation
- HTTPS on the deployed domain (localhost is accepted during development)

## Start locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Product entries, bills and expenses are saved locally in the **browser opening that address**. The same app opened at another address, port, browser, device or app installation has a different database.

## Build and deploy

```bash
npm run typecheck
npm test
npm run build
```

The Next.js static export is produced in **`out/`**. Host that folder on an HTTPS static hosting service, keeping URLs of hashed Next.js assets intact and making `/sw.js` available at the domain root. Example: deploy `out/` to Cloudflare Pages (build command `npm run build`, output directory `out`). A custom server API is not required. Do not deploy under a subpath without adapting manifest, assets and service-worker scope.

> Development mode deliberately skips service worker installation to avoid stale cached code. Test PWA offline behavior using a **production build served over HTTPS or localhost**, for example `npx serve out -l 3000` (requires `serve` package). Use a fresh test browser profile or domain.

## Kerala grocery & fruit catalog (V4)

- Ready-to-add **50 vegetables, 60 fruits and 240 grocery / prepared food items** (350 total). Each has an editable Malayalam name, English name, emoji icon and unit. They are starter examples, **not a verified real-time trending ranking**.
- Updated V4 preserves 50 vegetable and 60 fruit presets and adds 78 extra food/grocery presets; 350 distinct product slots total. Existing V3 user-edited items are not overwritten.
- Tap **+ Add All 350 Products** once, or tap a category's **+ Add** button on the Products page. Catalog entries are copied into **this installation's own IndexedDB**, not a global account. Existing entries and user modifications are not overwritten by repeated clicks.
- Prices are **intentionally blank**, inventory is zero and new presets are inactive. Set the actual current selling price and stock per product before billing. Tax classifications must be verified by the shop owner.
- Tap **Add My Product** to enter a custom Malayalam/English name and upload a JPG/PNG/WebP product photo (up to 5 MB input, compressed into a small local data URL), or choose an emoji icon.
- The **My Custom Products** filter distinguishes local custom records from the starter catalog. Images and custom data live in the same local IndexedDB and are included in full JSON backups.
- **CSV Import** supports up to **1,000 products per file** (not a claim of 1,000 prepopulated Kerala products). Download a sample CSV on the Products screen. Existing products are not replaced by CSV import. Column headers: `malayalamName,englishName,category,unit,price,stock,icon`. A zero/empty price leaves the item inactive.
- Opening the site on a different device/browser/install gives an **independent database**. No shared cloud product publishing occurs. **Anyone who can use the same unlocked browser profile/PWA can see its local products**; there is no account-level isolation or PIN.
- Images are not automatically fetched from the internet. Presets use emoji placeholders. User-selected images stay on device unless the user shares a backup.

## Functional modules

- **Dashboard**: Today's / monthly sales, recorded expenses, warnings for low-stock products.
- **Products**: Malayalam + English names, optional private product images, editable emoji, 350 Kerala catalog presets, CSV bulk import up to 1,000 rows, SKU, category, pieces/kg/litres/metres, price/cost, exclusive tax percentage, quantity and low-stock threshold, hide/show products, stock movements.
- **Billing**: Cart, fractional quantities (3 decimals), discounts, GST applied *on top of* the selling price, payment-method status, atomic invoices/items/stock/counters, sequential invoice numbers per financial year, walk-in or existing customer.
- **Receipt PDF**: Direct download to PDF using a browser Canvas + `pdf-lib`, including Malayalam text as a raster image. 80mm receipt layout.
- **Expenses**: Categories, dates, amount and notes, deletion.
- **Customers**: Add and select on invoices.
- **Reports**: Monthly sales, payments, expenses, CSV export (escaped to mitigate spreadsheet formula injection), receipt downloads, invoice voiding / stock restoration.
- **Backup**: Full JSON export, SHA-256 checksum verification on restore; transactional replacement with a confirmation + current-backup first.
- **PWA**: Manifest + icons + service-worker caching of exported Next.js HTML/JS/CSS, home-screen installation, offline use after a complete successful initial load.

## Important constraints

1. **Single device only**. No synchronization across phones or users. Opening the same domain on a second phone creates its own isolated data set and independent invoice sequence.
2. **Browser data is not a user-accessible database file**. IndexedDB uses device storage but clearing browser data, deleting an installation, browser eviction or device failure can lose it. Download backup files and move them to a second location frequently.
3. **A backup is only as trustworthy as its storage**. SHA-256 guards against accidental file modification, not malicious tampering. Backups are unencrypted JSON and contain customer and shop data: keep them private.
4. **Tax**: Only product-specific **tax-exclusive** rates are included; this is not a substitute for GST-compliant tax invoices, CGST/SGST/IGST logic, HSN/SAC rules, returns, tax filing or accounting advice.
5. **Payment status**: Cash/UPI/Card/Other treated as paid; Unpaid treated as entirely unpaid. No installment or collection ledger in the MVP. Do not treat the dashboard as a formal profit-and-loss report.
6. **Offline after initial visit**: the app shell and required chunks must be cached while online; test by installing and *reopening* the PWA with Airplane Mode. The app does not require network calls to save records.
7. **Device date/clock** drives invoice dates and financial-year counters. For legally sensitive invoicing, a trusted synchronized clock and stronger anti-tampering controls are necessary.
8. **Shared device**: no PIN, login or local encryption. Do not save highly sensitive customer details on unlocked shared phones.
9. **PDF**: receipt text is rasterized for Malayalam font support, so it is not searchable/selectable. The embedded bitmap will enlarge very long receipts.
10. **GSTIN** is a free-form shop setting in this MVP; configure and verify it separately before issuing formal invoices.

## Offline QA checklist

- [ ] On a clean test browser, visit the deployed site online, then fully close and reopen in Airplane Mode.
- [ ] Add products and save 50 bills in Airplane Mode; restart the phone and check data persists.
- [ ] Trigger a failed bill (insufficient stock) and verify no stock, counter or invoice changes.
- [ ] Download receipt PDFs and CSV reports offline.
- [ ] Export a backup, verify the downloaded file in Files/Downloads, restore in another fresh test browser, and compare totals.
- [ ] Confirm a bill void restores inventory and cannot be repeated.
- [ ] Verify iPhone Safari Add to Home Screen and Android Chrome installation behavior.
- [ ] Test fractional stock, zero tax, discount > subtotal, and currency rounding.
- [ ] Test a full/blocked storage scenario and retention after an app version update.

## Next steps before real-money rollout

Add supported GST legal invoice templates, product HSN/SAC metadata, jurisdiction-specific tax computation, full receivables / returns / refunds, encrypted off-device backups, crash-safe offline update migrations, browser E2E tests, accessibility checks, printer testing, and business continuity documentation.

## Code layout

- `src/db/database.ts` — Dexie tables
- `src/services/store.ts` — transactional business operations
- `src/lib/money.ts` — money and quantity calculation
- `src/services/backup.ts` — JSON backup and import
- `src/services/exports.ts` — PDF receipts and CSV
- `src/components/` — all application pages
- `public/sw.js` — offline application shell
- `tests/` — billing computation and database integration test sources

All monetary values are stored as **integer paise**, and quantities as **integer thousandths of their unit**.

## Kerala vegetable catalog (50 common shop items)

Open **Products & Stock** and click **Add 50 Vegetables**. It installs 50 editable Malayalam/English presets with an emoji placeholder and commonly used sales unit (`kg`, `pcs`, or `bundle`). This operation is idempotent, and it **never overwrites** products that have already been edited. It does not start automatically for non-vegetable shops.

The product selling price, stock and buying price are deliberately **not pre-filled** because prices and availability vary by shop/date. Every preset starts hidden from billing until the user edits the record and enters a selling price. After editing it, the product becomes active, but remains non-purchasable until stock is greater than zero. The owner can set tax classification and changes to units.

For each product, choose an emoji or upload a JPG, PNG or WebP photo. Photos are compressed locally (up to 256 px, usually WebP) and saved in IndexedDB together with products. They are included in the existing JSON Backup/Restore. No photo uploads are sent to servers. Keep backups safe because IndexedDB is not permanent guaranteed device storage.

## V2 → V3 upgrade safety

Keep the same exact HTTPS origin and PWA installation. Existing `FreeShopBillingDB` records are not dropped; new product name/source fields are optional for older records. **Export a full JSON backup before upgrading.** Newly added catalog buttons will only insert IDs that do not already exist. Changing domain, subdomain, browser or uninstalling can change which local database is visible.

## Developer test commands

```bash
npm install
npm run typecheck
npm test
npm run build
```

The source files were syntax-parsed during ZIP creation, but a full dependency install/build/browser acceptance test was unavailable in this environment; complete those steps before shop use.

## V6 — Premium white theme and mobile-first redesign

- White `#FFFFFF` background, subtle soft-gray borders and emerald primary actions.
- Premium **DM Sans** for English and **Noto Sans Malayalam** for Malayalam, with sensible system fallbacks. These fonts are loaded through Google Fonts **only when network access permits**. Offline mode falls back to fonts available on the device; no customer/business records are sent to font providers. To avoid remote font requests entirely, remove the first `@import` line of `src/app/premium.css`.
- Dashboard welcome header, refreshed metric cards, redesigned desktop navigation and sticky desktop toolbar.
- Mobile header and 5-item floating bottom navigation with visible active state and safe-area spacing.
- Product catalog shows responsive 2-column category cards and stacked product rows on phones instead of requiring a wide table scroll.
- More readable 16px base font; mobile buttons, inputs and forms sized for touch; dark text on white surfaces.
- All 850 product presets, editable prices and images, IndexedDB offline storage, receipts, expenses, stock and local backup logic preserved from V5.

**Theme file:** `src/app/premium.css`. **Change color tokens:** top of this file. **Theme color:** `src/app/layout.tsx`, `src/app/manifest.ts`. This is a styling update, not a new database: migrate on the same origin/PWA installation and **export a backup first**.

## GitHub → Vercel deployment

Follow [DEPLOYMENT.md](./DEPLOYMENT.md). Source code is hosted on Vercel, while bills and products remain stored in each user's IndexedDB on their own device. A new deployment URL does not migrate existing local data.

## V7 — Automatic PWA updates and product photographs

- **One code update → all online installations:** Push to `main`, Vercel deploys; `prebuild` stamps a new Service Worker release id and `/version.json` based on the Git commit/content digest. The app checks on focus, reconnection and periodically.
- **Safe update:** it downloads the new code before activating. Unsaved bills and forms pause reloading. Cart items are also stored as a recoverable draft in localStorage. Completed bills, shop settings, custom product photos, prices, stock etc. remain in IndexedDB.
- **850 photos:** individual AI-generated, *illustrative* WebP files in `public/products/{vegetables,fruits,foods,bakery,sweets,brands}/`, mapped by product preset ID. They are **not verified retail product/packaging photographs**. Image upload from the merchant overrides the static image for that merchant only.
- **Fully offline product photos:** visit Settings → Product photo library → Download 850 product photos for offline to cache image files in Cache Storage. Without this, photos are cached individually when first viewed online.
- **New product:** Upload your own photo, and it is stored as a compressed base64 image in this browser's IndexedDB and included in the JSON backup. Static catalog images are public, merchant-specific images are not.

See [RELEASES.md](RELEASES.md) for versioning, limitations and updating safely. To reproduce photo previews, run `python scripts/generate_catalog_images.py` (requires Pillow and the provided AI seed sheet).
