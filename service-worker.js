const STATIC_CACHE_NAME = 'vue-pwa-static-v1';
const API_CACHE_NAME = 'vue-pwa-api-v1';
const STATIC_URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico',
    '/css/styles.css',
    '/js/app.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then((cache) => {
            console.log('Caching static assets');
            return cache.addAll(STATIC_URLS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (![STATIC_CACHE_NAME, API_CACHE_NAME].includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (STATIC_URLS_TO_CACHE.some((url) => request.url.includes(url))) {
        // Cache-first for static files
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                return cachedResponse || fetch(request);
            })
        );
    } else if (request.url.includes('hacker-news.firebaseio.com') || request.url.includes('hn.algolia.com')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response && response.status === 200) {
                        return caches.open(API_CACHE_NAME).then((cache) => {
                            cache.put(request, response.clone());
                            return response;
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(request).then((cachedResponse) => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        return new Response(
                            JSON.stringify({ error: 'No cached data available.' }),
                            { headers: { 'Content-Type': 'application/json' } }
                        );
                    });
                })
        );
    } else {
        event.respondWith(fetch(request));
    }
});
