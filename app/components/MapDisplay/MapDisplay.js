import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import VenueCard from '../VenueCard';
import {TextButton} from '../elements';
import PropTypes from 'prop-types';
import {
  CARD_WIDTH,
  defaultZoomLevel,
  initialRegion,
} from '../../config/config.js';
import styles from './style';

// Possible labels for buttons above flatlist. Value depends on tab
const buttonLabels = {
  Discover: {
    leftBtn: 'DISCOVER NEW VENUES',
    rightBtn: 'RECOMMENDED VENUES',
  },
  Favorites: {
    leftBtn: 'MOST LOVED VENUES',
    rightBtn: 'YOUR LOVED VENUES',
  },
  Visited: {
    leftBtn: 'MOST VISITED VENUES',
    rightBtn: 'VENUES YOU VISITED',
  },
  Offers: {
    leftBtn: 'FEATURED OFFERS',
    rightBtn: 'VENUES WITH OFFERS',
  },
};

MapDisplay.propTypes = {
  // A JSON formated array of stores/venues to show on map if the left button is active
  primaryVenues: PropTypes.array.isRequired,
  // A JSON formated array of stores/venues to show on map if the right button is active
  secondaryVenues: PropTypes.array.isRequired,
  // String storing the id of the currently selected tab (Discover, Visited, Favorites or Offers)
  tab: PropTypes.string.isRequired,
  // Callback for press events on TouchableOpacity component representing a StorePreview
  onVenuePress: PropTypes.func.isRequired,
};

export default function MapDisplay(props) {
  // Stores the venues the component is displaying
  // MapDisplay shows either the primaryVenues or secondaryVenues it receives as props.
  // DEV_NOTE:
  // Would it be cleaner if I used a boolean for this instead, avoiding the props->state antipattern?
  const [activeVenues, setActiveVenues] = useState(props.primaryVenues);

  // Value in the [0, activeVenues.length] range
  // Index corresponding to venue focused in Flatlist
  const [index, setIndex] = useState(0);

  // Reference to map component <MapView> and <FlatList> components in render() method
  // Used to trigger animations
  let mapRef = useRef();
  let flatlistRef = useRef();

  /**
   * During each update of the component, if the primaryVenues have changed, i.e component has received new props
   * re-initialize that state (conceptually equivalent to getDerivedStateFromProps)
   */
  useEffect(() => {
    setActiveVenues(props.primaryVenues);
    // Scroll list to start when receving new props.primaryVenues
    // Is this batched by react?
    setIndex(0);
  }, [props.primaryVenues]);

  /**
   * During each update of the index state value
   *  - Scrolls the flatlist s.t venue in position index of the activeVenues array
   *      is visible
   *  - Animate map to region around venue in position indexof the activeVenues array
   */
  useEffect(() => {
    /**
     * Scrolls Flatlist to element at position index
     * This is done using a ref to the <FlatList> component instance to trigger the scrollToIndex method
     *
     * @param  {number} idx The position to which the FlatList is scrolled
     */
    const snapToCardStart = idx => {
      flatlistRef.current.scrollToIndex({
        index: idx,
        viewPosition: idx === activeVenues.length - 1 ? 1 : 0.5,
      });
    };
    /**
     * Given venue, animate map region to venue's coordinates
     * This is done using a ref to the <MapView> component instance to trigger the animateToRegion method
     *
     * @param {object} venue Object containing all data for the venue
     */
    const animateRegionToVenue = venue => {
      // Animate to and zoom to coordinates over a duration of 200ms
      // Use the ref passed in the <MapView> component
      mapRef.current.animateToRegion(
        {
          latitude: venue.coordinates.latitude,
          longitude: venue.coordinates.longitude,
          ...defaultZoomLevel,
        },
        400,
      );
    };
    snapToCardStart(index);
    animateRegionToVenue(activeVenues[index]);
  }, [index, activeVenues]);

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
    const idx = activeVenues.findIndex(el => {
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
    const markers = activeVenues.map((venue, idx) => (
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
    if (flatListIndex >= activeVenues.length) {
      // Out of bounds, restrict flatListIndex
      flatListIndex = activeVenues.length - 1;
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
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsPointsOfInterest={false}
        loadingEnabled={true}>
        {/*Create the map markers*/
        generateMapMarkers()}
      </MapView>

      {/*Preview info at bottom of page*/}
      <View style={styles.venuePreviewContainer}>
        {/*Add toggle buttons here*/}
        <View style={styles.buttonContainer}>
          <TextButton
            containerStyle={[
              styles.displayButton,
              activeVenues === props.primaryVenues && styles.buttonActive,
            ]}
            textStyle={[
              styles.displayButtonText,
              activeVenues === props.primaryVenues && styles.textActive,
            ]}
            onButtonPress={() => {
              setActiveVenues(props.primaryVenues);
              // Scroll flatlist to start
              setIndex(0);
            }}
            title={buttonLabels[props.tab].leftBtn}
          />
          <TextButton
            containerStyle={[
              styles.displayButton,
              activeVenues === props.secondaryVenues && styles.buttonActive,
            ]}
            textStyle={[
              styles.displayButtonText,
              activeVenues === props.secondaryVenues && styles.textActive,
            ]}
            onButtonPress={() => {
              setActiveVenues(props.secondaryVenues);
              // Scroll flatlist to start
              setIndex(0);
            }}
            title={buttonLabels[props.tab].rightBtn}
          />
        </View>
        {/*Flatlist with Venues*/}
        <View style={styles.flatListContainer}>
          <FlatList
            ref={flatlistRef}
            horizontal={true}
            scrollEventThrottle={16} // 60FPS
            showsHorizontalScrollIndicator={false}
            data={activeVenues}
            onScrollEndDrag={handleScrollEnd}
            renderItem={({item}) => (
              /*View applies container styles for re-usable VenueCard component*/
              <View style={styles.mapFlatListItems}>
                <VenueCard venue={item} onPress={() => {}} />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}
