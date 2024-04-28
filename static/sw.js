self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Perform action on click, like opening a URL or handling specific data
    event.waitUntil(clients.openWindow('/some-url'));
  });
  
  self.addEventListener('fetch', event => {
    if (event.request.url.includes('/church_main')) {
      // Network first strategy for specific routes
      event.respondWith(
        fetch(event.request).catch(() => {
          return caches.match(event.request);
        })
      );
    } else {
      // Cache first strategy for other requests
      event.respondWith(
        caches.match(event.request).then(response => {
          return response || fetch(event.request);
        })
      );
    }
  });
  