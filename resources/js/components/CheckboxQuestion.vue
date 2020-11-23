<template>
    <div class="uk-card uk-card-body uk-card-default">
        <div class="question__header">
            <span>{{index + 1}}. Множественные выбор</span>
            <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="deleteQuestion"></a></li>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="text">Текст вопроса</label>
            <input class="uk-input uk-margin-bottom" type="text" id="text" v-model="question.text">
            <button class="uk-button uk-button-primary" @click.prevent="addAnswer">Добавить вариант ответа</button>
        </div>
        <div class="uk-margin question__answer" v-for="(answer, index) of answers">
            <input class="uk-input uk-width-2-3" type="text" id="title" v-model="answer.text">
            <input class="uk-checkbox" type="checkbox" :checked="answer.isCorrect" v-model="answer.isCorrect">
            <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="deleteAnswer(index)"></a></li>
        </div>
    </div>
</template>

<script>
    import {mutationTypes} from "../store/modules/testCreator";

    export default {
        name: "CheckboxQuestion",
        props: {
            index: {
                type: Number,
                required: true
            }
        },
        computed: {
            question() {
                return this.$store.state.testCreator.test.questions[this.index]
            },
            answers() {
                return this.$store.state.testCreator.test.questions[this.index].answers
            },
        },
        methods: {
            deleteQuestion() {
                this.$store.commit(mutationTypes.deleteQuestion, this.index)
            },
            addAnswer() {
                this.$store.commit(mutationTypes.addAnswer, this.index)
            },
            deleteAnswer(answerIndex) {
                this.$store.commit(mutationTypes.deleteAnswer, {
                    questionIndex: this.index,
                    answerIndex
                })
            }
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
