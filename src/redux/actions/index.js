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

// const receiveApiSucess = (response) => ({
//   type: API_SUCESS,
//   payload: response,
// });

const receiveApiFail = (erro) => ({
  type: API_FAIL,
  erro,
});

export const newEntreisWalletApi = (payload) => async (dispatch) => {
  dispatch(apiRequestInfo());
  try {
    const response = await getWalletApi();
    // dispatch(receiveApiSucess(response));
    dispatch(newEntries(payload, response));
  } catch (error) {
    dispatch(receiveApiFail(error));
  }
};
