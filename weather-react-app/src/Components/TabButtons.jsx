import '../Container.css';

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

export default TabButtons;
