/* @flow */
import {StyleSheet} from 'react-native';
import config from '../../config';

// CSS styles for component
const styles = StyleSheet.create({
  container: {
    // The preview container takes all available width
    // But margins must be used to add visible shadows left and/or right
    width: config.dimensions.CARD_WIDTH_MAP,
    // NOTE: Using percentages here causes android version to just crash.
    marginRight: 5,
    marginLeft: 5,
    // for positionign child elements
    position: 'relative',
    // iOS only
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // w moves shadow right, h moves shaddow down
    shadowOpacity: 0.4,
    shadowRadius: 4,
    // Android only
    backgroundColor: 'white',
    elevation: 5,
  },
  mainImage: {
    width: '100%',
    height: config.dimensions.CARD_HEIGHT_MAP,
  },
  // An absolutely positioned child of mainimagecontainer
  favorite: {
    position: 'absolute',
    top: 12,
    right: 10,
    width: 15,
    height: 15,
  },
  /*Container for venue information at bottom of image*/
  venueInfoContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
  /*name of the venue*/
  venueName: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'System',
    color: 'white',
    paddingTop: 30,
    paddingLeft: 10,
  },
  /*row containing venue info*/
  venueInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  /*text elements in venue info row*/
  infoText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'System',
    color: 'white',
    paddingRight: 10,
  },
  /*venue rating in info row*/
  rating: {
    width: 65,
    height: 10,
    marginRight: 10,
  },
  /*container for gender icons*/
  inlineGenderIconContainer: {
    flexDirection: 'row',
    // Push this child to the far right (kek)
    // Margin auto acts like a "justify-self" if it existed
    marginLeft: 'auto',
  },
  /*gender icons in card*/
  cardGenderIcon: {
    width: 11,
    height: 11,
  },
  /*gender number next to gender icon*/
  genderNumber: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'System',
    color: 'white',
    paddingLeft: 5,
  },
  genderNumberMan: {
    paddingRight: 10,
  },
});

export default styles;
