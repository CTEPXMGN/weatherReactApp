const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const SERVER_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '19ac54b1dc53d5a42de342ad629f3bcd';

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
      alert('Город не найден. ' + response.status);
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
      alert('Город не найден. ' + response.status);
    }
  } catch (error) {
    alert(error.stack);
  }
}
