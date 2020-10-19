import store from './store';
import AppQuestion from './components/AppQuestion'

window.addEventListener('DOMContentLoaded', () => {

    const vue = new Vue({
        el: '#testing',
        store,
        template: `
            <div>
                <AppQuestion />
                <div class="uk-margin">
                    <button class="uk-button uk-button-primary" @click="prevQuestion" :disabled="isFirstQuestion">Предыдущий вопрос</button>
                    <button class="uk-button uk-button-danger" @click="sendData">Завершить тестирование</button>
                    <button class="uk-button uk-button-primary" @click="nextQuestion" :disabled="isLastQuestion">Следующий вопрос</button>
                </div>
            </div>

        `,
        methods: {
            nextQuestion() {
                if (!this.isLastQuestion) this.$store.commit('changeCurrentQuestionIndex', this.currentQuestionIndex + 1)
            },
            prevQuestion() {
                if (!this.isFirstQuestion) this.$store.commit('changeCurrentQuestionIndex', this.currentQuestionIndex - 1)
            },
            sendData() {
                this.$store.dispatch('sendData');
            }
        },
        computed: {
            isFirstQuestion() {
                return this.currentQuestionIndex === 0;
            },
            isLastQuestion() {
                return this.currentQuestionIndex === this.$store.state.questions.length - 1;
            },
            currentQuestionIndex() {
                return this.$store.state.currentQuestionIndex;
            }
        },
        beforeMount() {
            this.$store.commit('createAnswersArray');
        }
    })

})
