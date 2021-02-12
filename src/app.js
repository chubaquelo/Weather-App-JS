const body = document.querySelector('body');
const weatherLeft = document.querySelector(".weather-left");
const weatherRigth = document.querySelector('.weather-rigth');
const cityName = document.querySelector('.city');
const currentTemp = document.querySelector('.current-temperature');
const scale = document.querySelectorAll('.scale');
const maxTemp = document.querySelector('.max-temp');
const minTemp = document.querySelector('.min-temp');
const windSpeed = document.querySelector('.wind-speed');
const cityNameInput = document.querySelector('.city-search-input');
const citySubmit = document.querySelector('.city-search-btn');
const toggleSelector = document.querySelector('.slider');
const toggleInput = document.querySelector('.toggle-input');

const renderError = (error) => {
  let errorDisplay = document.createElement("div");
  errorDisplay.className = "error-display";
  errorDisplay.textContent = "ERROR: City was not found. Try again.";
  body.appendChild(errorDisplay);
};

const toggleKorC = () => {
  if (toggleInput.checked === true) {
    floatCurrentTemp = (parseFloat(currentTemp.textContent) + 273.15).toFixed(2);
    floatMaxTemp = (parseFloat(maxTemp.textContent) + 273.15).toFixed(2);
    floatMinTemp = (parseFloat(minTemp.textContent) + 273.15).toFixed(2);
    currentTemp.textContent = floatCurrentTemp.toString();
    maxTemp.textContent = floatMaxTemp.toString();
    minTemp.textContent = floatMinTemp.toString();
    scale.forEach((el) => (el.textContent = " °K"));
  } else {
    floatCurrentTemp = (parseFloat(currentTemp.textContent) - 273.15).toFixed(2);
    floatMaxTemp = (parseFloat(maxTemp.textContent) - 273.15).toFixed(2);
    floatMinTemp = (parseFloat(minTemp.textContent) - 273.15).toFixed(2);
    currentTemp.textContent = floatCurrentTemp.toString();
    maxTemp.textContent = floatMaxTemp.toString();
    minTemp.textContent = floatMinTemp.toString();
    scale.forEach((el) => (el.textContent = " °C"));
  }
}

const renderWeather = (object) => {
  if (document.querySelector('.error-display')) { body.removeChild(document.querySelector(".error-display")) };
  cityName.textContent = object.name + ", " + object.sys.country;
  currentTemp.textContent = object.main.temp;
  scale.forEach(el => el.textContent = " °K");
  maxTemp.textContent = object.main.temp_max;
  minTemp.textContent = object.main.temp_min;
};

const getWeather = (latVar, longVar) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latVar}&lon=${longVar}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`,
    { mode: "cors" }
  )
    .then((result) => result.json())
    .then((object) => renderWeather(object))
    .catch((error) => console.log(error));
};

const getLocation = () => {
  if (navigator.geolocation) {
    position = navigator.geolocation.getCurrentPosition(
      successFunction,
      errorFunction
    );
  }

  function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    getWeather(lat, long);
  }
  function errorFunction(error) {
    console.log(error);
  }
}

const loadCityData = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`,
    { mode: "cors" }
  )
    .then((result) => result.json())
    .then((object) => renderWeather(object))
    .catch((error) => renderError(error));
}


citySubmit.addEventListener('click', loadCityData);

let timeout = null;
cityNameInput.addEventListener("keyup", function(event) {
  clearTimeout(timeout);
   timeout = setTimeout(function () {
    citySubmit.click();
   }, 1000);
});

toggleSelector.addEventListener("click", toggleKorC);

getLocation();