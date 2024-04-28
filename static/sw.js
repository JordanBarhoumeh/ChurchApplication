self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Check if the response exists in cache
      if (response) {
        // Return cached data if it's there
        return response;
      }
      // Fetch from network if it's not in cache
      return fetch(event.request);
    })
  );
});
