import questionCreator from './modules/questionCreator';

window.addEventListener('DOMContentLoaded', () => {
    const creator = new questionCreator();
    creator.init();
})
