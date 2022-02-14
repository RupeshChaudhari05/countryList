import { CountryListReducer } from "./CountryListReducer";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  countryData: CountryListReducer
});
