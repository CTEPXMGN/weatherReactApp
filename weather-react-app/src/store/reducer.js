import { ADD_CITY, CITY_NAME } from './action';
import { favoriteCities } from '../storage';

export function saveCitiesToLS(state = favoriteCities, action) {
  switch (action.type) {
    case ADD_CITY:
      return [...state, action.payload];

    default:
      return state;
  }
}

export function saveCity(state = 'city', action) {
  switch (action.type) {
    case CITY_NAME:
      return action.payload;

    default:
      return state;
  }
}
