export default Vue.component('AppTextAnswer', {
    template: `
        <div class="uk-margin">
            <input class="uk-input"
                   type="text"
                   placeholder="Ведите ответ"
                   :value="value"
                   @input="onInput"
                   required
            >
        </div>
    `,
    props: {
        value: {
            type: String,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    methods: {
        onInput($event) {
            this.$emit('input', {
                value: $event.target.value,
                index: this.index
            })
        }
    }
})
