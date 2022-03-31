import { GET_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const wallet = (state = INITIAL_STATE, { type, acronym }) => {
  switch (type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: acronym,
    };

  default:
    return state;
  }
};

export default wallet;
