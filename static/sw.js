self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Perform action on click, like opening a URL or handling specific data
    event.waitUntil(clients.openWindow('/some-url'));
  });
  