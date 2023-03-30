import {LOAD_COUNTRIES} from './actions';
const initialState = {
  countries: [],
  activities: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COUNTRIES:
      return {...state, countries: action.payload};
    default:
      return {...state};
  }
};
export default rootReducer;
