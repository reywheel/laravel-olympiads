/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/Components/CheckboxQuestion.js":
/*!*****************************************************!*\
  !*** ./resources/js/Components/CheckboxQuestion.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var CheckboxQuestion = Vue.component('checkboxQuestion', {
  props: ['title', 'answers', 'questionIndex'],
  methods: {
    onTitleInput: function onTitleInput($event) {
      this.$emit('on-question-title-input', {
        value: $event.target.value,
        questionIndex: this.questionIndex
      });
    },
    onDeleteButtonClick: function onDeleteButtonClick() {
      this.$emit('on-delete-question-button-click', this.questionIndex);
    },
    onAddAnswerButtonClick: function onAddAnswerButtonClick() {
      this.$emit('on-add-answer-button-click', this.questionIndex);
    },
    onAnswerInput: function onAnswerInput($event, answerIndex) {
      this.$emit('on-radio-answer-input', {
        questionIndex: this.questionIndex,
        answerIndex: answerIndex,
        value: $event.target.value
      });
    },
    onAnswerDelete: function onAnswerDelete(answerIndex) {
      this.$emit('on-radio-answer-delete-button-click', {
        questionIndex: this.questionIndex,
        answerIndex: answerIndex
      });
    },
    onAnswerCheckboxClick: function onAnswerCheckboxClick($event, answerIndex) {
      this.$emit('on-checkbox-answer-checkbox-click', {
        questionIndex: this.questionIndex,
        answerIndex: answerIndex
      });
    }
  },
  template: "\n        <div class=\"uk-card uk-card-default uk-margin-bottom js-question-card\">\n            <div class=\"uk-padding-small\">\n                <span class=\"uk-margin-medium-right\">\u0412\u043E\u043F\u0440\u043E\u0441 \u2116 {{ questionIndex + 1}}</span>\n                <a href=\"#\" class=\"uk-text-danger\" uk-icon=\"icon: trash\" @click.prevent=\"onDeleteButtonClick\"></a>\n            </div>\n            <hr class=\"uk-margin-remove\">\n            <div class=\"uk-padding\">\n                <div>\n                <input class=\"uk-input uk-width-3-5\"\n                       type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u0432\u043E\u043F\u0440\u043E\u0441\u0430\"\n                       :name=\"'questions[' + questionIndex + '][title]'\"\n                       :value=\"title\"\n                       @input=\"onTitleInput\"\n                       required>\n                <input type=\"hidden\" :name=\"'questions[' + questionIndex + '][type]'\" value=\"checkbox\">\n                <button class=\"uk-button uk-button-primary uk-margin-large-right\"\n                        @click.prevent=\"onAddAnswerButtonClick\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430\n                </button>\n                </div>\n                <p v-show=\"!(answers.length == 0)\">\u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043E\u0442\u0432\u0435\u0442\u043E\u0432</p>\n                <template v-for=\"(answer, index) in answers\">\n                    <input class=\"uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right\"\n                           type=\"text\"\n                           :placeholder=\"'\u041E\u0442\u0432\u0435\u0442 ' + (index + 1)\"\n                           :name=\"'questions[' + questionIndex + '][answers][' + index + '][title]'\"\n                           :value=\"answer.title\"\n                           @input=\"onAnswerInput($event, index)\"\n                           required>\n                    <input v-if=\"answer.is_correct\" class=\"uk-checkbox\" type=\"checkbox\" :name=\"'questions[' + questionIndex + '][answers][' + index + '][is_correct]'\" value=\"true\" @click=\"onAnswerCheckboxClick($event, index)\" checked>\n                    <input v-else class=\"uk-checkbox\" type=\"checkbox\" :name=\"'questions[' + questionIndex + '][answers][' + index + '][is_correct]'\" value=\"true\" @click=\"onAnswerCheckboxClick($event, index)\">\n                    <a href=\"#\" class=\"uk-text-danger\" uk-icon=\"icon: trash\" @click.prevent=\"onAnswerDelete(index)\"></a>\n                </template>\n            </div>\n        </div>\n    "
});
/* harmony default export */ __webpack_exports__["default"] = (CheckboxQuestion);

