export { favoriteCities, currentCity };

function getCurrentCity() {
  // Написать проверку на наличие города в ЛС
  return JSON.parse(localStorage.getItem('currentCity'));
}
const currentCity = getCurrentCity();

function getFavoriteCities() {
  if (localStorage.getItem('cities')) {
    return JSON.parse(localStorage.getItem('cities'));
  } else {
    return [];
  }
}

const favoriteCities = getFavoriteCities();
