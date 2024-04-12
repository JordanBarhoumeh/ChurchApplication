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
  