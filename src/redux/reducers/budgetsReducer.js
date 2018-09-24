const axios = require('axios');

// Constants
const SET_BUDGET_TYPE = 'SET_BUDGET_TYPE';
const SET_BUDGET_TYPE_PENDING = 'SET_BUDGET_TYPE_PENDING';
const SET_BUDGET_TYPE_FULFILLED = 'SET_BUDGET_TYPE_FULFILLED';

const GET_BUDGET_TYPES = 'GET_BUDGET_TYPES';
const GET_BUDGET_TYPES_PENDING = 'GET_BUDGET_TYPES_PENDING';
const GET_BUDGET_TYPES_FULFILLED = 'GET_BUDGET_TYPES_FULFILLED';

const GET_CURRENT_BUDGETS = 'GET_CURRENT_BUDGETS';
const GET_CURRENT_BUDGETS_PENDING = 'GET_CURRENT_BUDGETS_PENDING';
const GET_CURRENT_BUDGETS_FULFILLED = 'GET_CURRENT_BUDGETS_FULFILLED';

const SET_CURRENT_BUDGET = 'SET_CURRENT_BUDGET';
const SET_CURRENT_BUDGET_PENDING = 'SET_CURRENT_BUDGET_PENDING';
const SET_CURRENT_BUDGET_FULFILLED = 'SET_CURRENT_BUDGET_FULFILLED';

const HANDLE_FLAG_TOGGLE = 'HANDLE_FLAG_TOGGLE';

const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';

// Initial State
const initialState = {
  loading: false,
  showTypes: false,
  showEdit: false,
  inputError: false,
  typeInput: '',
  budgetTypes: [],
  currentBudgets: [],
  selectedBudget: {}
};

// Reducer
export default function budgetsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUDGET_TYPE_PENDING:
      return Object.assign({}, state, { loading: true });
    case SET_BUDGET_TYPE_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        typeInput: '',
        showEdit: false,
        showTypes: true,
        inputError: false,
        budgetTypes: [...action.payload]
      });

    case GET_BUDGET_TYPES_PENDING:
      return Object.assign({}, state, { loading: true });
    case GET_BUDGET_TYPES_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        budgetTypes: [...action.payload]
      });

    case GET_CURRENT_BUDGETS_PENDING:
      return Object.assign({}, state, { loading: true });
    case GET_CURRENT_BUDGETS_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        currentBudgets: [...action.payload]
      });

    case SET_CURRENT_BUDGET_PENDING:
      return Object.assign({}, state, { loading: true });
    case SET_CURRENT_BUDGET_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        currentBudgets: [...action.payload]
      });

    case HANDLE_FLAG_TOGGLE:
      return Object.assign({}, state, {
        [action.payload]: !state[action.payload]
      });

    case HANDLE_INPUT_CHANGE:
      return Object.assign({}, state, {
        [action.payload.name]: action.payload.value
      });

    default:
      return state;
  }
}

// Actions
export function addBudgetType(type) {
  return {
    type: SET_BUDGET_TYPE,
    payload: axios
      .post('/api/setBudgetType', type)
      .then(res => res.data)
      .catch(err => console.log(err))
  };
}

export function getBudgetTypes() {
  return {
    type: GET_BUDGET_TYPES,
    payload: axios
      .get('/api/getBudgetTypes')
      .then(res => res.data)
      .catch(err => console.log(err))
  };
}

export function getCurrentBudgets() {
  return {
    type: GET_CURRENT_BUDGETS,
    payload: axios
      .get('/api/getCurrentBudgets')
      .then(res => res.data)
      .catch(err => console.log(err))
  };
}

export const addCurrentBudget = budget => {
  // budgets: tempBudgets,
  // types: tempTypes,
  // selected: {
  //   type: type,
  //   light: color.light,
  //   dark: color.dark
  // }
  const { type, light, amount } = budget.selected;

  return {
    type: SET_CURRENT_BUDGET,
    payload: axios
      .put(`/api/setCurrentBudget?type=${type}&light=${light}&amount=${amount}`)
      .then(res => res.data)
      .catch(err => console.log(err))
  };
};

export function flagToggle(menu) {
  return { type: HANDLE_FLAG_TOGGLE, payload: menu };
}

export function handleChange(e) {
  return {
    type: HANDLE_INPUT_CHANGE,
    payload: { name: e.target.name, value: e.target.value }
  };
}
