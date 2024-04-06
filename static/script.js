/* -------------------- NAV ANIMATION -------------------- */

// Highlight the active link based on the current page
function highlightActiveLink() {
    var links = document.getElementsByClassName('nav-link');
    var currentPage = window.location.pathname;
    for (var i = 0; i < links.length; i++) {
        if (links[i].href.includes(currentPage)) {
            links[i].classList.add('active');
        }
    }
}

// Call this function when the menu is opened
function openNav() {
    document.getElementById("slide-out-menu").style.width = "100%";
    highlightActiveLink(); // Ensure this function is defined or remove this line if not used
    document.getElementById("burger-stack").style.display = "none"; // Hides the burger icon
}

// Call this function when the menu is closed
function closeNav() {
    document.getElementById("slide-out-menu").style.width = "0";
    document.getElementById("burger-stack").style.display = "block"; // Shows the burger icon again
}

document.getElementById("burger-stack").onclick = openNav;


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




function showInstallPrompt() {
    // Assuming your prompt is initially hidden, this will make it visible
    document.getElementById('installPrompt').style.display = 'block';
}

function hideInstallPrompt() {
    document.getElementById('installPrompt').style.display = 'none';
}


