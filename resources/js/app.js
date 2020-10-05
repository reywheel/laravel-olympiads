import TestCreator from "./modules/testCreator";

require('./bootstrap');
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

window.addEventListener('DOMContentLoaded', () => {
    M.AutoInit();

    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {});

    // let testCreator = new TestCreator();
    // testCreator.init();

// loads the Icon plugin
    UIkit.use(Icons);
});
