import appReducer from './reducers.js';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';

const logDispatch = store => next => action => {
  let result;

  console.log(`Will dispatch action => ${action.type}.`);

  result = next(action);

  console.log(`dispatched action => ${action.type}.`);

  return result;
};

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk, logDispatch)),
);

//const store = applyMiddleware(thunk, logDispatch)(createStore)(appReducer);

export default store;
