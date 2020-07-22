import {
  UPDATE_USER,
  UPDATE_DATE,
  GET_STORES,
  SET_STORES,
  GET_STATE_PENDING,
  GET_STATE_SUCCESS,
  GET_STATE_ERROR,
  GET_STATE_END,
  API_START,
  API_END,
  HAS_ERROR,
} from './constant';

import domo from '../utilities/domo';

// let stateDocumentId = '';
const documentInitial = {
  isPending: false,
  documentStateId: '',
  error: '',
};

export const documentState = (state = documentInitial, action = {}) => {
  switch (action.type) {
    case GET_STATE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case GET_STATE_SUCCESS:
    case GET_STATE_END:
      return Object.assign({}, state, {
        documentStateId: action.payload,
        isPending: false,
      });
    case GET_STATE_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        isPending: false,
      });
    default:
      return state;
  }
};

export const userInitial = {
  userId: domo.env.userId ? domo.env.userId : 'defaultUser',
};

export const userState = (state = userInitial, action = {}) => {
  switch (action.type) {
    case UPDATE_USER:
      return Object.assign({}, state, { userId: action.payload });
    default:
      return state;
  }
};

const dateInitial = {
  selectedDate: new Date(),
};

export const dateState = (state = dateInitial, action = {}) => {
  switch (action.type) {
    case UPDATE_DATE:
      return Object.assign({}, state, { selectedDate: action.payload });
    default:
      return state;
  }
};

const initialStore = {
  storeData: [],
  isLoadingData: false,
};

export const storeState = (state = initialStore, action = {}) => {
  switch (action.type) {
    case SET_STORES:
      return Object.assign({}, state, { storeData: action.payload });
    case API_START:
      if (action.payload === GET_STORES) {
        return Object.assign({}, state, { isLoadingData: true });
      }
      break;
    case API_END:
      if (action.payload === GET_STORES) {
        return Object.assign({}, state, { isLoadingData: false });
      }
      break;
    default:
      return state;
  }
};

const initialError = {
  error: '',
  isError: false,
};

export const errorState = (state = initialError, action = {}) => {
  switch (action.type) {
    case HAS_ERROR:
      return Object.assign({}, state, {
        error: action.payload,
        isError: true,
      });
    default:
      return state;
  }
};
