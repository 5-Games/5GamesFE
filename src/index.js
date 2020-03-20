import React from 'react';
import ReactDOM from 'react-dom';
// this imports the Redux Reducer
import rootReducer from './redux/rootReducer';
// createStore is a function
// applyMiddleware is a function for thunk
import { createStore, applyMiddleware, compose } from 'redux';

// Provider is a component
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

// setup redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// createStore is a function
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  // provider is what allows me to keep the store
  // provider needs a store prop with the store object from createStore above
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);