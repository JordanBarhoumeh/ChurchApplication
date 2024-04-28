/* -------------------- EVENT POP UP ANIMATION -------------------- */

function openPopup(element) {
  document.getElementById('popupTitle').textContent = element.dataset.title;
  if (element.dataset.allDay === 'true') {
      document.getElementById('popupStart').textContent = 'Start Date: ' + element.dataset.startTime;
      document.getElementById('popupEnd').textContent = 'All day event';
  } else {
      document.getElementById('popupStart').textContent = 'Start Time: ' + element.dataset.startTime;
      document.getElementById('popupEnd').textContent = 'End Time: ' + element.dataset.endTime;
  }
  document.getElementById('popupDescription').textContent = element.dataset.description;

  const overlay = document.getElementById('overlay');  // Ensure this exists in your HTML
  const popup = document.getElementById('eventPopup');
  overlay.style.display = 'block';
  popup.style.display = 'block';

  setTimeout(() => {
      overlay.classList.add('show');
      popup.classList.add('show');
  }, 10);

  document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
}

function closePopup() {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('eventPopup');

  overlay.classList.remove('show');
  popup.classList.remove('show');

  setTimeout(() => {
      overlay.style.display = 'none';
      popup.style.display = 'none';
      document.body.style.overflow = ''; // Allow scrolling on the body again
  }, 500); // Delay should match transition duration
}





/* -------------------- NEW BURGER MENU ANIMATION + EVENT LISTENER -------------------- */

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  const eventItems = document.querySelectorAll('.event-item');
  eventItems.forEach(item => {
      item.addEventListener('click', function() {
          openPopup(this);
      });
  });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('is-active');
      mobileNav.classList.toggle('is-active');
    });
  } else {
    console.log('Hamburger or mobile-nav elements are not found.');
  }
});



/* -------------------- NOTI MANAGING -------------------- */


document.getElementById('enableNotifications').addEventListener('click', function () {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // You might want to save this information to your server or locally
      } else {
        console.log('Notification permission denied.');
      }
    });
  } else {
    alert('This browser does not support notifications.');
  }
});



/* --------------------  -------------------- */

document.getElementById('notificationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const eventId = this.eventId.value;
  const notificationTimes = Array.from(this.querySelectorAll('input[name="notificationTime"]:checked'), input => parseInt(input.value));

  // Assuming notification scheduling logic is in the service worker
  notificationTimes.forEach(time => {
      const when = new Date(Date.now() + time * 1000).toISOString();
      navigator.serviceWorker.ready.then(registration => {
          registration.showNotification('Event Reminder', {
              tag: `event-${eventId}-${time}`,  // Unique tag for this notification
              body: `Reminder for event on ${when}`,
              showTrigger: new TimestampTrigger(new Date().getTime() + time * 1000),  // Set for the future
              data: {url: window.location.href},  // Data to navigate to on click
              requireInteraction: true
          });
      });
  });

  closeNotificationOptions();  // Close the modal after setting notifications
});

