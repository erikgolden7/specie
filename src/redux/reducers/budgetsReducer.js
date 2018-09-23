const axios = require('axios');

// Constants
const SET_BUDGET_TYPE = 'SET_BUDGET_TYPE';

const GET_BUDGET_TYPES = 'GET_BUDGET_TYPES';
const GET_BUDGET_TYPES_PENDING = 'GET_BUDGET_TYPES_PENDING';
const GET_BUDGET_TYPES_FULFILLED = 'GET_BUDGET_TYPES_FULFILLED';

// Initial State
const initialState = {
  loading: false,
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

    default:
      return state;
  }
}

// Actions
export function saveBudgetType(type) {
  return {
    type: SET_BUDGET_TYPE,
    payload: axios.post('/api/setBudgetType', { type })
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
