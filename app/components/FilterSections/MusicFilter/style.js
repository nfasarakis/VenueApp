import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Container for Music Filter
  container: {
    width: '100%',
    // Seperator for the filter
    paddingBottom: 20,
  },
  // Title for Music Filter
  title: {
    fontSize: 13,
    color: '#4A4A4A',
    fontWeight: '600',
    fontFamily: 'System',
    marginBottom: 10,
    // Padding Moved here instead of container to allow nicer-looking hor scroll effect
    paddingLeft: 15,
    paddingRight: 15,
  },
  // Description for Music Filter
  description: {
    fontSize: 11,
    color: '#9B9B9B',
    fontWeight: '400',
    fontFamily: 'System',
    marginBottom: 20,
    // Padding Moved here instead of container to allow nicer-looking hor scroll effect
    paddingLeft: 15,
    paddingRight: 15,
  },
  horScrollView: {
    // Padding Moved here instead of container to allow nicer-looking hor scroll effect
    // This allows full screen scrolling that looks nicer
    paddingLeft: 15,
  },
  // Styles for buttons
  buttonContainer: {
    width: 90,
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#979797',
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 10,
  },
  // Containers for active buttons
  buttonContainerActive: {
    backgroundColor: '#6BA7EC',
  },
  // Styles for text within buttons
  buttonText: {
    fontSize: 10,
    color: '#9B9B9B',
    fontFamily: 'System',
    fontWeight: '400',
  },
  // Style for text within active button
  activeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default styles;
