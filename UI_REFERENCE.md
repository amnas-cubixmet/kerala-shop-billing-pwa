# Kerala Shop Billing — Reference UI release (v1.4.0)

This update implements the supplied four-screen reference as *working application UI*, not a static mockup. It does not replace any IndexedDB database or user records.

## Mobile flow

- **Home:** greeting, daily sales, sale count, expenses, sales-minus-expenses (not accounting profit), six quick actions and recent sales.
- **Products:** searchable photo-led list, bilingual selection from the global language switch, category chips, prices, explicit Edit button; extra catalog/CSV tools are in the collapsible library below the list.
- **Sale:** swipeable product cards on narrow screens, photo-led cart rows, quantity, discount, payment method and total. Saving a sale is supported without issuing a PDF; PDF is a separate option.
- **Add / Edit:** photo picker, one displayed product name in the selected language, price/unit/category, expandable fields for tax/brand/barcode/etc, clear Save and Cancel.
- **More:** the existing Settings / backup / iOS install guide / IndexedDB storage panel uses the same white/green responsive visual treatment. No customer collection feature is present.
- **Bottom navigation:** Home, Products, raised central Sale action, Reports, More. Expenses remain available through Home quick actions or the desktop/slide-out sidebar.

## Release / safety

- Bump package version to `1.4.0`; the existing release stamping and service worker will detect new builds via GitHub-to-Vercel deployments.
- Keep the existing product catalog, all 850 locally shipped product photos, uploads, invoice history, expenses, storage tables and backup behavior unchanged.
- The update does not auto-backup or synchronize data. Export JSON from Settings regularly and check the file is in the iPhone Files app / Android Downloads before clearing browser data or reinstalling.
- On iOS, open the site in Safari then Share > Add to Home Screen. The browser controls installation prompts.
- Product imagery from the bundled catalog remains *illustrative*, not official packaging photography.

## Verification

`npm install && npm run typecheck && npm test && npm run build`

GitHub Actions builds all source and automatically unpacks existing catalog images. Vercel builds the static `out` export after pushes to `main`.
