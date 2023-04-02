import {LOAD_COUNTRIES, LOAD_SOME_COUNTRIES, LOAD_COUNTRY} from './actions';
const initialState = {
  countries: [],
  countriesWelcome: [],
  countryData: [],
  activities: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COUNTRIES:
      return {...state, countries: action.payload};
    case LOAD_SOME_COUNTRIES:
      return {...state, countriesWelcome: action.payload};
    case LOAD_COUNTRY:
      return {...state, countryData: action.payload};
    default:
      return {...state};
  }
};
export default rootReducer;
