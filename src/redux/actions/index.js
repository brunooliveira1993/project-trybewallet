const BASE_URL = 'https://economia.awesomeapi.com.br/json/all';

export const getWalletApi = async () => {
  const response = await fetch(BASE_URL);
  const json = await response.json();
  return json;
};

export const USER_LOGIN = 'USER_LOGIN';
export const API_REQUEST = 'API_REQUEST';
export const API_SUCESS = 'API_SUCESS';
export const API_FAIL = 'API_FAIL';
export const NEW_ENTRIES = 'NEW_ENTRIES';
export const SEND_CURRENCIES = 'SEND_CURRENCIES';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const SUBSTITUT_ITEM = 'SUBSTITUT_ITEM';

export const substitutEntries = (payload, apiReturn) => ({
  type: SUBSTITUT_ITEM,
  payload,
  apiReturn,
});

export const editItem = (id, value) => ({
  type: EDIT_ITEM,
  id,
  value,
});

export const removeItem = (id) => ({
  type: REMOVE_ITEM,
  id,
});

export const newEntries = (payload, apiReturn) => ({
  type: NEW_ENTRIES,
  payload,
  apiReturn,
});

export const sendEmailInfo = (payload) => ({
  type: USER_LOGIN,
  payload,
});

const apiRequestInfo = () => ({
  type: API_REQUEST,
});

export const sendCurrencies = (payload) => ({
  type: SEND_CURRENCIES,
  payload,
});

const receiveApiFail = (erro) => ({
  type: API_FAIL,
  erro,
});

export const newEntreisWalletApi = (payload) => async (dispatch) => {
  dispatch(apiRequestInfo());
  try {
    const response = await getWalletApi();
    dispatch(newEntries(payload, response));
  } catch (error) {
    dispatch(receiveApiFail(error));
  }
};

export const substitutEntreisWalletApi = (payload) => async (dispatch) => {
  dispatch(apiRequestInfo());
  try {
    const response = await getWalletApi();
    dispatch(substitutEntries(payload, response));
  } catch (error) {
    dispatch(receiveApiFail(error));
  }
};
