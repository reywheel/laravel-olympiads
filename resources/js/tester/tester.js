import store from './store';
import AppQuestion from './components/AppQuestion'

window.addEventListener('DOMContentLoaded', () => {

    const vue = new Vue({
        el: '#testing',
        store,
        template: `
            <AppQuestion />
        `,
        beforeMount() {
            this.$store.commit('createAnswersArray');
            console.log(this.$store.state)
        }
    })

})
