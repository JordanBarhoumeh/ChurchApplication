self.addEventListener('notificationclick', function(event) {
    const notification = event.notification;
    const action = event.action;

    if (action === 'close') {
        notification.close();
    } else {
        clients.openWindow(notification.data.url);  // Open the URL associated with the notification
        notification.close();
    }
});

self.addEventListener('push', function(event) {
    const data = event.data.json(); // Assuming the push data is JSON
    const options = {
        body: data.body,
        icon: 'images/icon.png',
        badge: 'images/badge.png',
        data: { url: data.url }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});
