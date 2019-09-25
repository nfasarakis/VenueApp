import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  addMostLovedVenues,
  addUserLovedVenues,
} from '../../../store/actions.js';
import {VenueDoubleListTall} from '../shared';
import {LoadingIcon} from '../../../components';

/**
 * FavoritesScreen Component: Screen containing list of Venues the user has marked
 * as favorites (loved), as well as the most loved venues in the area
 *
 * The DiscoverScreen Component receives the following props
 *  @param {object} navigation The navigation object passed by the React-Native-Navigation
 */
export default function OffersScreen(props) {
  // Retieve reference to dispatch() from the redux store
  const dispatch = useDispatch();

  // Retrieve values from the redux store
  let mostLoved = useSelector(state => state.mostLovedVenues, shallowEqual);
  let userLoved = useSelector(state => state.userLovedVenues, shallowEqual);
  let isFetchingMostLoved = useSelector(state => state.fetchingMostLoved);
  let isFetchingUserLoved = useSelector(state => state.fetchingUserLoved);
  let searchArea = useSelector(state => state.searchArea);

  /*
   * When App component mounts, fetch venues/stores from server
   */
  useEffect(() => {
    dispatch(addMostLovedVenues());
    dispatch(addUserLovedVenues());
  }, [dispatch]);

  // If venues have loaded, show them
  if (isFetchingMostLoved === false && isFetchingUserLoved === false) {
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
    // Venues havent loaded yet, show loading animation
    return <LoadingIcon />;
  }
}
