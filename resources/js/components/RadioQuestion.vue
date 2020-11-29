<template>
    <div class="uk-card uk-card-body uk-card-default">
        <div class="question__header">
            <span>{{index + 1}}. Единичный выбор</span>
            <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="destroy"></a></li>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="text">Текст вопроса</label>
            <input class="uk-input uk-margin-bottom" type="text" id="text" v-model="question.title">
            <button class="uk-button uk-button-primary" @click.prevent="addAnswer">Добавить вариант ответа</button>
        </div>
        <div class="uk-margin question__answer" v-for="(answer, index) of question.answers">
            <input class="uk-input uk-width-2-3" type="text" id="title" v-model="answer.title">
            <input class="uk-radio" type="radio" :checked="question.correctAnswerIndex === index" v-model="question.correctAnswerIndex" :value="index">
            <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="deleteAnswer(index)"></a></li>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RadioQuestion",
        props: {
            index: {
                type: Number,
                required: true
            },
            questionData: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                question: {
                    title: '',
                    type: '',
                    correctAnswerIndex: 0,
                    answers: []
                }
            }
        },
        watch: {
            questionData: {
                handler: 'setData',
                immediate: true
            },
            question: {
                handler: function (newValue, oldValue) {
                    this.$emit('change', newValue)
                },
                deep: true
            }
        },
        methods: {
            destroy() {
                this.$emit('destroy')
            },
            addAnswer() {
                this.question.answers.push(new radioAnswer())
            },
            deleteAnswer(answerIndex) {
                this.question.answers.splice(answerIndex, 1)
            },
            setData(data) {
                this.question.title = data.title,
                    this.question.type = data.type,
                    this.question.answers = data.answers
            }
        }
    }

    class baseAnswer {
        constructor(text = '') {
            this.title = text
        }
    }

    class radioAnswer extends baseAnswer {
        constructor(props) {
            super(props);
        }
    }
</script>

<style scoped>
    .question__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .question__answer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
