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

const renderWeather = (object) => {
  cityName.textContent = object.name + ", " + object.sys.country;
  currentTemp.textContent = object.main.temp;
  scale.forEach(el => el.textContent = " °F");
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
    .catch((error) => console.log(error));
}


citySubmit.addEventListener('click', loadCityData);
getLocation();