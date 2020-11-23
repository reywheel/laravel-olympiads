<template>
    <div class="uk-card uk-card-body uk-card-default">
        <div class="question__header">
            <span>{{index + 1}}. Текстовый</span>
            <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="deleteQuestion"></a></li>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label">Текст вопроса</label>
            <input class="uk-input" type="text" id="text" v-model="question.text">
            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <label>Точное соответствие
                    <input class="uk-checkbox" type="checkbox" :checked="question.exact" v-model="question.exact">
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import {mutationTypes} from "../store/modules/testCreator";

    export default {
        name: "TextQuestion",
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
        },
        methods: {
            deleteQuestion() {
                this.$store.commit(mutationTypes.deleteQuestion, this.index)
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
</style>
