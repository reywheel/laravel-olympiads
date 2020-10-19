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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/tester/components/AppCheckboxAnswer.js":
/*!*************************************************************!*\
  !*** ./resources/js/tester/components/AppCheckboxAnswer.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (Vue.component('AppCheckboxAnswer', {
  template: "\n        <div class=\"uk-margin\">\n            <span>{{ title }}</span>\n            <input class=\"uk-checkbox\"\n                   type=\"checkbox\"\n                   :name=\"index\"\n                   :checked=\"isChecked\"\n                   :value=\"title\"\n                   @input=\"$emit('input', $event.target.value)\"\n            >\n        </div>\n    ",
  props: ['value', 'title', 'isChecked', 'index'],
  methods: {}
}));

/***/ }),

/***/ "./resources/js/tester/components/AppQuestion.js":
/*!*******************************************************!*\
  !*** ./resources/js/tester/components/AppQuestion.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppTextAnswer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppTextAnswer */ "./resources/js/tester/components/AppTextAnswer.js");
/* harmony import */ var _AppCheckboxAnswer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AppCheckboxAnswer */ "./resources/js/tester/components/AppCheckboxAnswer.js");


/* harmony default export */ __webpack_exports__["default"] = (Vue.component('AppQuestion', {
  template: "\n        <div class=\"uk-card uk-card-default uk-margin-bottom uk-padding-small\">\n            <div class=\"uk-flex uk-flex-between\">\n                <h1 class=\"uk-margin-medium-right\">{{ questionTitle }}</h1>\n                <p>{{ questionIndex + 1 }} \u0438\u0437 {{ allQuestions.length }}</p>\n            </div>\n            <div class=\"uk-margin\">\n                <template v-if=\"questionType === 'text'\">\n                    <AppTextAnswer v-for=\"(answer, index) in answers\"\n                                   :key=\"index\"\n                                   :title=\"answer.title\"\n                                   v-model=\"currentResult\"\n                    />\n                </template>\n                <template v-if=\"questionType === 'checkbox'\">\n                    <AppCheckboxAnswer v-for=\"(answer, index) in answers\"\n                                       :key=\"index\"\n                                       :index=\"index\"\n                                       :title=\"answer.title\"\n                                       :isChecked=\"isChecked(answer.title)\"\n                                       v-model=\"currentResult\"\n                    />\n                </template>\n            </div>\n        </div>\n    ",
  methods: {
    changeResultValue: function changeResultValue(value) {
      this.$store.commit('changeResultValue', value);
    },
    isChecked: function isChecked(value) {
      return this.$store.state.results[this.$store.state.currentQuestionIndex].values.includes(value);
    }
  },
  computed: {
    allQuestions: function allQuestions() {
      return this.$store.state.questions;
    },
    questionIndex: function questionIndex() {
      return this.$store.state.currentQuestionIndex;
    },
    questionTitle: function questionTitle() {
      return this.$store.state.questions[this.questionIndex].title;
    },
    questionType: function questionType() {
      return this.$store.state.questions[this.questionIndex].type;
    },
    answers: function answers() {
      return this.$store.state.questions[this.questionIndex].answers;
    },
    currentResult: {
      get: function get() {
        if (this.questionType === 'text') {
          return this.$store.state.results[this.questionIndex].values[0];
        } else {
          return this.$store.state.results[this.questionIndex].values;
        }
      },
      set: function set(value) {
        if (this.questionType === 'text') {
          this.$store.commit('changeResultValueText', value);
        } else {
          this.$store.commit('changeResultValueArray', value);
        }
      }
    }
  }
}));

/***/ }),

/***/ "./resources/js/tester/components/AppTextAnswer.js":
/*!*********************************************************!*\
  !*** ./resources/js/tester/components/AppTextAnswer.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (Vue.component('AppTextAnswer', {
  template: "\n        <div class=\"uk-margin\">\n            <input class=\"uk-input\"\n                   type=\"text\"\n                   placeholder=\"\u0412\u0435\u0434\u0438\u0442\u0435 \u043E\u0442\u0432\u0435\u0442\"\n                   :value=\"value\"\n                   @input=\"$emit('input', $event.target.value)\"\n                   required\n            >\n        </div>\n    ",
  props: ['value'],
  methods: {}
}));

/***/ }),

