import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  addMostVisitedVenues,
  addUserVisitedVenues,
} from '../../../store/actions.js';
import {VenueDoubleListTall} from '../shared';
import {LoadingIcon} from '../../../components';

/**
 * VisitedScreen Component: Screen containing list of Venues user has visited
 * as well as most visited venues in a specific area
 *
 * The VisitedScreen Component receives the following props
 *  @param {object} navigation The navigation object passed by the React-Native-Navigation
 */
export default function OffersScreen(props) {
  // Retieve reference to dispatch() from the redux store
  const dispatch = useDispatch();
  // Retrieve values from the redux store
  let mostVisited = useSelector(state => state.mostVisitedVenues, shallowEqual);
  let userVisited = useSelector(state => state.userVisitedVenues, shallowEqual);
  let isFetchingMostVisited = useSelector(state => state.fetchingMostVisited);
  let isFetchingUserVisited = useSelector(state => state.fetchingUserVisited);
  let searchArea = useSelector(state => state.searchArea);

  /*
   * When App component mounts, fetch venues/stores from server
   */
  useEffect(() => {
    dispatch(addMostVisitedVenues());
    dispatch(addUserVisitedVenues());
  }, [dispatch]);

  // If venues have loaded, show them
  if (isFetchingMostVisited === false && isFetchingUserVisited === false) {
    return (
      <VenueDoubleListTall
        screenName="Visited"
        navigationProp={props.navigation}
        area={searchArea}
        horizontalListItems={mostVisited}
        verticalListItems={userVisited}
      />
    );
  } else {
    // Venues havent loaded yet, show loading animation
    return <LoadingIcon />;
  }
}
