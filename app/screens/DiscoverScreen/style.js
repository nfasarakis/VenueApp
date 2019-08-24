import {StyleSheet} from 'react-native';

// CSS styles for App component
const styles = StyleSheet.create({
  // The main Screen container
  // Parent of all screens in the App
  container: {
    // Takes up all space horizontally and verticaly
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  // Container for the information appearing before the storelist
  storelistheaderContainer: {
    width: '100%',
    paddingLeft: 5,
    paddingTop: 20,
    paddingBottom: 10,
  },
  // Style for the header in the information before the storelist
  storelistheader: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    fontFamily: 'System',
  },
  // Style for the red horizontal line in information before storelist
  horline: {
    width: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#D0021B',
    marginTop: 10,
    marginBottom: 10,
  },
  // Style for the body of the information before storelist
  storelistbody: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
  },
  horFlatList: {
    paddingLeft: 0,
  },
  horFlatListItems: {
    width: 300,
    height: 170,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2,
    position: 'relative',
    // iOS only
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}, // w moves shadow right, h moves shaddow down
    shadowOpacity: 0.4,
    shadowRadius: 4,
    // Android only
    backgroundColor: 'white',
    elevation: 5,
  },
  vertFlatListItems: {
    width: '100%',
    height: 200,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    position: 'relative',
    // iOS only
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}, // w moves shadow right, h moves shaddow down
    shadowOpacity: 0.4,
    shadowRadius: 4,
    // Android only
    backgroundColor: 'white',
    elevation: 5,
  },
});

export default styles;
