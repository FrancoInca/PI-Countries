import axios from 'axios';

const LOAD_COUNTRIES = 'LOAD_COUNTRIES';

export function loadCountries() {
  return async function (dispatch) {
    const response = await axios.get('http://localhost:3001/countries');
    return dispatch({
      type: LOAD_COUNTRIES,
      payload: response.data,
    });
  };
}

export {LOAD_COUNTRIES};
