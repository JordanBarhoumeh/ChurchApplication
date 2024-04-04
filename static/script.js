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
