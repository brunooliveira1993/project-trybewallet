import { API_FAIL, API_REQUEST, NEW_ENTRIES, SEND_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  loading: true,
  apiRetur: [], // array dos objetos retornados pela api
  total: 0.00,
};

const newEntriesWallet = (estado, payload, apiReturn) => {
  delete payload.arr;
  const arr = [...estado.expenses, { ...payload, exchangeRates: apiReturn }];
  return arr;
};

const totalWallet = (payload, apiRetur, estado) => {
  const { value } = payload;
  const { currency } = payload;
  const arr = [];
  Object.entries(apiRetur).forEach((item) => arr.push(item));
  const currencyValue = arr.find((item) => item[1].code === currency);
  const conversion = Number(value) * Number(currencyValue[1].ask);
  const result = conversion + estado.total;
  return Number(result.toFixed(2));
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_REQUEST: return {
    ...state,
    loading: true,
  };
  case SEND_CURRENCIES: return {
    ...state,
    currencies: action.payload,
  };
  case API_FAIL: return {
    ...state,
  };
  case NEW_ENTRIES: return {
    ...state,
    // currencies: action.payload.arr,
    expenses: newEntriesWallet(state, action.payload, action.apiReturn),
    total: totalWallet(action.payload, action.apiReturn, state),
  };
  default: return state;
  }
};

export default wallet;
