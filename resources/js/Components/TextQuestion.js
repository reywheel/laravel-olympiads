const TextQuestion = Vue.component('textQuestion', {
    props: ['title', 'answer', 'questionIndex'],
    methods: {
        onTitleInput($event) {
            this.$emit('on-question-title-input', {
                value: $event.target.value,
                questionIndex: this.questionIndex
            })
        },
        onAnswerInput($event) {
            this.$emit('on-answer-text-input', {
                value: $event.target.value,
                questionIndex: this.questionIndex
            })
        },
        onDeleteButtonClick() {
            this.$emit('on-delete-question-button-click', this.questionIndex);
        }
    },
    template: `
        <div class="uk-card uk-card-default uk-margin-bottom js-question-card">
            <div class="uk-padding-small">
                <span class="uk-margin-medium-right">Вопрос № {{ questionIndex + 1}}</span>
                <a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="onDeleteButtonClick"></a>
            </div>
            <hr class="uk-margin-remove">
            <div class="uk-padding">
                <div class="uk-margin">
                    <input class="uk-input uk-width-3-5 uk-margin-large-right"
                           type="text"
                           placeholder="Текст вопроса"
                           :name="'questions[' + questionIndex + '][title]'"
                           :value="title"
                           @input="onTitleInput"
                           required>
                    <input type="hidden" :name="'questions[' + questionIndex + '][type]'" value="text">
                </div>
                <p>Правильный ответ</p>
                <input type="text" :name="'questions[' + questionIndex + '][answers][0][title]'" class="uk-input" :value="answer" @input="onAnswerInput" required>
                <input type="hidden" :name="'questions[' + questionIndex + '][answers][0][is_correct]'" class="uk-input" value="true" @input="onAnswerInput">
            </div>

        </div>
    `
})

export default TextQuestion;
