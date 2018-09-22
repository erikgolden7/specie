const axios = require('axios');

// Constants
const SET_TRANSACTION_DATA = 'SET_TRANSACTION_DATA';

// Initial State
const initialState = {};

// Reducer
export default function budgetReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTION_DATA:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

// Actions
export function setTransactionFormData(
  budgetType,
  formatDate,
  location,
  amount
) {
  return {
    type: SET_TRANSACTION_DATA,
    payload: axios
      .post('/api/setTransactions', {
        type: budgetType,
        date: formatDate,
        location: location,
        amount: amount
      })
      .then(res => console.log(res))
  };
}
