import React, { Component } from 'react';
import {View, FlatList} from 'react-native';
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import MapPreview from '../MapPreview';
import {TextButton} from '../elements';
import config from '../../config';
import type { StoreType } from '../../config/typedefs';
import PropTypes from 'prop-types';
import styles from './style';

// Card width as specified in config file
// Used to Calculate the index of the most visible flatlist item
const CARD_WIDTH: number = config.dimensions.CARD_WIDTH_MAP;

export default class MapDisplay extends Component {

  static propTypes = {
    // A JSON formated array of stores/venues to show on map
    stores: PropTypes.array.isRequired,
    // Callback for press events on TouchableOpacity component representing a StorePreview
    onVenuePress: PropTypes.func.isRequired,
    // String specifying which tab loaded the Map screen
    // Values: discover/visited/favourites/offers
    // Used to create the FlatList header/first element
    originTab: PropTypes.string.isRequired
  }

  state = {
    // Index corresponding to venue focused in Flatlist
    index: 0,
  };

  // Holds the current region, initilized with values in config file
  initialRegion = config.locations.Halandri;
  currentCoordinates = {
    latitude: config.locations.Halandri.latitude,
    longitude: config.locations.Halandri.longitude
  }
  currentZoomLevel = {
    latitudeDelta: config.locations.Halandri.latitudeDelta,
    longitudeDelta: config.locations.Halandri.longitudeDelta
  }

  // Given venue, animated map region to it's coordinates
  animateRegionToVenue = (venue) => {
    // Receive coordinates
    this.currentCoordinates.latitude = venue.coordinates.latitude;
    this.currentCoordinates.longitude = venue.coordinates.longitude;
    // Animate to and zoom to coordinates over a duration of 200ms
    this.map.animateToRegion({
      ...this.currentCoordinates,
      latitudeDelta: this.currentZoomLevel.latitudeDelta/4,
      longitudeDelta: this.currentZoomLevel.longitudeDelta/4,
    }, 400);
  }

  /* Arrow in order to not worry about this.*/
  onMarkerPress = (coords) => {
    /* Unpack coordinates (twice!) and go through stores to
       find the index of the store with coordinates == coord.
    */
    const {latitude: lat2, longitude: lon2} = coords;
    const index: number = this.props.stores.findIndex(
      (element: StoreType) => {
        const {latitude: lat1, longitude: lon1} = element.coordinates;
        return lat1 == lat2 && lon1 == lon2;
      }
    );

    // Update active index
    this.setState({index: index}, ()=>{
      this.snapToCardStart(index);
      // After updating active index, animate to region
      this.animateRegionToVenue(this.props.stores[this.state.index]);
    });
  }

  /* Generates the markers that appear on the map
  */
  generateMapMarkers = () => {
    // Map over all venues
    const markers = this.props.stores.map((store, index) =>
      <Marker
        key = {store.key}
        coordinate = {store.coordinates}
        onPress = {()=>this.onMarkerPress(store.coordinates)}
        // active venue marker is red
        pinColor = {index!==this.state.index?'#6BA7EC':null}
      />
    );
    // Return markers
    return markers;
  }

  /**
   * Renders the items of the horizontal flatList
   *
   * @param  {StoreType} item      [The store.]
   * @return {MapPreview}  [MapPreview Component]
   */
  renderItem = ({item}: {item: StoreType}) => {
    return (
      <MapPreview
        store = {item}
        onPress = {()=>{}}
      />
    );
  };

  /**
   * Scrolls Flatlist to input index
   *
   * @param  {number} index
   */
  snapToCardStart = (index) => {
    this.flatList.scrollToIndex({
      index: index,
      viewPosition: index===this.props.stores.length-1?1:0.5
    });
  }

  /**
   * When user stops scrolling:
   * snaps Map Preview Card to nearest index and animates to the
   * region corresponding to the Card.
   *
   * @param  {Object} evt
   */
  handleScrollEnd = (evt) => {
    // Receive x coordinate
    const xPos = evt.nativeEvent.contentOffset.x;
    // Calculate FlatList index from the contentOffset
    let flatListIndex = Math.round(xPos / CARD_WIDTH);

    // Check for edge cases
    if (flatListIndex >= this.props.stores.length) {flatListIndex = this.props.stores.length - 1;}
    if (flatListIndex <= 0){flatListIndex = 0;}

    // Snap Card to nearest index
    this.snapToCardStart(flatListIndex);

    // Compare with active index and return if no change
    if (flatListIndex===this.state.index) {return;}

    // Update active index
    this.setState({index: flatListIndex}, ()=>{
      // After updating active index, animate to region
      this.animateRegionToVenue(this.props.stores[this.state.index]);
    });
  }

  /**
   * Renders a MapView (react-native-maps component)
   * with `n` Markers where `n` is the length
   * of the stores array
   * @return {[type]} [description]
   */
  render() {

    return (
      <View style = {styles.container}>
        <MapView
          //provider={PROVIDER_GOOGLE}
          ref = {(map) => (this.map = map)}
          style = {styles.map}
          initialRegion = {this.initialRegion}
          //customMapStyle = {config.mapStyle}
          showsPointsOfInterest = {false}
          loadingEnabled = {true}
        >
          { /*Create the map markers*/
            this.generateMapMarkers()
          }
        </MapView>

        {/*Preview info at bottom of page*/}
        <View style={styles.venuePreviewContainer}>
          {/*Display options*/}
          <View style={styles.buttonContainer}>
            <TextButton
              containerStyle={[styles.displayButton, styles.buttonActive]}
              textStyle={[styles.displayButtonText, styles.textActive]}
              onButtonPress={()=>{}}
              title={'DISCOVER NEW VENUES'}
            />
            <TextButton
              containerStyle={styles.displayButton}
              textStyle={styles.displayButtonText}
              onButtonPress={()=>{}}
              title={'SHOW RECOMMENDED'}
            />
          </View>
          {/*Flatlist with Venues*/}
          <View style={styles.flatListContainer}>
            <FlatList
              ref = {(ref)=>this.flatList=ref}
              horizontal = {true}
              scrollEventThrottle = {16} // 60FPS
              showsHorizontalScrollIndicator = {false}
              data = {this.props.stores}
              renderItem = { this.renderItem }
              onScrollEndDrag = {this.handleScrollEnd}
            />
          </View>
        </View>
      </View>
    );
  }
}
