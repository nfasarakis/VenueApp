import C from './constants';
// _DEV_ For retrieving data locally
//  Data is loaded from a local json file and randomised
import localResponceJson from '../../jsondata_DEV/venues_local_DEV.json';
import shuffle from '../util/shuffleArray';

// Thunk - Add description
export const addVenues = () => async dispatch => {
  dispatch({type: C.INIT_FETCH_VENUES});

  // Fetch data from server/local - Delay mocked with timeout
  await new Promise(resolve => setTimeout(() => resolve(1), 1000));
  const venuesArray = shuffle(localResponceJson);

  //Update store with new data
  dispatch({type: C.ADD_VENUES, payload: venuesArray});
};

// Thunk - Add description
export const addRecommendedVenues = () => async dispatch => {
  dispatch({type: C.INIT_FETCH_RECOMMENDED});

  // Fetch data from server/local - Delay mocked with timeout
  await new Promise(resolve => setTimeout(() => resolve(1), 2500));
  const recommendedArray = shuffle(localResponceJson);

  //Update store with new data
  dispatch({type: C.ADD_RECOMMENDED, payload: recommendedArray});
};

// Thunk - Add description
export const addMostLovedVenues = () => async dispatch => {
  dispatch({type: C.INIT_FETCH_MOSTLOVED});

  // Fetch data from server/local - Delay mocked with timeout
  await new Promise(resolve => setTimeout(() => resolve(1), 1000));
  const mostLovedArray = shuffle(localResponceJson);

  //Update store with new data
  dispatch({type: C.ADD_MOSTLOVED, payload: mostLovedArray});
};

// Thunk - Add description
export const addMostVisitedVenues = () => async dispatch => {
  dispatch({type: C.INIT_FETCH_MOSTVISITED});

  // Fetch data from server/local - Delay mocked with timeout
  await new Promise(resolve => setTimeout(() => resolve(1), 1000));
  const mostVisitedArray = shuffle(localResponceJson);

  //Update store with new data
  dispatch({type: C.ADD_MOSTVISITED, payload: mostVisitedArray});
};

// Thunk - Add description
export const addRecommentedWithOffers = () => async dispatch => {
  dispatch({type: C.INIT_FETCH_RECOMMENDEDOFFERS});

  // Fetch data from server/local - Delay mocked with timeout
  await new Promise(resolve => setTimeout(() => resolve(1), 1));
  const recWithOffersArray = shuffle(localResponceJson);

  //Update store with new data
  dispatch({type: C.ADD_RECOMMENDEDOFFERS, payload: recWithOffersArray});
};

// Thunk - Add description
export const addVenuesWithOffers = () => async dispatch => {
  dispatch({type: C.INIT_FETCH_WITHOFFERS});

  // Fetch data from server/local - Delay mocked with timeout
  await new Promise(resolve => setTimeout(() => resolve(1), 1000));
  const withOffersArray = shuffle(localResponceJson);

  //Update store with new data
  dispatch({type: C.ADD_WITHOFFERS, payload: withOffersArray});
};

// Thunk - Add description
export const addUserVisitedVenues = () => async dispatch => {
  dispatch({type: C.INIT_FETCH_USERVISITED});

  // Fetch data from server/local - Delay mocked with timeout
  await new Promise(resolve => setTimeout(() => resolve(1), 1000));
  const userVisitedArray = shuffle(localResponceJson);

  //Update store with new data
  dispatch({type: C.ADD_USERVISITED, payload: userVisitedArray});
};

// Thunk - Add description
export const addUserLovedVenues = () => async dispatch => {
  dispatch({type: C.INIT_FETCH_USERLOVED});

  // Fetch data from server/local - Delay mocked with timeout
  await new Promise(resolve => setTimeout(() => resolve(1), 1000));
  const userLovedArray = shuffle(localResponceJson);

  //Update store with new data
  dispatch({type: C.ADD_USERLOVED, payload: userLovedArray});
};

export const setSearchArea = area => ({
  type: C.SET_AREA,
  payload: area,
});
