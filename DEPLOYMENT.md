# Deploy Shop Billing to GitHub + Vercel

## Existing local-only storage behavior

This is a *static Next.js PWA*, not a server-hosted database. Each browser installation uses IndexedDB on its own device. GitHub and Vercel receive the application source/HTML/JS, **not** shop data, bills, customer records or user-uploaded product images.

**Before changing the domain or updating an existing live app, export JSON Backup in the old app.** IndexedDB is origin-scoped; switching from localhost or one Vercel hostname to another will not bring existing invoices with it.

## Push to GitHub

1. Open https://github.com/new (signed in to your account).
2. Repository: `kerala-shop-billing-pwa`, choose Public or Private, keep **Add a README**, **Add .gitignore**, and **Choose a license** unchecked, then Create.
3. From this folder in PowerShell:

```powershell
npm install
npm run typecheck
npm test
npm run build

git init
git add .
git commit -m "Initial premium Kerala shop billing PWA"
git branch -M main
git remote add origin https://github.com/amnas-cubixmet/kerala-shop-billing-pwa.git
git push -u origin main
```

If Git prompts for authentication, use browser sign-in / Git Credential Manager; never put personal access tokens in source files.

## Deploy on Vercel

**Vercel plan requirement:** Vercel Hobby is restricted to personal, non-commercial use. Because this project is intended to promote an IT business and can support real shops, choose a plan that permits commercial use (normally Pro), or use a suitable static host whose terms permit your intended usage.


1. Sign into https://vercel.com/new using your Vercel account.
2. Select **Import Git Repository**, authorize GitHub access to the repository, and choose `amnas-cubixmet/kerala-shop-billing-pwa`.
3. Framework preset **Next.js**; Root Directory `./`.
4. Install command `npm install`; Build command `npm run build`; Output directory **`out`** (also set in vercel.json because next.config.ts exports static HTML).
5. No production environment variables and no managed database are required for this offline single-device MVP.
6. Deploy. Open the generated HTTPS URL, add a test product and test invoice, then use airplane mode to confirm offline behavior after the PWA is installed/loaded online.

GitHub pushes to main trigger new Vercel builds once the Git integration is connected.

## Important safety and operational notes

- `npm install` + TypeScript + unit tests + `next build` need to pass before a live launch.
- Do not use the application for official GST/legal invoices without further verification and enhancements.
- Browser/device data can be lost; export backup daily and copy it off the device.
- User-entered data doesn't follow the user to a new phone or browser automatically.
- Treat backup JSON as confidential (contains customer data and is not encrypted).
- Vercel deployment hosts the code, **not** a shared database; every user/shop on each browser has independent IndexedDB storage.
- No claim is made that every brand in the sample catalog is a verified SKU, or that prices/barcodes are supplied.
- If the app fails offline after an update, reconnect online and open the app to refresh cached files. Verify the service worker version per release.
