import '../Container.css';
import { useState, useEffect } from 'react';
import { favoriteCities, currentCity } from '../storage.js';

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const SERVER_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '0a8c506a0f09e19f0f5a48594460c570';

function Form({
  cityData,
  setCityData,
  //   cityName,
  //   setCityName,
  setCityDataForecast,
}) {
  const [value, setValue] = useState('');
  const [cityName, setCityName] = useState(currentCity ? currentCity : '123');

  function changeValue(event) {
    setValue(event.target.value);
  }
  useEffect(
    () =>
      async function () {
        const URL = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`;
        try {
          let promise = await fetch(URL);
          if (promise.ok) {
            const result = await promise.json();
            setCityNow(result.name);
          } else {
            console.log('Ошибка');
          }
        } catch (error) {
          console.log(error.stack);
        } /* finally {
          setTimeout(() => console.log('Выполнено'), 500);
        } */
      }
  );
  useEffect(() => {
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
    localStorage.setItem('currentCity', JSON.stringify(cityData.name));
    fetch(
      `${SERVER_URL_FORECAST}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`
    )
      .then((response) => response.json())
      .catch((error) => alert('Ошибочка вышла: ' + error.message))
      .then((json) => setCityDataForecast(json));
    setValue('');
  }, [cityName]);

  return (
    <form className="find-form" onSubmit={() => setCityName(value)}>
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
        onClick={() => setCityName(value)}
      />
    </form>
  );
}

export default Form;
