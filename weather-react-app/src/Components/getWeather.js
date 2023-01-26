const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const SERVER_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';

export async function getWeather(city, setCityData) {
  const URL = `${SERVER_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;

  try {
    let response = await fetch(URL);

    if (response.ok) {
      let dataWeather = await response.json();
      setCityData(dataWeather);
      localStorage.setItem(
        'currentCity',
        JSON.stringify(dataWeather.name) ? JSON.stringify(dataWeather.name) : ''
      );
    } else {
      console.log('Город не найден. ' + response.status);
    }
  } catch (error) {
    alert(error.stack);
  }
}

export async function getWeatherForecast(city, setCityDataForecast) {
  const URL_FORECAST = `${SERVER_URL_FORECAST}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;

  try {
    let response = await fetch(URL_FORECAST);

    if (response.ok) {
      let dataWeatherForecast = await response.json();

      setCityDataForecast(dataWeatherForecast);
    } else {
      console.log('Город не найден. ' + response.status);
    }
  } catch (error) {
    alert(error.stack);
  }
}
