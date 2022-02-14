export const loadData = (data) => {
  return {
    type: actionType.LOAD_COUNTRIES,
    payload: data
  }
}

export const saveData = (country) => {
  return {
    type: actionType.ADD_COUNTRY,
    payload: country
  }
}

export const selectSingleCountry = (countryName) => {
  return {
    type: actionType.SELECT_COUNTRY,
    payload: countryName
  }
}

export const actionType = {
  LOAD_COUNTRIES: "LOAD_COUNTRIES",
  ADD_COUNTRY: "ADD_COUNTRY",
  SELECT_COUNTRY: "SELECT_COUNTRY",
}