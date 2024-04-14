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


document.getElementById('enableNotifications').addEventListener('click', function() {
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

  'use strict';

  // const applicationServerPublicKey = "BNbxGYNMhEIi9zrneh7mqV4oUanjLUK3m+mYZBc62frMKrEoMk88r3Lk596T0ck9xlT+aok0fO1KXBLV4+XqxYM=";
  const pushButton = document.querySelector('.js-push-btn');
  
  let isSubscribed = false;
  let swRegistration = null;
  
  function urlB64ToUint8Array(base64String) {
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
  
  function updateBtn() {
      if (Notification.permission === 'denied') {
          pushButton.textContent = 'Push Messaging Blocked.';
          pushButton.disabled = true;
          updateSubscriptionOnServer(null);
          return;
      }
  
      if (isSubscribed) {
          pushButton.textContent = 'Disable Push Messaging';
      } else {
          pushButton.textContent = 'Enable Push Messaging';
      }
  
      pushButton.disabled = false;
  }
  
  function updateSubscriptionOnServer(subscription) {
      // TODO: Send subscription to application server
  
      const subscriptionJson = document.querySelector('.js-subscription-json');
      const subscriptionDetails =
          document.querySelector('.js-subscription-details');
  
      if (subscription) {
          subscriptionJson.textContent = JSON.stringify(subscription);
          subscriptionDetails.classList.remove('is-invisible');
      } else {
          subscriptionDetails.classList.add('is-invisible');
      }
  }
  
  function subscribeUser() {
      const applicationServerPublicKey = localStorage.getItem('applicationServerPublicKey');
      const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
      swRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: applicationServerKey
          })
          .then(function(subscription) {
              console.log('User is subscribed.');
  
              updateSubscriptionOnServer(subscription);
              localStorage.setItem('sub_token',JSON.stringify(subscription));
              isSubscribed = true;
  
              updateBtn();
          })
          .catch(function(err) {
              console.log('Failed to subscribe the user: ', err);
              updateBtn();
          });
  }
  
  function unsubscribeUser() {
      swRegistration.pushManager.getSubscription()
          .then(function(subscription) {
              if (subscription) {
                  return subscription.unsubscribe();
              }
          })
          .catch(function(error) {
              console.log('Error unsubscribing', error);
          })
          .then(function() {
              updateSubscriptionOnServer(null);
  
              console.log('User is unsubscribed.');
              isSubscribed = false;
  
              updateBtn();
          });
  }
  
  function initializeUI() {
      pushButton.addEventListener('click', function() {
          pushButton.disabled = true;
          if (isSubscribed) {
              unsubscribeUser();
          } else {
              subscribeUser();
          }
      });
  
      // Set the initial subscription value
      swRegistration.pushManager.getSubscription()
          .then(function(subscription) {
              isSubscribed = !(subscription === null);
  
              updateSubscriptionOnServer(subscription);
  
              if (isSubscribed) {
                  console.log('User IS subscribed.');
              } else {
                  console.log('User is NOT subscribed.');
              }
  
              updateBtn();
          });
  }
  
  if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');
  
      navigator.serviceWorker.register("/static/sw.js")
          .then(function(swReg) {
              console.log('Service Worker is registered', swReg);
  
              swRegistration = swReg;
              initializeUI();
          })
          .catch(function(error) {
              console.error('Service Worker Error', error);
          });
  } else {
      console.warn('Push meapplicationServerPublicKeyssaging is not supported');
      pushButton.textContent = 'Push Not Supported';
  }
  
  function push_message() {
      console.log("sub_token", localStorage.getItem('sub_token'));
      $.ajax({
          type: "POST",
          url: "/push_v1/",
          contentType: 'application/json; charset=utf-8',
          dataType:'json',
          data: JSON.stringify({'sub_token':localStorage.getItem('sub_token')}),
          success: function( data ){
              console.log("success",data);
      },
      error: function( jqXhr, textStatus, errorThrown ){
          console.log("error",errorThrown);
      }
      });
  }
  
  $(document).ready(function(){
      $.ajax({
          type:"GET",
          url:'/subscription/',
          success:function(response){
              console.log("response",response);
              localStorage.setItem('applicationServerPublicKey',response.public_key);
          }
      })
  });
  