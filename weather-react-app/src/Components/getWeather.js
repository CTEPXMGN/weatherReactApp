const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const SERVER_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '0a8c506a0f09e19f0f5a48594460c570';

export async function getWeather(city, setCityData) {
  const URL = `${SERVER_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;

  try {
    let response = await fetch(URL);

    if (response.ok) {
      let dataWeather = await response.json();
      console.log(dataWeather);
      setCityData(dataWeather);
      localStorage.setItem('currentCity', JSON.stringify(dataWeather.name));
    } else {
      alert('Ошибочка вышла: ' + response.status);
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

      console.log(dataWeatherForecast);
      setCityDataForecast(dataWeatherForecast);
    } else {
      alert('Ошибочка вышла: ' + response.status);
    }
  } catch (error) {
    alert(error.stack);
  }
}
