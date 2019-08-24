import {StyleSheet} from 'react-native';

// CSS styles for App component
const styles = StyleSheet.create({
  /*Container for Visited section*/
  container: {
    width: '100%',
  },
  heading: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#4A4A4A',
    paddingBottom: 10,
    // Placed here instaed of container to allow flatlist to scroll
    //  fully horizontally
    paddingLeft: 15,
    paddingRight: 15,
  },
  /*text style for description*/
  description: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
    paddingBottom: 20,
    // Placed here instaed of container to allow flatlist to scroll
    //  fully horizontally
    paddingLeft: 15,
    paddingRight: 15,
  },
  horFlatList: {
    marginLeft: 15,
    paddingBottom: 20,
  },
  vertFlatListItems: {
    width: 300,
    height: 170,
    marginLeft: 0,
    marginRight: 10,
    marginBottom: 2,
    position: 'relative',
    // iOS only
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, // w moves shadow right, h moves shaddow down
    shadowOpacity: 0.4,
    shadowRadius: 4,
    // Android only
    backgroundColor: 'white',
    elevation: 5,
  }
});

export default styles;
