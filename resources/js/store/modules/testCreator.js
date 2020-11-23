import axios from 'axios'

class baseQuestion {
    constructor(text = '') {
        this.type = 'baseQuestion'
        this.text = text
    }
}

class textQuestion extends baseQuestion {
    constructor(props, exact = false) {
        super(props)
        this.type = 'text'
        this.exact = exact
    }
}

class checkboxQuestion extends baseQuestion {
    constructor(props) {
        super(props)
        this.type = 'checkbox'
        this.answers = []
    }
}

class radioQuestion extends baseQuestion {
    constructor(props) {
        super(props)
        this.type = 'radio'
        this.answers = []
        this.correctAnswerIndex = 0
    }
}

class baseAnswer {
    constructor(text = '') {
        this.text = text
    }
}

class checkboxAnswer extends baseAnswer {
    constructor(props, isCorrect = false) {
        super(props);
        this.isCorrect = isCorrect
    }
}

class radioAnswer extends baseAnswer {
    constructor(props) {
        super(props);
    }
}

export const mutationTypes = {
    addQuestion: '[testCreator] addQuestion',
    deleteQuestion: '[testCreator] deleteQuestion',
    addAnswer: '[testCreator] addAnswer',
    deleteAnswer: '[testCreator] deleteAnswer',

    createTestStart: '[testCreator] createTestStart',
    createTestSuccess: '[testCreator] createTestSuccess',
    createTestFailure: '[testCreator] createTestFailure',
}

export const actionTypes = {
    createTest: '[testCreator] createTest'
}

export default {
    state: {
        test: {
            title: 'title',
            is_unidirectional: false,
            start_time: null,
            finish_time: null,
            questions: []
        },
        isSubmitting: false,
        errors: null
    },
    getters: {},
    mutations: {
        [mutationTypes.addQuestion](state, type) {
            let question = {};
            switch (type) {
                case 'text': question = new textQuestion(); break;
                case 'checkbox': question = new checkboxQuestion(); break;
                case 'radio': question = new radioQuestion(); break;
            }
            state.test.questions.push(question)
        },
        [mutationTypes.deleteQuestion](state, questionIndex) {
            state.test.questions.splice(questionIndex, 1)
        },
        [mutationTypes.addAnswer](state, {type, questionIndex}) {
            switch (type) {
                case 'checkbox': state.test.questions[questionIndex].answers.push(new checkboxAnswer()); break;
                case 'radio': state.test.questions[questionIndex].answers.push(new radioAnswer()); break;
            }
        },
        [mutationTypes.deleteAnswer](state, {questionIndex, answerIndex}) {
            state.test.questions[questionIndex].answers.splice(answerIndex, 1)
        },

        [mutationTypes.createTestStart](state) {
            state.isSubmitting = true
            state.errors = null
        },
        [mutationTypes.createTestSuccess](state) {
            state.isSubmitting = false
        },
        [mutationTypes.createTestFailure](state, errors) {
            state.isSubmitting = false
            state.errors = errors
        }
    },
    actions: {
        [actionTypes.createTest](context, {url}) {
            context.commit(mutationTypes.createTestStart)
            return new Promise(resolve => {
                axios.post(url, context.state.test)
                    .then(response => {
                        context.commit(mutationTypes.createTestSuccess)
                        resolve()
                    })
                    .catch(errors => {
                        context.commit(mutationTypes.createTestFailure)
                        console.log(errors)
                    })
            })
        }
    }
}
