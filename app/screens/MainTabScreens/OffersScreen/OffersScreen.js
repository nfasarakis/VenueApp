import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  addRecommentedWithOffers,
  addVenuesWithOffers,
} from '../../../store/actions.js';
import {VenueDoubleList} from '../shared';
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
  let recOffers = useSelector(
    state => state.recommendedWithOffers,
    shallowEqual,
  );
  let searchArea = useSelector(state => state.searchArea);
  let isFetching = useSelector(state => state.fetching);
  let withOffers = useSelector(state => state.venuesWithOffers, shallowEqual);
  /*
   * When App component mounts, fetch venues/stores from server
   */
  useEffect(() => {
    dispatch(addRecommentedWithOffers());
    dispatch(addVenuesWithOffers());
  }, [dispatch]);

  // If stores have loaded, show them
  if (isFetching === false) {
    return (
      <VenueDoubleList
        screenName="Offers"
        navigationProp={props.navigation}
        area={searchArea}
        horizontalListItems={recOffers}
        verticalListItems={withOffers}
      />
    );
  } else {
    // Stores havent loaded yet, show loading animation
    return <LoadingIcon />;
  }
}
