<template>
    <form action="" @submit.prevent="formSubmit">
        <div class="uk-card uk-card-body uk-card-default uk-margin-bottom">
            <legend class="uk-legend">Создание нового теста</legend>
            <div class="uk-margin">
                <label class="uk-form-label">Название теста</label>
                <input class="uk-input" type="text" v-model="test.title">
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
            <app-radio-question
                v-if="question.type === 'radio'"
                :index="index"
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
        props: ['url'],
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
                this.$store.commit(mutationTypes.addQuestion, type)
            },
            formSubmit() {
                this.$store.dispatch(actionTypes.createTest, { url: this.url })
            }
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
