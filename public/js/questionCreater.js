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

/***/ "./resources/js/modules/questionCreator.js":
/*!*************************************************!*\
  !*** ./resources/js/modules/questionCreator.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var QuestionCreator = /*#__PURE__*/function () {
  function QuestionCreator() {
    _classCallCheck(this, QuestionCreator);

    _defineProperty(this, "questionTemplates", {
      radio: "\n            <div class=\"uk-card uk-card-default uk-padding uk-margin-bottom js-question-card\">\n                <div class=\"uk-flex\">\n                    <p class=\"uk-margin-right\">\u0412\u043E\u043F\u0440\u043E\u0441 <span class=\"js-question-number\">0</span> | <span class=\"uk-text-muted\">\u0435\u0434\u0438\u043D\u0438\u0447\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440</span></p>\n                    <a href=\"#\" class=\"js-delete-question uk-icon-link uk-text-danger\" uk-icon=\"trash\"></a>\n                </div>\n                <div class=\"uk-margin\">\n                    <input class=\"uk-input uk-width-3-5\" type=\"text\" placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u0432\u043E\u043F\u0440\u043E\u0441\u0430\"\n                           name=\"question[0][title]\">\n                    <input type=\"hidden\" name=\"question[0][type]\" value=\"radio\">\n                    <button class=\"uk-button uk-button-primary\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430</button>\n                </div>\n                <p>\u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043E\u0442\u0432\u0435\u0442\u043E\u0432</p>\n                <input class=\"uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right\" type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0430\" name=\"question[0][answer][0][title]\">\n                <input class=\"uk-checkbox\" type=\"checkbox\" name=\"question[0][answer][0][is_true]\">\n                <input class=\"uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right\" type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0430\" name=\"question[0][answer][1][title]\">\n                <input class=\"uk-checkbox\" type=\"checkbox\" name=\"question[0][answer][1][is_true]\">\n                <input class=\"uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right\" type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0430\" name=\"question[0][answer][2][title]\">\n                <input class=\"uk-checkbox\" type=\"checkbox\" name=\"question[0][answer][2][is_true]\">\n                <input class=\"uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right\" type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0430\" name=\"question[0][answer][3][title]\">\n                <input class=\"uk-checkbox\" type=\"checkbox\" name=\"question[0][answer][3][is_true]\">\n            </div>\n        ",
      text: "\n            <div class=\"uk-card uk-card-default uk-padding uk-margin-bottom js-question-card\">\n                <div class=\"uk-flex\">\n                    <p class=\"uk-margin-right\">\u0412\u043E\u043F\u0440\u043E\u0441 <span class=\"js-question-number\">0</span> | <span class=\"uk-text-muted\">\u0442\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0435 \u043F\u043E\u043B\u0435</span></p>\n                    <a href=\"#\" class=\"js-delete-question uk-icon-link uk-text-danger\" uk-icon=\"trash\"></a>\n                </div>\n                <div class=\"uk-margin\">\n                    <input class=\"uk-input uk-width-3-5\" type=\"text\" placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u0432\u043E\u043F\u0440\u043E\u0441\u0430\"\n                           name=\"question[0][title]\">\n                    <input type=\"hidden\" name=\"question[0][type]\" value=\"radio\">\n                    <button class=\"uk-button uk-button-primary\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u043E\u0442\u0432\u0435\u0442\u0430</button>\n                </div>\n                <p>\u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043E\u0442\u0432\u0435\u0442\u043E\u0432</p>\n                <input class=\"uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right\" type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0430\" name=\"question[0][answer][0][title]\">\n                <input class=\"uk-checkbox\" type=\"checkbox\" name=\"question[0][answer][0][is_true]\">\n                <input class=\"uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right\" type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0430\" name=\"question[0][answer][1][title]\">\n                <input class=\"uk-checkbox\" type=\"checkbox\" name=\"question[0][answer][1][is_true]\">\n                <input class=\"uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right\" type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0430\" name=\"question[0][answer][2][title]\">\n                <input class=\"uk-checkbox\" type=\"checkbox\" name=\"question[0][answer][2][is_true]\">\n                <input class=\"uk-input uk-width-3-5 uk-margin uk-margin-remove-top uk-margin-right\" type=\"text\"\n                       placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u043E\u0442\u0432\u0435\u0442\u0430\" name=\"question[0][answer][3][title]\">\n                <input class=\"uk-checkbox\" type=\"checkbox\" name=\"question[0][answer][3][is_true]\">\n            </div>\n        "
    });

    this.createTextQuestionTriggerSelector = '.js-add-text-question';
    this.createRadioQuestionTriggerSelector = '.js-add-radio-question';
    this.questionAreaSelector = '.js-question-area';
    this.createTextQuestionButton = document.querySelector(this.createTextQuestionTriggerSelector);
    this.createRadioQuestionButton = document.querySelector(this.createRadioQuestionTriggerSelector);
    this.questionArea = document.querySelector(this.questionAreaSelector);
  }

  _createClass(QuestionCreator, [{
    key: "bindCreateButtons",
    value: function bindCreateButtons() {
      var _this = this;

      this.createRadioQuestionButton.addEventListener('click', function (e) {
        e.preventDefault();

        _this.questionCreator('radio');
      });
      this.createTextQuestionButton.addEventListener('click', function (e) {
        e.preventDefault();

        _this.questionCreator('text');
      });
    }
  }, {
    key: "questionCreator",
    value: function questionCreator(type) {
      this.questionArea.innerHTML = this.questionTemplates[type];
    }
  }, {
    key: "init",
    value: function init() {
      this.bindCreateButtons();
    }
  }]);

  return QuestionCreator;
}();

/* harmony default export */ __webpack_exports__["default"] = (QuestionCreator);

/***/ }),

/***/ "./resources/js/questionCreater.js":
/*!*****************************************!*\
  !*** ./resources/js/questionCreater.js ***!
  \*****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_questionCreator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/questionCreator */ "./resources/js/modules/questionCreator.js");

window.addEventListener('DOMContentLoaded', function () {
  var creator = new _modules_questionCreator__WEBPACK_IMPORTED_MODULE_0__["default"]();
  creator.init();
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