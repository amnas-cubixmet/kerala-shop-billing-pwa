## Version 1.6.3 — Vegetables 011–030 product photo upgrade

- Added 20 individually generated, optimized 512×512 WebP product photos under `public/products/vegetables/kerala-veg-011.webp` through `kerala-veg-030.webp`.
- Correct IDs for Okra, Brinjal, Bitter Gourd, Snake Gourd, Ridge Gourd, Bottle Gourd, Cucumber, Yellow Cucumber, Ash Gourd, Pumpkin, Ivy Gourd, French Beans, Yardlong Beans, Hyacinth Beans, Drumstick, Tapioca, Elephant Foot Yam, Taro, Chinese Potato, Sweet Potato.
- Refresh only these 20 cached product photos when the upgraded service worker activates; retain offline photo cache and IndexedDB bills, products and expenses.

## Version 1.6.2 — Individual vegetable photos (01–10)

- Replaced Tomato, Onion, Shallot, Potato, Carrot, Beetroot, Cabbage, Cauliflower, Green Chilli and Capsicum product photos.
- 512 × 512 WebP files at `public/products/vegetables/kerala-veg-001.webp` through `kerala-veg-010.webp`.
- The PWA invalidates only the ten replaced cached photo paths on first activation; other product photos and private IndexedDB data are unchanged.

## Version 1.6.0 — Shop-specific catalog selection and one-language product creation

- Reinstated the 850-product bilingual **searchable, category-filtered selection catalog**. It is a separate screen, not 850 products automatically appearing in My Shop.
- Supports selecting individual or multiple items and copying only those items into the current device's IndexedDB.
- Preserves configured products and old imported templates without duplicates, wiping bills, changing product photos, or modifying existing prices.
- Provides a **New product** option for items missing from the catalog.
- A product can be created in Malayalam **or** English; both names are not mandatory, and changing the global language displays the available name.
- Newly selected ₹0 products appear in My Products with a **Set price** prompt. Setting their first price makes them available in Billing.
- No customer details, stock-count fields, or low-stock warnings.

## V11 — 1.5.0 (Sales-only update)

- Removed Product Stock and Low Stock fields, Stock button, list badges and dashboard alerts.
- Selling a product no longer requires stock availability; billing and invoice cancellation do not adjust inventory.
- Product CSV template no longer has a stock column; older templates can still be imported while ignoring their obsolete inventory data.
- Existing IndexedDB bills, products, photos and old backup formats remain accessible without clearing storage.
- GitHub/Vercel PWA updates install new app code while keeping local records.

# PWA release and data-safety process

## How automatic updates work

1. Make and test code changes. Commit and push to `main`.
2. After the Vercel GitHub connection is configured, Vercel builds and deploys automatically. `npm run build` invokes `prebuild` → `scripts/stamp-release.mjs`.
3. Release stamping generates `/version.json` and `/sw.js` with a new build identifier based on the Git commit **and a source/content digest**. No manual version bump is required for each push.
4. When online, a customer's PWA checks for a new SW on app opening, window focus, coming back online and every 20 minutes while open.
5. The new SW installs a compatible HTML + JS/CSS shell into a new cache and *waits*; it does not overwrite the current running application mid-transaction.
6. When there is no unsaved bill or open form, the app automatically tells the worker to activate and reloads into the new version. The user does **not** have to uninstall/reinstall.
7. When billing is in progress, it waits until completion. The billing cart is also stored as a draft in localStorage as an extra recovery mechanism. A draft is not a finalized invoice.
8. Device business data is in the browser's IndexedDB and is **not reset** when code / static image caches change.

### Important limitations

- Offline devices cannot download a new release until they reconnect.
- Cache eviction, browser data deletion or app uninstallation can erase IndexedDB. The UI reminds the merchant to create and verify backups.
- The app does not automatically write scheduled backups to iPhone/Android Files; a user-triggered JSON backup is available.
- If a future release changes the IndexedDB schema, add a Dexie `.version(2).stores(...).upgrade(...)` migration and test upgrade from previous data. **Never** delete/recreate the database to deploy an update.
- Public photo assets are illustrative AI-generated images. Brand/weight/label/barcode accuracy is **not** verified. Replace with authentic merchant-uploaded photos for retail use.
- Full offline image downloads may require several MB of device Cache Storage; open Settings → Product photo library, and select Download once while online. On-demand images cache automatically as viewed.

### Releases

| App version | Features |
|---|---|
| 1.0.0 (V6) | Mobile white UI, 850 catalog items, offline billing, local database |
| 1.1.0 (V7) | Automatic PWA release detection, safe activation, saved billing draft, 850 illustrative local public product images, offline photo-library download |

### Publishing a patch

```bash
npm install
npm run typecheck
npm test
npm run build
# Optional semver update for a named release:
npm version patch --no-git-tag-version
git add .
git commit -m 'Improve shop billing'
git push origin main
```

`npm version patch` is optional. Vercel builds a unique **release ID** per new Git commit/source digest even if the semver field remains `1.1.0`.

## v1.2.0: Shopkeeper-first daily sales
- Customer list and create-customer workflow removed from the interface. New sales do not ask for customer details.
- Sale is saved to IndexedDB and stock reduced regardless of whether a receipt is requested. PDF receipt is optional.
- Daily and monthly sales summaries and expenses; daily report is the default. Legacy invoices and legacy customer records remain in local backups, but no longer appear in the UI.
- Malayalam/English app-wide switch is visible on mobile top bar and persisted per browser installation.
- Product Add/Edit shows one name field based on selected language; catalog products continue using bilingual names internally for translation.
- Existing local schema stays at version 1 to avoid destructive migrations. Backup first before updating; a service-worker update does not wipe IndexedDB.
