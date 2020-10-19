export default Vue.component('AppTextAnswer', {
    template: `
        <div class="uk-margin">
            <input class="uk-input"
                   type="text"
                   placeholder="Ведите ответ"
                   :value="value"
                   @input="$emit('input', $event.target.value)"
                   required
            >
        </div>
    `,
    props: ['value'],
    methods: {
    }
})
