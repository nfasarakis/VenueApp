// Navigation logic for the app
// Defines the following navigators with structure shown bellow
//  --- MainStackNavigator
//      --- FilterScreen
//      --- MapScreen
//      --- TabWrapperStackNavigator
//          --- MainTabNavigator
//              --- DiscoverScreen
//              --- FavouritesScreen
//              --- VisitedScreen
//              --- OffersScreen
//          --- MapScreen
//      --- VenueStackNavigator
//          --- VenueDetailStackNavigator
//              --- DetailScreen
//              --- OfferCodeScreen
//              --- CatalogTabNavigator
//                  --- AllDrinksScreen
//                  --- BeersScreen
//                  --- SpiritsScreen
//                  --- CocktailsScreen
//                  --- ShotsScreen
//                  --- SpecialsScreen

// Jim, npm install --save react-navigation
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

// Import router configuration options from routerConfig
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


// Secondary Tab Navigator containing the tabs for each type of drink
// for a given venue
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
    }
  },
  CatalogTabNavigatorConfig
);

// The VenueDetailsStack Navigator contains the
// DetailsOffer subscreens and the Catalog TabNavigator
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
    }
  },
  VenueDetailStackNavigatorConfig,
);

// The Venue Stack Navigator contains
// all venue detail screens
// We use this to stack screens when new Venues
// are selected for the visitedSection in DetailScreen
const VenueStackNavigator = createStackNavigator(
  {
    VenueDetails: {
      screen: VenueDetailStackNavigator,
    }
  },
  VenueStackNavigatorConfig
);

// Main Tab navigator containing the
// Discover/Favorites/Visited/Offers Screens
const MainTabNavigator = createBottomTabNavigator(
  {
    Discover: {
      screen: DiscoverScreen,
      navigationOptions: DiscoverNavigationOptions
    },
    Favorites: {
      screen: FavouritesScreen,
      navigationOptions: FavoritesNavigationOptions
    },
    Visited: {
      screen: VisitedScreen,
      navigationOptions: VisitedNavigationOptions
    },
    Offers: {
      screen: OffersScreen,
      navigationOptions: OffersNavigationOptions
    }
  },
  MainTabNavigatorConfig
);

// Wraps around MainTabNavigator to provide a custom header
// shared between the tabs and the mapScreen tabs
// This is hacky but the only way to get a header the plays
// nice with transitions between tabs in the MainTabNavigator and
// the tabs in the Map Screen
//
// MAYBE THIS IS NO LONGER NEEDED, i.e the wrapper stays but the map
// can be moved to MainStackNavigator!!!!!
export const TabWrapperStackNavigator = createStackNavigator(
  {
    TabWrapper: {
      screen: MainTabNavigator,
      navigationOptions: MainTabsNavigationOptions
    },
    Map: {
      screen: MapScreen,
      navigationOptions: MapScreenNavigationOptions
    },
  },
  TabWrapperStackNavigatorConfig
);

// Root Navigator of the App
export const MainStackNavigator = createStackNavigator(
  {
    MainTabs: {
      screen: TabWrapperStackNavigator, // <-- see comments above
    },
    Filter: {
      screen: FilterScreen
    },
    Venue: {
      screen: VenueStackNavigator,
    },
    Search: {
      screen: SearchScreen,
    }
  },
  MainStackNavigatorConfig
);
