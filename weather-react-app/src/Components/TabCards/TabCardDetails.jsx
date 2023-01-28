import './TabCardDetails.css';

function TabCardDetails({ tabID, cityData }) {
  if (cityData.cod >= '400') {
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

export default TabCardDetails;
