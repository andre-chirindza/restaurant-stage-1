// 


const cacheName = 'restaurant-v1';

/**
 * Installing the Service Worker
*/
self.addEventListener('install', event => {

    console.log('Service Worker installed.');
    event.skipWaiting();
});

/**
 * Deleting the previous cache 
*/
self.addEventListener('activate', event => {
    console.log(`Service Worker actived.`)
    
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