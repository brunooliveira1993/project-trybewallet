import { API_FAIL, API_SUCESS, API_REQUEST } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  loading: true,

};

const currenciesFunc = (apiRetur) => {
  const arr = [];
  Object.keys(apiRetur).forEach((item) => arr.push(item));
  arr.splice(1, 1);
  return arr;
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_REQUEST: return {
    ...state,
    loading: true,
  };
  case API_SUCESS: return {
    ...state,
    currencies: currenciesFunc(action.payload),
    ...action.payload,
  };
  case API_FAIL: return {
    ...state,
  };
  default: return state;
  }
};

export default wallet;
