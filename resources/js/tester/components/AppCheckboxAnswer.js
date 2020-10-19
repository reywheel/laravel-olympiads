export default Vue.component('AppCheckboxAnswer', {
    template: `
        <div class="uk-margin">
            <span>{{ title }}</span>
            <input class="uk-checkbox"
                   type="checkbox"
                   :name="index"
                   :checked="isChecked"
                   :value="title"
                   @input="$emit('input', $event.target.value)"
            >
        </div>
    `,
    props: ['value', 'title', 'isChecked', 'index'],
    methods: {
    }
})
