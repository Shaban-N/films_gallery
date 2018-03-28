import React, { Component } from 'react';
import { Provider } from 'react-redux';
import FilmsList from './FilmsList';
import DevTools from './DevTools';

/**
 * Component is exported for conditional usage in Root.js
 */
module.exports = class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <FilmsList />
          <DevTools />
        </div>
      </Provider>
    );
  }
};
