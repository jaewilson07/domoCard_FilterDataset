import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import apiMiddleware from './middleware';

import {
  documentState,
  userState,
  dateState,
  storeState,
  errorState,
} from '../components/reduce';

const logger = createLogger();
const rootReducer = combineReducers({
  documentState,
  userState,
  dateState,
  storeState,
  errorState,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger, apiMiddleware)
);

export default store;
