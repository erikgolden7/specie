const axios = require('axios');

// Constants
const SET_BUDGET_TYPE = 'SET_BUDGET_TYPE';
const GET_BUDGET_TYPES = 'GET_BUDGET_TYPES';
const GET_CURRENT_BUDGETS = 'GET_CURRENT_BUDGETS';
const SET_CURRENT_BUDGET = 'SET_CURRENT_BUDGET';
const EDIT_CURRENT_BUDGET = 'EDIT_CURRENT_BUDGET';
const SELECT_BUDGET = 'SELECT_BUDGET';

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
    case `${SET_BUDGET_TYPE}_PENDING`:
      return { ...state, loading: true };
    case `${SET_BUDGET_TYPE}_FULFILLED`:
      return {
        ...state,
        loading: false,
        budgetTypes: [...action.payload]
      };

    case `${GET_BUDGET_TYPES}_PENDING`:
      return { ...state, loading: true };
    case `${GET_BUDGET_TYPES}_FULFILLED`:
      return {
        ...state,
        loading: false,
        budgetTypes: [...action.payload.data]
      };

    case `${GET_CURRENT_BUDGETS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_CURRENT_BUDGETS}_FULFILLED`:
      return {
        ...state,
        loading: false,
        currentBudgets: [...action.payload.data]
      };

    case `${SET_CURRENT_BUDGET}_PENDING`:
      return { ...state, loading: true };
    case `${SET_CURRENT_BUDGET}_FULFILLED`:
      return {
        ...state,
        loading: false,
        currentBudgets: [...action.payload.data]
      };

    case `${EDIT_CURRENT_BUDGET}_PENDING`:
      return { ...state, loading: true };
    case `${EDIT_CURRENT_BUDGET}_FULFILLED`:
      return {
        ...state,
        loading: false,
        selectedBudget: {}
      };
    case `${EDIT_CURRENT_BUDGET}_REJECTED`:
      return;

    case SELECT_BUDGET:
      return {
        ...state,
        selectedBudget: action.payload
      };

    default:
      return state;
  }
}

// Actions
export const addBudgetType = type => {
  return {
    type: SET_BUDGET_TYPE,
    payload: axios.post('/api/setBudgetType', type).catch(err => console.log(err))
  };
};

export const getBudgetTypes = () => {
  return {
    type: GET_BUDGET_TYPES,
    payload: axios.get('/api/getBudgetTypes').catch(err => console.log(err))
  };
};

export const getCurrentBudgets = () => {
  return {
    type: GET_CURRENT_BUDGETS,
    payload: axios.get('/api/getCurrentBudgets').catch(err => console.log(err))
  };
};

export const addCurrentBudget = budget => {
  const { type, light, amount } = budget.selected;

  return {
    type: SET_CURRENT_BUDGET,
    payload: axios
      .put(`/api/setCurrentBudget?type=${type}&light=${light}&amount=${amount}`)
      .catch(err => console.log(err))
  };
};

export const editCurrentBudget = (budget, newName, newAmount) => {
  const { type, light_color, amount } = budget;

  return {
    type: EDIT_CURRENT_BUDGET,
    payload: axios
      .put(
        `/api/editCurrentBudget?type=${type}&light=${light_color}&amount=${amount}&newAmount=${newAmount}&newName=${newName}`
      )
      .then(res => res.data)
      .catch(err => console.log(err))
  };
};

export const removeBudgetType = curr => {
  const { type, light_color, amount } = curr;

  return {
    payload: axios
      .delete(`/api/removeCurrentBudget?type=${type}&light=${light_color}&amount=${amount}`, type)
      .catch(err => console.log(err))
  };
};

export const selectBudget = budget => {
  return {
    type: SELECT_BUDGET,
    payload: budget
  };
};
