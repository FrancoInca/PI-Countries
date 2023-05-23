import axios from 'axios';

const LOAD_COUNTRIES = 'LOAD_COUNTRIES';
const LOAD_SOME_COUNTRIES = 'LOAD_SOME_COUNTRIES';
const LOAD_COUNTRY = 'LOAD_COUNTRY';
const LOAD_ACTIVITIES = 'LOAD_ACTIVITIES';
const ADD_ACTIVITY = 'ADD_ACTIVITY';

export function addActivity(data) {
  return async function (dispatch) {
    const response = await axios.post(
      `https://pi-countries-production-86a1.up.railway.app/activities`,
      data
    );
    const activity = response.data;
    return dispatch({
      type: ADD_ACTIVITY,
      payload: activity,
    });
  };
}

export function loadActivities() {
  return async function (dispatch) {
    const response = await axios.get(
      `https://pi-countries-production-86a1.up.railway.app/activities`
    );
    const activities = response.data;
    return dispatch({
      type: LOAD_ACTIVITIES,
      payload: activities,
    });
  };
}

export function loadCountryByCC(countryCode) {
  return async function (dispatch) {
    const response = await axios.get(
      `https://pi-countries-production-86a1.up.railway.app/countries/${countryCode}`
    );
    const country = response.data;
    return dispatch({
      type: LOAD_COUNTRY,
      payload: country,
    });
  };
}
export function loadCountries(name) {
  return async function (dispatch) {
    const baseUrl = `https://pi-countries-production-86a1.up.railway.app/countries/${
      name ? `search?name=${name}` : ''
    }`;
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
    const response = await axios.get(
      'https://pi-countries-production-86a1.up.railway.app/countries'
    );
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
export {LOAD_COUNTRIES, LOAD_SOME_COUNTRIES, LOAD_COUNTRY, LOAD_ACTIVITIES, ADD_ACTIVITY};
