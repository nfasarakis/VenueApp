/* Navigation logic for the app. Defines navigators with structure shown bellow
 * Navigation configs and transitions configs are in /routerConfig.js and /transitionConfig resp.
 *
 *  - MainStackNavigator (NAVIGATOR)
 *      - FilterScreen
 *      - MapScreen
 *      - TabWrapperStackNavigator (NAVIGATOR) <-- See comments
 *          - MainTabNavigator (NAVIGATOR)
 *              - DiscoverScreen
 *              - FavouritesScreen
 *              - VisitedScreen
 *              - OffersScreen
 *          - MapScreen
 *      - VenueStackNavigator (NAVIGATOR)
 *          - VenueDetailStackNavigator (NAVIGATOR)
 *              - DetailScreen
 *              - OfferCodeScreen
 *              - CatalogTabNavigator
 *                  - AllDrinksScreen
 *                  - BeersScreen
 *                  - SpiritsScreen
 *                  - CocktailsScreen
 *                  - ShotsScreen
 *                  - SpecialsScreen
 */

import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator,
} from 'react-navigation';

// import screens used in app
import DiscoverScreen from '../screens/MainTabScreens/DiscoverScreen';
import FavouritesScreen from '../screens/MainTabScreens/FavouritesScreen';
import VisitedScreen from '../screens/MainTabScreens/VisitedScreen';
import OffersScreen from '../screens/MainTabScreens/OffersScreen';
import MapScreen from '../screens/MapScreen';
import FilterScreen from '../screens/FilterScreen';
import SearchScreen from '../screens/SearchScreen';

// import screens used by the VenueDetail Screen
import DetailScreen from '../screens/DetailScreen';
import OfferCodeScreen from '../screens/OfferCodeScreen';

// import screens used by the Catalog Tab Navigator
import AllDrinksScreen from '../screens/AllDrinksScreen';
import BeersScreen from '../screens/BeersScreen';
import CocktailsScreen from '../screens/CocktailsScreen';
import ShotsScreen from '../screens/ShotsScreen';
import SpecialsScreen from '../screens/SpecialsScreen';
import SpiritsScreen from '../screens/SpiritsScreen';

// Import router configuration options from /routerConfig.js
import {
  CatalogTabNavigatorConfig,
  VenueDetailStackNavigatorConfig,
  VenueStackNavigatorConfig,
  DiscoverNavigationOptions,
  FavoritesNavigationOptions,
  VisitedNavigationOptions,
  OffersNavigationOptions,
  MainTabNavigatorConfig,
  TabWrapperStackNavigatorConfig,
  MainStackNavigatorConfig,
  MainTabsNavigationOptions,
  MapScreenNavigationOptions,
} from './routerConfig';

// Catalog Tab Navigator:
// Tab navigator containing the tabs for each type of drink for a given venue
const CatalogTabNavigator = createMaterialTopTabNavigator(
  {
    AllDrinks: {
      screen: AllDrinksScreen,
    },
    Beers: {
      screen: BeersScreen,
    },
    Spirits: {
      screen: SpiritsScreen,
    },
    Cocktails: {
      screen: CocktailsScreen,
    },
    Shots: {
      screen: ShotsScreen,
    },
    Specials: {
      screen: SpecialsScreen,
    },
  },
  // Navigation config object imported from ./routerConfig.js
  CatalogTabNavigatorConfig,
);

// VenueDetailsStack Stack Navigator
// Stack Navigator containing the Details screen, OfferCode screens, & Catalog TabNavigator
const VenueDetailStackNavigator = createStackNavigator(
  {
    Details: {
      screen: DetailScreen,
    },
    Catalog: {
      screen: CatalogTabNavigator,
    },
    Offer: {
      screen: OfferCodeScreen,
    },
  },
  // Navigator config object imported from ./routerConfig.js
  VenueDetailStackNavigatorConfig,
);

// Venue Stack Navigator
// Stack navigator containing VenueDetails screens stack navigator
// We use this to stack screens when new Venues are selected for the visitedSection in DetailScreen
const VenueStackNavigator = createStackNavigator(
  {
    VenueDetails: {
      screen: VenueDetailStackNavigator,
    },
  },
  // Navigator config object imported from ./routerConfig.js
  VenueStackNavigatorConfig,
);

// Main Tab Navigator
// Tab Navigator containing the Discover/Favorites/Visited/Offers Screens
const MainTabNavigator = createBottomTabNavigator(
  {
    Discover: {
      screen: DiscoverScreen,
      // Navigator options object imported from ./routerConfig.js
      navigationOptions: DiscoverNavigationOptions,
    },
    Favorites: {
      screen: FavouritesScreen,
      // Navigator options object imported from ./routerConfig.js
      navigationOptions: FavoritesNavigationOptions,
    },
    Visited: {
      screen: VisitedScreen,
      // Navigator options object imported from ./routerConfig.js
      navigationOptions: VisitedNavigationOptions,
    },
    Offers: {
      screen: OffersScreen,
      // Navigator options object imported from ./routerConfig.js
      navigationOptions: OffersNavigationOptions,
    },
  },
  // Navigator config object imported from ./routerConfig.js
  MainTabNavigatorConfig,
);

// TabWrapperStackNavigator Stack Navigator
// A stack navigator that wraps around MainTabNavigator
//
// Why?:
// Used to provide a custom header object SHARED between the MainTabNavigator and the mapScreen
export const TabWrapperStackNavigator = createStackNavigator(
  {
    TabWrapper: {
      screen: MainTabNavigator,
      // Navigator options object imported from ./routerConfig.js
      navigationOptions: MainTabsNavigationOptions,
    },
    Map: {
      screen: MapScreen,
      // Navigator options object imported from ./routerConfig.js
      navigationOptions: MapScreenNavigationOptions,
    },
  },
  // Navigator config object imported from ./routerConfig.js
  TabWrapperStackNavigatorConfig,
);

// Root Navigator of the App
export const MainStackNavigator = createStackNavigator(
  {
    MainTabs: {
      screen: TabWrapperStackNavigator, // <-- see comments above
    },
    Filter: {
      screen: FilterScreen,
    },
    Venue: {
      screen: VenueStackNavigator,
    },
    Search: {
      screen: SearchScreen,
    },
  },
  // Navigator config object imported from ./routerConfig.js
  MainStackNavigatorConfig,
);
