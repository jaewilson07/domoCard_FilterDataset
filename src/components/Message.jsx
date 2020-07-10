export function ConstructMessage(data, Id_Col) {
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
