import { USER_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
  senha: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN: return {
    ...state,
    ...action.payload,
  };
  default: return state;
  }
};

export default user;
