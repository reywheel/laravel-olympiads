class QuestionCreator {
    constructor() {
        this.createTextQuestionTriggerSelector = '.js-add-text-question';
        this.createRadioQuestionTriggerSelector = '.js-add-radio-question';
        this.questionAreaSelector = '.js-question-area';

        this.createTextQuestionButton = document.querySelector(this.createTextQuestionTriggerSelector);
        this.createRadioQuestionButton = document.querySelector(this.createRadioQuestionTriggerSelector);
        this.questionArea = document.querySelector(this.questionAreaSelector);
    }

    questionTemplates = {
        radio: `
            <div class="uk-card uk-card-default uk-padding uk-margin-bottom js-question-card">
                <div class="uk-flex">
                    <p class="uk-margin-right">Вопрос <span class="js-question-number">0</span> | <span class="uk-text-muted">единичный выбор</span></p>
                    <a href="#" class="js-delete-question uk-icon-link uk-text-danger" uk-icon="trash"></a>
                </div>
                <div class="uk-margin">
                    <input class="uk-input uk-width-3-5" type="text" placeholder="Текст вопроса"
                           name="question[0][title]">
                    <input type="hidden" name="question[0][type]" value="radio">
                    <button class="uk-button uk-button-primary">Добавить вариант ответа</button>
                </div>
                <p>Варианты ответов</p>
                <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text"
                       placeholder="Текст ответа" name="question[0][answer][0][title]">
                <input class="uk-checkbox" type="checkbox" name="question[0][answer][0][is_true]">
                <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text"
                       placeholder="Текст ответа" name="question[0][answer][1][title]">
                <input class="uk-checkbox" type="checkbox" name="question[0][answer][1][is_true]">
                <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text"
                       placeholder="Текст ответа" name="question[0][answer][2][title]">
                <input class="uk-checkbox" type="checkbox" name="question[0][answer][2][is_true]">
                <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text"
                       placeholder="Текст ответа" name="question[0][answer][3][title]">
                <input class="uk-checkbox" type="checkbox" name="question[0][answer][3][is_true]">
            </div>
        `,
        text: `
            <div class="uk-card uk-card-default uk-padding uk-margin-bottom js-question-card">
                <div class="uk-flex">
                    <p class="uk-margin-right">Вопрос <span class="js-question-number">0</span> | <span class="uk-text-muted">текстовое поле</span></p>
                    <a href="#" class="js-delete-question uk-icon-link uk-text-danger" uk-icon="trash"></a>
                </div>
                <div class="uk-margin">
                    <input class="uk-input uk-width-3-5" type="text" placeholder="Текст вопроса"
                           name="question[0][title]">
                    <input type="hidden" name="question[0][type]" value="radio">
                    <button class="uk-button uk-button-primary">Добавить вариант ответа</button>
                </div>
                <p>Варианты ответов</p>
                <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text"
                       placeholder="Текст ответа" name="question[0][answer][0][title]">
                <input class="uk-checkbox" type="checkbox" name="question[0][answer][0][is_true]">
                <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text"
                       placeholder="Текст ответа" name="question[0][answer][1][title]">
                <input class="uk-checkbox" type="checkbox" name="question[0][answer][1][is_true]">
                <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text"
                       placeholder="Текст ответа" name="question[0][answer][2][title]">
                <input class="uk-checkbox" type="checkbox" name="question[0][answer][2][is_true]">
                <input class="uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right" type="text"
                       placeholder="Текст ответа" name="question[0][answer][3][title]">
                <input class="uk-checkbox" type="checkbox" name="question[0][answer][3][is_true]">
            </div>
        `
    }

    bindCreateButtons() {
        this.createRadioQuestionButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.questionCreator('radio');
        })

        this.createTextQuestionButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.questionCreator('text');
        })
    }

    questionCreator(type) {
        this.questionArea.innerHTML = this.questionTemplates.[type];
    }

    init() {
        this.bindCreateButtons();
    }

}

export default QuestionCreator;
