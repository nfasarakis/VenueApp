import C from './constants';
import {combineReducers} from 'redux';

const venues = (state = [], action) =>
  action.type === C.ADD_VENUES ? [...action.payload] : state;

const recommendedVenues = (state = [], action) =>
  action.type === C.ADD_RECOMMENDED ? [...action.payload] : state;

const mostLovedVenues = (state = [], action) =>
  action.type === C.ADD_MOSTLOVED ? [...action.payload] : state;

const mostVisitedVenues = (state = [], action) =>
  action.type === C.ADD_MOSTVISITED ? [...action.payload] : state;

const recommendedWithOffers = (state = [], action) =>
  action.type === C.ADD_RECOMMENDEDOFFERS ? [...action.payload] : state;

const venuesWithOffers = (state = [], action) =>
  action.type === C.ADD_WITHOFFERS ? [...action.payload] : state;

const userVisitedVenues = (state = [], action) =>
  action.type === C.ADD_USERVISITED ? [...action.payload] : state;

const userLovedVenues = (state = [], action) =>
  action.type === C.ADD_USERLOVED ? [...action.payload] : state;

const fetching = (state = false, action) => {
  switch (action.type) {
    case C.INIT_FETCH:
      return true;
    case C.CANCEL_FETCH:
      return false;
    case C.ADD_VENUES:
      return false;
    case C.ADD_RECOMMENDED:
      return false;
    case C.ADD_MOSTLOVED:
      return false;
    case C.ADD_MOSTVISITED:
      return false;
    case C.ADD_RECOMMENDEDOFFERS:
      return false;
    case C.ADD_WITHOFFERS:
      return false;
    case C.ADD_USERLOVED:
      return false;
    case C.ADD_USERVISITED:
      return false;
    default:
      return state;
  }
};

const searchArea = (state = 'Athens', action) =>
  action.type === C.SET_AREA ? action.payload : state;

export default combineReducers({
  venues,
  recommendedVenues,
  mostLovedVenues,
  mostVisitedVenues,
  recommendedWithOffers,
  venuesWithOffers,
  userVisitedVenues,
  userLovedVenues,
  fetching,
  searchArea,
});
