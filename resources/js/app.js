require('./bootstrap');

window.addEventListener('DOMContentLoaded', () => {
    M.AutoInit();

    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {});
});
