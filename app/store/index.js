import appReducer from './reducers.js';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';

const showNewState = store => next => action => {
  let result;

  console.log(`Will dispatch action => ${action.type}. Prev state is:`);
  let v = store.getState().recommendedWithOffers;
  let r = store.getState().venuesWithOffers;
  if (v.length) {
    console.log('---- recommendedWithOffers:' + v[0].name + ' - ' + v[1].name);
  }
  if (r.length) {
    console.log('---- venuesWithOffers:' + r[0].name + ' - ' + r[1].name);
  }
  console.log('\n\n');

  result = next(action);

  console.log(`dispatched action => ${action.type}. New state is:`);
  v = store.getState().recommendedWithOffers;
  r = store.getState().venuesWithOffers;
  if (v.length) {
    console.log('---- recommendedWithOffers:' + v[0].name + ' - ' + v[1].name);
  }
  if (r.length) {
    console.log('---- venuesWithOffers:' + r[0].name + ' - ' + r[1].name);
  }
  console.log('\n\n');

  return result;
};

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk, showNewState)),
);

//const store = applyMiddleware(thunk, showNewState)(createStore)(appReducer);

export default store;
