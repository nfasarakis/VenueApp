import {StyleSheet} from 'react-native';

// CSS styles for App component
const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
  },
  seperator: {
    width: '100%',
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(151,151,151,0.3)',
    backgroundColor: 'white',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
  },
  backIcon: {
    width: 5,
    height: 12,
  },
  backButtonText: {
    paddingLeft: 2,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#6BA7EC',
  },
  OptionButton: {
    width: 75,
    borderColor: '#6BA7EC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  ActiveButton: {
    width: 75,
    borderColor: '#6BA7EC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    backgroundColor: '#6BA7EC',
  },
  OptionButtonText: {
    textAlign: 'center',
    fontSize: 8,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#6BA7EC',
  },
  ActiveText: {
    textAlign: 'center',
    fontSize: 8,
    fontWeight: '800',
    fontFamily: 'System',
    color: 'white',
  },
});

export default styles;
