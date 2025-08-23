// Service Worker for PWA functionality with optimized caching
const CACHE_VERSION = 'v2';
const CACHE_NAME = `elira-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/eliraicon.png',
];

// Cache strategies
const CACHE_STRATEGIES = {
  networkFirst: ['/api/', '/_next/data/'],
  cacheFirst: ['/static/', '/fonts/', '/_next/static/'],
  staleWhileRevalidate: ['/', '/manifest.json'],
};

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip Chrome extension requests
  if (event.request.url.includes('chrome-extension')) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Cache hit - return response
        if (cachedResponse) {
          return cachedResponse;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Add to cache for future use
          caches.open(CACHE_NAME)
            .then((cache) => {
              // Only cache same-origin and CORS resources
              if (event.request.url.startsWith(self.location.origin) ||
                  event.request.url.includes('fonts.googleapis.com') ||
                  event.request.url.includes('fonts.gstatic.com')) {
                cache.put(event.request, responseToCache);
              }
            });

          return response;
        }).catch(() => {
          // Offline fallback
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncFormData());
  }
});

async function syncFormData() {
  // Get pending form data from IndexedDB
  const db = await openDB();
  const tx = db.transaction('pendingForms', 'readonly');
  const store = tx.objectStore('pendingForms');
  const allForms = await store.getAll();

  // Try to submit each form
  for (const formData of allForms) {
    try {
      const response = await fetch(formData.url, {
        method: 'POST',
        headers: formData.headers,
        body: JSON.stringify(formData.data),
      });

      if (response.ok) {
        // Remove from pending if successful
        const deleteTx = db.transaction('pendingForms', 'readwrite');
        const deleteStore = deleteTx.objectStore('pendingForms');
        await deleteStore.delete(formData.id);
      }
    } catch (error) {
      console.error('Failed to sync form:', error);
    }
  }
}

// Helper function to open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('EliraDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pendingForms')) {
        db.createObjectStore('pendingForms', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Push notification support
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/eliraicon.png',
    badge: '/eliraicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/eliraicon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/eliraicon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Elira Update', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync (for Chrome)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  const cache = await caches.open(CACHE_NAME);
  
  // Update critical resources
  const resourcesToUpdate = [
    '/',
    '/manifest.json',
  ];

  for (const resource of resourcesToUpdate) {
    try {
      const response = await fetch(resource);
      if (response.ok) {
        await cache.put(resource, response);
      }
    } catch (error) {
      console.error(`Failed to update ${resource}:`, error);
    }
  }
}