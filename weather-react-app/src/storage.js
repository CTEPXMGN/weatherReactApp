export { favoriteCities, currentCity };

function getCurrentCity() {
  return JSON.parse(localStorage.getItem('currentCity'));
}
const currentCity = getCurrentCity();

function getFavoriteCities() {
  return JSON.parse(localStorage.getItem('cities'));
}

const favoriteCities = getFavoriteCities();
