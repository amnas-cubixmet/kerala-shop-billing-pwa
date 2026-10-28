/* Kerala Shop Billing offline worker. Generated release ID: __RELEASE_ID__ */
const RELEASE_ID = '__RELEASE_ID__';
const SHELL_PREFIX = 'ksb-shell-';
const SHELL_CACHE = `${SHELL_PREFIX}${RELEASE_ID}`;
const PHOTO_CACHE = 'ksb-photos-v1';
const SHELL_URLS = ['/', '/offline.html', '/icons/icon-192.png', '/icons/icon-512.png', '/apple-touch-icon.png', '/favicon.png'];

function linkedBuildFiles(html) {
  const matches = html.matchAll(/(?:src|href)=["'](\/_next\/static\/[^"'?]+)(?:\?[^"']*)?["']/g);
  return [...new Set([...matches].map(m => m[1]))];
}
async function updateCachedShell(cache, response) {
  const html = await response.clone().text();
  const assets = linkedBuildFiles(html);
  // A shell version becomes usable only if its associated JS/CSS files are cached.
  await Promise.all(assets.map(async url => { if (!(await cache.match(url))) await cache.add(url); }));
  await cache.put('/', response);
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await cache.addAll(SHELL_URLS.slice(1));
    const response = await fetch('/', {cache:'no-store'});
    if (!response.ok) throw new Error('Release shell unavailable');
    await updateCachedShell(cache, response);
    // On first installation activate. While customers are billing, stay waiting;
    // the app tells us when there are no pending unsaved edits.
    const clients = await self.clients.matchAll({type:'window',includeUncontrolled:true});
    if (!clients.length) await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Refresh only these ten product photos once; preserve the remaining offline photos.
    // This cache marker survives later releases and never touches IndexedDB.
    const photoCache = await caches.open(PHOTO_CACHE);
    const photoMarker = '/__ksb_photo_revision_vegetables_001_010_20261027';
    if (!(await photoCache.match(photoMarker))) {
      await Promise.all(Array.from({length:10},(_,i)=>
        photoCache.delete('/products/vegetables/kerala-veg-'+String(i+1).padStart(3,'0')+'.webp')
      ));
      await photoCache.put(photoMarker,new Response('updated'));
    }
    // Clear only upgraded product photos once so users see the latest image,
    // without deleting all other photos cached for offline use.
    const newVegMarker = '/__ksb_photo_revision_vegetables_011_030_20261027';
    if (!(await photoCache.match(newVegMarker))) {
      await Promise.all(Array.from({length:20},(_,i)=>
        photoCache.delete('/products/vegetables/kerala-veg-'+String(i+11).padStart(3,'0')+'.webp')
      ));
      await photoCache.put(newVegMarker,new Response('updated'));
    }
    // Refresh the eleven newly replaced vegetable images without clearing other offline assets.
    const fullVegMarker = '/__ksb_photo_revision_vegetables_040_050_20261028';
    if (!(await photoCache.match(fullVegMarker))) {
      await Promise.all(Array.from({length:11},(_,i)=>
        photoCache.delete('/products/vegetables/kerala-veg-'+String(i+40).padStart(3,'0')+'.webp')
      ));
      await photoCache.put(fullVegMarker,new Response('updated'));
    }
    const names = await caches.keys();
    const shells = names.filter(n => n.startsWith(SHELL_PREFIX));
    // Retain current and previous release for offline tabs still using old JS/CSS.
    await Promise.all(shells.filter(n => n !== SHELL_CACHE).slice(0,-1).map(n => caches.delete(n)));
    // The photo cache survives releases; IndexedDB is NEVER touched by updates.
    await self.clients.claim();
  })());
});

async function cacheRequestedPhotos(source, paths) {
  if (!Array.isArray(paths) || paths.length > 1000) return;
  const cache = await caches.open(PHOTO_CACHE);
  const selected = paths.filter(path => typeof path === 'string' && /^\/products\/[a-z-]+\/[a-z0-9-]+\.webp$/.test(path));
  let done = 0, failed = 0;
  for (let i = 0; i < selected.length; i += 6) {
    await Promise.all(selected.slice(i, i + 6).map(async path => {
      try {
        if (!(await cache.match(path))) {
          const response = await fetch(path, {cache:'reload'});
          if (!response.ok || response.type === 'opaque') throw Error('photo fetch failed');
          await cache.put(path, response);
        }
      } catch { failed++; }
      finally { done++; }
    }));
    source?.postMessage({type:'PHOTO_CACHE_PROGRESS',done,total:selected.length,failed});
  }
  source?.postMessage({type:'PHOTO_CACHE_DONE',done,total:selected.length,failed});
}

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    event.waitUntil(self.skipWaiting());
  } else if (event.data?.type === 'CACHE_PRODUCT_PHOTOS') {
    event.waitUntil(cacheRequestedPhotos(event.source, event.data.paths));
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(SHELL_CACHE);
      try {
        const response = await fetch(request);
        if (!response.ok) throw Error('Navigation unavailable');
        if (url.pathname === '/') await updateCachedShell(cache, response.clone());
        return response;
      } catch {
        return await cache.match('/') || await cache.match('/offline.html') || Response.error();
      }
    })());
    return;
  }

  if (url.pathname.startsWith('/products/') && url.pathname.endsWith('.webp')) {
    event.respondWith((async () => {
      const cache = await caches.open(PHOTO_CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok && response.type !== 'opaque') {
          try { await cache.put(request,response.clone()); } catch { /* storage full: still show image */ }
        }
        return response;
      } catch { return Response.error(); }
    })());
    return;
  }

  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/') || url.pathname === '/apple-touch-icon.png' || url.pathname === '/favicon.png' || url.pathname === '/manifest.webmanifest') {
    event.respondWith((async () => {
      const cache = await caches.open(SHELL_CACHE);
      const saved = await cache.match(request);
      if (saved) return saved;
      const response = await fetch(request);
      if (response.ok) await cache.put(request,response.clone());
      return response;
    })());
    return;
  }
  // /version.json is deliberately NETWORK ONLY; never serve an old version stamp.
});
