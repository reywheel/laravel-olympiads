import axios from 'axios'

class baseQuestion {
    constructor(text = '') {
        this.type = 'baseQuestion'
        this.title = text
    }
}

class textQuestion extends baseQuestion {
    constructor(props, exact = false) {
        super(props)
        this.type = 'text'
        this.answer = ''
        this.exact = exact
    }
}

class checkboxQuestion extends baseQuestion {
    constructor(props) {
        super(props)
        this.type = 'checkbox'
        this.answers = [
            new checkboxAnswer('', true),
            new checkboxAnswer(),
            new checkboxAnswer(),
        ]
    }
}

class radioQuestion extends baseQuestion {
    constructor(props) {
        super(props)
        this.type = 'radio'
        this.answers = [
            new radioAnswer(),
            new radioAnswer(),
            new radioAnswer(),
        ]
        this.correctAnswerIndex = 0
    }
}

class baseAnswer {
    constructor(text = '') {
        this.title = text
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

    updateTestStart: '[testCreator] updateTestStart',
    updateTestSuccess: '[testCreator] updateTestSuccess',
    updateTestFailure: '[testCreator] updateTestFailure',
}

export const actionTypes = {
    createTest: '[testCreator] createTest',
    updateTest: '[testCreator] updateTest',
}

export default {
    state: {
        test: {
            title: '',
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
        },

        [mutationTypes.updateTestStart](state) {
            state.isSubmitting = true
            state.errors = null
        },
        [mutationTypes.updateTestSuccess](state) {
            state.isSubmitting = false
        },
        [mutationTypes.updateTestFailure](state, errors) {
            state.isSubmitting = false
            state.errors = errors
        }
    },
    actions: {
        [actionTypes.createTest](context, {test, url}) {
            context.commit(mutationTypes.createTestStart)
            return new Promise(resolve => {
                axios.post(url, test)
                    .then(response => {
                        context.commit(mutationTypes.createTestSuccess)
                        resolve(response)
                    })
                    .catch(errors => {
                        context.commit(mutationTypes.createTestFailure)
                        console.log(errors)
                    })
            })
        },
        [actionTypes.updateTest](context, {test, url}) {
            context.commit(mutationTypes.updateTestStart)
            return new Promise(resolve => {
                axios.put(url, test)
                    .then(response => {
                        context.commit(mutationTypes.updateTestSuccess)
                        resolve(response)
                    })
                    .catch(errors => {
                        context.commit(mutationTypes.updateTestFailure)
                        console.log(errors)
                    })
            })
        }
    }
}
