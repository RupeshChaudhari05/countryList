import { actionType } from '../Actions/CountryAction'

const initialstate = {
  countryList: [],
  country: {}
}

export const CountryListReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case actionType.LOAD_COUNTRIES:
      return {
        ...state,
        countryList: payload
      }

    case actionType.SELECT_COUNTRY:
      const filterData = state.countryList.filter((item) => item.name === payload)
      return {
        ...state,
        country: filterData[0]
      }

    case actionType.ADD_COUNTRY:
      return {
        ...state,
        countryList: [...state.countryList, payload]
      };

    default:
      return state
  }
}