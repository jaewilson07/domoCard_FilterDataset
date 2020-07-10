export function FilterRows(data_obj, SelectedDate, StartDate_Col, EndDate_Col) {
  return data_obj.filter(
    (row) =>
      Date.parse(row[StartDate_Col]) <= SelectedDate &&
      Date.parse(row[EndDate_Col]) >= SelectedDate
  );
}
