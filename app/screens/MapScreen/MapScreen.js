import React, { Component } from 'react';
import {View, Animated} from 'react-native';
import MapDisplay from '../../components/MapDisplay';
import {fetchStores} from '../../util/ajax';
import {LoadingIcon} from '../../components';
import styles from './style';


export default class MapScreen extends Component {

  state = {
    // List of venues to display on map
    stores : [],
    // List of secondary venues from server,
    // either mostVisited, recommended or mostFavourited,
    // depending on tab that lauched map screen
    secondary: [],
    // Object containing filtering paramets for filtering stores
    filteringParams: {},
    // String containing search parameters for searching stores
    searchParam: 'Athens',
    // true if map screen is loading data from the server
    // used to show loading animation
    isLoading: true,
  }

  // Lifecycle method
  // Stores a state updater on this.props.navigation for this screen
  // This allows us to access the state updater in the header in routerConfig.js,
  // thus enabling the filter screen to update the state of this screen
  UNSAFE_componentWillMount() {
    // Note: setParams causes a second re-render, so it is placed
    // in UNSAFE_componentWillMount. This way it is not shown to user
    this.props.navigation.setParams({
      // filteringParams are passed via FilterScreen.js
      filterMapState: async (filteringParams) => {
        console.warn('Filtering Map of ' + this.props.navigation.state.params.originTab + ' with ' + filteringParams);

        // Update state, to store new filtering params and
        // show loading animation
        this.setState({filteringParams: filteringParams, isLoading: true});

        // For DEVELOPMENT, simply run another store query
        // In release, this should depend on NEW filtering parameters
        // AND search params in state
        const storesJson = await fetchStores();
        const secondaryJson = await fetchStores();
        // Mannualy delay for 1 second to view loading animations
        // Done by promishifying a setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.setState({stores: storesJson, secondary: secondaryJson, isLoading: false});
      },
      // searchParams are passed via SearchScreen.js
      searchMapStores: async (searchParam) => {
        console.warn('Searching Map of ' + this.props.navigation.state.params.originTab + ' with '  + searchParam);

        // Update state, to store new search params and
        // show loading animation
        this.setState({searchParam: searchParam, isLoading: true});

        // For DEVELOPMENT, simply run another store query
        // In release, this should depend on NEW search parameters
        // AND filtering params in state
        const storesJson = await fetchStores();
        const secondaryJson = await fetchStores();
        // Mannualy delay for 1 second to view loading animations
        // Done by promishifying a setTimeout
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.setState({stores: storesJson, secondary: secondaryJson, isLoading: false});
      }
    });
  }

  componentDidUpdate() {
    if (this.state.isLoading===false) {
      // if component updated and is no longer receiving data,
      // fade the Map In
      this.fadeMapIn();
    }
  }

  // Used for fading in map
  mapOpacity = new Animated.Value(0);
  fadeMapIn = () => {
    // Fade map in over a duration of 200ms
    Animated.timing(
      this.mapOpacity,
      {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }
    ).start();
  }

  // Lifecycle methods
  // When the component mounts, fetch stores from Venue Server
  async componentDidMount() {
    // Fetch stores
    const storesJson = await fetchStores();
    // Fetch recommended stores
    const secondaryJson = await fetchStores();
    // Mannualy delay for 1 second to view loading animations
    // Done by promishifying a setTimeout
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Update state with new stores to cause a re-render
    this.setState({stores: storesJson, recommended: secondaryJson, isLoading: false});
  }

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    // If stores have loaded
    if (this.state.isLoading===false ) {
      return (
        <View style={styles.container}>
          <Animated.View style={{flex:1,opacity: this.mapOpacity}}>
            <MapDisplay
              stores = {this.state.stores}
              onVenuePress = {()=>{}}
              // Origin tab passed in routerConfig
              originTab = {this.props.navigation.state.params.originTab}
            />
          </Animated.View>
        </View>
      );
    } else {
      // Stores havent loaded yet, show loading animation
      return (
        <LoadingIcon/>
      );
    }
  }
}
