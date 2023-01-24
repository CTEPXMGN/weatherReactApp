import '../Container.css';

function TabCardNow({ tabID, cityData, setCitiesFromLS }) {
  //   if (cityData.cod >= '400') {
  //     return;
  //   }
  //   const SRC_IMG = `
  //         https://openweathermap.org/img/wn/${cityData.weather[0].icon}@4x.png
  //         `;

  let tabElem;

  if (tabID === 0) {
    tabElem = (
      <>
        {/* <p className="tab-now__temperature">
          {cityData.main.temp ? Math.round(cityData.main.temp) + '°' : '-'}
        </p>
        <p className="tab-now__city">{cityData.name ? cityData.name : '-'}</p>
        <input
          type="button"
          className="tab-now__add"
          onClick={() => addToFavorites(cityData.name, setCitiesFromLS)}
        ></input>
        <img className="tab-now__img" src={SRC_IMG} alt="weather icon" /> */}
        <p>Сейчас</p>
      </>
    );
  }
  return tabElem;
}

export default TabCardNow;
