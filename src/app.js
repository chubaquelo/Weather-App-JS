import weather from './weather';

const W = weather;
const citySubmit = document.querySelector('.city-search-btn');
const toggleSelector = document.querySelector('.switch input');
const cityNameInput = document.querySelector('.city-search-input');

let timeout = null;
cityNameInput.addEventListener('keyup', () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    citySubmit.click();
  }, 1000);
});

citySubmit.addEventListener('click', W.loadCityData);
toggleSelector.addEventListener('click', W.renderFromToggleScale);

W.getLocation();