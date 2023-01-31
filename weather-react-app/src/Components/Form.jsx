import './Form.css';
import { getWeather, getWeatherForecast } from './getWeather';
import { useState } from 'react';
import { useEffect } from 'react';
import { currentCity } from '../storage';
import { useSelector, useDispatch } from 'react-redux';
import { LocalStorageName } from '../store/action';

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

  const list = useSelector((state) => state.cityNameNow);
  const dispatch = useDispatch();

  function anyFunc(event) {
    dispatch(LocalStorageName(event.target.value));
  }
  console.log(list);

  return (
    <form
      className="find-form"
      onSubmit={() => {
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
          changeValue(event), anyFunc(event);
        }}
      />
      <input
        type="button"
        className="find__button"
        onClick={() => {
          getWeather(cityName, setCityData),
            getWeatherForecast(cityName, setCityDataForecast),
            setValue('');
        }}
      />
    </form>
  );
}

export default Form;
