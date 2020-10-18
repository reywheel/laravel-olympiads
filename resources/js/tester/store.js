const store = new Vuex.Store({
    state: {
        ...state,
        currentQuestionIndex: 0,
        results: []
    },
    mutations: {
        createAnswersArray(state) {
                console.log(state.questions.length)
            for (let i = 0; i < state.questions.length; i++) {
                Vue.set(state.results, i, { value: '', isChecking: false })
            }
        },
        changeResultValue(state, data) {
            state.results[data.index].value = data.value;
        }
    }
})

export default store;
