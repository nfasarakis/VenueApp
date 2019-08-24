import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Container for Number Filter
  container: {
    width: '100%',
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    // Seperator for the filter
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155,155,155,0.5)',
    marginBottom: 20,
  },
  heading: {
    fontSize: 13,
    fontFamily: 'System',
    color: '#4A4A4A',
    fontWeight: '600',
    marginBottom: 10,
  },
  /*text style for description*/
  description: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
    paddingBottom: 20,
  },
  help: {
    color: '#6BA7EC',
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  StatButton: {
    width: 75,
    borderColor: '#6BA7EC',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 6,
    paddingBottom: 6,
    marginRight: 20,
  },
  StatButtonText: {
    textAlign: 'center',
    fontSize: 8,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#6BA7EC',
  },
  active: {
    backgroundColor: '#6BA7EC',
  },
  activeTxt: {
    color: 'white',
  },
});

export default styles;
