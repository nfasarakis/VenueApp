import {StyleSheet} from 'react-native';

// CSS styles for App component
const styles = StyleSheet.create({
  /*Container for Ages section*/
  container: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  /*seperator line at the end of section*/
  seperator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCBCB',
    // Margin is added as padding-bottom in toggle to make
    // touchable area larger
    marginTop: 0,
    marginBottom: 20,
  },
  heading: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#4A4A4A',
    paddingBottom: 10,
  },
  /*text style for description*/
  description: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
    paddingBottom: 20,
  },
  agesVisualContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  ageNumber: {
    fontSize: 10,
    width: 50,
    fontWeight: '500',
    fontFamily: 'System',
    color: '#9B9B9B',
    paddingBottom: 15, //Like agesBarContainer-2
  },
  agesBarContainer: {
    flex:1,
    paddingBottom: 15,
  },
  ageBarMen: {
    borderBottomWidth: 5,
    borderBottomColor: '#6BA7EC'
  },
  ageBarWomen: {
    borderBottomWidth: 5,
    borderBottomColor: '#FBA3E5',
  },
  vertBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  vertBar: {
    flex: 4,
    borderLeftWidth: 1,
    borderLeftColor: 'rgb(209,204,204)',
    opacity: 0.2,
  },
  toggleTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggle: {
    // Width depends on content
    alignSelf: 'flex-start',
    paddingTop: 20,
    // Add padding to the bottom to make touchable area larger
    paddingBottom: 20,
    color: '#9B9B9B',
    fontSize: 11,
    fontWeight: '500',
    fontFamily: 'System',
  },
  active: {
    color: '#6BA7EC',
  },
  toggleTextSeperator: {
    height: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(151,151,151,0.5)',
    marginTop: 20,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  }
});

export default styles;