/***/ }),

/***/ "./resources/js/Components/TextQuestion.js":
/*!*************************************************!*\
  !*** ./resources/js/Components/TextQuestion.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var TextQuestion = Vue.component('textQuestion', {
  props: ['title', 'answer', 'questionIndex'],
  methods: {
    onTitleInput: function onTitleInput($event) {
      this.$emit('on-question-title-input', {
        value: $event.target.value,
        questionIndex: this.questionIndex
      });
    },
    onAnswerInput: function onAnswerInput($event) {
      this.$emit('on-answer-text-input', {
        value: $event.target.value,
        questionIndex: this.questionIndex
      });
    },
    onDeleteButtonClick: function onDeleteButtonClick() {
      this.$emit('on-delete-question-button-click', this.questionIndex);
    }
  },
  template: "\n        <div class=\"uk-card uk-card-default uk-margin-bottom js-question-card\">\n            <div class=\"uk-padding-small\">\n                <span class=\"uk-margin-medium-right\">\u0412\u043E\u043F\u0440\u043E\u0441 \u2116 {{ questionIndex + 1}}</span>\n                <a href=\"#\" class=\"uk-text-danger\" uk-icon=\"icon: trash\" @click.prevent=\"onDeleteButtonClick\"></a>\n            </div>\n            <hr class=\"uk-margin-remove\">\n            <div class=\"uk-padding\">\n                <div class=\"uk-margin\">\n                <input class=\"uk-input uk-width-3-5 uk-margin-large-right\"\n                       type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u0432\u043E\u043F\u0440\u043E\u0441\u0430\"\n                       :name=\"'questions[' + questionIndex + '][title]'\"\n                       :value=\"title\"\n                       @input=\"onTitleInput\"\n                       required>\n                <input type=\"hidden\" :name=\"'questions[' + questionIndex + '][type]'\" value=\"text\">\n                </div>\n                <p>\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442</p>\n                <input type=\"text\" :name=\"'questions[' + questionIndex + '][answers][0][title]'\" class=\"uk-input\" :value=\"answer\" @input=\"onAnswerInput\" required>\n                <input type=\"hidden\" :name=\"'questions[' + questionIndex + '][answers][0][is_correct]'\" class=\"uk-input\" value=\"true\" @input=\"onAnswerInput\">\n            </div>\n\n        </div>\n    "
});
/* harmony default export */ __webpack_exports__["default"] = (TextQuestion);

/***/ }),

/***/ "./resources/js/questionCreater.js":
/*!*****************************************!*\
  !*** ./resources/js/questionCreater.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Components_TextQuestion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/TextQuestion */ "./resources/js/Components/TextQuestion.js");
/* harmony import */ var _Components_CheckboxQuestion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/CheckboxQuestion */ "./resources/js/Components/CheckboxQuestion.js");


