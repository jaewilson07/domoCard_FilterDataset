import React, { Component } from 'react';
import { connect } from 'react-redux';

import DatePicker from './components/DatePicker';
import { FilterRows } from './components/appFunctions';
import { ConstructMessage } from './components/Message';

import { setDatePicker, catchError, getStores } from './components/action';

import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

const mapStateToProps = (state) => {
  return {
    selectedDate: state.dateState.selectedDate,
    storeData: state.storeState.storeData,
    errorState: {
      isError: state.errorState.isError,
      error: state.errorState.error,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDateChange: (date) => dispatch(setDatePicker(date)),
    onError: (error, info) => dispatch(catchError(error, info)),
    getStores: () => dispatch(getStores()),
  };
};

class App extends Component {
  constructor() {
    super();
    console.log('constructing');
  }
  componentDidMount() {
    this.props.getStores();
  }

  render() {
    console.log('render props', this.props);

    const { onDateChange, selectedDate, storeData, errorState } = this.props;

    if (storeData.length > 0) {
      const filteredData = FilterRows(
        storeData,
        selectedDate,
        'Open',
        'Closed'
      );
      const message = ConstructMessage(filteredData, 'RowID');
    }

    return (
      <div className="App">
        <ErrorBoundary
          isError={errorState.isError}
          handleError={errorState.onError}
        >
          <DatePicker
            handleDateChange={onDateChange}
            selectedDate={selectedDate}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
