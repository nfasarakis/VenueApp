import {StyleSheet, Platform} from 'react-native';

// CSS styles for component
const styles = StyleSheet.create({
  container: {
    // Take up full width available
    width: '100%',
    // Make flex-children arrange in a row
    flexDirection: 'row',
    // Space flex-children on the main axis
    justifyContent: 'space-between',
    // Center flex-children on the cross axis
    alignItems: 'center',
    // Pad 15 around container but 30 on the top
    padding: 10,
    // Different padding on iOS/Android due to different status bars
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    // Colors: background/border
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
  },
  filtericon: {
    // Same as actual image relative dimentions
    width: 24,
    height: 16,
  },
  mapicon: {
    // Same as actual image relative dimentions
    width: 25,
    height: 25,
  },
  listIcon: {
    width: 25,
    height: 16,
  }
});


export default styles;
