import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case ADD_EMAIL:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
};

export default user;
