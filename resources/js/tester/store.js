const store = new Vuex.Store({
    state: {
        ...state,
        currentQuestionIndex: 0,
        results: []
    },
    mutations: {
        createAnswersArray(state) {
            for (let i = 0; i < state.questions.length; i++) {
                Vue.set(state.results, i, {
                    questionId: state.questions[i].id,
                    values: [],
                    isChecking: false
                })
            }
        },
        changeResultValueArray(state, value) {
            if (state.results[state.currentQuestionIndex].values.includes(value)) {
                let index = state.results[state.currentQuestionIndex].values.indexOf(value);
                state.results[state.currentQuestionIndex].values.splice(index, 1);
            } else {
                state.results[state.currentQuestionIndex].values.push(value);
            }
        },
        changeResultValueText(state, value) {
            state.results[state.currentQuestionIndex].values[0] = value;
        },
        changeCurrentQuestionIndex(state, value) {
            state.currentQuestionIndex = value;
        }
    },
    actions: {
        sendData(store) {
            console.log(route)
            console.log(csrf)

            axios.post(route, {
                "_token": csrf,
                results: store.state.results
            }).then((response) => {
                console.log(response)
                window.location.assign(response.config.url);
            })
        }
    }
})

export default store;
