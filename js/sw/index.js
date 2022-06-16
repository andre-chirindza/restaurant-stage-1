
const cacheName = 'restaurant_v1';
const cacheAssets = [
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/main.js',
    '/js/dbhelper.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/data/restaurants.json',
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
    console.log('Trying to fetch in the cache')
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;
                return fetch(event.request);
        })
    );
});