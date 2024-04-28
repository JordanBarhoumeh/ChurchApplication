/* -------------------- EVENT POP UP ANIMATION -------------------- */

function openPopup(element) {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('eventPopup');

  // Set content before showing the elements
  document.getElementById('popupTitle').textContent = element.dataset.title;
  document.getElementById('popupStart').textContent = element.dataset.allDay === 'true' ? 'Start Date: ' + element.dataset.startTime : 'Start Time: ' + element.dataset.startTime;
  document.getElementById('popupEnd').textContent = element.dataset.allDay === 'true' ? 'All day event' : 'End Time: ' + element.dataset.endTime;
  document.getElementById('popupDescription').textContent = element.dataset.description;

  // Prepare elements for transition
  overlay.style.display = 'block';
  popup.style.display = 'block';

  // Use setTimeout to allow display: block to take effect before adding show class
  setTimeout(() => {
      overlay.classList.add('show');
      popup.classList.add('show');
  }, 10);

  document.body.style.overflow = 'hidden';
}

function closePopup() {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('eventPopup');

  // Remove 'show' class to start transition
  overlay.classList.remove('show');
  popup.classList.remove('show');

  // Use setTimeout to allow transitions to complete before setting display: none
  setTimeout(() => {
      overlay.style.display = 'none';
      popup.style.display = 'none';
      document.body.style.overflow = ''; // Restore scrolling
  }, 500); // Match this delay to your CSS transition duration
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

