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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_assets_img_favicon_ico__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_assets_img_favicon_ico___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_assets_img_favicon_ico__);


const localUrl = 'http://localhost:5000/codeshoptimer/us-central1/sendNotification';
const prodUrl = 'https://us-central1-codeshoptimer.cloudfunctions.net/sendNotification';
const worker = self;
let intervalId = 0;
let timerValue = 0;
let timerEndTime = 0;
let notification;
let notificationToken;

const doubleDigitChecker = value => (value.length === 1 ? `0${value}` : value);
const calculateSeconds = milliseconds =>
  doubleDigitChecker(`${(milliseconds / 100) % 60}`.split('.')[0]);
const calculateMinutes = milliseconds => doubleDigitChecker(`${milliseconds / 6000}`.split('.')[0]);
const notificationBroadcastChannel = new BroadcastChannel('timerNotification');
const timerValueBroadcastChannel = new BroadcastChannel('timerValue');
const restartBroadcastChannel = new BroadcastChannel('timerRestart');

function startTimer(timerAmount, notificationAllowed, fullAmount) {
  timerValue = timerAmount;

  if (notification) {
    notification.close();
  }

  return setInterval(() => {
    if (timerValue < 2) {
      timerValue = 0;
      timerEndTime = Date.now();

      if (Notification.permission === 'granted' && notificationAllowed && notificationToken) {
        makeRequestForPushNotification(timerAmount);
      }

      postMessage({
        timerValue,
        percentageForDisplay: timerValue / fullAmount * 100,
        fullTimerDisplay: makeFullTimerDisplay(timerValue),
        timerEndTime,
      });
      clearInterval(intervalId);
    } else {
      timerValue -= 1;

      postMessage({
        timerValue,
        percentageForDisplay: timerValue / fullAmount * 100,
        fullTimerDisplay: makeFullTimerDisplay(timerValue),
      });
    }
  }, 10);
}

function makeRequestForPushNotification(timerAmount) {
  notificationBroadcastChannel.postMessage(timerAmount);
  const myHeaders = new Headers();

  myHeaders.append('Content-Type', 'application/json');

  fetch(prodUrl, {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      timerAmount,
      notificationToken,
    }),
  }).catch(response => console.log(JSON.stringify(response)));
}

timerValueBroadcastChannel.onmessage = () => {
  notificationBroadcastChannel.postMessage(timerValue);
};

restartBroadcastChannel.onmessage = () => {
  clearInterval(intervalId);

  intervalId = startTimer(timerValue, true, timerValue);
};

self.addEventListener('timerstart', (event) => {
  const { timerAmount, notificationAllowed, fullAmount } = event.detail;
  clearInterval(intervalId);

  intervalId = startTimer(timerAmount, notificationAllowed, fullAmount);
});

self.onmessage = (event) => {
  const { data } = event;

  if (data.startTimer) {
    dispatchEvent(new CustomEvent('timerstart', {
      detail: {
        timerAmount: event.data.timerAmount,
        fullAmount: event.data.fullAmount,
        notificationAllowed: event.data.notificationAllowed,
      },
    }));
  } else if (data.resetTimer) {
    timerValue = event.data.timerAmount;

    postMessage({
      timerValue,
      fullTimerDisplay: makeFullTimerDisplay(timerValue),
      percentageForDisplay: 100,
    });
    clearInterval(intervalId);
  } else if (data.setNotificationToken) {
    notificationToken = data.notificationToken;
  } else if (data.checkTimerValue) {
    postMessage({
      timerValue,
      fullTimerDisplay: makeFullTimerDisplay(timerValue),
      timerEndTime,
      percentageForDisplay: timerValue / event.data.timerAmount * 100,
    });
  } else {
    clearInterval(intervalId);
  }
};

