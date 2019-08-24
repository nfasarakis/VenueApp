import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {NavigationActions} from 'react-navigation';
import fetchInitalStores from '../../util/ajax';
import {
  VerticalListCard,
  HorizontalListCard,
  LoadingIcon,
} from '../../components';
import styles from './style';

export default class DiscoverScreen extends Component {
  // State
  state = {
    // List of venues from server
    stores: [],
    // List of recommended venues from server
    recommended: [],
    // Object containing filtering paramets for filtering stores
    filteringParams: {},
    // String containing search parameters for searching stores
    searchParam: 'Athens',
    // true if tab/screen is loading data from the server
    // used to show loading animation
    isLoading: true,
  };

  // Lifecycle method
  // Stores a state updater on this.props.navigation for this tab
  // This allows us to access the state updater in the header in routerConfig.js,
  // thus enabling the filter/search screens to update the state of this tab
  UNSAFE_componentWillMount() {
    // Note: setParams causes a second re-render, so it is placed
    // in UNSAFE_componentWillMount. This way it is not shown to user
    this.props.navigation.setParams({
      // filteringParams are passed via FilterScreen.js
      filterStores: async filteringParams => {
        console.warn('Filtering Discover with ' + filteringParams);

        // Update state, to store new filtering params and
        // show loading animation
        this.setState({filteringParams: filteringParams, isLoading: true});

        // For DEVELOPMENT, simply run another store query
        // In release, this should depend on NEW filtering parameters
        // AND search params in state
        const storesJson = await fetchInitalStores();
        const recommendedJson = await fetchInitalStores();
        // Mannualy delay for 1 second to view loading animations
        // Done by promishifying a setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.setState({
          stores: storesJson,
          recommended: recommendedJson,
          isLoading: false,
        });
      },
      // searchParams are passed via SearchScreen.js
      searchStores: async searchParam => {
        console.warn('Searching with ' + searchParam);

        // Update state, to store new search params and
        // show loading animation
        this.setState({searchParam: searchParam, isLoading: true});

        // For DEVELOPMENT, simply run another store query
        // In release, this should depend on NEW search parameters
        // AND filtering params in state
        const storesJson = await fetchInitalStores();
        const recommendedJson = await fetchInitalStores();
        // Mannualy delay for 1 second to view loading animations
        // Done by promishifying a setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.setState({
          stores: storesJson,
          recommended: recommendedJson,
          isLoading: false,
        });
      },
    });
  }

  // Lifecycle methods
  // When the App component mounts, fetch stores from Venue Server
  async componentDidMount() {
    // Fetch stores
    // In release, this should ALSO depend on DEFAULT search parameters
    const storesJson = await fetchInitalStores();
    // Fetch recommended stores
    const recommendedJson = await fetchInitalStores();
    // Mannualy delay for 1 second to view loading animations
    // Done by promishifying a setTimeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Update state with new stores to cause a re-render
    this.setState({
      stores: storesJson,
      recommended: recommendedJson,
      isLoading: false,
    });
  }

  /**
   * [Generates the information that appears before
   * the horizontal recommended store list
   * @return {[View]} [A view containing info before hor list]
   */
  genHorizontalListHeader = () => {
    return (
      <View style={styles.storelistheaderContainer}>
        <Text style={styles.storelistheader}> Recommended </Text>
        {/*Applies a horz line*/}
        <View style={styles.horline} />
        <Text style={styles.storelistbody}>
          The best of the best: recommended venues with enticing offers
          {this.state.searchParam === 'Close to you'
            ? ' close to your current location'
            : ' in ' + this.state.searchParam}
        </Text>
      </View>
    );
  };

  /**
   * [Generates the information that appears before the vertical store list
   * @return {[View]} [A view containing the info before vert list
   */
  genVerticalListHeader = () => {
    return (
      <View style={styles.storelistheaderContainer}>
        <Text style={styles.storelistheader}>Discover new places</Text>
        {/*Applies a horz line*/}
        <View style={styles.horline} />
        <Text style={styles.storelistbody}>
          Find the next venue to visit
          {this.state.searchParam === 'Close to you'
            ? ' close to your current location'
            : ' around ' + this.state.searchParam}
        </Text>
      </View>
    );
  };

  /**
   * [Inserts a custom component in the header of StoreList component
   * This component contains
   * A) A horizontal scrolling list of recommended venues
   * B) A component with text information about the list of recommended venues
   * C) A component with text information about the vertical list in StoreList
   *
   * The reason this is done is so we can embed a horizontal Flatlist that scrolls
   * towards the top of the screen while scrolling the StoreList but blocks the StoreList
   * when scrolling horizontally.
   * We cannot think of another way to achieve this effect
   * @return {[type]} [description]
   */
  generateHeaderItem = () => {
    return (
      <View style={styles.container}>
        {this.genHorizontalListHeader()}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horFlatList}
          data={this.state.recommended}
          //Optimization parameter
          //Our item heights are 170 + 2 margin as seen in style.js
          getItemLayout={(data, index) => ({
            length: 172,
            offset: 172 * index,
            index,
          })}
          renderItem={({item}) => (
            <View style={styles.horFlatListItems}>
              <HorizontalListCard
                store={item}
                onPress={() => {
                  this.viewVenue(item);
                }}
              />
            </View>
          )}
        />
        {this.genVerticalListHeader()}
      </View>
    );
  };

  /**
   * Navigates to a specific venue screen.
   * @param  {[Object]} item JSON containing info about the venue to display
   */
  viewVenue = item => {
    // Clicking this will navigate be to the VenueStackNavigator.
    // Since the VenueStackNavigator contains as a child another
    // navigatiteme router.js), specifically VenueDetailStackNavigator,
    // we need a way to properlty navigate to the inner navigator with the
    // correct parameters.
    //
    // This can be achieved with the action property of the navigate function
    // It allows us to set a sub-action to run in the child router/screen,
    // if the screen we are navigating to is a navigator
    // // See: action prop in https://reactnavigation.org/docs/navigation-prop.html
    this.props.navigation.navigate(
      // Navigates me to screen Venue which is the VenueStackNavigator
      'Venue',
      // Parameters to pass to screen we are navigating to should be
      // empty here since we are navigating to a navigator
      {},
      // Sub-action to run if the screen we are going to is a navigator
      // In this case, screen Venue is
      NavigationActions.navigate({
        // Go to the venueDetails screen, which is the VenueDetailStackNavigator
        routeName: 'VenueDetails',
        // In ./routerConfig.js, we have set a default initial screen for this Stack
        // Pass the following parameters to the default initial screen
        params: {
          venue: item,
          venueList: this.state.stores,
        },
      }),
    );
  };

  /**
   * [Returns a View component containing
   *
   *
   * @return {[View]} [View representing the currently viewed screen]
   */
  render() {
    // If stores have loaded, show them
    if (this.state.isLoading === false) {
      return (
        <View style={styles.container}>
          <FlatList
            style={styles.flatlist}
            showsVerticalScrollIndicator={false}
            data={this.state.stores}
            ListHeaderComponent={this.generateHeaderItem()}
            //Optimization parameter
            //Our item heights are 200 + 10 margin as seen in style.js
            getItemLayout={(data, index) => ({
              length: 210,
              offset: 210 * index,
              index,
            })}
            renderItem={({item}) => (
              <View style={styles.vertFlatListItems}>
                <VerticalListCard
                  store={item}
                  onPress={() => {
                    this.viewVenue(item);
                  }}
                />
              </View>
            )}
          />
        </View>
      );
    } else {
      // Stores havent loaded yet, show loading animation
      return <LoadingIcon />;
    }
  }
}
