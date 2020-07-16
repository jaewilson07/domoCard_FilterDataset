import {
  CHANGE_DATEPICKER,
  GET_STORES,
  SET_STORES,
  API_START,
  API_END,
  HAS_ERROR,
} from './constant';

const dateInitial = {
  selectedDate: new Date(),
};

export const dateState = (state = dateInitial, action = {}) => {
  switch (action.type) {
    case CHANGE_DATEPICKER:
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

// const initialDomoRequest = {
//   isPending: false,
//   data: [],
//   error: '',
// };
// export const requestDomoState = (state = initialDomoRequest, action = {}) => {
//   switch (action.type) {
//     case DOMO_PENDING:
//       return Object.assign({}, state, { isPending: true });

//     case DOMO_SUCCESS:
//       return Object.assign({}, state, {
//         data: action.payload,
//         isPending: false,
//       });
//     case DOMO_ERROR:
//       return Object.assign({}, state, {
//         error: action.payload,
//         isPending: false,
//       });
//     default:
//       return state;
//   }
// };
