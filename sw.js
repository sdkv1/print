const APP_VERSION = '2.5.6';
const CACHE_NAME = `print-rpp20n-v${APP_VERSION}`;

// Helper: convert relative path to absolute URL based on SW location
const toURL = (path) => new URL(path, self.location.href).href;
const STATIC_ASSETS = [
  toURL('./'),
  toURL('./index.html'),
  toURL('./manifest.json'),
  toURL('./icon-192.png'),
  toURL('./icon-512.png',
  './app.js',
  './printer.js')
];

async function cacheAsset(cache, url) {
  try {
    const res = await fetch(url, { cache: 'no-cache' });
    if (res && res.status === 200) { await cache.put(url, res); console.log('[SW] Cached:', url); }
    else { console.warn('[SW] Skip', url, 'status', res.status); }
  } catch (e) { console.warn('[SW] Skip', url, e.message); }
}

self.addEventListener('install', e => {
  console.log(`[SW] Installing v${APP_VERSION}...`);
  e.waitUntil(caches.open(CACHE_NAME).then(async cache => {
    await Promise.all(STATIC_ASSETS.map(u => cacheAsset(cache, u)));
    console.log(`[SW] v${APP_VERSION} install done`);
  }).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  console.log(`[SW] Activating v${APP_VERSION}...`);
  e.waitUntil(caches.keys().then(names =>
    Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => {
    if (cached) {
      fetch(e.request).then(r => { if (r && r.status === 200) caches.open(CACHE_NAME).then(c => c.put(e.request, r)); }).catch(()=>{});
      return cached;
    }
    return fetch(e.request).then(r => {
      if (!r || r.status !== 200 || r.type !== 'basic') return r;
      const clone = r.clone();
      caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
      return r;
    }).catch(() => e.request.destination === 'document' ? caches.match(toURL('./index.html')) : undefined);
  }));
});
