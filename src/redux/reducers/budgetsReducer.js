const axios = require('axios');

// Constants
const SET_BUDGET_TYPE = 'SET_BUDGET_TYPE';

const GET_BUDGET_TYPES = 'GET_BUDGET_TYPES';
const GET_BUDGET_TYPES_PENDING = 'GET_BUDGET_TYPES_PENDING';
const GET_BUDGET_TYPES_FULFILLED = 'GET_BUDGET_TYPES_FULFILLED';

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
    case SET_BUDGET_TYPE:
      return Object.assign({}, state, {
        budgetTypes: [...state.budgetTypes, ...action.payload]
      });

    case GET_BUDGET_TYPES_PENDING:
      return Object.assign({}, state, { loading: true });
    case GET_BUDGET_TYPES_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        budgetTypes: [...action.payload]
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
export function addBudgetType(typeData) {
  return {
    type: SET_BUDGET_TYPE,
    payload: axios
      .post('/api/setBudgetType', typeData)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err))
  };
}

export function getBudgetTypes() {
  return {
    type: GET_BUDGET_TYPES,
    payload: axios
      .get('/api/getBudgetTypes')
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err))
  };
}

export function flagToggle(menu) {
  return { type: HANDLE_FLAG_TOGGLE, payload: menu };

  // if (menu === 'editModal') {
  //   return { type: SHOW_EDIT_MENU_TOGGLE, payload: menu };
  // } else if (menu === 'showTypes') {
  //   return { type: SHOW_TYPES_TOGGLE, payload: menu };
  // } else if (menu === 'inputError') {
  //   return { type: INPUT_ERROR_TOGGLE, payload: menu };
  // }
}

export function handleChange(e) {
  return {
    type: HANDLE_INPUT_CHANGE,
    payload: { name: e.target.name, value: e.target.value }
  };
}
