const CheckboxQuestion = Vue.component('checkboxQuestion', {
    props: ['title', 'answers', 'questionIndex'],
    methods: {
        onTitleInput($event) {
            this.$emit('on-question-title-input', {
                value: $event.target.value,
                questionIndex: this.questionIndex
            })
        },
        onDeleteButtonClick() {
            this.$emit('on-delete-question-button-click', this.questionIndex);
        },
        onAddAnswerButtonClick() {
            this.$emit('on-add-answer-button-click', this.questionIndex)
        },
        onAnswerInput($event, answerIndex) {
            this.$emit('on-radio-answer-input', {
                questionIndex: this.questionIndex,
                answerIndex: answerIndex,
                value: $event.target.value,
            })
        },
        onAnswerDelete(answerIndex) {
            this.$emit('on-radio-answer-delete-button-click', {
                questionIndex: this.questionIndex,
                answerIndex: answerIndex
            })
        },
        onAnswerCheckboxClick($event, answerIndex) {
            this.$emit('on-checkbox-answer-checkbox-click', {
                questionIndex: this.questionIndex,
                answerIndex: answerIndex
            })
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
                <div>
                <input class="uk-input uk-width-3-5"
                       type="text"
                       placeholder="Текст вопроса"
                       :name="'questions[' + questionIndex + '][title]'"
                       :value="title"
                       @input="onTitleInput"
                       required>
                <input type="hidden" :name="'questions[' + questionIndex + '][type]'" value="checkbox">
                <button class="uk-button uk-button-primary uk-margin-large-right"
                        @click.prevent="onAddAnswerButtonClick">Добавить вариант ответа
                </button>
                </div>
                <p v-show="!(answers.length == 0)">Варианты ответов</p>
                <template v-for="(answer, index) in answers">
                    <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right"
                           type="text"
                           :placeholder="'Ответ ' + (index + 1)"
                           :name="'questions[' + questionIndex + '][answers][' + index + '][title]'"
                           :value="answer.title"
                           @input="onAnswerInput($event, index)"
                           required>
                    <input v-if="answer.is_correct" class="uk-checkbox" type="checkbox" :name="'questions[' + questionIndex + '][answers][' + index + '][is_correct]'" value="true" @click="onAnswerCheckboxClick($event, index)" checked>
                    <input v-else class="uk-checkbox" type="checkbox" :name="'questions[' + questionIndex + '][answers][' + index + '][is_correct]'" value="true" @click="onAnswerCheckboxClick($event, index)">
                    <a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="onAnswerDelete(index)"></a>
                </template>
            </div>
        </div>
    `
})

export default CheckboxQuestion;
