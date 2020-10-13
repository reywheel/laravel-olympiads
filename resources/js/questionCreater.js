Vue.component('textQuestion', {
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
        <div class="uk-card uk-card-default uk-padding uk-margin-bottom js-question-card">
            <div class="uk-margin">
                <input class="uk-input uk-width-3-5 uk-margin-large-right"
                       type="text"
                       placeholder="Текст вопроса"
                       :value="title"
                       @input="onTitleInput"
                       required>
                <input type="hidden" name="question[type]" value="radio">
                <a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="onDeleteButtonClick"></a>
            </div>
            <p>Правильный ответ</p>
            <input type="text" name="" class="uk-input" :value="answer" @input="onAnswerInput">
        </div>
    `
})

Vue.component('radioQuestion', {
    props: ['title', 'answers', 'correctAnswerIndex', 'questionIndex'],
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
        onAnswerCheckboxClick($event) {
            this.$emit('on-radio-answer-checkbox-click', {
                questionIndex: this.questionIndex,
                value: $event.target.value
            })
        }
    },
    template: `
        <div class="uk-card uk-card-default uk-padding uk-margin-bottom js-question-card">
            <div>
                <input class="uk-input uk-width-3-5"
                       type="text"
                       placeholder="Текст вопроса"
                       name="question[text]"
                       :value="title"
                       @input="onTitleInput"
                       required>
                <input type="hidden" name="question[type]" value="radio">
                <button class="uk-button uk-button-primary uk-margin-large-right"
                        @click.prevent="onAddAnswerButtonClick">Добавить вариант ответа
                </button>
                <a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="onDeleteButtonClick"></a>
            </div>
            <p v-show="!(answers.length == 0)">Варианты ответов</p>
            <template v-for="(answer, index) in answers">
                <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right"
                       type="text"
                       :placeholder="'Ответ ' + (index + 1)"
                       :value="answer"
                       @input="onAnswerInput($event, index)"
                       required>
                <input v-if="correctAnswerIndex == index" class="uk-radio" type="radio" :name="'question['+ questionIndex + '][correct-answer-index]'" :value="index" checked>
                <input v-else class="uk-radio" type="radio" :name="'question['+ questionIndex + '][correct-answer-index]'" :value="index" @click="onAnswerCheckboxClick">
                <a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="onAnswerDelete(index)"></a>
            </template>
        </div>
    `
})

window.addEventListener('DOMContentLoaded', () => {
    let app = new Vue({
        el: '#test-area',
        data: {
            title: 'Тестовое название',
            isUnidirectional: true,
            questions: []
        },
        methods: {
            addQuestion(type) {
                if (type === 'text') {
                    this.questions.push({
                        type: 'text',
                        title: '',
                        answer: ''
                    })
                } else if (type === 'radio') {
                    this.questions.push({
                        type: 'radio',
                        title: '',
                        answers: [],
                        correctAnswerIndex: 0
                    })
                }
            },
            deleteQuestion($event) {
                this.questions.splice($event, 1)
            },
            changeQuestionTitle($event) {
                Vue.set(this.questions[$event.questionIndex], 'title', $event.value)
            },

            changeTextAnswerText($event) {
                Vue.set(this.questions[$event.questionIndex], 'answer', $event.value)
            },

            addRadioAnswer($event) {
                this.questions[$event].answers.push('')
            },
            changeRadioAnswerText($event) {
                Vue.set(this.questions[$event.questionIndex].answers, $event.answerIndex, $event.value)
            },
            deleteRadioAnswer($event) {
                this.questions[$event.questionIndex].answers.splice($event.answerIndex, 1);
            },
            changeRadioCorrectAnswer($event) {
                this.questions[$event.questionIndex].correctAnswerIndex = $event.value
            }


        },
        template: `
            <div class="content uk-width-4-5">

                <form method="POST" action="" class="uk-margin-large-bottom">

                <div class="uk-card uk-card-default uk-margin-top uk-padding uk-margin-bottom">
                    <legend class="uk-legend">Создание нового теста</legend>
                    <div class="uk-margin-top">
                        <div class="uk-width-3-5">
                            <input class="uk-input" type="text" placeholder="Название теста" name="title" v-model="title">
                        </div>
                        <div class="uk-margin">
                            <div class="uk-form-label">Однонаправленный</div>
                            <div class="uk-form-controls" v-if="isUnidirectional">
                                <label><input class="uk-radio uk-margin-small-right" type="radio" name="is_unidirectional" value="true" v-model="isUnidirectional">Да</label>
                                <br>
                                <label><input class="uk-radio uk-margin-small-right" type="radio" name="is_unidirectional" value="false" v-model="isUnidirectional" checked>Нет</label>
                            </div>
                            <div class="uk-form-controls" v-else>
                                <label><input class="uk-radio uk-margin-small-right" type="radio" name="is_unidirectional" value="true" v-model="isUnidirectional" checked>Да</label>
                                <br>
                                <label><input class="uk-radio uk-margin-small-right" type="radio" name="is_unidirectional" value="false" v-model="isUnidirectional">Нет</label>
                            </div>
                        </div>
                        <button class="uk-button uk-button-primary js-add-text-question"
                                @click.prevent="addQuestion('text')">Текстовое поле</button>
                        <button class="uk-button uk-button-primary js-add-radio-question"
                                @click.prevent="addQuestion('radio')">Единичный выбор</button>
                    </div>
                </div>

                <template v-for="(question, index) in questions">
                    <textQuestion v-if="question.type === 'text'"
                                  :title="question.title"
                                  :answer="question.answer"
                                  :questionIndex="index"
                                  @on-question-title-input="changeQuestionTitle($event)"
                                  @on-answer-text-input="changeTextAnswerText($event)"
                                  @on-delete-question-button-click="deleteQuestion($event)">
                    </textQuestion>
                    <radioQuestion v-if="question.type === 'radio'"
                                  :title="question.title"
                                  :answers="question.answers"
                                  :correctAnswerIndex="question.correctAnswerIndex"
                                  :questionIndex="index"
                                  @on-question-title-input="changeQuestionTitle($event)"
                                  @on-delete-question-button-click="deleteQuestion($event)"
                                  @on-add-answer-button-click="addRadioAnswer($event)"
                                  @on-radio-answer-input="changeRadioAnswerText($event)"
                                  @on-radio-answer-delete-button-click="deleteRadioAnswer($event)"
                                  @on-radio-answer-checkbox-click="changeRadioCorrectAnswer($event)">

                    </radioQuestion>
                </template>

                <button type="submit" class="uk-button uk-button-primary">Сохранить</button>

                {{ questions }}

                </form>



            </div>
        `,
    })
})
