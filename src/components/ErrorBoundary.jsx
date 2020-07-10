import React, { Component } from 'react';

class ErrorBoundary extends Component {
  componentDidCatch(error, info) {
    this.props.handleError(error, info);
    console.log(error, info);
  }

  render() {
    if (this.props.isError) {
      return <h2>Error</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
