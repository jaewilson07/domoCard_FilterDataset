import { API } from '../components/constant';
import { Domo } from './domo';
import { apiStart, apiEnd, apiError } from './api/api';

const apiMiddleware = ({ dispatch }) => (next) => async (action) => {
  next(action);

  if (action.type !== API) return;

  const { url, body, onSuccess, method, onFailure, label } = action.payload;

  if (label) {
    dispatch(apiStart(label));
  }

  const data = async () => {
    switch (method) {
      case 'POST': {
        return await Domo.post(url, body, {
          contentType: 'text/plain',
        });
      }
      default:
        return [];
    }
  };

  try {
    dispatch(onSuccess(data));
  } catch (error) {
    dispatch(onFailure(error.message));
    dispatch(apiError(error.message));
  } finally {
    if (label) {
      dispatch(apiEnd(label));
    }
  }
};

export default apiMiddleware;
