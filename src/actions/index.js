export const ADD_EMAIL = 'ADD_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const STORE_EXPENSE = 'STORE_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';
export const GET_TOTAL = 'GET_TOTAL';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDITOR_MODE = 'EDITOR_MODE';
const ALL_CURRENCIES_URL = 'https://economia.awesomeapi.com.br/json/all';

export const addEmail = (email) => ({ type: ADD_EMAIL, email });

export const getCurrencies = (acronym) => ({
  type: GET_CURRENCIES,
  acronym: Object.keys(acronym).filter((code) => code !== 'USDT'),
});

export const fetchCurrencies = (callBack, state = {}) => async (dispatch) => {
  const response = await fetch(ALL_CURRENCIES_URL);
  const result = await response.json();

  return dispatch(callBack(result, state));
};

export const storeExpense = (currencies, expense) => ({
  type: STORE_EXPENSE,
  expense: { ...expense, exchangeRates: currencies },
});

export const deleteExpense = (actionId) => ({ type: DEL_EXPENSE, actionId });
export const getTotal = () => ({ type: GET_TOTAL });
export const editorMode = (actionId, editorExpense) => ({
  type: EDITOR_MODE,
  actionId,
  editorExpense,
});

export const editExpense = (actionState) => ({ type: EDIT_EXPENSE, actionState });
