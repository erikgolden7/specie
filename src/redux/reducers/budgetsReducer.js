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

const EDIT_CURRENT_BUDGET = 'EDIT_CURRENT_BUDGET';
const EDIT_CURRENT_BUDGET_PENDING = 'EDIT_CURRENT_BUDGET_PENDING';
const EDIT_CURRENT_BUDGET_FULFILLED = 'EDIT_CURRENT_BUDGET_FULFILLED';

const REMOVE_CURRENT_BUDGET = 'REMOVE_CURRENT_BUDGET';

const SELECT_BUDGET = 'SELECT_BUDGET';

const HANDLE_FLAG_TOGGLE = 'HANDLE_FLAG_TOGGLE';

const HANDLE_INPUT_CHANGE = 'HANDLE_INPUT_CHANGE';

// Initial State
const initialState = {
  loading: false,
  showTypes: false,
  showEdit: false,
  inputError: false,
  typeInput: '',
  nameInput: '',
  amountInput: '',
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

    case EDIT_CURRENT_BUDGET_PENDING:
      return Object.assign({}, state, { loading: true });
    case EDIT_CURRENT_BUDGET_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        nameInput: '',
        amountInput: '',
        selectedBudget: {}
      });

    case SELECT_BUDGET:
      console.log(action.payload);
      return Object.assign({}, state, {
        selectedBudget: action.payload
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
export const addBudgetType = type => {
  return {
    type: SET_BUDGET_TYPE,
    payload: axios
      .post('/api/setBudgetType', type)
      .then(res => res.data)
      .catch(err => console.log(err))
  };
};

export const getBudgetTypes = () => {
  return {
    type: GET_BUDGET_TYPES,
    payload: axios
      .get('/api/getBudgetTypes')
      .then(res => res.data)
      .catch(err => console.log(err))
  };
};

export const getCurrentBudgets = () => {
  return {
    type: GET_CURRENT_BUDGETS,
    payload: axios
      .get('/api/getCurrentBudgets')
      .then(res => res.data)
      .catch(err => console.log(err))
  };
};

export const addCurrentBudget = budget => {
  const { type, light, amount } = budget.selected;

  return {
    type: SET_CURRENT_BUDGET,
    payload: axios
      .put(`/api/setCurrentBudget?type=${type}&light=${light}&amount=${amount}`)
      .then(res => res.data)
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
      .delete(
        `/api/removeCurrentBudget?type=${type}&light=${light_color}&amount=${amount}`,
        type
      )
      .catch(err => console.log(err))
  };
};

export const selectBudget = budget => {
  return {
    type: SELECT_BUDGET,
    payload: budget
  };
};

export const flagToggle = menu => {
  return { type: HANDLE_FLAG_TOGGLE, payload: menu };
};

export const handleChange = e => {
  return {
    type: HANDLE_INPUT_CHANGE,
    payload: { name: e.target.name, value: e.target.value }
  };
};
