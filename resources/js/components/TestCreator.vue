<template>
    <form action="" @submit.prevent="formSubmit">
        <div class="uk-card uk-card-body uk-card-default uk-margin-bottom">
            <legend class="uk-legend">Создание нового теста</legend>
            <div class="uk-margin">
                <label class="uk-form-label" for="title">Название теста</label>
                <input class="uk-input" type="text" id="title" v-model="test.title">
            </div>
            <div class="uk-button-group">
                <button class="uk-button uk-button-primary" @click.prevent="addQuestion('text')">Текстовый</button>
                <button class="uk-button uk-button-primary" @click.prevent="addQuestion('radio')">Radio</button>
                <button class="uk-button uk-button-primary" @click.prevent="addQuestion('checkbox')">Checkbox</button>
            </div>
        </div>
        <template v-for="(question, index) of test.questions">
            <app-text-question
                v-if="question.type === 'text'"
                :index="index"
                class="uk-margin-bottom"
            />
            <app-checkbox-question
                v-if="question.type === 'checkbox'"
                :index="index"
                class="uk-margin-bottom"
            />
        </template>
    </form>
</template>

<script>
    import AppTextQuestion from './TextQuestion'
    import AppCheckboxQuestion from './CheckboxQuestion'
    import {mapState} from 'vuex'
    import {mutationTypes} from "../store/modules/testCreator";

    export default {
        name: "TestCreator",
        components: {
            AppTextQuestion,
            AppCheckboxQuestion
        },
        computed: {
            ...mapState({
                test: state => state.testCreator.test,
            })
        },
        methods: {
            addQuestion(type) {
                this.$store.commit(mutationTypes.addQuestion, type)
            },
            formSubmit() {
                console.log('submit')
            }
        }
    }
</script>

<style scoped>

</style>
