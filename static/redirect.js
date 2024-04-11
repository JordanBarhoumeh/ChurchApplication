/* -------------------- AUTO REDIRECT HANDLING -------------------- */

if (window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches) {
    window.location.href = '/index';
}