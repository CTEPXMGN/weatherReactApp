import '../Container.css';
import { monthes } from './Variables';

function TabCardForecast({ tabID, cityDataForecast }) {
  if (cityDataForecast.cod >= '400') {
    return;
  }
  const SRC_IMG_FORECAST = `
          https://openweathermap.org/img/wn/${cityDataForecast.list[0].weather[0].icon}.png
          `;
  const monthes = [
    'дек',
    'янв',
    'фев',
    'марта',
    'апр',
    'мая',
    'июня',
    'июля',
    'авг',
    'сент',
    'окт',
    'нояб',
  ];

  const dataForecast = cityDataForecast.list;

  const forecastCard = dataForecast.map((item, index) => {
    let month = Number(item.dt_txt.slice(5, 7));
    let temp = Math.round(item.main.temp);
    let tempFillsLike = Math.round(item.main.feels_like);
    return (
      <div className="tab-forecast__block" key={index}>
        <p className="tab-forecast__date">{`
              ${item.dt_txt.slice(8, 10)} ${monthes[month]}
            `}</p>
        <p className="tab-forecast__time">{item.dt_txt.slice(11, 16)}</p>
        <p className="tab-forecast__tesperature">{`Темп-ра: ${temp}°`}</p>
        <p className="tab-forecast__feels-like">{`Ощущ. как: ${tempFillsLike}°`}</p>
        <p className="tab-forecast__weather">{item.weather[0].description}</p>
        <img
          src={SRC_IMG_FORECAST}
          alt="icon weather"
          className="tab-forecast__icon"
        />
      </div>
    );
  });

  const cityNameForecast = (
    <p className="tab-forecast__city">{cityDataForecast.city.name}</p>
  );
  let tabElem;

  if (tabID === 2) {
    tabElem = (
      <>
        {cityNameForecast}
        {forecastCard}
      </>
    );
  }
  return tabElem;
}

export default TabCardForecast;
