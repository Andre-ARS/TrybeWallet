import { DEL_EXPENSE, GET_CURRENCIES, GET_TOTAL, STORE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const sumTotal = (expenses) => {
  let total = 0;
  expenses.forEach(({ exchangeRates, currency, value }) => {
    const { ask } = exchangeRates[currency];
    const mult = ask * value;
    total += mult;
  });
  return total.toFixed(2);
};

const wallet = (state = INITIAL_STATE, { type, acronym, expense, actionId }) => {
  switch (type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: acronym,
    };
  case STORE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, expense],
      total: sumTotal([...state.expenses, expense]),
    };
  case DEL_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== actionId),
      total: sumTotal(state.expenses.filter(({ id }) => id !== actionId)),
    };
  case GET_TOTAL:
    return {
      ...state,
      total: sumTotal(state.expenses),
    };
  default:
    return state;
  }
};

export default wallet;
