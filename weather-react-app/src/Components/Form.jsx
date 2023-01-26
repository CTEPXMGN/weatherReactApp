import '../Container.css';
import { getWeather, getWeatherForecast } from './getWeather';
import { useState } from 'react';
import { favoriteCities, currentCity } from '../storage.js';

function Form({
  cityName,
  setCityName,
  cityData,
  setCityData,
  setCityDataForecast,
}) {
  const [value, setValue] = useState('');

  function changeValue(event) {
    setValue(event.target.value);
  }

  // if (localStorage.getItem('currentCity')) {
  //   getWeather(currentCity, setCityData),
  //     getWeatherForecast(currentCity, setCityDataForecast);
  // }

  return (
    <form
      className="find-form"
      onSubmit={() => {
        setCityName(value),
          getWeather(value, setCityData),
          getWeatherForecast(value, setCityDataForecast),
          setValue('');
      }}
    >
      <input
        type="text"
        value={value}
        className="find__input"
        placeholder="Найти город"
        onChange={(event) => changeValue(event)}
      />
      <input
        type="button"
        className="find__button"
        onClick={() => {
          getWeather(value, setCityData),
            getWeatherForecast(value, setCityDataForecast),
            setValue('');
        }}
      />
    </form>
  );
}

export default Form;
