import {StyleSheet} from 'react-native';

// CSS styles for App component
const styles = StyleSheet.create({
  /*Container for info section*/
  container: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  /*seperator line at the end of section*/
  seperator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCBCB',
    marginBottom: 30,
  },
  /*text style for heading*/
  heading: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#4A4A4A',
  },
  MapButton: {
    borderColor: '#6BA7EC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  MapButtonText: {
    fontSize: 8,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#6BA7EC',
  },
  MapImage: {
    width: '100%',
    height: 200,
    marginTop: 25,
  }
});

export default styles;
