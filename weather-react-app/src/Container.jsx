import './Container.css';
import Form from './Components/Form';
import AddedCities from './Components/AddedCities';
import TabCards from './Components/TabCards/TabCards';
import TabButtons from './Components/TabButtons';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { favoriteCities, currentCity } from './storage';

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

function Container() {
  const [tabs, setTabs] = useState(tabsArray);
  const [cityName, setCityName] = useState(currentCity ? currentCity : '');
  const [cityData, setCityData] = useState({ cod: '400' });
  const [cityDataForecast, setCityDataForecast] = useState({ cod: '400' });
  const [citiesFromLS, setCitiesFromLS] = useState(favoriteCities);

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
          cityName={cityName}
          setCityName={setCityName}
          setCityData={setCityData}
          setCityDataForecast={setCityDataForecast}
        />
        <div className="tabs">
          <TabCards
            tabs={tabs}
            cityData={cityData}
            cityDataForecast={cityDataForecast}
            setCitiesFromLS={setCitiesFromLS}
          />
        </div>
        <div className="added-locations">
          <p className="added-locations__title">Избранное:</p>
        </div>
        <div className="added-cities">
          <ul className="added-cities__list">
            <AddedCities
              setCityName={setCityName}
              citiesFromLS={citiesFromLS}
              setCitiesFromLS={setCitiesFromLS}
              setCityData={setCityData}
              setCityDataForecast={setCityDataForecast}
            />
          </ul>
        </div>
        <TabButtons tabs={tabs} handlerClick={handlerClick} />
      </div>
    </div>
  );
}

export default Container;
