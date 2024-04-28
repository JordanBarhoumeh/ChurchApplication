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
