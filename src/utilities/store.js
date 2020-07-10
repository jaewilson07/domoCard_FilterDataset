import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import apiMiddleware from './middleware';

import {
  dateState,
  // requestDomoState,
  storeState,
  errorState,
} from '../components/reduce';

const logger = createLogger();
const rootReducer = combineReducers({
  dateState,
  //requestDomoState,
  storeState,
  errorState,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger, apiMiddleware)
);

export default store;
