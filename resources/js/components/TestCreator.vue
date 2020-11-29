<template>
    <form action="" @submit.prevent="formSubmit">
        <div class="uk-card uk-card-body uk-card-default uk-margin-bottom">
            <legend class="uk-legend">Создание нового теста</legend>
            <div class="uk-margin">
                <label class="uk-form-label">Название теста</label>
                <input class="uk-input" type="text" v-model="title">
            </div>
            <div class="uk-margin form__dates">
                <div class="uk-width-1-3 form__dates-input">
                    <label class="uk-form-label">Начало теста</label>
                    <input class="uk-input" type="datetime-local" v-model="test.start_time">
                </div>
                <div class="uk-width-1-3 form__dates-input">
                    <label class="uk-form-label">Конец теста</label>
                    <input class="uk-input" type="datetime-local" v-model="test.finish_time">
                </div>
            </div>
            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <p>Однонаправленный</p>
                <label><input class="uk-radio" type="radio" :value="true" v-model="test.is_unidirectional"> Да</label>
                <label><input class="uk-radio" type="radio" :value="false" v-model="test.is_unidirectional"> Нет</label>
            </div>
            <button class="uk-button uk-button-primary">Сохранить</button>
        </div>
        <template v-for="(question, index) of questions">
            <app-text-question
                v-if="question.type === 'text'"
                :index="index"
                :questionData="question"
                @change="changeQuestion($event, index)"
                @destroy="deleteQuestion(index)"
                class="uk-margin-bottom"
            />
            <app-checkbox-question
                v-if="question.type === 'checkbox'"
                :index="index"
                :questionData="question"
                @change="changeQuestion($event, index)"
                @destroy="deleteQuestion(index)"
                class="uk-margin-bottom"
            />
            <app-radio-question
                v-if="question.type === 'radio'"
                :index="index"
                :questionData="question"
                @change="changeQuestion($event, index)"
                @destroy="deleteQuestion(index)"
                class="uk-margin-bottom"
            />
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
    import {mutationTypes, actionTypes} from "../store/modules/testCreator";

    export default {
        name: "TestCreator",
        props: {
            url: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                title: '',
                questions: [],
            }
        },
        components: {
            AppTextQuestion,
            AppCheckboxQuestion,
            AppRadioQuestion
        },
        computed: {
            ...mapState({
                test: state => state.testCreator.test,
            })
        },
        methods: {
            addQuestion(type) {
                switch (type) {
                    case 'text': this.questions.push(new textQuestion()); break;
                    case 'radio': this.questions.push(new radioQuestion()); break;
                    case 'checkbox': this.questions.push(new checkboxQuestion()); break;
                }
            },
            changeQuestion(newValue, index) {
                this.questions[index] = newValue
            },
            deleteQuestion(index) {
                console.log(index)
                this.questions.splice(index, 1)
            },
            formSubmit() {
                this.$store.dispatch(actionTypes.createTest, { url: this.url })
                    .then(response => {
                        console.log(response)
                        window.location.href = response.data.testUrl
                    })
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
            this.answer = ''
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

    class checkboxAnswer extends baseAnswer {
        constructor(props, isCorrect = false) {
            super(props);
            this.isCorrect = isCorrect
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
