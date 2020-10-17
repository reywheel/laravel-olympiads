import TextQuestion from "./Components/TextQuestion";
import CheckboxQuestion from "./Components/CheckboxQuestion";

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
                            <input class="uk-input" type="text" placeholder="Название теста" name="title" v-model="title" required>
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

                </form>

            </div>
        `,
    })
})
