<template>
    <div class="uk-card uk-card-body uk-card-default">
        <div class="question__header">
            <span>{{index + 1}}. Множественные выбор</span>
            <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="destroy"></a></li>
        </div>
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "CheckboxQuestion",
        props: {
            index: {
                type: Number,
                required: true
            }
        },

        methods: {
            destroy() {
                this.$emit('destroy')
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
