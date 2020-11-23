class textQuestion {
    constructor(text = '', exact = false) {
        this.type = 'text'
        this.text = text
        this.exact = exact
    }
}

class checkboxQuestion {
    constructor(text = '') {
        this.type = 'checkbox'
        this.text = 'text'
        this.answers = []
    }
}

class answer {
    constructor(text = '', isCorrect = false) {
        this.text = text
        this.isCorrect = isCorrect
    }
}

export const mutationTypes = {
    addQuestion: '[testCreator] addQuestion',
    deleteQuestion: '[testCreator] deleteQuestion',
    addAnswer: '[testCreator] addAnswer',
    deleteAnswer: '[testCreator] deleteAnswer',
}

export default {
    state: {
        test: {
            title: 'title',
            questions: []
        },
        isSubmitting: false
    },
    getters: {},
    mutations: {
        [mutationTypes.addQuestion](state, type) {
            let question = {};
            switch (type) {
                case 'text': question = new textQuestion(); break;
                case 'checkbox': question = new checkboxQuestion(); break;
            }
            state.test.questions.push(question)
        },
        [mutationTypes.deleteQuestion](state, questionIndex) {
            state.test.questions.splice(questionIndex, 1)
        },
        [mutationTypes.addAnswer](state, questionIndex) {
            state.test.questions[questionIndex].answers.push(new answer())
        },
        [mutationTypes.deleteAnswer](state, {questionIndex, answerIndex}) {
            state.test.questions[questionIndex].answers.splice(answerIndex, 1)
        }
    },
    actions: {}
}
