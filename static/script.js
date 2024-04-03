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
    highlightActiveLink();
    document.getElementById("burger-stack-icon").classList.add('hide-burger');
}

function closeNav() {
    document.getElementById("slide-out-menu").style.width = "0";
    document.getElementById("burger-stack-icon").classList.remove('hide-burger');
}

document.getElementById("burger-stack").onclick = openNav;
