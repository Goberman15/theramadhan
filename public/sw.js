const CACHE_NAME = 'ramadhan-dev-v1';
const STATIC_CACHE = 'ramadhan-static-v1';
const DYNAMIC_CACHE = 'ramadhan-dynamic-v1';

// Cache strategies for different content types
const CACHE_STRATEGIES = {
    pages: 'stale-while-revalidate',
    assets: 'cache-first',
    api: 'network-first'
};

// Files to cache on install
const PRECACHE_RESOURCES = [
    '/',
    '/blog',
    '/wiki',
    '/favicon.svg',
    '/_astro/hoisted.B_uR5Lee.js',
    '/_astro/hoisted.CmkSwYHY.js'
];

// Install event - cache essential resources
self.addEventListener('install', event => {
    console.log('Service worker installing...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Caching app shell');
                return cache.addAll(PRECACHE_RESOURCES);
            })
            .then(() => {
                console.log('Service worker installed');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service worker activating...');

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    event.respondWith(
        handleFetch(request)
    );
});

async function handleFetch(request) {
    const url = new URL(request.url);

    try {
        // Strategy for different content types
        if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.includes('/_astro/')) {
            // Cache-first for static assets
            return await cacheFirst(request);
        } else if (url.pathname.startsWith('/blog/') || url.pathname.startsWith('/wiki/')) {
            // Stale-while-revalidate for content pages
            return await staleWhileRevalidate(request);
        } else {
            // Network-first for main pages
            return await networkFirst(request);
        }
    } catch (error) {
        console.error('Fetch failed:', error);
        return await caches.match(request) || new Response('Offline content not available');
    }
}

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, networkResponse.clone());
    }

    return networkResponse;
}

async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);

    const fetchPromise = fetch(request).then(networkResponse => {
        if (networkResponse.ok) {
            const cache = caches.open(DYNAMIC_CACHE);
            cache.then(c => c.put(request, networkResponse.clone()));
        }
        return networkResponse;
    });

    return cachedResponse || await fetchPromise;
}

async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        throw error;
    }
}
