const axios = require('axios');
const moment = require('moment');

// Constants
const SET_TRANSACTION_DATA = 'SET_TRANSACTION_DATA';
const HANDLE_FLAG_TOGGLE = 'HANDLE_FLAG_TOGGLE';
const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';

// Initial State
const initialState = {
  showModal: false,
  date: moment(),
  budgetType: '',
  location: '',
  amount: 0
};

// Reducer
export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTION_DATA:
      return Object.assign({}, state, action.payload);

    case HANDLE_FLAG_TOGGLE:
      return {
        ...state,
        showModal: !state.showModal
      };

    case HANDLE_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };

    default:
      return state;
  }
}

// Actions
export function setTransactionFormData(budgetType, formatDate, location, amount) {
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

export const flagToggle = () => {
  return { type: HANDLE_FLAG_TOGGLE };
};

export const handleChange = e => {
  return {
    type: HANDLE_INPUT_CHANGE,
    payload: { name: e.target.name, value: e.target.value }
  };
};

// const formatDate = moment(initialState.date).format('M/D/YY');
