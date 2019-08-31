import React from 'react';
import ReactDOM from 'react-dom';
// import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'reactive-react-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import App from './components/App';
import reducer from './reducers/';

const logMiddleware = store => next => action => {
    console.log({...action});
    return next(action);
  };
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(logMiddleware, reduxImmutableStateInvariant()),
);
const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
