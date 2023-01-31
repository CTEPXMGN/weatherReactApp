import * as actions from './actionTypes';
import { favoriteCities } from '../storage';

export default function reducer(state = favoriteCities, action) {
  switch (action.type) {
    case actions.ADD_CITY:
      return [...state, action.payload];

    default:
      return state;
  }
}
