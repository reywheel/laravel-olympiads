<template>
    <div class="uk-card uk-card-body uk-card-default">
        <div class="question__header">
            <span>{{index + 1}}. Текстовый</span>
            <li><a href="#" class="uk-text-danger" uk-icon="icon: trash" @click.prevent="destroy"></a></li>
        </div>
        <div class="uk-margin">
            <slot/>
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
</style>
