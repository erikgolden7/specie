import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import budgetsReducer from './reducers/budgetsReducer';
import transactionsReducer from './reducers/transactionsReducer';

const rootReducer = combineReducers({ budgetsReducer, transactionsReducer });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
);

export default store;
