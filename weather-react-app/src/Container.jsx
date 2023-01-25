import './Container.css';
import Form from './Components/Form';
import AddedCities from './Components/AddedCities';
import TabCards from './Components/TabCards/TabCards';
import TabButtons from './Components/TabButtons';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
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
  // const [cityName, setCityName] = useState(currentCity);
  // const [cityNow, setCityNow] = useState('');
  const [cityData, setCityData] = useState({
    cod: '400',
    message: 'Nothing to geocode',
  });
  const [cityDataForecast, setCityDataForecast] = useState({
    cod: '400',
    message: 'Nothing to geocode',
  });
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
          cityData={cityData}
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
              citiesFromLS={citiesFromLS}
              setCitiesFromLS={setCitiesFromLS}
            />
          </ul>
        </div>
        <TabButtons tabs={tabs} handlerClick={handlerClick} />
      </div>
    </div>
  );
}

export default Container;

// function AddedCities({ citiesFromLS, setCitiesFromLS, setCityName }) {
//   const favoriteList = citiesFromLS.map((item, index) => {
//     return (
//       <li key={index} className="added-cities__item">
//         <span onClick={() => setCityName(item)}>{item}</span>
//         <button
//           className="delete-city"
//           onClick={() => delFromFavorites(citiesFromLS, item, setCitiesFromLS)}
//         />
//       </li>
//     );
//   });
//   return favoriteList;
// }

// function TabCards({ tabs, cityData, cityDataForecast, setCitiesFromLS }) {
//   const items = tabs.map((tab) => {
//     return (
//       <div
//         key={tab.id}
//         className={tab.styleClassTab + `${tab.isActive ? ' active' : ''}`}
//       >
//         <TabCardNow
//           tabID={tab.tabID}
//           cityData={cityData}
//           setCitiesFromLS={setCitiesFromLS}
//         />
//         <TabCardDetails tabID={tab.tabID} cityData={cityData} />
//         <TabCardForecast
//           tabID={tab.tabID}
//           cityDataForecast={cityDataForecast}
//         />
//       </div>
//     );
//   });

//   return items;
// }

// function addToFavorites(city, setCitiesFromLS) {
//   const favoriteCities = new Set(JSON.parse(localStorage.getItem('cities')));
//   favoriteCities.add(city);
//   localStorage.setItem('cities', JSON.stringify([...favoriteCities]));

//   setCitiesFromLS([...favoriteCities]);
// }

// function delFromFavorites(cities, elem, setCitiesFromLS) {
//   cities = JSON.parse(localStorage.getItem('cities'));
//   let favoriteCities = cities.filter((item) => item !== elem);
//   localStorage.cities = JSON.stringify(favoriteCities);

//   setCitiesFromLS([...favoriteCities]);
// }

// function TabCardNow({ tabID, cityData, setCitiesFromLS }) {
//   if (cityData.cod >= '400') {
//     return;
//   }
//   const SRC_IMG = `
//       https://openweathermap.org/img/wn/${cityData.weather[0].icon}@4x.png
//       `;

//   let tabElem;

//   if (tabID === 0) {
//     tabElem = (
//       <>
//         <p className="tab-now__temperature">
//           {Math.round(cityData.main.temp) + '°'}
//         </p>
//         <p className="tab-now__city">{cityData.name}</p>
//         <input
//           type="button"
//           className="tab-now__add"
//           onClick={() => addToFavorites(cityData.name, setCitiesFromLS)}
//         ></input>
//         <img className="tab-now__img" src={SRC_IMG} alt="weather icon" />
//       </>
//     );
//   }
//   return tabElem;
// }

// function TabCardDetails({ tabID, cityData }) {
//   if (cityData.cod >= '400') {
//     return;
//   }

//   const dateInMsSunrise = cityData.sys.sunrise * 1000;
//   const hoursSunrise = new Date(dateInMsSunrise).getHours();
//   const minutesSunrise = new Date(dateInMsSunrise).getMinutes();
//   const dateInMsSunset = cityData.sys.sunset * 1000;
//   const hoursSunset = new Date(dateInMsSunset).getHours();
//   const minutesSunset = new Date(dateInMsSunset).getMinutes();

//   let tabElem;

//   if (tabID === 1) {
//     tabElem = (
//       <>
//         <p className="tab-details__city">{cityData.name}</p>
//         <ul className="tab-details__list">
//           <li className="tab-details__item">{`Температура: ${Math.round(
//             cityData.main.temp
//           )}°`}</li>
//           <li className="tab-details__item">{`По ощущениям: ${Math.round(
//             cityData.main.feels_like
//           )}°`}</li>
//           <li className="tab-details__item">{`Погода: ${cityData.weather[0].description}`}</li>
//           <li className="tab-details__item">{`Восход: ${hoursSunrise}:${minutesSunrise}`}</li>
//           <li className="tab-details__item">{`Закат: ${hoursSunset}:${minutesSunset}`}</li>
//         </ul>
//       </>
//     );
//   }
//   return tabElem;
// }

