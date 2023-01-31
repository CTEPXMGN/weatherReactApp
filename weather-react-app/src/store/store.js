import { createStore, combineReducers } from 'redux';
import { currentCity } from '../storage';
import { saveCitiesToLS, saveCity } from './reducer';

const rootReducer = combineReducers({
  favoriteList: saveCitiesToLS,
  cityNameNow: saveCity,
});

// console.log(saveCity);

export const store = createStore(rootReducer);
