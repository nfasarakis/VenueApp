import {useSelector, shallowEqual} from 'react-redux';

export default function useMapVenues(activeTab) {
  // Retrieve all venues from the redux store
  let venues = useSelector(state => state.venues, shallowEqual);
  let recommended = useSelector(state => state.recommendedVenues, shallowEqual);
  let mostLoved = useSelector(state => state.mostLovedVenues, shallowEqual);
  let userLoved = useSelector(state => state.userLovedVenues, shallowEqual);
  let mostVisited = useSelector(state => state.mostVisitedVenues, shallowEqual);
  let userVisited = useSelector(state => state.userVisitedVenues, shallowEqual);
  let withOffers = useSelector(state => state.venuesWithOffers, shallowEqual);
  let recOffers = useSelector(s => s.recommendedWithOffers, shallowEqual);

  // Retrieve all fetching indicators from redux store
  let isFetchingVenues = useSelector(state => state.fetchingVenues);
  let isFetchingRecommended = useSelector(state => state.fetchingRecommended);
  let isFetchingMostLoved = useSelector(state => state.fetchingMostLoved);
  let isFetchingUserLoved = useSelector(state => state.fetchingUserLoved);
  let isFetchingMostVisited = useSelector(state => state.fetchingMostVisited);
  let isFetchingUserVisited = useSelector(state => state.fetchingUserVisited);
  let isFetchingRecOffers = useSelector(s => s.fetchingRecommendedOffers);
  let isFetchingWithOffers = useSelector(state => state.fetchingWithOffers);

  // Return venues corresponding to originTab
  switch (activeTab) {
    case 'Discover':
      return [venues, recommended, isFetchingVenues && isFetchingRecommended];
    case 'Favorites':
      return [mostLoved, userLoved, isFetchingMostLoved && isFetchingUserLoved];
    case 'Visited':
      return [
        mostVisited,
        userVisited,
        isFetchingMostVisited && isFetchingUserVisited,
      ];
    case 'Offers':
      return [
        recOffers,
        withOffers,
        isFetchingWithOffers && isFetchingRecOffers,
      ];
  }
}
