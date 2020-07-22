import { COLLECTION } from './constant';
import appdb from '../utilities/appdb';

export function filterRows(data_obj, SelectedDate, StartDate_Col, EndDate_Col) {
  return data_obj.filter(
    (row) =>
      Date.parse(row[StartDate_Col]) <= SelectedDate &&
      Date.parse(row[EndDate_Col]) >= SelectedDate
  );
}

export function postMessage(data, Id_Col) {
  const filter_array = data.map((row) => {
    return row[Id_Col];
  });

  const message = {
    event: 'filter',
    filter: [],
  };

  message.filter.push({
    columnName: Id_Col,
    operator: 'IN',
    values: filter_array,
    dataType: 'numeric',
  });

  window.parent.postMessage(JSON.stringify(message), '*');

  return message;
}

export const writeStateDocument = async (
  date,
  userId,
  updateType = COLLECTION.UPDATE_TYPE.POST,
  documentId = ''
) => {
  //update appDB
  const document = {
    content: { userId: userId, selectedDate: date },
  };

  console.log('writeStateDocument', document);

  let resp = {};

  try {
    switch (updateType) {
      case COLLECTION.UPDATE_TYPE.PUT:
        console.log('update record', documentId);
        resp = await appdb.updateDocument(document, documentId);
        break;
      default:
        resp = await appdb.postDocument(document);
        break;
    }
  } catch (error) {
    console.error(error);
  } finally {
    return resp;
  }
};
