import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  addRecommentedWithOffers,
  addVenuesWithOffers,
} from '../../../store/actions.js';
import {VenueDoubleList} from '../shared';
import {LoadingIcon} from '../../../components';

/**
 * OffersScreen Component: Screen containing list of Venues with offers as well
 * as recommended (by the app) venues with offers (potentially monetizable)
 *
 * The OffersScreen Component receives the following props
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
  let withOffers = useSelector(state => state.venuesWithOffers, shallowEqual);
  let isFetchingRecOffers = useSelector(
    state => state.fetchingRecommendedOffers,
  );
  let isFetchingWithOffers = useSelector(state => state.fetchingWithOffers);
  let searchArea = useSelector(state => state.searchArea);

  /*
   * When App component mounts, fetch venues/stores from server
   */
  useEffect(() => {
    dispatch(addRecommentedWithOffers());
    dispatch(addVenuesWithOffers());
  }, [dispatch]);

  // If venues have loaded, show them
  if (isFetchingRecOffers === false && isFetchingWithOffers === false) {
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
    // Venues havent loaded yet, show loading animation
    return <LoadingIcon />;
  }
}
