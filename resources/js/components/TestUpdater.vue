<template>
    <form action="" @submit.prevent="formSubmit">
        <div class="uk-card uk-card-body uk-card-default uk-margin-bottom">
            <legend class="uk-legend">Изменение теста</legend>
            <div class="uk-margin">
                <label class="uk-form-label">Название теста</label>
                <input class="uk-input" type="text" v-model="title">
            </div>
            <div class="uk-margin form__dates">
                <div class="uk-width-1-3 form__dates-input">
                    <label class="uk-form-label">Начало теста</label>
                    <input class="uk-input" type="datetime-local" v-model="start_time">
                </div>
                <div class="uk-width-1-3 form__dates-input">
                    <label class="uk-form-label">Конец теста</label>
                    <input class="uk-input" type="datetime-local" v-model="finish_time">
                </div>
            </div>
            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <p>Однонаправленный</p>
                <label><input class="uk-radio" type="radio" :value="true" v-model="is_unidirectional"> Да</label>
                <label><input class="uk-radio" type="radio" :value="false" v-model="is_unidirectional"> Нет</label>
            </div>
            <button class="uk-button uk-button-primary" :disabled="isSubmitting">Сохранить</button>
        </div>
        <template v-for="(question, questionIndex) of questions">
            <app-text-question
                v-if="question.type === 'text'"
                :index="questionIndex"
                @destroy="deleteQuestion(questionIndex)"
                class="uk-margin-bottom"
            >
                <template v-slot>
                    <label class="uk-form-label">Текст вопроса</label>
                    <input class="uk-input uk-margin-bottom" type="text" v-model="question.title" required>
                    <label class="uk-form-label">Ответ</label>
                    <input class="uk-input" type="text" v-model="question.answers[0].title" required>
                    <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                        <label>Точное соответствие
                            <input class="uk-checkbox" type="checkbox" :checked="question.answers[0].exact" v-model="question.answers[0].exact">
                        </label>
                    </div>
                </template>
            </app-text-question>

            <app-radio-question
                v-if="question.type === 'radio'"
                :index="questionIndex"
                @destroy="deleteQuestion(questionIndex)"
                class="uk-margin-bottom"
            >
                <template v-slot>
                    <div class="uk-margin">
                        <label class="uk-form-label">Текст вопроса</label>
                        <input class="uk-input uk-margin-bottom" type="text" v-model="question.title" required>
                        <button class="uk-button uk-button-primary" @click.prevent="addAnswer(questionIndex, 'radio')">Добавить вариант ответа</button>
                    </div>
                    <div class="uk-margin question__answer" v-for="(answer, answerIndex) of question.answers">
                        <input class="uk-input uk-width-2-3" type="text" v-model="answer.title" required>
                        <input class="uk-radio" type="radio" :checked="question.correctAnswerIndex === answerIndex" v-model="question.correctAnswerIndex" :value="answerIndex">
                        <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="deleteAnswer(questionIndex, answerIndex)"></a></li>
                    </div>
                </template>
            </app-radio-question>

            <app-checkbox-question
                v-if="question.type === 'checkbox'"
                :index="questionIndex"
                @destroy="deleteQuestion(questionIndex)"
                class="uk-margin-bottom"
            >
                <template v-slot>
                    <div class="uk-margin">
                        <label class="uk-form-label">Текст вопроса</label>
                        <input class="uk-input uk-margin-bottom" type="text" v-model="question.title" required>
                        <button class="uk-button uk-button-primary" @click.prevent="addAnswer(questionIndex, 'checkbox')">Добавить вариант ответа</button>
                    </div>
                    <div class="uk-margin question__answer" v-for="(answer, answerIndex) of question.answers">
                        <input class="uk-input uk-width-2-3" type="text" v-model="answer.title" required>
                        <input class="uk-checkbox" type="checkbox" :checked="answer.is_correct" v-model="answer.is_correct">
                        <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="deleteAnswer(questionIndex, answerIndex)"></a></li>
                    </div>
                </template>
            </app-checkbox-question>

        </template>
        <div class="uk-button-group">
            <button class="uk-button uk-button-primary" @click.prevent="addQuestion('text')">Текстовый</button>
            <button class="uk-button uk-button-primary" @click.prevent="addQuestion('radio')">Radio</button>
            <button class="uk-button uk-button-primary" @click.prevent="addQuestion('checkbox')">Checkbox</button>
        </div>
    </form>
</template>

