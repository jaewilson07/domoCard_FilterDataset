import { API } from '../components/constant';
import domo from './domo';
import { apiStart, apiEnd, apiError } from './api/api';

const apiMiddleware = ({ dispatch }) => (next) => (action) => {
  next(action);

  if (action.type !== API) return;

  const { url, body, onSuccess, method, onFailure, label } = action.payload;

  if (label) {
    dispatch(apiStart(label));
  }
  domo
    .post(url, body, {
      contentType: 'text/plain',
    })
    .then((data) => {
      dispatch(onSuccess(data));
    })
    .catch((error) => {
      dispatch(onFailure(error.message));
      dispatch(apiError(error.message));
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
