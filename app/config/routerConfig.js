// Contains all config options for the navigators defined in
// app/config/router.js
//
// The navigators have the following structure
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
//
// All config options here appear in the order which they are used
// in ./config/router.js

import React from 'react';
import {Image} from 'react-native';
import {TabBarBottom} from 'react-navigation';

// TransitionConfig for stack navigators
// Define the animations during screen transitions
import {
  VenueTransitionConfig,
  TabWrapperTransitionConfig,
  MainTransitionConfig
} from './transitionConfig';

// Helper component: used as the custom header for the screen corrsp.
// to the Tab Navigator in the Main Stack Navigator
import TopTab from '../components/TopTab';
// Helper component: used as the custom header
// of the DetailStackNavigator
import MainImage from '../components/DetailSections/MainImage';
// Helper component: used as the custom tabBar
// of the CatalogTabNavigator
import CatalogTabBar from '../components/CatalogTabBar';


// Global configuration options for the App's secondary CatalogTabNavigator
// This navigator holds the Catalog Menu Screens for each type of drink
const CatalogTabNavigatorConfig = {
  // Use custom component for tab bar
  // Note that this config option object can acess the navigation object
  // provided by the CatalogTabNavigator
  // It is the same navigation object passed as a prop to all
  // screens contained within the CatalogTabNavigator
  tabBarComponent: ({ navigation}) =>
    // Pass navigate/goBack function provided via navigation as props
    // to custom header
    <CatalogTabBar
      onButtonPress={(screen)=>navigation.navigate(screen)}
      onBackPress={()=>{navigation.goBack();}}
    />,
  // Pace custom tabBar on the top
  tabBarPosition: 'top',
  // Enable animations when switching tabs
  animationEnabled: true,
  // Enable swipping between tabs
  swipeEnabled: true,
  // Render all tabs immediately, to allow smooth swiping
  // Screen contain only text, hence this isn't expensive
  lazy: false,
};

// Global configuration Options for the Venue Details Stack Navigator
// Contains global navigation Options and transition Configs for custom animation
// The Venue Details Stack Navigator contains the Details/Catalog/Offer subscreens
const VenueDetailStackNavigatorConfig = {
  // Use custom component for header
  defaultNavigationOptions: ({ navigation }) => ({
    header: <MainImage
      venue={navigation.state.params.venue}
      onReturn={()=>{
        // Here we want to go back in the VenueStackNavigator but we
        // are in the VenueDetailStackNavigator. To do this, we will
        // pop all screens of the stack of VenueDetailStackNavigator
        // and then navigate back to parent navigator VenueStackNavigator
        // using goBack(null) <-- as mentioned in react navigation docs
        navigation.popToTop();
        navigation.goBack(null);}}
    />
  }),
  initialRouteName: 'Details'
};

// Global configuration Options for the Venue Details Stack Navigator
// Contains global navigation Options and transition Configs for custom animation
// The Venue Details Stack Navigator contains Details Stack Navigator
const VenueStackNavigatorConfig = {
  // Remove common header, set individual headers in
  // VenueDetailStackNavigator above
  defaultNavigationOptions: {
    header: null
  },
  transitionConfig: VenueTransitionConfig,
  initialRouteName: 'VenueDetails'
};

// Local NavigationOptions for the Discover Screen in the MainTabNavigator
// Sets custom tabBar Icon
const DiscoverNavigationOptions = {
  //set icon for tab corresponding to this screen
  tabBarIcon: ({focused}) =>
    <Image
      style={{ width: 23,height: 20, marginTop: 8}}
      source={
        focused
          ? require('../components/images/house-tabicon-active.png')
          : require('../components/images/house-tabicon.png')
      }
    />
};

// Local NavigationOptions for the Favorites Screen in the MainTabNavigator
// Sets custom tabBar Icon
const FavoritesNavigationOptions = {
  //set icon for tab corresponding to this screen
  tabBarIcon: ({focused}) =>
    <Image
      style={{ width: 21,height: 20, marginTop: 8}}
      source={
        focused
          ? require('../components/images/favorite-tabicon-active.png')
          : require('../components/images/favorite-tabicon.png')
      }
    />
};

// Local NavigationOptions for the Visited Screen in the MainTabNavigator
// Sets custom tabBar Icon
const VisitedNavigationOptions = {
  //set icon for tab corresponding to this screen
  tabBarIcon: ({focused}) =>
    <Image
      style={{ width: 24,height: 20, marginTop: 8}}
      source={
        focused
          ? require('../components/images/visited-tabicon-active.png')
          : require('../components/images/visited-tabicon.png')
      }
    />
};

// Local NavigationOptions for the Offers Screen in the MainTabNavigator
// Sets custom tabBar Icon
const OffersNavigationOptions = {
  //set icon for tab corresponding to this screen
  tabBarIcon: ({focused}) =>
    <Image
      style={{ width: 25,height: 20, marginTop: 8}}
      source={
        focused
          ? require('../components/images/event-tabicon-active.png')
          : require('../components/images/event-tabicon.png')
      }
    />
};

