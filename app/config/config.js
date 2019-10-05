/**
 * Configuration that is used in the Map components.
 */
/**
 * STILL NEED TO
 *  Move app config in seperate folder
 *  Add Card/width height for /MainTabScreens Visited.js
 *  Add slider icon sizes for Slider.js and Mutlislider.js
 */

import {Dimensions} from 'react-native';

type dim = {width: number, height: number};
const {width, height}: dim = Dimensions.get('window');

const config = {
  locations: {
    Halandri: {
      latitude: 38.0213523,
      longitude: 23.7993063,
      latitudeDelta: 0.07,
      longitudeDelta: 0.07,
    },
    /** Add more locations as needed */
  },
  // A couple of dimensions that can be used.
  dimensions: {
    SCREEN_HEIGHT: height,
    SCREEN_WIDTH: width,
    // Height of window / 4
    CARD_HEIGHT_MAP: 150,
    // Width of window - 100
    CARD_WIDTH_MAP: 300,
  },
};

// Named exports used in MapDisplay component
const initialRegion = config.locations.Halandri;
const defaultZoomLevel = {latitudeDelta: 0.07, longitudeDelta: 0.07};
const CARD_WIDTH = config.dimensions.CARD_WIDTH_MAP;
export {initialRegion, defaultZoomLevel, CARD_WIDTH};

// Default export
export default config;
