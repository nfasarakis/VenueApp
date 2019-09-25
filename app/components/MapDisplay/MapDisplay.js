import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import MapPreview from '../MapPreview';
import {TextButton} from '../elements';
import PropTypes from 'prop-types';
import config from '../../config';
import styles from './style';

// Width of items rendered in flatlist, initialized with values in config file
const CARD_WIDTH = config.dimensions.CARD_WIDTH_MAP;
// Current region, initilized with values in config file
const initialRegion = config.locations.Halandri;
const currentCoordinates = {
  latitude: config.locations.Halandri.latitude,
  longitude: config.locations.Halandri.longitude,
};
const currentZoomLevel = {
  latitudeDelta: config.locations.Halandri.latitudeDelta,
  longitudeDelta: config.locations.Halandri.longitudeDelta,
};

MapDisplay.propTypes = {
  // A JSON formated array of stores/venues to show on map
  venues: PropTypes.array.isRequired,
  // Callback for press events on TouchableOpacity component representing a StorePreview
  onVenuePress: PropTypes.func.isRequired,
  // String specifying which tab loaded the Map screen
  // Values: discover/visited/favourites/offers
  // Used to create the FlatList header/first element
  originTab: PropTypes.string.isRequired,
};

export default function MapDisplay(props) {
  // Value in the [0, props.venues.length] range
  // Index corresponding to venue focused in Flatlist
  const [index, setIndex] = useState(0);

  // Reference to map component <MapView> and <FlatList> components in render() method
  // Used to trigger animations
  let map = React.createRef();
  let flatlist = React.createRef();

  /**
   * During each update of the index state value
   *  - Scrolls the flatlist s.t venue in position index of the prop.venues array
   *      is visible
   *  - Animate map to region around venue in position indexof the prop.venues array
   */
  useEffect(() => {
    /**
     * Scrolls Flatlist to element at position index
     * This is done using a ref to the <FlatList> component instance to trigger the scrollToIndex method
     *
     * @param  {number} idx The position to which the FlatList is scrolled
     */
    const snapToCardStart = idx => {
      flatlist.current.scrollToIndex({
        index: idx,
        viewPosition: idx === props.venues.length - 1 ? 1 : 0.5,
      });
    };
    /**
     * Given venue, animate map region to venue's coordinates
     * This is done using a ref to the <MapView> component instance to trigger the animateToRegion method
     *
     * @param {object} venue Object containing all data for the venue
     */
    const animateRegionToVenue = venue => {
      // Receive coordinates
      currentCoordinates.latitude = venue.coordinates.latitude;
      currentCoordinates.longitude = venue.coordinates.longitude;
      // Animate to and zoom to coordinates over a duration of 200ms
      // Use the ref passed in the <MapView> component
      map.current.animateToRegion(
        {
          ...currentCoordinates,
          latitudeDelta: currentZoomLevel.latitudeDelta / 4,
          longitudeDelta: currentZoomLevel.longitudeDelta / 4,
        },
        400,
      );
    };
    snapToCardStart(index);
    animateRegionToVenue(props.venues[index]);
  }, [flatlist, index, map, props.venues]);

  /**
   *  When a user presses on a marker in the map, update the index state variable
   *
   * Each marker is placed at coordinates given by the venue it represents. So by
   * clicking on the marker we can use those coords to find what venue it represents
   * and therefore, the corresponding value of index
   * This new index value updates the state and triggers animations in useEffect() callback
   *
   * @param {object} markerCoords Object containing marker coords
   */
  const onMarkerPress = markerCoords => {
    // Unpack and rename marker coordinates through destructuring
    const {latitude: latM, longitude: lonM} = markerCoords;
    // Search over array of venues in props to find venue with matching coords
    // use array.prototype.findIndex();
    const idx = props.venues.findIndex(el => {
      // Unpack and rename venue coordinates through destructuring
      const {latitude: latV, longitude: lonV} = el.coordinates;
      return latV === latM && lonV === lonM;
    });
    // Update active index
    setIndex(idx);
  };

  /** Generates the markers that appear on the map
   *
   * @return {Array} Array of <Marker> components representing each venue
   *                 in props.venue
   */
  const generateMapMarkers = () => {
    // Map over all venues and return a new marker for each one
    const markers = props.venues.map((venue, idx) => (
      <Marker
        key={venue.key}
        coordinate={venue.coordinates}
        onPress={() => onMarkerPress(venue.coordinates)}
        // active venue marker is red
        pinColor={idx !== index ? '#6BA7EC' : null}
      />
    ));
    // Return markers
    return markers;
  };

  /**
   * Handles flatlist scroll If user decides interact w/ flatlist instead of click on markers
   * Calculates the "index of the flatlist", i.e what element is current visible in the render window,
   * and updates state index variable using that value.
   * This new index value updates the state and triggers animations in useEffect() callback
   *
   * @param  {Object} evt Event object passed from the flatList onScrollEndDrag callback
   */
  const handleScrollEnd = evt => {
    // Receive x coordinate (since flatList is horizontal)
    const xPos = evt.nativeEvent.contentOffset.x;
    // Calculate FlatList index from the contentOffset
    let flatListIndex = Math.round(xPos / CARD_WIDTH);

    // Check for edge cases
    if (flatListIndex >= props.venues.length) {
      // Out of bounds, restrict flatListIndex
      flatListIndex = props.venues.length - 1;
    }
    if (flatListIndex <= 0) {
      // Out of bound, restrict flatListIndex
      flatListIndex = 0;
    }

    // Update state index value
    setIndex(flatListIndex);
  };

  /**
   * Renders a MapView (react-native-maps component) with `n` Markers
   * where `n` is the length of the venues array passed in as props
   */
  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.map}
        initialRegion={initialRegion}
        showsPointsOfInterest={false}
        loadingEnabled={true}>
        {/*Create the map markers*/
        generateMapMarkers()}
      </MapView>

      {/*Preview info at bottom of page*/}
      <View style={styles.venuePreviewContainer}>
        {/*Display options*/}
        <View style={styles.buttonContainer}>
          <TextButton
            containerStyle={[styles.displayButton, styles.buttonActive]}
            textStyle={[styles.displayButtonText, styles.textActive]}
            onButtonPress={() => {}}
            title={'DISCOVER NEW VENUES'}
          />
          <TextButton
            containerStyle={styles.displayButton}
            textStyle={styles.displayButtonText}
            onButtonPress={() => {}}
            title={'SHOW RECOMMENDED'}
          />
        </View>
        {/*Flatlist with Venues*/}
        <View style={styles.flatListContainer}>
          <FlatList
            ref={flatlist}
            horizontal={true}
            scrollEventThrottle={16} // 60FPS
            showsHorizontalScrollIndicator={false}
            data={props.venues}
            onScrollEndDrag={handleScrollEnd}
            renderItem={({item}) => {
              return <MapPreview store={item} onPress={() => {}} />;
            }}
          />
        </View>
      </View>
    </View>
  );
}
