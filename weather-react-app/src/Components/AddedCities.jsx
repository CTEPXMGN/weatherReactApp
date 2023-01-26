import '../Components/Container.css';
import { getWeather, getWeatherForecast } from './getWeather';

function delFromFavorites(cities, elem, setCitiesFromLS) {
  cities = JSON.parse(localStorage.getItem('cities'));
  let favoriteCities = cities.filter((item) => item !== elem);
  localStorage.cities = JSON.stringify(favoriteCities);

  setCitiesFromLS([...favoriteCities]);
}

function AddedCities({
  setCityName,
  citiesFromLS,
  setCitiesFromLS,
  setCityData,
  setCityDataForecast,
}) {
  const favoriteList = citiesFromLS.map((item, index) => {
    return (
      <li key={index} className="added-cities__item">
        <span
          onClick={() => {
            setCityName(item),
              getWeather(item, setCityData),
              getWeatherForecast(item, setCityDataForecast);
          }}
        >
          {item}
        </span>
        <button
          className="delete-city"
          onClick={() => delFromFavorites(citiesFromLS, item, setCitiesFromLS)}
        />
      </li>
    );
  });
  return favoriteList;
}

export default AddedCities;
