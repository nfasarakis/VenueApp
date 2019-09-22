import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {addVenues, addRecommendedVenues} from '../../../store/actions.js';
import {VenueDoubleList} from '../shared';
import {LoadingIcon} from '../../../components';

/**
 * DiscoverScreen Component: Screen containing list of Venues - Main App Screen
 *
 * The DiscoverScreen Component receives the following props
 *  @param {object} navigation The navigation object passed by the React-Native-Navigation
 */
export default function DiscoverScreen(props) {
  // Retieve reference to dispatch() from the redux store
  const dispatch = useDispatch();

  // Retrieve values from the redux store
  let venues = useSelector(state => state.venues, shallowEqual);
  let searchArea = useSelector(state => state.searchArea);
  let isFetching = useSelector(state => state.fetching);
  let recommended = useSelector(state => state.recommendedVenues, shallowEqual);
  /*
   * When App component mounts, fetch venues/stores from server
   */
  useEffect(() => {
    dispatch(addVenues());
    dispatch(addRecommendedVenues());
  }, [dispatch]);

  // If stores have loaded, show them
  if (isFetching === false) {
    return (
      <VenueDoubleList
        screenName="Discover"
        navigationProp={props.navigation}
        area={searchArea}
        horizontalListItems={recommended}
        verticalListItems={venues}
      />
    );
  } else {
    // Stores havent loaded yet, show loading animation
    return <LoadingIcon />;
  }
}
