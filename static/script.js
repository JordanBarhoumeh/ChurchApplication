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

  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('eventPopup');

  // Ensure overlay and popup are displayed before adding 'show' class
  overlay.style.display = 'block';
  popup.style.display = 'block';

  // Delay the addition of 'show' class slightly to trigger transition
  setTimeout(() => {
      overlay.classList.add('show');
      popup.classList.add('show');
  }, 10);

  document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
}

function closePopup() {
  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('eventPopup');

  // Remove 'show' class first to trigger opacity transition
  overlay.classList.remove('show');
  popup.classList.remove('show');

  setTimeout(() => {
      overlay.style.display = 'none'; // Hide after transition
      popup.style.display = 'none'; // Hide after transition
  }, 500); // Delay should match transition duration

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

