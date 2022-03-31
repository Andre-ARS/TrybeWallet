export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
const ALL_CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';

export const addEmail = (email) => ({ type: ADD_EMAIL, email });

export const getCurrencies = (acronym) => ({ type: GET_CURRENCIES, acronym });

export const fetchCurrencies = () => async (dispatch) => {
  const response = await fetch(ALL_CURRENCIES_URL);
  const result = await response.json();
  const acronyms = Object.keys(result).filter((code) => code !== 'USDT');

  return dispatch(getCurrencies(acronyms));
};
