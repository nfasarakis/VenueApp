import {StyleSheet} from 'react-native';

// CSS styles for App component
const styles = StyleSheet.create({
  /*Container for the main image*/
  container: {
    width: '100%',
    // To position absolute children
    position: 'relative',
  },
  /*The main image shown*/
  mainImage: {
    width: '100%',
    height: 200,
  },
  /*Favorite icon and it's container*/
  favouriteIconContainer: {
    position: 'absolute',
    // Add padding and correct top/left values to account for it
    // so touchable area is larger
    padding: 10,
    top: 30,
    right: 5,
  },
  favouriteIcon: {
    width: 15,
    height: 15,
  },
  /*Back arrow icon and it's container*/
  backIconContainer: {
    position: 'absolute',
    // Add padding and correct top/left values to account for it
    // so touchable area is larger
    padding: 10,
    top: 30,
    left: 5,
  },
  backIcon: {
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
  venueRating: {
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
