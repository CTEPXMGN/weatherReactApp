import './Container.css';
import { useState, useEffect } from 'react';

// function addToFavorites(city, setCitiesFromLS) {
//   const favoriteCities = new Set(JSON.parse(localStorage.getItem('cities')));
//   favoriteCities.add(city);
//   localStorage.setItem('cities', JSON.stringify([...favoriteCities]));

//   setCitiesFromLS([...favoriteCities]);
// }

// function delFromFavorites(cities, elem, setCitiesFromLS) {
//   cities = JSON.parse(localStorage.getItem('cities'));
//   let favoriteCities = cities.filter((item) => item !== elem);
//   localStorage.cities = JSON.stringify(favoriteCities);

//   setCitiesFromLS([...favoriteCities]);
// }

function AddedCities({ citiesFromLS, setCitiesFromLS }) {
  const favoriteList = citiesFromLS.map((item, index) => {
    return (
      <li key={index} className="added-cities__item">
        <span onClick={() => setCityName(item)}>{item}</span>
        <button
          className="delete-city"
          // onClick={() => delFromFavorites(citiesFromLS, item, setCitiesFromLS)}
        />
      </li>
    );
  });
  return favoriteList;
}

export default AddedCities;
