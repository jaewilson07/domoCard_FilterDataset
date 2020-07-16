import React, { Component } from 'react';
import { connect } from 'react-redux';

import DatePicker from './components/DatePicker';
import { FilterRows } from './components/appFunctions';
import { ConstructMessage } from './components/Message';

import { onDateChange, catchError, domoSql, appdb } from './components/action';

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
    onDateChange: (date) => dispatch(onDateChange(date)),
    onError: (error, info) => dispatch(catchError(error, info)),
    handleGetStores: () => dispatch(domoSql.handleGetStores()),
    handlePostDate: (date) => dispatch(appdb.handlePostDate(date)),
  };
};

class App extends Component {
  componentDidMount() {
    this.props.handleGetStores();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    console.log('didupdate', this.props);
    if (this.props.selectedDate !== prevProps.selectedDate) {
      this.prop.handlePostDate(this.props.SelectedDate);
    }
  }

  render() {
    const { onDateChange, selectedDate, storeData, errorState } = this.props;

    if (storeData.length > 0) {
      const filteredData = FilterRows(
        storeData,
        selectedDate,
        'Open',
        'Closed'
      );
      ConstructMessage(filteredData, 'RowID');
    }

    return (
      <div className="App">
        <ErrorBoundary
          isError={errorState.isError}
          handleError={errorState.onError}
        >
          <DatePicker onDateChange={onDateChange} selectedDate={selectedDate} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
