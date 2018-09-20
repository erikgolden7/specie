// // Constants
// const SET_BUDGET_TYPE = 'SET_BUDGET_TYPE';

// // Initial State
// const initialState = {
//   budgetTypes: [],
//   currentBudgets: [],
//   selectedBudget: {}
// };

// // Reducer
// export default function budgetReducer(state = initialState, action) {
//   switch (action.type) {
//     case SET_BUDGET_TYPE:
//       return Object.assign({}, state, action.payload);

//     default:
//       return state;
//   }
// }

// // Actions
// export function saveBudgetType(type) {
//   return {
//     type: SET_BUDGET_TYPE,
//     payload: type
//   };
// }