<script>
    import AppTextQuestion from './TextQuestion'
    import AppCheckboxQuestion from './CheckboxQuestion'
    import AppRadioQuestion from './RadioQuestion'
    import {mapState} from 'vuex'
    import {actionTypes} from "../store/modules/testCreator";

    export default {
        name: "TestUpdater",
        props: {
            url: {
                type: String,
                required: true
            },
            initialData: {
                type: String,
                required: false,
                default: ""
            }
        },
        data() {
            return {
                title: '',
                questions: [],
                start_time: '',
                finish_time: '',
                is_unidirectional: false
            }
        },
        components: {
            AppTextQuestion,
            AppCheckboxQuestion,
            AppRadioQuestion
        },
        computed: {
            ...mapState({
                isSubmitting: state => state.testCreator.isSubmitting
            }),
            test() {
                return {
                    title: this.title,
                    questions: this.questions,
                    start_time: this.start_time,
                    finish_time: this.finish_time,
                    is_unidirectional: this.is_unidirectional
                }
            },
            localInitialData() {
                return JSON.parse(this.initialData)
            }
        },
        methods: {
            addQuestion(type) {
                switch (type) {
                    case 'text':
                        this.questions.push(new textQuestion());
                        break;
                    case 'radio':
                        this.questions.push(new radioQuestion());
                        break;
                    case 'checkbox':
                        this.questions.push(new checkboxQuestion());
                        break;
                }
            },
            deleteQuestion(index) {
                console.log(index)
                this.questions.splice(index, 1)
            },
            addAnswer(questionIndex, type) {
                let newAnswer;

                switch (type) {
                    case 'text': newAnswer = new textAnswer(); break;
                    case 'radio': newAnswer = new radioAnswer(); break;
                    case 'checkbox': newAnswer = new checkboxAnswer(); break;
                }

                this.questions[questionIndex].answers.push(newAnswer)
            },
            deleteAnswer(questionIndex, answerIndex) {
                this.questions[questionIndex].answers.splice(answerIndex, 1);
            },
            formSubmit() {
                this.$store.dispatch(actionTypes.updateTest, {test: this.test, url: this.url})
                    .then(response => {
                        console.log(response)
                        window.location.href = response.data.testUrl
                    })
            }
        },
        mounted() {
            if (this.initialData) {
                this.title = this.localInitialData.title
                this.questions = this.localInitialData.questions.map((question, index) => {
                    if (question.type === 'radio') {
                        const correctAnswerIndex = question.answers.reduce((correctIndex, answer, index) => {
                            if (answer.is_correct) {
                                return index
                            } else return correctIndex
                        }, 0)
                        this.$set(question, 'correctAnswerIndex', correctAnswerIndex)
                    }
                    return question
                })
                this.start_time = this.localInitialData.start_time.split(' ').join('T')
                this.finish_time = this.localInitialData.finish_time.split(' ').join('T')
                this.is_unidirectional = Boolean(this.localInitialData.is_unidirectional)
            }
        }
    }

    class baseQuestion {
        constructor(text = '') {
            this.type = 'baseQuestion'
            this.title = text
        }
    }

    class textQuestion extends baseQuestion {
        constructor(props, exact = false) {
            super(props)
            this.type = 'text'
            this.answers = [
                new textAnswer()
            ]
            this.exact = exact
        }
    }

    class checkboxQuestion extends baseQuestion {
        constructor(props) {
            super(props)
            this.type = 'checkbox'
            this.answers = [
                new checkboxAnswer('', true),
                new checkboxAnswer(),
                new checkboxAnswer(),
            ]
        }
    }

    class radioQuestion extends baseQuestion {
        constructor(props) {
            super(props)
            this.type = 'radio'
            this.answers = [
                new radioAnswer(),
                new radioAnswer(),
                new radioAnswer(),
            ]
            this.correctAnswerIndex = 0
        }
    }

    class baseAnswer {
        constructor(text = '') {
            this.title = text
        }
    }

    class textAnswer extends baseAnswer {
        constructor(props) {
            super(props);
        }
    }

    class checkboxAnswer extends baseAnswer {
        constructor(props, is_correct = false) {
            super(props);
            this.is_correct = is_correct
        }
    }

    class radioAnswer extends baseAnswer {
        constructor(props) {
            super(props);
        }
    }
</script>

<style scoped>
    .form__dates {
        display: flex;
        align-items: center;
    }

    .form__dates-input:first-child {
        margin-right: 20px;
    }
</style>
