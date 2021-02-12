const weather = () => {
  const body = document.querySelector('body');
  const cityName = document.querySelector('.city');
  const currentTemp = document.querySelector('.current-temperature');
  const scale = document.querySelectorAll('.scale');
  const maxTemp = document.querySelector('.max-temp');
  const minTemp = document.querySelector('.min-temp');
  const humidity = document.querySelector('.humidity');
  const windSpeed = document.querySelector('.wind-speed');
  const weatherIcon = document.querySelector('.weather-icon');
  const toggleInput = document.querySelector('.toggle-input');
  let currentKWeather = 0;
  let maxKTemp = 0;
  let minKTemp = 0;

  const renderError = () => {
    const errorDisplay = document.createElement('div');
    errorDisplay.className = 'error-display';
    errorDisplay.textContent = 'ERROR: City was not found. Try again.';
    body.appendChild(errorDisplay);
  };

  const kToCelsius = (kTemp) => (parseFloat(kTemp) - 273.15).toFixed(1);
  const kToFarenheit = (kTemp) => (parseFloat(kTemp) * (9 / 5) - 459.67).toFixed(1);

  const renderFromToggleScale = () => {
    if (toggleInput.checked === true) {
      currentTemp.textContent = kToCelsius(currentKWeather);
      maxTemp.textContent = kToCelsius(maxKTemp);
      minTemp.textContent = kToCelsius(minKTemp);
      scale.forEach((el) => {
        el.textContent = ' °C';
      });
    } else {
      currentTemp.textContent = kToFarenheit(currentKWeather);
      maxTemp.textContent = kToFarenheit(maxKTemp);
      minTemp.textContent = kToFarenheit(minKTemp);
      scale.forEach((el) => {
        el.textContent = ' °F';
      });
    }
  };

  const renderWeather = (object) => {
    if (document.querySelector('.error-display')) {
      body.removeChild(document.querySelector('.error-display'));
    }

    cityName.textContent = `${object.name}, ${object.sys.country}`;

    renderFromToggleScale();

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
      .then((object) => {
        currentKWeather = object.main.temp;
        maxKTemp = object.main.temp_max;
        minKTemp = object.main.temp_min;
        renderWeather(object);
      });
  };

  const getLocation = () => {
    function successFunction(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      getWeather(lat, long);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction);
    }
  };

  const loadCityData = () => {
    const cityNameInput = document.querySelector('.city-search-input');
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityNameInput.value}&appid=0fdbd7f50c09d58a24d8cb3dd3d4e36d`,
      { mode: 'cors' },
    )
      .then((result) => result.json())
      .then((object) => renderWeather(object))
      .catch((error) => renderError(error));
  };

  return {
    renderError, renderFromToggleScale, renderWeather, getWeather, getLocation, loadCityData,
  };
};

export default weather();