/***/ "./resources/js/tester/store.js":
/*!**************************************!*\
  !*** ./resources/js/tester/store.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var store = new Vuex.Store({
  state: _objectSpread(_objectSpread({}, state), {}, {
    currentQuestionIndex: 0,
    results: []
  }),
  mutations: {
    createAnswersArray: function createAnswersArray(state) {
      for (var i = 0; i < state.questions.length; i++) {
        Vue.set(state.results, i, {
          questionId: state.questions[i].id,
          values: [],
          isChecking: false
        });
      }
    },
    changeResultValueArray: function changeResultValueArray(state, value) {
      if (state.results[state.currentQuestionIndex].values.includes(value)) {
        var index = state.results[state.currentQuestionIndex].values.indexOf(value);
        state.results[state.currentQuestionIndex].values.splice(index, 1);
      } else {
        state.results[state.currentQuestionIndex].values.push(value);
      }
    },
    changeResultValueText: function changeResultValueText(state, value) {
      state.results[state.currentQuestionIndex].values[0] = value;
    },
    changeCurrentQuestionIndex: function changeCurrentQuestionIndex(state, value) {
      state.currentQuestionIndex = value;
    }
  },
  actions: {
    sendData: function sendData(store) {
      console.log(route);
      console.log(csrf);
      axios.post(route, {
        "_token": csrf,
        results: store.state.results
      }).then(function (response) {
        console.log(response); // window.location.assign(response.config.url);
      });
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ "./resources/js/tester/tester.js":
/*!***************************************!*\
  !*** ./resources/js/tester/tester.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./resources/js/tester/store.js");
/* harmony import */ var _components_AppQuestion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/AppQuestion */ "./resources/js/tester/components/AppQuestion.js");


window.addEventListener('DOMContentLoaded', function () {
  var vue = new Vue({
    el: '#testing',
    store: _store__WEBPACK_IMPORTED_MODULE_0__["default"],
    template: "\n            <div>\n                <AppQuestion />\n                <div class=\"uk-margin\">\n                    <button class=\"uk-button uk-button-primary\" @click=\"prevQuestion\" :disabled=\"isFirstQuestion\">\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u0432\u043E\u043F\u0440\u043E\u0441</button>\n                    <button class=\"uk-button uk-button-danger\" @click=\"sendData\">\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044C \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435</button>\n                    <button class=\"uk-button uk-button-primary\" @click=\"nextQuestion\" :disabled=\"isLastQuestion\">\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0432\u043E\u043F\u0440\u043E\u0441</button>\n                </div>\n            </div>\n\n        ",
    methods: {
      nextQuestion: function nextQuestion() {
        if (!this.isLastQuestion) this.$store.commit('changeCurrentQuestionIndex', this.currentQuestionIndex + 1);
      },
      prevQuestion: function prevQuestion() {
        if (!this.isFirstQuestion) this.$store.commit('changeCurrentQuestionIndex', this.currentQuestionIndex - 1);
      },
      sendData: function sendData() {
        this.$store.dispatch('sendData');
      }
    },
    computed: {
      isFirstQuestion: function isFirstQuestion() {
        return this.currentQuestionIndex === 0;
      },
      isLastQuestion: function isLastQuestion() {
        return this.currentQuestionIndex === this.$store.state.questions.length - 1;
      },
      currentQuestionIndex: function currentQuestionIndex() {
        return this.$store.state.currentQuestionIndex;
      }
    },
    beforeMount: function beforeMount() {
      this.$store.commit('createAnswersArray');
    }
  });
});

/***/ }),

/***/ 2:
/*!*********************************************!*\
  !*** multi ./resources/js/tester/tester.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Programs\OpenServer\OSPanel\domains\laravel-olimpiads\resources\js\tester\tester.js */"./resources/js/tester/tester.js");


/***/ })

/******/ });