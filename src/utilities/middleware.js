import { API } from '../components/constant';
import { Domo } from './domo';
import { apiStart, apiEnd, apiError } from '../components/action';

const apiMiddleware = ({ dispatch }) => (next) => async (action) => {
  next(action);

  if (action.type !== API) return;

  const { url, body, onSuccess, onFailure, label } = action.payload;

  // const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';
  if (label) {
    dispatch(apiStart(label));
  }

  const data = await Domo.post(url, body, {
    contentType: 'text/plain',
  });
  console.log('my middleware', data);

  try {
    dispatch(onSuccess(data));
  } catch (error) {
    dispatch(onFailure(error));
    dispatch(apiError(error));
  } finally {
    if (label) {
      dispatch(apiEnd(label));
    }
  }
};

export default apiMiddleware;
