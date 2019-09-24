import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {
  addVenues,
  addRecommendedVenues,
  addMostLovedVenues,
  addUserLovedVenues,
  addRecommentedWithOffers,
  addVenuesWithOffers,
  addMostVisitedVenues,
  addUserVisitedVenues,
} from '../../store/actions.js';
import MapDisplay from '../../components/MapDisplay';
import {LoadingIcon} from '../../components';
import styles from './style';

/**
 * MapScreen Component: Screen containing list of Venues on Map
 *
 * The MapScreen Component receives the following props
 *  @param {object} navigation The navigation object passed by the React-Native-Navigation
 */
export default function MapScreen(props) {
  // Retrieve reference to dispatch() from the redux store
  const dispatch = useDispatch();

  // Retrieve all venues from the redux store
  // Corresponding venues are passed to child MapDisplay component depending on
  //  which tab (discover/visited/favorites/offers) loaded the map screen
  //  --> Not performant: Will refactor to 4 seperate components (i.e DiscoverMap, VisitedMap etc) later
  let venues = useSelector(state => state.venues, shallowEqual);
  let recommended = useSelector(state => state.recommendedVenues, shallowEqual);
  let mostLoved = useSelector(state => state.mostLovedVenues, shallowEqual);
  let userLoved = useSelector(state => state.userLovedVenues, shallowEqual);
  let mostVisited = useSelector(state => state.mostVisitedVenues, shallowEqual);
  let userVisited = useSelector(state => state.userVisitedVenues, shallowEqual);
  let withOffers = useSelector(state => state.venuesWithOffers, shallowEqual);
  let recOffers = useSelector(
    state => state.recommendedWithOffers,
    shallowEqual,
  );
  let isFetching = useSelector(state => state.fetching);

  /*
   * When component mounts or updates, fetch venues/stores from server if not loaded already
   */
  useEffect(() => {
    venues.length === 0 && dispatch(addVenues());
    recommended.length === 0 && dispatch(addRecommendedVenues());
    mostLoved.length === 0 && dispatch(addMostLovedVenues());
    userLoved.length === 0 && dispatch(addUserLovedVenues());
    mostVisited.length === 0 && dispatch(addMostVisitedVenues());
    userVisited.length === 0 && dispatch(addUserVisitedVenues());
    withOffers.length === 0 && dispatch(addVenuesWithOffers());
    recOffers.length === 0 && dispatch(addRecommentedWithOffers());

    venues.length === 0 && console.warn('Oh no!');
    recommended.length === 0 && console.warn('Oh no!');
    mostLoved.length === 0 && console.warn('Oh no!');
    userLoved.length === 0 && console.warn('Oh no!');
    mostVisited.length === 0 && console.warn('Oh no!');
    userVisited.length === 0 && console.warn('Oh no!');
    withOffers.length === 0 && console.warn('Oh no!');
    recOffers.length === 0 && console.warn('Oh no!');
  });

  /**
   * [render description]
   * @return {[type]} [description]
   */
  // If stores have loaded
  if (isFetching === false) {
    return (
      <View style={styles.container}>
        <MapDisplay
          stores={venues}
          onVenuePress={() => {}}
          // Origin tab passed in routerConfig
          originTab={props.navigation.state.params.originTab}
        />
      </View>
    );
  } else {
    // Stores havent loaded yet, show loading animation
    return <LoadingIcon />;
  }
}
