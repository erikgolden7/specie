const axios = require('axios');
const moment = require('moment');

// Constants
const SET_TRANSACTION_DATA = 'SET_TRANSACTION_DATA';
const HANDLE_FLAG_TOGGLE = 'HANDLE_FLAG_TOGGLE';
const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';
const GET_TRANSACTION_DATA = 'GET_TRANSACTION_DATA';

// Initial State
const initialState = {
  loading: false,
  showModal: false,
  date: moment(),
  budgetType: '',
  location: '',
  amount: 0,
  transactions: []
};

// Reducer
export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TRANSACTION_DATA:
      return Object.assign({}, state, action.payload);

    case `${GET_TRANSACTION_DATA}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${GET_TRANSACTION_DATA}_FULFILLED`:
      return {
        ...state,
        loading: false,
        transactions: [...action.payload.data]
      };

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

export const getTransactionData = () => {
  return {
    type: GET_TRANSACTION_DATA,
    payload: axios.get('/api/getTransactionData')
  };
};

// const formatDate = moment(initialState.date).format('M/D/YY');