// function TabCardForecast({ tabID, cityDataForecast }) {
//   if (cityDataForecast.cod >= '400') {
//     return;
//   }
//   const SRC_IMG_FORECAST = `
//       https://openweathermap.org/img/wn/${cityDataForecast.list[0].weather[0].icon}.png
//       `;
//   const monthes = [
//     'дек',
//     'янв',
//     'фев',
//     'марта',
//     'апр',
//     'мая',
//     'июня',
//     'июля',
//     'авг',
//     'сент',
//     'окт',
//     'нояб',
//   ];

//   const dataForecast = cityDataForecast.list;

//   const forecastCards = dataForecast.map((item, index) => {
//     let month = Number(item.dt_txt.slice(5, 7));
//     let temp = Math.round(item.main.temp);
//     let tempFillsLike = Math.round(item.main.feels_like);
//     return (
//       <div className="tab-forecast__block" key={index}>
//         <p className="tab-forecast__date">{`
//         ${item.dt_txt.slice(8, 10)} ${monthes[month]}
//         `}</p>
//         <p className="tab-forecast__time">{item.dt_txt.slice(11, 16)}</p>
//         <p className="tab-forecast__tesperature">{`Темп-ра: ${temp}°`}</p>
//         <p className="tab-forecast__feels-like">{`Ощущ. как: ${tempFillsLike}°`}</p>
//         <p className="tab-forecast__weather">{item.weather[0].description}</p>
//         <img
//           src={SRC_IMG_FORECAST}
//           alt="icon weather"
//           className="tab-forecast__icon"
//         />
//       </div>
//     );
//   });

//   const cityNameForecast = (
//     <p className="tab-forecast__city">{cityDataForecast.city.name}</p>
//   );
//   let tabElem;

//   if (tabID === 2) {
//     tabElem = (
//       <>
//         {cityNameForecast}
//         {forecastCards}
//       </>
//     );
//   }
//   return tabElem;
// }

// function TabButtons({ tabs, handlerClick }) {
//   const items = tabs.map((tab) => {
//     return (
//       <a
//         href={`#tab_${tab.tabID}`}
//         key={tab.tabID}
//         id={tab.tabID}
//         className={
//           tab.styleClassButton + `${tab.isActive ? ' active-tab' : ''}`
//         }
//         onClick={handlerClick}
//       >
//         {tab.title}
//       </a>
//     );
//   });

//   return items;
// }

// const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
// const SERVER_URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast';
// const API_KEY = '0a8c506a0f09e19f0f5a48594460c570';

// function Form({
//   value,
//   setValue,
//   cityData,
//   setCityData,
//   cityName,
//   setCityName,
//   setCityDataForecast,
//   cityNow,
//   setCityNow,
// }) {
//   function changeValue(e) {
//     setValue(e.target.value);
//   }
//   useEffect(
//     () =>
//       async function () {
//         const URL = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`;
//         try {
//           let promise = await fetch(URL);
//           if (promise.cod === 200) {
//             const result = await promise.json();
//             setCityNow(result.name);
//           } else {
//             console.log('Ошибка');
//           }
//         } catch (error) {
//           console.log(error.stack);
//         } finally {
//           setTimeout(() => console.log('Выполнено'), 500);
//         }
//       }
//   );
//   useEffect(() => {
//     //   fetch(`${SERVER_URL}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`)
//     //     .then((response) => response.json())
//     //     .catch((error) => alert('Ошибочка вышла: ' + error.message))
//     //     // .then(function (response) {
//     //     //   if (!response.ok) {
//     //     //     alert(response.cod, response.message);
//     //     //     return;
//     //     //   }
//     //     //   return response;
//     //     // })
//     //     .then((json) => {
//     //       setCityData(json);
//     //       return json;
//     //     })
//     //     .then((json) => setCityNow(json.name));
//     localStorage.setItem('currentCity', JSON.stringify(cityData.name));
//     fetch(
//       `${SERVER_URL_FORECAST}?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`
//     )
//       .then((response) => response.json())
//       .catch((error) => alert('Ошибочка вышла: ' + error.message))
//       .then((json) => setCityDataForecast(json));
//     setValue('');
//   }, [cityName]);

//   return (
//     <form className="find-form" onSubmit={() => setCityName(value)}>
//       <input
//         type="text"
//         value={value}
//         className="find__input"
//         placeholder="Найти город"
//         onChange={(e) => changeValue(e)}
//       />
//       <input
//         type="button"
//         className="find__button"
//         onClick={() => setCityName(value)}
//       />
//     </form>
//   );
// }
