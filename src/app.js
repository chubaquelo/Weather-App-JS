const body = document.querySelector('body');
const cityName = document.querySelector('.city');
const currentTemp = document.querySelector('.current-temperature');
const scale = document.querySelectorAll('.scale');
const maxTemp = document.querySelector('.max-temp');
const minTemp = document.querySelector('.min-temp');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const cityNameInput = document.querySelector('.city-search-input');
const citySubmit = document.querySelector('.city-search-btn');
const toggleSelector = document.querySelector('.slider');
const toggleInput = document.querySelector('.toggle-input');
const weatherIcon = document.querySelector('.weather-icon');

const renderError = () => {
  const errorDisplay = document.createElement('div');
  errorDisplay.className = 'error-display';
  errorDisplay.textContent = 'ERROR: City was not found. Try again.';
  body.appendChild(errorDisplay);
};

const kToCelsius = (kTemp) => (parseFloat(kTemp) - 273.15).toFixed(2);

const cToKelvin = (cTemp) => (parseFloat(cTemp) + 273.15).toFixed(2);

const toggleScale = () => {
  if (toggleInput.checked === true) {
    currentTemp.textContent = cToKelvin(currentTemp.textContent);
    maxTemp.textContent = cToKelvin(maxTemp.textContent);
    minTemp.textContent = cToKelvin(minTemp.textContent);
    scale.forEach(el => { el.textContent = ' °K'; });
  } else {
    currentTemp.textContent = kToCelsius(currentTemp.textContent);
    maxTemp.textContent = kToCelsius(maxTemp.textContent);
    minTemp.textContent = kToCelsius(minTemp.textContent);
    scale.forEach(el => { el.textContent = ' °C'; });
  }
};

const renderWeather = (object) => {
  if (document.querySelector('.error-display')) { body.removeChild(document.querySelector('.error-display')); }

  cityName.textContent = `${object.name}, ${object.sys.country}`;

  if (toggleInput.checked === true) {
    currentTemp.textContent = kToCelsius(object.main.temp);
    maxTemp.textContent = kToCelsius(object.main.temp_max);
    minTemp.textContent = kToCelsius(object.main.temp_min);
    scale.forEach(el => { el.textContent = ' °C'; });
  } else {
    currentTemp.textContent = object.main.temp;
    maxTemp.textContent = object.main.temp_max;
    minTemp.textContent = object.main.temp_min;
    scale.forEach(el => { el.textContent = ' °K'; });
  }

  humidity.textContent = object.main.humidity;
  windSpeed.textContent = object.wind.speed;

  if (object.weather[0].description === 'light rain') {
    weatherIcon.textContent = 'f';
  } else if (object.weather[0].description === 'scattered clouds') {
    weatherIcon.textContent = '3';
  } else if (object.weather[0].description === 'clear sky') {
    weatherIcon.textContent = '1';
  } else if (object.weather[0].description === 'few clouds') {
    weatherIcon.textContent = 'a';
  } else if (object.weather[0].description === 'moderate rain') {
    weatherIcon.textContent = 'i';
  } else if (object.weather[0].description === 'heavy intensity rain') {
    weatherIcon.textContent = 'u';
  } else {
    weatherIcon.textContent = 'p';
  }
};

const getWeather = (latVar, longVar) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latVar}&lon=${longVar}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`,
    { mode: 'cors' },
  )
    .then((result) => result.json())
    .then((object) => renderWeather(object));
};

const getLocation = () => {
  function successFunction(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    getWeather(lat, long);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      successFunction,
    );
  }
};

const loadCityData = () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`,
    { mode: 'cors' },
  )
    .then((result) => result.json())
    .then((object) => renderWeather(object))
    .catch((error) => renderError(error));
};

citySubmit.addEventListener('click', loadCityData);

let timeout = null;
cityNameInput.addEventListener('keyup', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    citySubmit.click();
  }, 1000);
});

toggleSelector.addEventListener('click', toggleScale);

getLocation();