window.addEventListener('DOMContentLoaded', function () {
  var app = new Vue({
    el: '#test-area',
    data: {
      title: '',
      isUnidirectional: false,
      questions: [],
      route: route,
      csrf: csrf
    },
    methods: {
      addQuestion: function addQuestion(type) {
        if (type === 'text') {
          this.questions.push({
            type: 'text',
            title: '',
            answer: ''
          });
        } else if (type === 'checkbox') {
          this.questions.push({
            type: 'checkbox',
            title: '',
            answers: []
          });
        }
      },
      deleteQuestion: function deleteQuestion($event) {
        this.questions.splice($event, 1);
      },
      changeQuestionTitle: function changeQuestionTitle($event) {
        Vue.set(this.questions[$event.questionIndex], 'title', $event.value);
      },
      changeTextAnswerText: function changeTextAnswerText($event) {
        Vue.set(this.questions[$event.questionIndex], 'answer', $event.value);
      },
      addRadioAnswer: function addRadioAnswer($event) {
        this.questions[$event].answers.push({
          'title': '',
          'is_correct': false
        });
      },
      changeRadioAnswerText: function changeRadioAnswerText($event) {
        Vue.set(this.questions[$event.questionIndex].answers[$event.answerIndex], 'title', $event.value);
      },
      deleteRadioAnswer: function deleteRadioAnswer($event) {
        this.questions[$event.questionIndex].answers.splice($event.answerIndex, 1);
      },
      changeCheckboxCorrectAnswer: function changeCheckboxCorrectAnswer($event) {
        this.questions[$event.questionIndex].answers[$event.answerIndex].is_correct = !this.questions[$event.questionIndex].answers[$event.answerIndex].is_correct;
      }
    },
    template: "\n            <div class=\"content uk-width-4-5 uk-padding\">\n\n                <form method=\"POST\" :action=\"route\" class=\"uk-margin-large-bottom\">\n\n                <input type=\"hidden\" name=\"_token\" :value=\"csrf\">\n\n                <div class=\"uk-card uk-card-default uk-padding uk-margin-bottom\">\n                    <legend class=\"uk-legend\">\u0421\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u0442\u0435\u0441\u0442\u0430</legend>\n                    <div class=\"uk-margin-top\">\n                        <div class=\"uk-width-3-5\">\n                            <input class=\"uk-input\" type=\"text\" placeholder=\"\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u0435\u0441\u0442\u0430\" name=\"title\" v-model=\"title\" required>\n                        </div>\n                        <div class=\"uk-margin\">\n                            <div class=\"uk-form-label\">\u041E\u0434\u043D\u043E\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439</div>\n                            <div class=\"uk-form-controls\">\n                                <label><input class=\"uk-radio uk-margin-small-right\" type=\"radio\" name=\"is_unidirectional\" value=\"true\" v-model=\"isUnidirectional\">\u0414\u0430</label>\n                                <br>\n                                <label><input class=\"uk-radio uk-margin-small-right\" type=\"radio\" name=\"is_unidirectional\" value=\"false\" v-model=\"isUnidirectional\" checked>\u041D\u0435\u0442</label>\n                            </div>\n                        </div>\n                        <button class=\"uk-button uk-button-primary js-add-text-question\"\n                                @click.prevent=\"addQuestion('text')\">\u0422\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0435 \u043F\u043E\u043B\u0435</button>\n                        <button class=\"uk-button uk-button-primary js-add-radio-question\"\n                                @click.prevent=\"addQuestion('checkbox')\">\u0412\u043E\u043F\u0440\u043E\u0441 \u0441 \u0432\u044B\u0431\u043E\u0440\u043E\u043C</button>\n                    </div>\n                </div>\n\n                <template v-for=\"(question, index) in questions\">\n                    <textQuestion v-if=\"question.type === 'text'\"\n                                  :title=\"question.title\"\n                                  :answer=\"question.answer\"\n                                  :questionIndex=\"index\"\n                                  @on-question-title-input=\"changeQuestionTitle($event)\"\n                                  @on-answer-text-input=\"changeTextAnswerText($event)\"\n                                  @on-delete-question-button-click=\"deleteQuestion($event)\">\n                    </textQuestion>\n                    <checkboxQuestion v-if=\"question.type === 'checkbox'\"\n                                  :title=\"question.title\"\n                                  :answers=\"question.answers\"\n                                  :questionIndex=\"index\"\n                                  @on-question-title-input=\"changeQuestionTitle($event)\"\n                                  @on-delete-question-button-click=\"deleteQuestion($event)\"\n                                  @on-add-answer-button-click=\"addRadioAnswer($event)\"\n                                  @on-radio-answer-input=\"changeRadioAnswerText($event)\"\n                                  @on-radio-answer-delete-button-click=\"deleteRadioAnswer($event)\"\n                                  @on-checkbox-answer-checkbox-click=\"changeCheckboxCorrectAnswer($event)\">\n\n                    </checkboxQuestion>\n                </template>\n\n                <button type=\"submit\" class=\"uk-button uk-button-primary\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C</button>\n\n                </form>\n\n            </div>\n        "
  });
});

/***/ }),

/***/ 1:
/*!***********************************************!*\
  !*** multi ./resources/js/questionCreater.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Programs\OpenServer\OSPanel\domains\laravel-olimpiads\resources\js\questionCreater.js */"./resources/js/questionCreater.js");


/***/ })

/******/ });