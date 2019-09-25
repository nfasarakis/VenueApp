import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {addVenues, addRecommendedVenues} from '../../../store/actions.js';
import {VenueDoubleList} from '../shared';
import {LoadingIcon} from '../../../components';

/**
 * DiscoverScreen Component: Screen containing list of Venues as well as a
 * list of recommended Venues in a specific location (recommendedation potentially monetizable)
 *
 * The DiscoverScreen Component receives the following props
 *  @param {object} navigation The navigation object passed by the React-Native-Navigation
 */
export default function DiscoverScreen(props) {
  // Retieve reference to dispatch() from the redux store
  const dispatch = useDispatch();

  // Retrieve values from the redux store
  let venues = useSelector(state => state.venues, shallowEqual);
  let recommended = useSelector(state => state.recommendedVenues, shallowEqual);
  let isFetchingVenues = useSelector(state => state.fetchingVenues);
  let isFetchingRecommended = useSelector(state => state.fetchingRecommended);
  let searchArea = useSelector(state => state.searchArea);
  /*
   * When App component mounts, fetch venues/stores from server
   */
  useEffect(() => {
    dispatch(addVenues());
    dispatch(addRecommendedVenues());
  }, [dispatch]);

  // If venues have loaded, show them
  if (isFetchingVenues === false && isFetchingRecommended === false) {
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
    // Venues havent loaded yet, show loading animation
    return <LoadingIcon />;
  }
}
