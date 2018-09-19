import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import budgetsReducer from './reducers/budgetsReducer';

const rootReducer = combineReducers({ budgetsReducer });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
);

export default store;
