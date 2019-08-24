import {StyleSheet} from 'react-native';

// CSS styles for App component
const styles = StyleSheet.create({
  /*Container for info section*/
  container: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 20,
  },
  /*seperator line at the end of section*/
  seperator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCBCB',
    marginTop: 20,
    marginBottom: 20,
  },
  /*text style for heading*/
  heading: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#4A4A4A',
    paddingBottom: 10,
  },
  /*text style for offer*/
  offer: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'System',
    color: '#6BA7EC',
    paddingBottom: 20,
  },
  /*container for options of about section*/
  optionsContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(151,151,151,0.3)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(151,151,151,0.3)',
    marginBottom: 10,
  },
  /*Individual option items*/
  optionItem: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(151,151,151,0.3)',
  },
  optionItemLastChild: {
    borderRightWidth: 0,
  },
  /*Icon of option item*/
  optionIcon: {
    width: 9.6,
    height: 9,
    marginRight: 5,
  },
  /*text of option item*/
  optionTitle: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
  },
  /*text of active option item title*/
  active: {
    color: '#6BA7EC',
  },
  /*text style for description*/
  description: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
    paddingBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row'
  },
  AboutButton: {
    borderColor: '#6BA7EC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 6,
    marginRight: 20,
  },
  AboutButtonText: {
    fontSize: 8,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#6BA7EC',
  },
});

export default styles;
