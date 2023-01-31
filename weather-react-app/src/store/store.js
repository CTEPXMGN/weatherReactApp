import { createStore } from 'redux';
import { currentCity } from '../storage';

const defaultState = {
  name: currentCity,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_CITY':
      return { ...state, name: state.name + '!!!' };
    case 'DEL_CITY':
      return { ...state, name: state.name + '!!!' };

    default:
      return state;
  }
};

export const store = createStore(reducer);
