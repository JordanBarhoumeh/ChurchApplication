// Example Service Worker code snippet for triggering notifications
self.addEventListener('notificationclick', event => {
    clients.openWindow('/upcoming_events'); // Open a URL when the user clicks on the notification
    event.notification.close(); // Close the notification
});

self.addEventListener('push', event => {
    const data = event.data.json(); // Get notification data from push message
    const title = data.title;
    const options = {
        body: data.body,
        icon: 'path/to/icon.png',
        badge: 'path/to/badge.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
