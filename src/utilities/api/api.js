import { API_START, API_END, API_ERROR } from '../../components/constant';

export const apiStart = (label) => ({
  type: API_START,
  payload: label,
});

export const apiEnd = (label) => ({
  type: API_END,
  payload: label,
});

export const apiError = (error) => ({
  type: API_ERROR,
  payload: error,
});
