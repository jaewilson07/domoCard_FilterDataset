import {
  CHANGE_DATEPICKER,
  SET_STORES,
  HAS_ERROR,
  GET_STORES,
  API,
  COLLECTION_NAME,
  POST_DATE,
} from './constant';

import { Domo } from '../utilities/domo';

const apiAction = ({
  url = '',
  body = '',
  method = 'POST',
  onSuccess,
  onFailure,
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

export const domoSql = {
  handleGetStores: () => {
    console.log('getting stores');
    return apiAction({
      url: '/sql/v1/dateList',
      method: 'POST',
      body: 'SELECT * FROM dateList limit 100',
      onSuccess: setStores,
      onFailure: failStores,
      label: GET_STORES,
    });
  },
};

export const appdb = {
  handlePostDate: (date) => {
    console.log('handling post date');
    const document = {
      content: {
        selectedDate: date,
        userId: Domo.env.userId,
      },
    };

    return apiAction({
      url: `/domo/datastores/v1/collections/${COLLECTION_NAME}/documents/`,
      method: 'POST',
      body: JSON.stringify(document),
      onSuccess: () => {},
      onFailure: () => {},
      label: POST_DATE,
    });
  },
};

export const setStores = (storeData) => {
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

export const failStores = (error) => {
  console.log('middleware error', error);
  return {
    type: SET_STORES,
    payload: { columns: ['StoreID'], rows: [] },
  };
};

export const onDateChange = (date) => {
  return {
    type: CHANGE_DATEPICKER,
    payload: date,
  };
};

export const catchError = (error, info) => ({
  type: HAS_ERROR,
  payload: { error, info },
});

// to sunset
// export const fetchDomoDetails = (url, body) => async (dispatch) => {
//   dispatch({ type: DOMO_PENDING });
//   try {
//     const data = await Domo.post(url, body, {
//       contentType: 'text/plain',
//     });

//     const colNames = data.columns;
//     const payload = data.rows.map((row) => {
//       const rowClean = row.reduce((accum, data, index) => {
//         accum[colNames[index]] = data;
//         return accum;
//       }, {});
//       return rowClean;
//     });

//     dispatch({ type: FETCH_STORES, payload: payload });
//   } catch (error) {
//     dispatch({ type: DOMO_ERROR, payload: error });
//   }
// };
// export const domoPending = () => ({
//   type: DOMO_PENDING,
//   payload: {},
// });

// export const domoSuccess = (data) => ({
//   type: DOMO_SUCCESS,
//   payload: data,
// });

// export const domoError = (error) => ({
//   type: DOMO_ERROR,
//   payload: error,
// });
