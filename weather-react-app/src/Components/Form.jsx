import '../Container.css';
import { getWeather, getWeatherForecast } from './getWeather';
import { useState, useEffect } from 'react';
// import { favoriteCities, currentCity } from '../storage.js';

function Form({ cityData, setCityData, setCityDataForecast }) {
  const [value, setValue] = useState('');
  const [cityName, setCityName] = useState('123');

  function changeValue(event) {
    setValue(event.target.value);
  }
  // useEffect(
  //   () =>
  //     async function () {
  //       const URL = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`;
  //       try {
  //         let promise = await fetch(URL);
  //         if (promise.ok) {
  //           const result = await promise.json();
  //           console.log(result);
  //           // setCityNow(result.name);
  //         } else {
  //           console.log('Ошибка');
  //         }
  //       } catch (error) {
  //         console.log(error.stack);
  //       } /* finally {
  //         setTimeout(() => console.log('Выполнено'), 500);
  //       } */
  //     }
  // ),
  //   [];
  // useEffect(() => {
  //   fetch(`${SERVER_URL}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`)
  //     .then((response) => response.json())
  //     .catch((error) => alert('Ошибочка вышла: ' + error.message))
  //     // .then(function (response) {
  //     //   if (!response.ok) {
  //     //     alert(response.cod, response.message);
  //     //     return;
  //     //   }
  //     //   return response;
  //     // })
  //     .then((json) => {
  //       setCityData(json);
  //       return json;
  //     })
  //     .then((json) => setCityNow(json.name));
  // localStorage.setItem('currentCity', JSON.stringify(cityData.name));
  // fetch(
  //   `${SERVER_URL_FORECAST}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`
  // )
  //   .then((response) => response.json())
  //   .catch((error) => alert('Ошибочка вышла: ' + error.message))
  //   .then((json) => setCityDataForecast(json));
  //   setValue('');
  // }, [cityName]);

  return (
    <form
      className="find-form"
      onSubmit={() => {
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
