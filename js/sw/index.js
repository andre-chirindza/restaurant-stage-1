
const cacheName = 'restaurant_v1';
const cacheAssets = [
    '/index.html',
    '/js/main.js'
];

self.addEventListener('install', event => {

    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Caching the files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
            .catch(error => console.log(`Error: ${error}`))
    );
});

self.addEventListener('activate', event => {

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(

                cacheNames.map(cache => {
                    if (cache != cacheName) return caches.delete(cache)
                })
            )
        })
    );
});

/**
 * Calling Fetch Event
 * Copying the entire page with the assets
 **/
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                const responseClone = response.clone();

                caches.open(cacheName)
                    .then(cache => {
                        cache.put(event.request, responseClone);
                    });
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});