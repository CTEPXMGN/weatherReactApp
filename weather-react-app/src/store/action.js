export const ADD_CITY = 'ADD_CITY';
export const DEL_CITY = 'DEL_CITY';
export const CITY_NAME = 'CITY_NAME';
export const CHANGE_TEMP = 'CHANGE_TEMP';

export const LocalStorageCity = (payload) => ({
  type: ADD_CITY,
  payload,
});

export function LocalStorageName(payload) {
  return { type: CITY_NAME, payload };
}

export const delCity = () => ({});
