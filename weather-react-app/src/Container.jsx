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
  const [cityData, setCityData] = useState(null);

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
          cityData={cityData}
          setCityData={setCityData}
          cityName={cityName}
          setCityName={setCityName}
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
        <TabCard tabID={tab.tabID} cityData={cityData} />
      </div>
    );
  });

  return items;
}

function TabCard({ tabID, cityData }) {
  //   console.log(cityData);

  if (cityData === null) {
    return;
  }
  const SRC_IMG = `
      https://openweathermap.org/img/wn/${cityData.weather[0].icon}@4x.png
      `;

  //   const dateInMsSunrise = cityData.sys.sunrise * 1000;
  //   const hoursSunrise = new Date(dateInMsSunrise).getHours();
  //   const minutesSunrise = new Date(dateInMsSunrise).getMinutes();
  //   const dateInMsSunset = cityData.sys.sunset * 1000;
  //   const hoursSunset = new Date(dateInMsSunset).getHours();
  //   const minutesSunset = new Date(dateInMsSunset).getMinutes();

  //   const arrData = [
  //     `Температура: ${Math.round(cityData.main.temp)}°`,
  //     `По ощущениям: ${Math.round(cityData.main.feels_like)}°`,
  //     `Погода: ${cityData.weather[0].description}`,
  //     `Восход: ${hoursSunrise}:${minutesSunrise}`,
  //     `Закат: ${hoursSunset}:${minutesSunset}`,
  //   ];

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
  } else if (tabID === 1) {
    tabElem = <>Упс...</>;
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
const API_KEY = '0a8c506a0f09e19f0f5a48594460c570';

function Form({
  value,
  setValue,
  cityData,
  setCityData,
  cityName,
  setCityName,
}) {
  function changeValue(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    fetch(`${SERVER_URL}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`)
      .then((response) => response.json())
      .then(function (json) {
        // return console.log(json);
        setCityData(json);
      });
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
