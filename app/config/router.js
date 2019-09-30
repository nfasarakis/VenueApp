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

import {createStackNavigator} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';

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
// A stack navigator that wraps around MainTabNavigator and the map Screen
// Will be simplified when react-navigation V5 is released
//
// Why?:
// In V4, custom animations are specified on a Navigator basis, NOT a screen basis without getting complicated.
// Therefore, TabWrapperStackNavigator contains the Map Screen and the MainTabNavigator and is used to specify
// custom animations for the map Screen
//
// Without this wrapper stack navigator, the map screen would have been placed in the MainStackNavigator
// However, as of navigation @V4, there would be no SIMPLE way to specify a different custom animation for the map transition.
// It would share to use the same transition as other top-level screens in MainStackNavigator
//
// TLDR: The only SIMPLE way as of V4 to add DIFFERENT custom transition animations to the map screen is via
// a wrapper navigator, isolating the map screen from the rest of the top-level screens
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
