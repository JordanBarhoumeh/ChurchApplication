/* -------------------- EVENT POP UP ANIMATION -------------------- */

function openPopup(element) {
    document.getElementById('popupTitle').textContent = element.dataset.title;
    document.getElementById('popupStart').textContent = 'Start Time: ' + element.dataset.startTime;
    document.getElementById('popupEnd').textContent = 'End Time: ' + element.dataset.endTime;
    document.getElementById('popupDescription').textContent = element.dataset.description;
    // Use classList to add the 'show' class
    const popup = document.getElementById('eventPopup');
    popup.style.display = 'block'; // Ensure it's block to start (if you're using display for showing/hiding)
    requestAnimationFrame(() => {
        popup.classList.add('show');
    });    
    document.body.style.overflow = 'hidden'; // Prevent scrolling on the body

}

function closePopup() {
    // Use classList to remove the 'show' class
    document.getElementById('eventPopup').classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling on the body

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



  if ('serviceWorker' in navigator && 'PushManager' in window) {
    // Register the service worker
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
  
        // Check for permission and subscribe for push notifications
        return subscribeUserToPush(registration);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
  } else {
    console.warn('Push messaging is not supported');
  }
  
  function subscribeUserToPush(registration) {
    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
      if (status === 'granted') {
        registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertVapidKey('YOUR_VAPID_PUBLIC_KEY')
        }).then(function(subscription) {
          console.log('User is subscribed:', subscription);
          // Send the subscription details to the backend via AJAX or Fetch API
          return updateSubscriptionOnServer(subscription);
        }).catch(function(err) {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied');
          } else {
            console.error('Failed to subscribe the user: ', err);
          }
        });
      }
    });
  }
  
  function updateSubscriptionOnServer(subscription) {
    // Placeholder for server update logic
    return fetch('/api/save-subscription/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription)
    });
  }
  
  function convertVapidKey(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  