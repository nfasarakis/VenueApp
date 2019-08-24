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
  /*Back arrow icon and it's container*/
  backIconContainer: {
    position: 'absolute',
    // Add padding and correct top/left values to account for it
    // so touchable area is larger
    padding: 10,
    top: 30,
    left: 0,
  },
  backIcon: {
    width: 11,
    height: 12,
  },
  /*The gradient foreground of the image*/
  gradientForeground: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    top: 0,
    right: 0,
  },
  /*Container for filtering information at bottom of image*/
  filterInfoContainer: {
    position: 'absolute',
    width: '100%',
    padding: 10,
    paddingBottom: 20,
    bottom: 0,
    left: 0,
  },
  heading: {
    fontSize: 10,
    fontWeight: '800',
    fontFamily: 'System',
    color: 'white',
  },
  /*seperator line at the end of section*/
  seperator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.7)',
    marginTop: 10,
    marginBottom: 20,
  },
  filteringParametersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    width: 65,
    height: 10,
    marginLeft: 5,
  },
  description: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: 'System',
    color: 'white',
  },
  filterButtonContainer: {
    borderColor: 'white',
    backgroundColor: '#6BA7EC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 6,
  },
  filterButtonText: {
    fontSize: 8,
    fontWeight: '800',
    fontFamily: 'System',
    color: 'white',
  },
});

export default styles;
