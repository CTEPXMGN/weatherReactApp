import './Container.css';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

function id() {
  return nanoid();
}

const tabsArray = [
  {
    id: id(),
    tabID: 0,
    title: 'Сейчас',
    styleClassTab: 'tab__item tab-now',
    styleClassButton: 'tab tab-now__button',
    isActive: true,
  },
  {
    id: id(),
    tabID: 1,
    title: 'Детали',
    styleClassTab: 'tab__item tab-details',
    styleClassButton: 'tab tab-details__button',
    isActive: false,
  },
  {
    id: id(),
    tabID: 2,
    title: 'Прогноз',
    styleClassTab: 'tab__item tab-forecast',
    styleClassButton: 'tab tab-forecast__button',
    isActive: false,
  },
];

// const initCityData = { name: 'Qwerty', temperature: '17' };

function Container() {
  const [tabs, setTabs] = useState(tabsArray);
  const [value, setValue] = useState('');
  const [cityName, setCityName] = useState('');
  const [cityData, setCityData] = useState({
    cod: '400',
    message: 'Nothing to geocode',
  });
  const [cityDataForecast, setCityDataForecast] = useState({
    cod: '400',
    message: 'Nothing to geocode',
  });

  function handlerClick(event) {
    const indexTab = event.target.id;
    const copyTabs = [...tabs];
    copyTabs.map((tab) => {
      return (tab.isActive = false);
    });
    copyTabs[indexTab].isActive = true;
    setTabs(copyTabs);
  }
  return (
    <div className="main">
      <div className="container">
        <Form
          value={value}
          setValue={setValue}
          setCityData={setCityData}
          cityName={cityName}
          setCityName={setCityName}
          setCityDataForecast={setCityDataForecast}
        />
        <div className="tabs">
          <TabCards tabs={tabs} cityData={cityData} />
        </div>
        <div className="added-locations">
          <p className="added-locations__title">Избранное:</p>
        </div>
        <div className="added-cities">
          <ul className="added-cities__list" />
        </div>
        <TabButtons tabs={tabs} handlerClick={handlerClick} />
      </div>
    </div>
  );
}

function TabCards({ tabs, cityData }) {
  const items = tabs.map((tab) => {
    return (
      <div
        key={tab.id}
        className={tab.styleClassTab + `${tab.isActive ? ' active' : ''}`}
      >
        <TabCardNow tabID={tab.tabID} cityData={cityData} />
        <TabCardDetails tabID={tab.tabID} cityData={cityData} />
      </div>
    );
  });

  return items;
}

function TabCardNow({ tabID, cityData }) {
  if (cityData.cod === '400') {
    return;
  }
  const SRC_IMG = `
      https://openweathermap.org/img/wn/${cityData.weather[0].icon}@4x.png
      `;

  let tabElem;

  if (tabID === 0) {
    tabElem = (
      <>
        <p className="tab-now__temperature">
          {Math.round(cityData.main.temp) + '°'}
        </p>
        <p className="tab-now__city">{cityData.name}</p>
        <input type="button" className="tab-now__add"></input>
        <img className="tab-now__img" src={SRC_IMG} alt="weather icon" />
      </>
    );
  }
  return tabElem;
}

function TabCardDetails({ tabID, cityData }) {
  if (cityData.cod === '400') {
    return;
  }

  const dateInMsSunrise = cityData.sys.sunrise * 1000;
  const hoursSunrise = new Date(dateInMsSunrise).getHours();
  const minutesSunrise = new Date(dateInMsSunrise).getMinutes();
  const dateInMsSunset = cityData.sys.sunset * 1000;
  const hoursSunset = new Date(dateInMsSunset).getHours();
  const minutesSunset = new Date(dateInMsSunset).getMinutes();

  let tabElem;

  if (tabID === 1) {
    tabElem = (
      <>
        <p className="tab-details__city">{cityData.name}</p>
        <ul className="tab-details__list">
          <li className="tab-details__item">{`Температура: ${Math.round(
            cityData.main.temp
          )}°`}</li>
          <li className="tab-details__item">{`По ощущениям: ${Math.round(
            cityData.main.feels_like
          )}°`}</li>
          <li className="tab-details__item">{`Погода: ${cityData.weather[0].description}`}</li>
          <li className="tab-details__item">{`Восход: ${hoursSunrise}:${minutesSunrise}`}</li>
          <li className="tab-details__item">{`Закат: ${hoursSunset}:${minutesSunset}`}</li>
        </ul>
      </>
    );
  }
  return tabElem;
}

function TabButtons({ tabs, handlerClick }) {
  const items = tabs.map((tab) => {
    return (
      <a
        href={`#tab_${tab.tabID}`}
        key={tab.tabID}
        id={tab.tabID}
        className={
          tab.styleClassButton + `${tab.isActive ? ' active-tab' : ''}`
        }
        onClick={handlerClick}
      >
        {tab.title}
      </a>
    );
  });

  return items;
}

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const SERVER_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = '0a8c506a0f09e19f0f5a48594460c570';

function Form({
  value,
  setValue,
  setCityData,
  cityName,
  setCityName,
  setCityDataForecast,
}) {
  function changeValue(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    fetch(`${SERVER_URL}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`)
      .then((response) => response.json())
      .catch((error) => alert('Ошибочка вышла: ' + error.message))
      //   .then(function (response) {
      //     if (response.cod !== 200) {
      //       alert(response.cod, response.message);
      //       return;
      //     }
      //     return response;
      //   })
      .then((json) => setCityData(json));
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
        onChange={(e) => changeValue(e)}
      />
      <input
        type="button"
        className="find__button"
        onClick={() => setCityName(value)}
      />
    </form>
  );
}

export default Container;
