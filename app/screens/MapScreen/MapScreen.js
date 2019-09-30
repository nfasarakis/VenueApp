import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import useMapVenues from './useMapVenues';
import MapDisplay from '../../components/MapDisplay';
import {SearchBar, IconButton} from '../../components/elements';
import {LoadingIcon} from '../../components';
import styles from './style';
// Import images used in the MapScreen component
import backIcon from '../../components/images/back-arrow-blue.png';
import discoverActive from '../../components/images/house-tabicon-active.png';
import discoverInactive from '../../components/images/house-tabicon.png';
import lovedActive from '../../components/images/favorite-tabicon-active.png';
import lovedInactive from '../../components/images/favorite-tabicon.png';
import visitedActive from '../../components/images/visited-tabicon-active.png';
import visitedInactive from '../../components/images/visited-tabicon.png';
import offersActive from '../../components/images/event-tabicon-active.png';
import offersInactive from '../../components/images/event-tabicon.png';

/**
 * MapScreen Component: Screen containing list of Venues on Map
 *
 * The MapScreen Component receives the following props
 *  @param {object} navigation The navigation object passed by the React-Native-Navigation
 */
export default function MapScreen({navigation}) {
  // State holds the active tab (either Discover, Visited, Offers or Favorites)
  // Used to determine what map data to load.
  // Initial value comes from props.navigation object that holds the originTab
  // This value is set in the custom header in MainTabsNavigationOptions() in ./routerConfig.js
  // when navigating to the MapScreen route via the map button in one of the main tabs.
  const originTab = navigation.state.params.originTab;
  const [activeTab, setActiveTab] = useState(originTab);

  // Holds the status of the screen navigation transition animation from the tabs to map
  // Completed when screen has focused completely, pending otherwise
  const [transitionStatus, setTransitionStatus] = useState('pending');

  // Retrieve venues to display on map based on the activeTab
  const [primaryVenues, secondaryVenues, isFetching] = useMapVenues(activeTab);

  // Attach a listener via the navigation prop for focus events with a callback.
  // The callback runs whenever a screen transition animation completes
  useEffect(() => {
    const didFocusSubscription = navigation.addListener('didFocus', () =>
      setTransitionStatus('complete'),
    );
    // Cleanup
    return () => {
      didFocusSubscription.remove();
    };
  });

  // transition animation complete, load map.
  return (
    <View style={styles.container}>
      {/*SearchBar and back button*/}
      <SafeAreaView style={styles.safeAreaContainer}>
        <IconButton
          containerStyle={{}}
          iconSource={backIcon}
          iconStyle={styles.backIcon}
          onIconPress={() => navigation.goBack()}
        />
        <SearchBar onSearchBarFocus={() => {}} />
        <View style={styles.emptyView} />
      </SafeAreaView>

      {/*if animation finished and venues have loaded, load the map*/}
      {transitionStatus === 'pending' || isFetching ? (
        <LoadingIcon />
      ) : (
        <View style={styles.mapContainer}>
          <MapDisplay
            primaryVenues={primaryVenues}
            secondaryVenues={secondaryVenues}
            tab={activeTab}
            onVenuePress={() => {}}
          />
        </View>
      )}

      {/*Absolutely positioned tabs*/}
      <SafeAreaView style={styles.tabContainer}>
        {/*Discover tab*/}
        <TouchableOpacity
          style={styles.tabIconContainer}
          onPress={() => setActiveTab('Discover')}>
          <Image
            style={styles.discoverTabIcon}
            source={
              activeTab === 'Discover' ? discoverActive : discoverInactive
            }
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Discover' && styles.activeColor,
            ]}>
            Discover
          </Text>
        </TouchableOpacity>

        {/*Favorites tab*/}
        <TouchableOpacity
          style={styles.tabIconContainer}
          onPress={() => setActiveTab('Favorites')}>
          <Image
            style={styles.favoritesTabIcon}
            source={activeTab === 'Favorites' ? lovedActive : lovedInactive}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Favorites' && styles.activeColor,
            ]}>
            Favorites
          </Text>
        </TouchableOpacity>

        {/*Visited tab*/}
        <TouchableOpacity
          style={styles.tabIconContainer}
          onPress={() => setActiveTab('Visited')}>
          <Image
            style={styles.visitedTabIcon}
            source={activeTab === 'Visited' ? visitedActive : visitedInactive}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Visited' && styles.activeColor,
            ]}>
            Visited
          </Text>
        </TouchableOpacity>

        {/*Offers tab*/}
        <TouchableOpacity
          style={styles.tabIconContainer}
          onPress={() => setActiveTab('Offers')}>
          <Image
            style={styles.offersTabIcon}
            source={activeTab === 'Offers' ? offersActive : offersInactive}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Offers' && styles.activeColor,
            ]}>
            Offers
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
