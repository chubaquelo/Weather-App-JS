/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
eval("const body = document.querySelector('body');\r\nconst weatherLeft = document.querySelector(\".weather-left\");\r\nconst weatherRigth = document.querySelector('.weather-rigth');\r\nconst cityName = document.querySelector('.city');\r\nconst currentTemp = document.querySelector('.current-temperature');\r\nconst scale = document.querySelectorAll('.scale');\r\nconst maxTemp = document.querySelector('.max-temp');\r\nconst minTemp = document.querySelector('.min-temp');\r\nconst windSpeed = document.querySelector('.wind-speed');\r\nconst cityNameInput = document.querySelector('.city-search-input');\r\nconst citySubmit = document.querySelector('.city-search-btn');\r\n\r\nconst renderWeather = (object) => {\r\n  cityName.textContent = object.name + \", \" + object.sys.country;\r\n  currentTemp.textContent = object.main.temp;\r\n  scale.forEach(el => el.textContent = \" °F\");\r\n  maxTemp.textContent = object.main.temp_max;\r\n  minTemp.textContent = object.main.temp_min;\r\n};\r\n\r\nconst getWeather = (latVar, longVar) => {\r\n  fetch(\r\n    `https://api.openweathermap.org/data/2.5/weather?lat=${latVar}&lon=${longVar}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`,\r\n    { mode: \"cors\" }\r\n  )\r\n    .then((result) => result.json())\r\n    .then((object) => renderWeather(object))\r\n    .catch((error) => console.log(error));\r\n};\r\n\r\nconst getLocation = () => {\r\n  if (navigator.geolocation) {\r\n    position = navigator.geolocation.getCurrentPosition(\r\n      successFunction,\r\n      errorFunction\r\n    );\r\n  }\r\n\r\n  function successFunction(position) {\r\n    var lat = position.coords.latitude;\r\n    var long = position.coords.longitude;\r\n    getWeather(lat, long);\r\n  }\r\n  function errorFunction(error) {\r\n    console.log(error);\r\n  }\r\n}\r\n\r\nconst loadCityData = () => {\r\n  fetch(\r\n    `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`,\r\n    { mode: \"cors\" }\r\n  )\r\n    .then((result) => result.json())\r\n    .then((object) => renderWeather(object))\r\n    .catch((error) => console.log(error));\r\n}\r\n\r\n\r\ncitySubmit.addEventListener('click', loadCityData);\r\ngetLocation();\n\n//# sourceURL=webpack://weather-app-js/./src/app.js?");
/******/ })()
;