import AppTextAnswer from "./AppTextAnswer";
import AppCheckboxAnswer from "./AppCheckboxAnswer";

export default Vue.component('AppQuestion', {
    template: `
        <div class="uk-card uk-card-default uk-margin-bottom uk-padding-small">
            <div class="uk-flex uk-flex-between">
                <h1 class="uk-margin-medium-right">{{ questionTitle }}</h1>
                <p>{{ questionIndex + 1 }} из {{ allQuestions.length }}</p>
            </div>
            <div class="uk-margin">
                <template v-if="questionType === 'text'">
                    <AppTextAnswer v-for="(answer, index) in answers"
                                   :key="index"
                                   :title="answer.title"
                                   v-model="currentResult"
                    />
                </template>
                <template v-if="questionType === 'checkbox'">
                    <AppCheckboxAnswer v-for="(answer, index) in answers"
                                       :key="index"
                                       :index="index"
                                       :title="answer.title"
                                       :isChecked="isChecked(answer.title)"
                                       v-model="currentResult"
                    />
                </template>
            </div>
        </div>
    `,
    methods: {
        changeResultValue(value) {
            this.$store.commit('changeResultValue', value);
        },
        isChecked(value) {
            return this.$store.state.results[this.$store.state.currentQuestionIndex].values.includes(value)
        }
    },
    computed: {
        allQuestions() {
            return this.$store.state.questions
        },
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
        currentResult: {
            get() {
                if (this.questionType === 'text') {
                    return this.$store.state.results[this.questionIndex].values[0]
                } else {
                    return this.$store.state.results[this.questionIndex].values
                }
            },
            set(value) {
                if (this.questionType === 'text') {
                    this.$store.commit('changeResultValueText', value)
                } else {
                    this.$store.commit('changeResultValueArray', value)
                }
            }
        },
    }
})