function makeFullTimerDisplay(timerValue) {
  return `${calculateMinutes(timerValue)}:${calculateSeconds(timerValue)}:${doubleDigitChecker(`${timerValue % 100}`)}`;
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAMMOAADDDgAAAAAAAAAAAAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7u7u/83Nzf+1tbX/qqqq/6qqqv+2trb/zc3N/+/v7//////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7/2tra/4qKiv9HR0f/JCQk/wwMDP8BAQH/AQEB/w0NDf8kJCT/SEhI/4uLi//b29v/////////////////////////////////////////////////////////////////////////////////////////////////7e3t/5KSkv8oKCj/BAQE/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/BAQE/yoqKv+UlJT/7u7u/////////////////////////////////////////////////////////////////////////////////+Pj4/9gYGD/CQkJ/wAAAP8BAQH/HBwc/1NTU/+EhIT/m5ub/5ubm/+EhIT/U1NT/xwcHP8BAQH/AAAA/woKCv9iYmL/5OTk///////////////////////////////////////////////////////////////////////j4+P/U1NT/wAAAP8AAAD/HBwc/3d3d//V1dX/9PT0//7+/v////////////7+/v/09PT/1dXV/3Z2dv8bGxv/AAAA/wEBAf9VVVX/5OTk////////////////////////////////////////////////////////////9fX1/2xsbP8DAwP/AAAA/y8vL/+2trb/+/v7////////////////////////////////////////////+/v7/7W1tf8vLy//AAAA/wQEBP9vb2//9vb2//////////////////////////////////////////////////////+oqKj/DQ0N/wAAAP8tLS3/xcXF/////////////////////////////////////////////////////////////////8XFxf8sLCz/AAAA/w4ODv+qqqr/////////////////////////////////////////////////6enp/0ZGRv8AAAD/Dg4O/6qqqv///////////////////////////////////////////////////////////////////////////6ioqP8ODg7/AAAA/0hISP/q6ur///////////////////////////////////////////+wsLD/DQ0N/wAAAP9cXFz/9fX1////////////////////////////////////////////////////////////////////////////9PT0/1paWv8AAAD/Dg4O/7Kysv//////////////////////////////////////+/v7/3Z2dv8AAAD/DAwM/66urv//////////////////////////////////////////////////////////////////////////////////////ra2t/wsLC/8AAAD/eHh4//v7+//////////////////////////////////w8PD/RUVF/wAAAP8xMTH/2tra///////////////////////////////////////////////////////////////////////////////////////a2tr/MDAw/wAAAP9GRkb/8fHx/////////////////////////////////+rq6v8nJyf/AAAA/0lJSf/y8vL/////////////////////////////////xcXF/1dXV/9XV1f/xcXF//////////////////////////////////Hx8f9ISEj/AAAA/ygoKP/r6+v/////////////////////////////////6Ojo/xsbG/8AAAD/VFRU//z8/P////////////////////////////////+kpKT/AAAA/wAAAP+kpKT//////////////////////////////////Pz8/1NTU/8AAAD/HR0d/+jo6P/////////////////////////////////p6en/ISEh/wAAAP9OTk7/9/f3/////////////////////////////////6ampv8AAAD/AAAA/6ampv/////////////////////////////////29vb/Tk5O/wAAAP8nJyf/6urq/////////////////////////////////+7u7v85OTn/AAAA/zs7O//k5OT/////////////////////////////////pqam/wAAAP8AAAD/pqam/////////////////////////////////+Pj4/86Ojr/AAAA/z4+Pv/v7+//////////////////////////////////9/f3/2JiYv8AAAD/GBgY/8DAwP////////////////////////////////+mpqb/AAAA/wAAAP+mpqb/////////////////////////////////v7+//xcXF/8AAAD/aWlp//j4+P//////////////////////////////////////nZ2d/wQEBP8AAAD/fHx8//z8/P///////////////////////////6ampv8AAAD/AAAA/6ampv////////////////////////////z8/P96enr/AAAA/wUFBf+ioqL////////////////////////////////////////////X19f/Li4u/wAAAP8iIiL/z8/P////////////////////////////pqam/wAAAP8AAAD/pqam////////////////////////////zs7O/yEhIf8AAAD/MzMz/9zc3P////////////////////////////////////////////7+/v+Dg4P/AwMD/wAAAP9SUlL/5ubm//////////////////////+mpqb/AAAA/wAAAP+mpqb//////////////////////+bm5v9RUVH/AAAA/wUFBf+Li4v//////////////////////////////////////////////////////+Pj4/9AQED/AAAA/wUFBf9hYWH/5OTk/////////////////+Dg4P+mpqb/pqam/+Dg4P/////////////////j4+P/X19f/wUFBf8AAAD/RUVF/+jo6P///////////////////////////////////////////////////////////8PDw/8qKir/AAAA/wICAv9GRkb/tbW1//X19f/////////////////////////////////19fX/tLS0/0VFRf8CAgL/AAAA/wAAAP9QUFD/5eXl/////////////////////////////////////////////////////////////////7q6uv8sLCz/AAAA/wAAAP8VFRX/VlZW/5WVlf/Gxsb/3Nzc/9zc3P/Gxsb/lZWV/1VVVf8VFRX/AAAA/wAAAP8JCQn/AAAA/wICAv9iYmL/6+vr/////////////////////////////////////////////////////////////////8zMzP9VVVX/CQkJ/wAAAP8AAAD/BgYG/xEREf8WFhb/FRUV/xEREf8GBgb/AAAA/wAAAP8LCwv/Xl5e/6CgoP8xMTH/AAAA/01NTf/k5OT//////////////////////////////////////////////////////////////////////+zs7P+hoaH/SEhI/xMTE/8GBgb/AAAA/wAAAP8AAAD/AAAA/wcHB/8UFBT/Tk5O/6enp//w8PD//////76+vv9ubm7/09PT///////////////////////////////////////////////////////////////////////////////////////w8PD/yMjI/5SUlP9wcHD/X19f/2NjY/92dnb/mpqa/8/Pz//y8vL///////////////////////j4+P////////////////////////////////////////////////////////////////////////////////////////////7+/v/r6+v/6enp/+np6f/p6en/6enp/+np6f/p6en/6+vr//7+/v//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6enp/y4uLv8XFxf/GBgY/xgYGP8YGBj/GBgY/xcXF/8uLi7/6enp///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////m5ub/ERER/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/xEREf/m5ub//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7/9paWn/WVlZ/1lZWf9ZWVn/WVlZ/1lZWf9ZWVn/aWlp/+/v7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="

/***/ })
/******/ ]);
//# sourceMappingURL=6a9fa222e765a5b93d17.worker.js.map