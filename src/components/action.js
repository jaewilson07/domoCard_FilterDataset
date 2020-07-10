import {
  CHANGE_DATEPICKER,
  SET_STORES,
  HAS_ERROR,
  API,
  API_START,
  API_END,
  API_ERROR,
  GET_STORES,
} from './constant';

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

const apiAction = ({ url = '', body = '', onSuccess, onFailure }) => {
  return {
    type: API,
    payload: {
      url,
      body,
      onSuccess,
      onFailure,
    },
  };
};

export const getStores = () => {
  return apiAction({
    url: '/sql/v1/dateList',
    body: 'SELECT * FROM dateList limit 100',
    onSuccess: setStores,
    onFailure: failStores,
    label: GET_STORES,
  });
};

export const setStores = (storeData) => {
  const colNames = storeData.columns;
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
export const setDatePicker = (date) => ({
  type: CHANGE_DATEPICKER,
  payload: date,
});

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
