import AppTextAnswer from "./AppTextAnswer";

export default Vue.component('AppQuestion', {
    template: `
        <div class="uk-card uk-card-default uk-margin-bottom uk-padding-small">
            <h1 class="uk-margin-medium-right">{{ questionTitle }}</h1>
            <div class="uk-margin">
                <template v-if="questionType === 'text'">
                    <AppTextAnswer v-for="(answer, index) in answers"
                                   :key="index"
                                   :index="index"
                                   :value="results[index].value"
                                   @input="changeResultValue"
                    />
                </template>
            </div>
        </div>
    `,
    methods: {
        changeResultValue(obj) {
            this.$store.commit('changeResultValue', obj);
        }
    },
    computed: {
        questionIndex() {
            return this.$store.state.currentQuestionIndex
        },
        questionTitle() {
            return this.$store.state.questions[this.questionIndex].title
        },
        questionType() {
            return this.$store.state.questions[this.questionIndex].type
        },
        answers() {
            return this.$store.state.questions[this.questionIndex].answers
        },
        results() {
            return this.$store.state.results
        }

    }
})
