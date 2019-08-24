import {StyleSheet} from 'react-native';

// CSS styles for component
const styles = StyleSheet.create({
  container: {
    // Takes up all space horizontally and verticaly
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  /*Back arrow icon and it's container*/
  backIconContainer: {
    // Add padding and correct top/left values to account for it
    // so touchable area is larger
    padding: 10,
    marginTop: 30,
  },
  backIcon: {
    width: 11,
    height: 12,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  textInput: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'System',
    color: '#4A4A4A',
  },
  horLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#9B9B9B',
    marginBottom: 20,
  }
});

export default styles;
