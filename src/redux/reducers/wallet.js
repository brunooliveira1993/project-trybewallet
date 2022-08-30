import { API_FAIL, API_REQUEST, NEW_ENTRIES, SEND_CURRENCIES,
  REMOVE_ITEM,
  EDIT_ITEM,
  SUBSTITUT_ITEM } from '../actions';

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

const substitutEntriesWallet = (estado, payload, apiReturn) => {
  delete payload.arr;
  const prevState = estado.expenses.filter((item) => item.id !== Number(estado.idToEdit));
  const arr = [{ ...payload, exchangeRates: apiReturn }, ...prevState];
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

const removeItemOfList = (estado, id) => {
  const newArr = estado.expenses.filter((item) => item.id !== Number(id));
  return newArr;
};

const totalAtualization = (estado, id) => {
  const defalttValue = '0.00';
  const oldTotal = estado.total;
  const removeItem = estado.expenses.filter((item) => item.id === Number(id));
  const removeValue = removeItem[0].value;
  const { currency } = removeItem[0];
  const currencyInfo = removeItem[0].exchangeRates;
  const arr = [];
  Object.entries(currencyInfo).forEach((item2) => arr.push(item2));
  const currencyValue = arr.find((item3) => item3[1].code === currency);
  const convertValue = Number(removeValue) * Number(currencyValue[1].ask);
  const result = oldTotal - Number(convertValue.toFixed(2));
  if (result === 0) {
    return defalttValue;
  }
  return Number(result.toFixed(2));
};

const editTotalWallet = (estado, payload) => {
  const sub = Number(estado.total) - Number(estado.editValue);
  const { value, currency } = payload;
  const { exchangeRates } = estado.expenses[0];
  const arr = [];
  Object.entries(exchangeRates).forEach((item) => arr.push(item));
  const currencyValue = arr.find((item) => item[1].code === currency);
  const conversion = Number(value) * Number(currencyValue[1].ask);
  const result = Number(sub) + conversion;
  return Number(result.toFixed(2));
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBSTITUT_ITEM: return {
    ...state,
    expenses: substitutEntriesWallet(state, action.payload, action.apiReturn),
    editor: false,
    idToEdit: 0,
    total: editTotalWallet(state, action.payload),
    // teste: editTotalWallet(action.payload, state),
  };
  case EDIT_ITEM: return {
    ...state,
    editor: true,
    idToEdit: action.id,
    editValue: action.value,
  };
  case REMOVE_ITEM: return {
    ...state,
    expenses: removeItemOfList(state, action.id),
    total: totalAtualization(state, action.id),
  };
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
    expenses: newEntriesWallet(state, action.payload, action.apiReturn),
    total: totalWallet(action.payload, action.apiReturn, state),
  };
  default: return state;
  }
};

export default wallet;
