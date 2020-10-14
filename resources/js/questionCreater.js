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
                <input type="text" :name="'questions[' + questionIndex + '][answers][0][title]'" class="uk-input" :value="answer" @input="onAnswerInput">
                <input type="hidden" :name="'questions[' + questionIndex + '][answers][0][is_correct]'" class="uk-input" value="true" @input="onAnswerInput">
            </div>

        </div>
    `
})

Vue.component('checkboxQuestion', {
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

window.addEventListener('DOMContentLoaded', () => {
    let app = new Vue({
        el: '#test-area',
        data: {
            title: '',
            isUnidirectional: false,
            questions: [],
            route: route,
            csrf: csrf
        },
        methods: {
            addQuestion(type) {
                if (type === 'text') {
                    this.questions.push({
                        type: 'text',
                        title: '',
                        answer: ''
                    })
                } else if (type === 'checkbox') {
                    this.questions.push({
                        type: 'checkbox',
                        title: '',
                        answers: [],
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
                this.questions[$event].answers.push({
                    'title': '',
                    'is_correct': false
                })
            },
            changeRadioAnswerText($event) {
                Vue.set(this.questions[$event.questionIndex].answers[$event.answerIndex], 'title' , $event.value)
            },
            deleteRadioAnswer($event) {
                this.questions[$event.questionIndex].answers.splice($event.answerIndex, 1);
            },
            changeCheckboxCorrectAnswer($event) {
                this.questions[$event.questionIndex].answers[$event.answerIndex].is_correct = !this.questions[$event.questionIndex].answers[$event.answerIndex].is_correct;
            }


        },
        template: `
            <div class="content uk-width-4-5 uk-padding">

                <form method="POST" :action="route" class="uk-margin-large-bottom">

                <input type="hidden" name="_token" :value="csrf">

                <div class="uk-card uk-card-default uk-padding uk-margin-bottom">
                    <legend class="uk-legend">Создание нового теста</legend>
                    <div class="uk-margin-top">
                        <div class="uk-width-3-5">
                            <input class="uk-input" type="text" placeholder="Название теста" name="title" v-model="title">
                        </div>
                        <div class="uk-margin">
                            <div class="uk-form-label">Однонаправленный</div>
                            <div class="uk-form-controls">
                                <label><input class="uk-radio uk-margin-small-right" type="radio" name="is_unidirectional" value="true" v-model="isUnidirectional">Да</label>
                                <br>
                                <label><input class="uk-radio uk-margin-small-right" type="radio" name="is_unidirectional" value="false" v-model="isUnidirectional" checked>Нет</label>
                            </div>
                        </div>
                        <button class="uk-button uk-button-primary js-add-text-question"
                                @click.prevent="addQuestion('text')">Текстовое поле</button>
                        <button class="uk-button uk-button-primary js-add-radio-question"
                                @click.prevent="addQuestion('checkbox')">Вопрос с выбором</button>
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
                    <checkboxQuestion v-if="question.type === 'checkbox'"
                                  :title="question.title"
                                  :answers="question.answers"
                                  :questionIndex="index"
                                  @on-question-title-input="changeQuestionTitle($event)"
                                  @on-delete-question-button-click="deleteQuestion($event)"
                                  @on-add-answer-button-click="addRadioAnswer($event)"
                                  @on-radio-answer-input="changeRadioAnswerText($event)"
                                  @on-radio-answer-delete-button-click="deleteRadioAnswer($event)"
                                  @on-checkbox-answer-checkbox-click="changeCheckboxCorrectAnswer($event)">

                    </checkboxQuestion>
                </template>

                <button type="submit" class="uk-button uk-button-primary">Сохранить</button>

                {{ title }}
                {{ isUnidirectional }}
                {{ questions }}

                </form>



            </div>
        `,
    })
})
