const axios = require('axios');
const moment = require('moment');

// Constants
const SET_TRANSACTION_DATA = 'SET_TRANSACTION_DATA';
const GET_TRANSACTION_DATA = 'GET_TRANSACTION_DATA';
const SORT_TABLE_DATA = 'SORT_TABLE_DATA';
const EDIT_TRANSACTION_DATA = 'EDIT_TRANSACTION_DATA';

// Initial State
const initialState = {
  loading: false,
  transactions: []
};

// Reducer
export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_TRANSACTION_DATA}_PENDING`:
      return {
        ...state,
        loading: true
      };
    case `${SET_TRANSACTION_DATA}_FULFILLED`:
      return {
        ...state,
        loading: false
      };

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
    case `${GET_TRANSACTION_DATA}_REJECTED`:
      return {
        ...state,
        error: true,
        errorMessage: action.payload
      };

    case EDIT_TRANSACTION_DATA:
      return {
        ...state,
        transactions: [...action.payload.data]
      };

    case SORT_TABLE_DATA:
      return {
        ...state,
        transactions: action.payload
      };

    default:
      return state;
  }
}

// Actions
export function setTransactionFormData(type, date, location, amount) {
  const formatDate = {
    month: moment(date).format('MM'),
    day: moment(date).format('DD'),
    year: moment(date).format('YYYY')
  };

  return {
    type: SET_TRANSACTION_DATA,
    payload: axios.post('/api/setTransactions', {
      type,
      date,
      formatDate,
      location,
      amount
    })
  };
}

export const getTransactionData = () => {
  return {
    type: GET_TRANSACTION_DATA,
    payload: axios.get('/api/getTransactionData')
  };
};

export const editTransactionData = (id, type, location, amount, date) => {
  // type, date, location, amount, formatDate.month, formatDate.day, formatDate.year
  console.log(id, type, date, location, amount);

  const formatDate = {
    month: Number(moment(date).format('MM')),
    day: Number(moment(date).format('DD')),
    year: Number(moment(date).format('YYYY'))
  };

  console.log(formatDate);

  return {
    type: EDIT_TRANSACTION_DATA,
    payload: axios.put('/api/editTransactionData', {
      id,
      type,
      location,
      amount,
      date,
      formatDate
    })
  };
};

export const sortData = data => {
  return {
    type: SORT_TABLE_DATA,
    payload: data
  };
};
