/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather */ \"./src/weather.js\");\n\nconst W = _weather__WEBPACK_IMPORTED_MODULE_0__.default;\nconst citySubmit = document.querySelector('.city-search-btn');\nconst toggleSelector = document.querySelector('.switch input');\nconst cityNameInput = document.querySelector('.city-search-input');\nlet timeout = null;\ncityNameInput.addEventListener('keyup', () => {\n  clearTimeout(timeout);\n  timeout = setTimeout(() => {\n    citySubmit.click();\n  }, 1000);\n});\ncitySubmit.addEventListener('click', W.loadCityData);\ntoggleSelector.addEventListener('click', W.renderFromToggleScale);\nW.getLocation();\n\n//# sourceURL=webpack://weather-app-js/./src/app.js?");

/***/ }),

/***/ "./src/weather.js":
/*!************************!*\
  !*** ./src/weather.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst weather = () => {\n  const body = document.querySelector('body');\n  const cityName = document.querySelector('.city');\n  const currentTemp = document.querySelector('.current-temperature');\n  const scale = document.querySelectorAll('.scale');\n  const maxTemp = document.querySelector('.max-temp');\n  const minTemp = document.querySelector('.min-temp');\n  const humidity = document.querySelector('.humidity');\n  const windSpeed = document.querySelector('.wind-speed');\n  const weatherIcon = document.querySelector('.weather-icon');\n  const toggleInput = document.querySelector('.toggle-input');\n  let currentKWeather = 0;\n  let maxKTemp = 0;\n  let minKTemp = 0;\n\n  const renderError = () => {\n    const errorDisplay = document.createElement('div');\n    errorDisplay.className = 'error-display';\n    errorDisplay.textContent = 'ERROR: City was not found. Try again.';\n    body.appendChild(errorDisplay);\n  };\n\n  const kToCelsius = kTemp => (parseFloat(kTemp) - 273.15).toFixed(1);\n\n  const kToFarenheit = kTemp => (parseFloat(kTemp) * (9 / 5) - 459.67).toFixed(1);\n\n  const renderFromToggleScale = () => {\n    if (toggleInput.checked === true) {\n      currentTemp.textContent = kToCelsius(currentKWeather);\n      maxTemp.textContent = kToCelsius(maxKTemp);\n      minTemp.textContent = kToCelsius(minKTemp);\n      scale.forEach(el => {\n        el.textContent = ' °C';\n      });\n    } else {\n      currentTemp.textContent = kToFarenheit(currentKWeather);\n      maxTemp.textContent = kToFarenheit(maxKTemp);\n      minTemp.textContent = kToFarenheit(minKTemp);\n      scale.forEach(el => {\n        el.textContent = ' °F';\n      });\n    }\n  };\n\n  const renderWeather = object => {\n    if (document.querySelector('.error-display')) {\n      body.removeChild(document.querySelector('.error-display'));\n    }\n\n    cityName.textContent = `${object.name}, ${object.sys.country}`;\n    renderFromToggleScale();\n    humidity.textContent = object.main.humidity;\n    windSpeed.textContent = object.wind.speed;\n\n    if (object.weather[0].description === 'light rain') {\n      weatherIcon.textContent = 'f';\n    } else if (object.weather[0].description === 'scattered clouds') {\n      weatherIcon.textContent = '3';\n    } else if (object.weather[0].description === 'clear sky') {\n      weatherIcon.textContent = '1';\n    } else if (object.weather[0].description === 'few clouds') {\n      weatherIcon.textContent = 'a';\n    } else if (object.weather[0].description === 'moderate rain') {\n      weatherIcon.textContent = 'i';\n    } else if (object.weather[0].description === 'heavy intensity rain') {\n      weatherIcon.textContent = 'u';\n    } else {\n      weatherIcon.textContent = 'p';\n    }\n  };\n\n  const getWeather = (latVar, longVar) => {\n    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latVar}&lon=${longVar}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`, {\n      mode: 'cors'\n    }).then(result => result.json()).then(object => {\n      currentKWeather = object.main.temp;\n      maxKTemp = object.main.temp_max;\n      minKTemp = object.main.temp_min;\n      renderWeather(object);\n    });\n  };\n\n  const getLocation = () => {\n    function successFunction(position) {\n      const lat = position.coords.latitude;\n      const long = position.coords.longitude;\n      getWeather(lat, long);\n    }\n\n    if (navigator.geolocation) {\n      navigator.geolocation.getCurrentPosition(successFunction);\n    }\n  };\n\n  const loadCityData = () => {\n    const cityNameInput = document.querySelector('.city-search-input');\n    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`, {\n      mode: 'cors'\n    }).then(result => result.json()).then(object => renderWeather(object)).catch(error => renderError(error));\n  };\n\n  return {\n    renderError,\n    renderFromToggleScale,\n    renderWeather,\n    getWeather,\n    getLocation,\n    loadCityData\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weather());\n\n//# sourceURL=webpack://weather-app-js/./src/weather.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/app.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;