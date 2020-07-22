import React, { Component } from 'react';
import { connect } from 'react-redux';

import DatePicker from './components/DatePicker';
import {
  filterRows,
  writeStateDocument,
  postMessage,
} from './components/appFunctions';

import ErrorBoundary from './components/ErrorBoundary';

import {
  catchError,
  domoSql,
  onDateChange,
  getStateDocument,
} from './components/action';

import { COLLECTION } from './components/constant';

import './App.css';

const mapStateToProps = (state) => {
  return {
    docState: state.documentState,
    selectedDate: state.dateState.selectedDate,
    documentStateId: state.documentState.documentStateId,
    userId: state.userState.userId,

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
    getStores: () => dispatch(domoSql.getStores()),
    getStateDocument: (userId, date) =>
      dispatch(getStateDocument(userId, date)),
  };
};

class App extends Component {
  componentDidMount() {
    const { userId, selectedDate, getStateDocument, getStores } = this.props;

    //get the state document Id
    getStateDocument(userId, selectedDate);
    getStores();
    console.log('component did mount', this.props);
  }

  componentDidUpdate(prevProps) {
    const { selectedDate, userId, storeData, documentStateId } = this.props;

    if (selectedDate !== prevProps.selectedDate) {
      writeStateDocument(
        selectedDate,
        userId,
        COLLECTION.UPDATE_TYPE.PUT,
        documentStateId
      );

      if (storeData.length > 0) {
        const filteredData = filterRows(
          storeData,
          selectedDate,
          'Open',
          'Closed'
        );
        postMessage(filteredData, 'RowID');
      }
    }
  }

  render() {
    const { selectedDate, errorState, onDateChange } = this.props;

    return (
      <div className="App">
        <ErrorBoundary
          isError={errorState.isError}
          handleError={errorState.onError}
        >
          <DatePicker selectedDate={selectedDate} onDateChange={onDateChange} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
