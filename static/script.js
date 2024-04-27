/* -------------------- EVENT POP UP ANIMATION -------------------- */

function openPopup(element) {
  document.getElementById('popupTitle').textContent = element.dataset.title;

  // Check if the event is an all-day event
  if (element.dataset.allDay === 'true') {
      // If it is an all-day event, show only the start date and indicate "All Day"
      document.getElementById('popupStart').textContent = 'Start Date: ' + element.dataset.startTime;
      document.getElementById('popupEnd').textContent = 'All day event';
  } else {
      // If it is not an all-day event, show both start and end times
      document.getElementById('popupStart').textContent = 'Start Time: ' + element.dataset.startTime;
      document.getElementById('popupEnd').textContent = 'End Time: ' + element.dataset.endTime;
  }

  document.getElementById('popupDescription').textContent = element.dataset.description;

  // Show the popup with animation
  const popup = document.getElementById('eventPopup');
  const overlay = document.getElementById('overlay');
  overlay.classList.add('show');
  popup.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
}

function closePopup() {
  // Hide the popup with animation
  const popup = document.getElementById('eventPopup');
  const overlay = document.getElementById('overlay');
  popup.classList.remove('show');
  overlay.classList.remove('show');
  document.body.style.overflow = ''; // Allow scrolling on the body
}




/* -------------------- NEW BURGER MENU ANIMATION -------------------- */

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

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

