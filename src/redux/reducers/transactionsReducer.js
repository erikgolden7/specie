const axios = require('axios');
const moment = require('moment');

// Constants
const SET_TRANSACTION_DATA = 'SET_TRANSACTION_DATA';
const HANDLE_FLAG_TOGGLE = 'HANDLE_FLAG_TOGGLE';
const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';
const GET_TRANSACTION_DATA = 'GET_TRANSACTION_DATA';
const HANDLE_DATE_CHANGE = 'HANDLE_DATE_CHANGE';
const VALIDATE_TRANSACTION_FORM = 'VALIDATE_TRANSACTION_FORM';

// Initial State
const initialState = {
  loading: false,
  transactionModal: false,
  date: moment(),
  budgetType: '',
  location: '',
  amount: 0,
  transactions: [],
  error: false,
  formErrors: {
    budgetErr: false,
    locErr: false,
    amtErr: false
  }
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
        loading: false,
        date: moment(),
        budgetType: '',
        location: '',
        amount: 0
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

    case HANDLE_FLAG_TOGGLE:
      return {
        ...state,
        transactionModal: !state.transactionModal
      };

    case HANDLE_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        formErrorMessage: action.payload.errorMessage
      };

    case HANDLE_DATE_CHANGE:
      return {
        ...state,
        date: action.payload
      };

    case VALIDATE_TRANSACTION_FORM:
      return {
        ...state,
        formErrors: action.payload
      };

    default:
      return state;
  }
}

// Actions
export function setTransactionFormData(budgetType, formatDate, location, amount) {
  return {
    type: SET_TRANSACTION_DATA,
    payload: axios.post('/api/setTransactions', {
      type: budgetType,
      date: formatDate,
      location: location,
      amount: amount
    })
  };
}

export const flagToggle = () => {
  return { type: HANDLE_FLAG_TOGGLE };
};

export const handleChange = e => {
  let errorMessage = '';
  let isError = false;

  if (!e.target.value) {
    console.log('hit');

    errorMessage = `${e.target.name} cannot be blank`;
    isError = true;
  }
  return {
    type: HANDLE_INPUT_CHANGE,
    payload: { name: e.target.name, value: e.target.value, errorMessage: errorMessage, isError: isError }
  };
};

export const handleDate = date => {
  return {
    type: HANDLE_DATE_CHANGE,
    payload: date
  };
};

export const getTransactionData = () => {
  return {
    type: GET_TRANSACTION_DATA,
    payload: axios.get('/api/getTransactionData')
  };
};

export const transactionFormValidation = err => {
  console.log(err);

  return {
    type: VALIDATE_TRANSACTION_FORM,
    payload: err
  };
};
