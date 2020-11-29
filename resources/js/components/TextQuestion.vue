<template>
    <div class="uk-card uk-card-body uk-card-default">
        <div class="question__header">
            <span>{{index + 1}}. Текстовый</span>
            <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="destroy"></a></li>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label">Текст вопроса</label>
            <input class="uk-input uk-margin-bottom" type="text" v-model="question.title">
            <label class="uk-form-label">Ответ</label>
            <input class="uk-input" type="text" v-model="question.answer">
            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                <label>Точное соответствие
                    <input class="uk-checkbox" type="checkbox" :checked="question.exact" v-model="question.exact">
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TextQuestion",
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
                    exact: '',
                    type: '',
                    answer: ''
                }
            }
        },
        watch: {
            questionData: {
                handler: 'setData',
                immediate: true
            },
            question: {
                handler: function (newValue) {
                    this.$emit('change', newValue)
                },
                deep: true
            }
        },
        methods: {
            destroy() {
                this.$emit('destroy')
            },
            setData(data) {
                this.question.title = data.title,
                this.question.exact = data.exact,
                this.question.type = data.type,
                this.question.answer = data.answer
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
