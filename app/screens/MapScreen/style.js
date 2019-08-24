import {StyleSheet} from 'react-native';

// CSS styles for App component
const styles = StyleSheet.create({
  // The main Screen container
  // Parent of all screens in the App
  container: {
    // Takes up all space horizontally and verticaly
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  mapContainer: {
    // Must be places absolutely
    position:'absolute',
    top:0,left:0,right:0,bottom:0
  }
});

export default styles;
