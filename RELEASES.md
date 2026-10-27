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
