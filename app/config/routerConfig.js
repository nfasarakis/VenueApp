/* Contains all config options for the navigators defined in
 * app/config/router.js
 *
 * All config options here appear in the order which they are used
 * in ./config/router.js
 */
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TabBarBottom} from 'react-navigation';

// Import TransitionConfig objects for stack navigators
// These define the animations when transitioning between routes
import {
  VenueTransitionConfig,
  TabWrapperTransitionConfig,
  MainTransitionConfig,
} from './transitionConfig';

// Import components used as custom headers for MainTabNavigator, DetailStackNavigator & CatalogTabNavigator
import TopTab from '../components/TopTab';
import MainImage from '../components/DetailSections/MainImage';
import CatalogTabBar from '../components/CatalogTabBar';

// Import images used for MainTabNavigator custom icons
import discoverActive from '../components/images/house-tabicon-active.png';
import discoverInactive from '../components/images/house-tabicon.png';
import favoritesActive from '../components/images/favorite-tabicon-active.png';
import favoritesInactive from '../components/images/favorite-tabicon.png';
import visitedActive from '../components/images/visited-tabicon-active.png';
import visitedInactive from '../components/images/visited-tabicon.png';
import offersActive from '../components/images/event-tabicon-active.png';
import offersInactive from '../components/images/event-tabicon.png';

// Global configuration options for the App's secondary CatalogTabNavigator
// This navigator holds the Catalog Menu Screens for each type of drink
const CatalogTabNavigatorConfig = {
  // Note that this config option object can acess the navigation object
  // provided by the CatalogTabNavigator
  tabBarComponent: ({navigation}) => (
    // Pass navigate/goBack function provided via navigation as props
    // to custom header
    <CatalogTabBar
      onButtonPress={screen => navigation.navigate(screen)}
      onBackPress={() => navigation.goBack()}
    />
  ),
  // Place custom tabBar on the top
  tabBarPosition: 'top',
  // Enable animations when switching tabs
  animationEnabled: true,
  // Enable swipping between tabs
  swipeEnabled: true,
  // Render all tabs immediately, to allow smooth swiping
  lazy: false,
};

// Global configuration Options for the Venue Details Stack Navigator
// The Venue Details Stack Navigator contains the Details/Catalog/Offer subscreens
const VenueDetailStackNavigatorConfig = {
  // Use custom component for header
  defaultNavigationOptions: ({navigation}) => ({
    header: (
      <MainImage
        venue={navigation.state.params.venue}
        onReturn={() => {
          // Here we want to go back in the VenueStackNavigator but we
          // are in the VenueDetailStackNavigator. To do this, we will
          // pop all screens of the stack of VenueDetailStackNavigator
          // and then navigate back to parent navigator VenueStackNavigator
          // using goBack(null) <-- see react navigation docs
          navigation.popToTop();
          navigation.goBack(null);
        }}
      />
    ),
  }),
  initialRouteName: 'Details',
};

// Global configuration Options for the Venue Details Stack Navigator
// The Venue Details Stack Navigator contains Details Stack Navigator
const VenueStackNavigatorConfig = {
  // Remove common header, set individual headers in
  // VenueDetailStackNavigator above
  defaultNavigationOptions: {
    header: null,
  },
  transitionConfig: VenueTransitionConfig,
  initialRouteName: 'VenueDetails',
};

// Local NavigationOptions for the Discover Screen in the MainTabNavigator
const DiscoverNavigationOptions = {
  // Use custom component for discover tab icon in the tab bar
  tabBarIcon: ({focused}) => (
    <Image
      style={style.discoverTabIcon}
      source={focused ? discoverActive : discoverInactive}
    />
  ),
};

// Local NavigationOptions for the Favorites Screen in the MainTabNavigator
const FavoritesNavigationOptions = {
  // Use custom component for favorites tab icon in the tab bar
  tabBarIcon: ({focused}) => (
    <Image
      style={style.favoritesTabIcon}
      source={focused ? favoritesActive : favoritesInactive}
    />
  ),
};

// Local NavigationOptions for the Visited Screen in the MainTabNavigator
const VisitedNavigationOptions = {
  // Use custom component for visited tab icon in the tab bar
  tabBarIcon: ({focused}) => (
    <Image
      style={style.visitedTabIcon}
      source={focused ? visitedActive : visitedInactive}
    />
  ),
};

// Local NavigationOptions for the Offers Screen in the MainTabNavigator
const OffersNavigationOptions = {
  // Use custom component for offers tab icon in the tab bar
  tabBarIcon: ({focused}) => (
    <Image
      style={style.offersTabIcon}
      source={focused ? offersActive : offersInactive}
    />
  ),
};

// Global configuration options for the App's main TabNavigator
// MainTabNavigator contains the Discover/Favorites/Visited/Offers Screens
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
  },
};

// Global configuration options for the TabWrapperStackNavigator
// TabWrapperStackNavigator contains the Map Screen and the MainTabNavigator
// and adds custom transition animations via TabWrapperTransitionConfig
//
// Why?
// In V4, custom animations are specified on a Navigator basis, NOT a screen basis without getting complicated.
// The only SIMPLE way as of V4 to add DIFFERENT custom transition animations to the map screen is via
// a wrapper navigator, isolating the map screen from the rest of the top-level screens
// See router.js for additional details
const TabWrapperStackNavigatorConfig = {
  defaultNavigationOptions: {
    // Headers are set in local navigation options bellow
    header: null,
  },
  headerMode: 'screen',
  transitionConfig: TabWrapperTransitionConfig,
};

// Local NavigationOptions for the MainTabNavigator
const MainTabsNavigationOptions = ({navigation}) => ({
  // Use custom component for header of screen
  header: (
    <TopTab
      onFilterIconPress={() => {
        navigation.navigate(
          'Filter',
          // Pass as params the origin tab that lauched the filter screen
          {
            originTab: navigation.state.routes[navigation.state.index].key,
          },
        );
      }}
      onMapIconPress={() => {
        navigation.navigate(
          'Map',
          // Pass as params the orgin tab that lauched the map screen
          {
            originTab: navigation.state.routes[navigation.state.index].key,
          },
        );
      }}
      onSearchBarFocus={() => {
        navigation.navigate('Search');
      }}
      isMapScreen={false}
    />
  ),
});

// Local NavigationOptions for the MapScreen
const MapScreenNavigationOptions = ({navigation}) => ({
  // Mao screen doesnt use a header
  header: null,
});

// Global config options for the MainStackNavigator
const MainStackNavigatorConfig = {
  defaultNavigationOptions: {
    header: null,
  },
  transitionConfig: MainTransitionConfig,
};

const style = StyleSheet.create({
  discoverTabIcon: {
    width: 23,
    height: 20,
    marginTop: 8,
  },
  favoritesTabIcon: {
    width: 21,
    height: 20,
    marginTop: 8,
  },
  visitedTabIcon: {
    width: 24,
    height: 20,
    marginTop: 8,
  },
  offersTabIcon: {
    width: 25,
    height: 20,
    marginTop: 8,
  },
});

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
