import './TabCards.css';
import TabCardNow from './TabCardNow';
import TabCardDetails from './TabCardDetails';
import TabCardForecast from './TabCardForecast';

function TabCards({ tabs, cityData, cityDataForecast, setCitiesFromLS }) {
  const items = tabs.map((tab) => {
    return (
      <div
        key={tab.id}
        className={tab.styleClassTab + `${tab.isActive ? ' active' : ''}`}
      >
        <TabCardNow
          tabID={tab.tabID}
          cityData={cityData}
          setCitiesFromLS={setCitiesFromLS}
        />
        <TabCardDetails tabID={tab.tabID} cityData={cityData} />
        <TabCardForecast
          tabID={tab.tabID}
          cityDataForecast={cityDataForecast}
        />
      </div>
    );
  });

  return items;
}

export default TabCards;
