import { writeStateDocument } from './appFunctions';
import appdb from '../utilities/appdb';

import {
  UPDATE_DATE,
  SET_STORES,
  HAS_ERROR,
  GET_STORES,
  API,
  GET_STATE_PENDING,
  GET_STATE_ERROR,
  GET_STATE_SUCCESS,
  GET_STATE_END,
  COLLECTION,
} from './constant';

const apiAction = ({
  url = '',
  body = '',
  method = 'POST',
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  return {
    type: API,
    payload: {
      url,
      body,
      method,
      onSuccess,
      onFailure,
    },
  };
};

export const domoSql = () => {};
domoSql.getStores = () => {
  console.log('getting stores');
  return apiAction({
    url: '/sql/v1/dateList',
    method: 'POST',
    body: 'SELECT * FROM dateList limit 100',
    onSuccess: setStores,
    onFailure: failStores,
    label: GET_STORES,
  });
};

export const setStores = (storeData) => {
  console.log(storeData);
  const colNames = storeData.columns;

  //get the payload
  const payload = storeData.rows.map((row) => {
    const rowClean = row.reduce((accum, data, index) => {
      accum[colNames[index]] = data;
      return accum;
    }, {});
    return rowClean;
  });

  return {
    type: SET_STORES,
    payload: payload,
  };
};

export const getStateDocument = (userId, date = new Date()) => (dispatch) => {
  appdb
    .getDocuments()
    .then((resp) => {
      console.log('getState doc resp', resp);
      let thisUserState = resp.filter((doc) => doc.content.userId === userId);

      if (thisUserState.length > 0) {
        thisUserState = { ...thisUserState[0] };
        dispatch({
          type: GET_STATE_SUCCESS,
          payload: thisUserState.id,
        });
        dispatch({
          type: UPDATE_DATE,
          payload: thisUserState.content.selectedDate,
        });
      } else {
        dispatch({ type: GET_STATE_PENDING });
        writeStateDocument(date, userId, COLLECTION.UPDATE_TYPE.POST).then(
          (resp) =>
            dispatch({
              type: GET_STATE_SUCCESS,
              payload: resp.id,
            })
        );
      }
    })
    .catch((error) => {
      dispatch({ type: GET_STATE_END, payload: 'hello' });
      dispatch({ type: GET_STATE_ERROR, payload: error });
    });
};

export const failStores = (error) => {
  console.log('middleware error', error);
  return {
    type: SET_STORES,
    payload: { columns: ['StoreID'], rows: [] },
  };
};

export const onDateChange = (date) => {
  //define the new state
  return {
    type: UPDATE_DATE,
    payload: date,
  };
};

export const catchError = (error, info) => ({
  type: HAS_ERROR,
  payload: { error, info },
});
