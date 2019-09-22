import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  addMostLovedVenues,
  addUserLovedVenues,
} from '../../../store/actions.js';
import {VenueDoubleListTall} from '../shared';
import {LoadingIcon} from '../../../components';

/**
 * DiscoverScreen Component: Screen containing list of Venues - Main App Screen
 *
 * The DiscoverScreen Component receives the following props
 *  @param {object} navigation The navigation object passed by the React-Native-Navigation
 */
export default function OffersScreen(props) {
  // Retieve reference to dispatch() from the redux store
  const dispatch = useDispatch();
  // Retrieve values from the redux store
  let mostLoved = useSelector(state => state.mostLovedVenues, shallowEqual);
  let searchArea = useSelector(state => state.searchArea);
  let isFetching = useSelector(state => state.fetching);
  let userLoved = useSelector(state => state.userLovedVenues, shallowEqual);
  /*
   * When App component mounts, fetch venues/stores from server
   */
  useEffect(() => {
    dispatch(addMostLovedVenues());
    dispatch(addUserLovedVenues());
  }, [dispatch]);

  // If stores have loaded, show them
  if (isFetching === false) {
    return (
      <VenueDoubleListTall
        screenName="Favorites"
        navigationProp={props.navigation}
        area={searchArea}
        horizontalListItems={mostLoved}
        verticalListItems={userLoved}
      />
    );
  } else {
    // Stores havent loaded yet, show loading animation
    return <LoadingIcon />;
  }
}
