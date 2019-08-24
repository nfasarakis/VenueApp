/** @flow
*
* Configuration that is used in the Map components.
*/
import {Dimensions} from 'react-native';

type dim = {width: number, height: number};
const { width, height }: dim = Dimensions.get('window');

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
  /*Map Style from mapstyle.withgoogle.com
    See:
     > https://github.com/react-community/react-native-maps#customizing-the-map-style
    for additional info on iOS
  */
  mapStyle : [
    {
      "featureType": "landscape.natural",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#e0efef"
        }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "hue": "#1900ff"
        },
        {
          "color": "#c0e8e8"
        }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "lightness": 100
        },
        {
          "visibility": "simplified"
        }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "lightness": 700
        }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#7dcdcd"
        }
      ]
  }
]
  /* End of mapStyle */
};

export default config;
