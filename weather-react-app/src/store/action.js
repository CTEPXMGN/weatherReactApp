import * as actions from './actionTypes';

export const addCity = (city) => ({
  type: actions.ADD_CITY,
  payload: city,
});

export const delCity = () => ({});
