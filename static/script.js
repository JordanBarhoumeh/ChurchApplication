/* -------------------- EVENT POP UP ANIMATION -------------------- */

function openPopup(element) {
  document.getElementById('popupTitle').textContent = element.dataset.title;

  // Check if the event is an all-day event
  if (element.dataset.allDay === 'true') {
    // If it is an all-day event, show only the start date and indicate "All Day"
    document.getElementById('popupStart').textContent = 'Start Time: ' + element.dataset.startTime;
    document.getElementById('popupEnd').textContent = 'All day event';
  } else {
    // If it is not an all-day event, show both start and end times
    document.getElementById('popupStart').textContent = 'Start Time: ' + element.dataset.startTime;
    document.getElementById('popupEnd').textContent = 'End Time: ' + element.dataset.endTime;
  }

  document.getElementById('popupDescription').textContent = element.dataset.description;

  // Use classList to add the 'show' class
  const popup = document.getElementById('eventPopup');
  popup.style.display = 'block';
  requestAnimationFrame(() => {
    popup.classList.add('show');
  });

  document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
  document.body.style.position = 'fixed'; // Add this line

}


function closePopup() {
  // Use classList to remove the 'show' class
  document.getElementById('eventPopup').classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling on the body
  document.body.style.position = ''; // Reset the position style

}


/* -------------------- ADD TO HOMESCREEN POP UP ANIMATION -------------------- */


function showInstallPrompt() {
  // Assuming your prompt is initially hidden, this will make it visible
  document.getElementById('installPrompt').style.display = 'block';
}

function hideInstallPrompt() {
  document.getElementById('installPrompt').style.display = 'none';
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

// Add an event listener to your buttons when the document loads
document.addEventListener('DOMContentLoaded', function () {
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const eventId = this.dataset.eventId;
      deleteEvent(eventId);
    });
  });
});


function deleteEvent(eventId) {
  if (confirm('Are you sure you want to delete this event?')) {
    fetch('/delete-event/' + eventId, {
      method: 'POST',
      // Include any necessary headers, credentials, etc.
    }).then(response => {
      if (response.ok) {
        alert('Event deleted successfully!');
        // Remove the event element from the DOM or refresh the page
      } else {
        alert('Error deleting event. Please try again.');
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
  }
}