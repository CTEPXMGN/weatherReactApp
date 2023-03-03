import './Form.css';
import { getWeather, getWeatherForecast } from './getWeather';
import { useState, useEffect } from 'react';
import { currentCity } from '../storage';

function Form({ cityName, setCityName, setCityData, setCityDataForecast }) {
  const [value, setValue] = useState('');

  function changeValue(event) {
    setValue(event.target.value);
  }

  useEffect(() => {
    setCityName(value ? value : currentCity),
      getWeather(value ? value : currentCity, setCityData),
      getWeatherForecast(value ? value : currentCity, setCityDataForecast);
  }, []);

  return (
    <form
      className="find-form"
      onSubmit={(event) => {
        event.preventDefault();
        setCityName(value ? value : currentCity),
          getWeather(value ? value : currentCity, setCityData),
          getWeatherForecast(value ? value : currentCity, setCityDataForecast),
          setValue('');
      }}
    >
      <input
        type="text"
        value={value}
        className="find__input"
        placeholder="Найти город"
        onChange={(event) => {
          changeValue(event);
        }}
      />
      <input
        type="button"
        className="find__button"
        onClick={() => {
          getWeather(value ? value : currentCity, setCityData),
            getWeatherForecast(
              value ? value : currentCity,
              setCityDataForecast
            ),
            setValue('');
        }}
      />
    </form>
  );
}

export default Form;
