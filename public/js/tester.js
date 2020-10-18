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

/***/ "./resources/js/tester/components/AppQuestion.js":
/*!*******************************************************!*\
  !*** ./resources/js/tester/components/AppQuestion.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AppTextAnswer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AppTextAnswer */ "./resources/js/tester/components/AppTextAnswer.js");

/* harmony default export */ __webpack_exports__["default"] = (Vue.component('AppQuestion', {
  template: "\n        <div class=\"uk-card uk-card-default uk-margin-bottom uk-padding-small\">\n            <h1 class=\"uk-margin-medium-right\">{{ questionTitle }}</h1>\n            <div class=\"uk-margin\">\n                <template v-if=\"questionType === 'text'\">\n                    <AppTextAnswer v-for=\"(answer, index) in answers\"\n                                   :key=\"index\"\n                                   :index=\"index\"\n                                   :value=\"results[index].value\"\n                                   @input=\"changeResultValue\"\n                    />\n                </template>\n            </div>\n        </div>\n    ",
  methods: {
    changeResultValue: function changeResultValue(obj) {
      this.$store.commit('changeResultValue', obj);
    }
  },
  computed: {
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
    results: function results() {
      return this.$store.state.results;
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
  template: "\n        <div class=\"uk-margin\">\n            <input class=\"uk-input\"\n                   type=\"text\"\n                   placeholder=\"\u0412\u0435\u0434\u0438\u0442\u0435 \u043E\u0442\u0432\u0435\u0442\"\n                   :value=\"value\"\n                   @input=\"onInput\"\n                   required\n            >\n        </div>\n    ",
  props: {
    value: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    onInput: function onInput($event) {
      this.$emit('input', {
        value: $event.target.value,
        index: this.index
      });
    }
  }
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
      console.log(state.questions.length);

      for (var i = 0; i < state.questions.length; i++) {
        Vue.set(state.results, i, {
          value: '',
          isChecking: false
        });
      }
    },
    changeResultValue: function changeResultValue(state, data) {
      state.results[data.index].value = data.value;
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
    template: "\n            <AppQuestion />\n        ",
    beforeMount: function beforeMount() {
      this.$store.commit('createAnswersArray');
      console.log(this.$store.state);
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