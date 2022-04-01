import { GET_CURRENCIES, STORE_EXPENSE } from '../actions';

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

const wallet = (state = INITIAL_STATE, { type, acronym, expense }) => {
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

  default:
    return state;
  }
};

export default wallet;
