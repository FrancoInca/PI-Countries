import axios from 'axios';

const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
const LOAD_SOME_COUNTRIES = 'LOAD_SOME_COUNTRIES';
const LOAD_COUNTRY = 'LOAD_COUNTRY';
const LOAD_ACTIVITIES = 'LOAD_ACTIVITIES';

export function loadActivities() {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/activities`);
    const activities = response.data;
    return dispatch({
      type: LOAD_ACTIVITIES,
      payload: activities,
    });
  };
}

export function loadCountryByCC(countryCode) {
  return async function (dispatch) {
    const response = await axios.get(`http://localhost:3001/countries/${countryCode}`);
    const country = response.data;
    return dispatch({
      type: LOAD_COUNTRY,
      payload: country,
    });
  };
}
export function loadCountries(name) {
  return async function (dispatch) {
    const baseUrl = `http://localhost:3001/countries/${name ? `search?name=${name}` : ''}`;
    const response = await axios.get(baseUrl);
    const countries = response.data;
    return dispatch({
      type: LOAD_COUNTRIES,
      payload: countries,
    });
  };
}
export function loadSomeCountries() {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/countries');
    const data = response.data;
    const countries = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = parseInt(Math.random() * 250);
      countries.push(data[randomIndex]);
    }
    return dispatch({
      type: LOAD_SOME_COUNTRIES,
      payload: countries,
    });
  };
}
export {LOAD_COUNTRIES, LOAD_SOME_COUNTRIES, LOAD_COUNTRY, LOAD_ACTIVITIES};
