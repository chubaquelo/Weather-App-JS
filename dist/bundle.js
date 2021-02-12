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
eval("const body = document.querySelector('body');\nconst cityName = document.querySelector('.city');\nconst currentTemp = document.querySelector('.current-temperature');\nconst scale = document.querySelectorAll('.scale');\nconst maxTemp = document.querySelector('.max-temp');\nconst minTemp = document.querySelector('.min-temp');\nconst humidity = document.querySelector('.humidity');\nconst windSpeed = document.querySelector('.wind-speed');\nconst cityNameInput = document.querySelector('.city-search-input');\nconst citySubmit = document.querySelector('.city-search-btn');\nconst toggleSelector = document.querySelector('.slider');\nconst toggleInput = document.querySelector('.toggle-input');\nconst weatherIcon = document.querySelector('.weather-icon');\n\nconst renderError = () => {\n  const errorDisplay = document.createElement('div');\n  errorDisplay.className = 'error-display';\n  errorDisplay.textContent = 'ERROR: City was not found. Try again.';\n  body.appendChild(errorDisplay);\n};\n\nconst kToCelsius = kTemp => (parseFloat(kTemp) - 273.15).toFixed(2);\n\nconst cToKelvin = cTemp => (parseFloat(cTemp) + 273.15).toFixed(2);\n\nconst toggleScale = () => {\n  if (toggleInput.checked === true) {\n    currentTemp.textContent = cToKelvin(currentTemp.textContent);\n    maxTemp.textContent = cToKelvin(maxTemp.textContent);\n    minTemp.textContent = cToKelvin(minTemp.textContent);\n    scale.forEach(el => {\n      el.textContent = ' °K';\n    });\n  } else {\n    currentTemp.textContent = kToCelsius(currentTemp.textContent);\n    maxTemp.textContent = kToCelsius(maxTemp.textContent);\n    minTemp.textContent = kToCelsius(minTemp.textContent);\n    scale.forEach(el => {\n      el.textContent = ' °C';\n    });\n  }\n};\n\nconst renderWeather = object => {\n  if (document.querySelector('.error-display')) {\n    body.removeChild(document.querySelector('.error-display'));\n  }\n\n  cityName.textContent = `${object.name}, ${object.sys.country}`;\n\n  if (toggleInput.checked === true) {\n    currentTemp.textContent = kToCelsius(object.main.temp);\n    maxTemp.textContent = kToCelsius(object.main.temp_max);\n    minTemp.textContent = kToCelsius(object.main.temp_min);\n    scale.forEach(el => {\n      el.textContent = ' °C';\n    });\n  } else {\n    currentTemp.textContent = object.main.temp;\n    maxTemp.textContent = object.main.temp_max;\n    minTemp.textContent = object.main.temp_min;\n    scale.forEach(el => {\n      el.textContent = ' °K';\n    });\n  }\n\n  humidity.textContent = object.main.humidity;\n  windSpeed.textContent = object.wind.speed;\n\n  if (object.weather[0].description === 'light rain') {\n    weatherIcon.textContent = 'f';\n  } else if (object.weather[0].description === 'scattered clouds') {\n    weatherIcon.textContent = '3';\n  } else if (object.weather[0].description === 'clear sky') {\n    weatherIcon.textContent = '1';\n  } else if (object.weather[0].description === 'few clouds') {\n    weatherIcon.textContent = 'a';\n  } else if (object.weather[0].description === 'moderate rain') {\n    weatherIcon.textContent = 'i';\n  } else if (object.weather[0].description === 'heavy intensity rain') {\n    weatherIcon.textContent = 'u';\n  } else {\n    weatherIcon.textContent = 'p';\n  }\n};\n\nconst getWeather = (latVar, longVar) => {\n  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latVar}&lon=${longVar}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`, {\n    mode: 'cors'\n  }).then(result => result.json()).then(object => renderWeather(object));\n};\n\nconst getLocation = () => {\n  function successFunction(position) {\n    const lat = position.coords.latitude;\n    const long = position.coords.longitude;\n    getWeather(lat, long);\n  }\n\n  if (navigator.geolocation) {\n    navigator.geolocation.getCurrentPosition(successFunction);\n  }\n};\n\nconst loadCityData = () => {\n  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`, {\n    mode: 'cors'\n  }).then(result => result.json()).then(object => renderWeather(object)).catch(error => renderError(error));\n};\n\ncitySubmit.addEventListener('click', loadCityData);\nlet timeout = null;\ncityNameInput.addEventListener('keyup', () => {\n  clearTimeout(timeout);\n  timeout = setTimeout(() => {\n    citySubmit.click();\n  }, 1000);\n});\ntoggleSelector.addEventListener('click', toggleScale);\ngetLocation();\n\n//# sourceURL=webpack://weather-app-js/./src/app.js?");
/******/ })()
;