// Global configuration options for the App's main TabNavigator
// This navigator holds the Discover/Favorites/Visited/Offers Screens
const MainTabNavigatorConfig = {
  // Enable animations when switching tabs
  animationEnabled: true,
  // Load all tabs at the same time
  lazy: false,
  removeClippedSubviews: true,
  // Make sure android and IOS use the same tabBar
  // component at the same position
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  // Global options for TabBarBottom
  tabBarOptions: {
    // Show icons
    showIcon: true,
    // color for active labels
    activeTintColor: '#D0021B',
    // Gloval style for labels
    labelStyle: {
      fontSize: 10,
      fontFamily: 'System',
    },
    // global style for each tab
    tabStyle: {
      paddingBottom: 8,
    },
    // global style for the tab container
    style: {
      backgroundColor: 'rgba(248,248,248,0.98)',
      borderTopColor: '#979797',
      borderTopWidth: 1,
    },
  }
};


// Config for the TabWrapperStackNavigator
// This Navigator contains the Map Screen and the MainTabNavigator
// It is used to provide a custom header shared between the map Screen
// and all tabs in the MainTabNavigator
// See router.js for additional details
const TabWrapperStackNavigatorConfig = {
  defaultNavigationOptions: {
    // Headers are set in local navigation options bellow
    header: null,
  },
  headerMode: 'screen',
  transitionConfig: TabWrapperTransitionConfig
};

const MainTabsNavigationOptions = ({ navigation }) => ({
  // Use custom component for header of screen
  header: <TopTab
    onFilterIconPress={()=>{
      navigation.navigate(
        'Filter',
        // Pass as params the orgin tab that lauched the filter screen
        // as well as a function used to update the state of the origin screen
        // This function is defined in the UNSAFE_componentWillMount function
        // of the origin tab
        {
          originTab: navigation.state.routes[navigation.state.index].key,
        }
      );
    }}
    onMapIconPress={()=>{
      // Navigate to map screen
      navigation.navigate(
        'Map',
        // Pass as params
        // A) the orgin tab that lauched the map screen
        // B) a function used to update the state of the origin tab
        // This function is defined in the UNSAFE_componentWillMount function
        // of the origin tab
        // C) a collection of functions used to perform searched on each tab
        // These functions are defined in the UNSAFE_componentWillMount function
        // of each tab
        {
          originTab: navigation.state.routes[navigation.state.index].key,
        }
      );
    }}
    onSearchBarFocus={()=>{
      navigation.navigate(
        'Search',
        // Pass as params a function used to update each tab via search params
        // Each inner function is defined in the UNSAFE_componentWillMount function
        // of each origin tab
        // Since this is the navigation object for the tab navigator, we can
        // acess each individual function via the navigation.state.routes[] obj
        // console.log(navigation) to see the structure
      );
    }}
    isMapScreen={false}
  />
});

// Local navigation options for the map screen
const MapScreenNavigationOptions = ({ navigation }) => {
  // Use custom component for header of screen
  return {header: <TopTab
    onFilterIconPress={()=>{
      // Navigate to filter screen from Map screen
      navigation.navigate(
        'Filter',
        {
          // value of originTab is given by MainTabsNavigationOptions
          // when navigating to Map screen from some Tab
          originTab: navigation.state.params.originTab,
          // filterMapState is defined in the UNSAFE_componentWillMount function
          // of the map screen and is used to filter results on map screen
          // filterStores is passed to the map screen in MainTabsNavigationOptions
          // and is used to filter result on the Tab that called the map screen
          // Both function are executed in the filter screen
          filterState: (filteringParams) => {
            navigation.state.params.filterMapState(filteringParams);
            navigation.state.params.filterStores(filteringParams);
          }
        },
      );
    }}
    onMapIconPress={()=>{
      // When going back from map to origin tab
      // If results have been filtered, also filter them on origin tab
      navigation.goBack();
    }}
    onSearchBarFocus={()=>{
      navigation.navigate(
        'Search',
        // searchMapStores is defined in the UNSAFE_componentWillMount function
        // of the map screen and is used to perform search on map screen
        // searchOnAllTabs is passed to the map screen in MainTabsNavigationOptions
        // and is used to execute a search simulatniously on all tabs
        // Both functions are executed in the search screen
        {
          search: (searchParam) => {
            // Seach on Map Screen
            navigation.state.params.searchMapStores(searchParam);
            // Search on all list tabs
            navigation.state.params.searchOnAllTabs(searchParam);
          }
        }
      );
    }}
    isMapScreen={true}
  />};
};

// Global config options for the main Stack Navigator of the app
// The main stack navigator contains the Filter/Map Screens, the main Tab Navigator
// as well as the seconderary Stack Navigator for venue Details
const MainStackNavigatorConfig = {
  defaultNavigationOptions: {
    header: null
  },
  transitionConfig: MainTransitionConfig
};


export {
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
};
