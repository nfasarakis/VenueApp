import {StyleSheet} from 'react-native';

// CSS styles for App component
const styles = StyleSheet.create({
  /*Container for Genders section*/
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
  peopleVisualContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  genderIcon: {
    width: 13,
    height: 13,
  },
  menVisualText: {
    paddingTop: 3,
    color: '#6BA7EC',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'System',
  },
  womenVisualText: {
    paddingTop: 3,
    color: '#FBA3E5',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'System',
  },
  genderBarContainer: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    // So that it aligns with the bottom og the genderIcons
    position: 'relative',
    top: 8, // should be 9 but 8 looks better
  },
  menBar: {
    borderBottomColor: '#6BA7EC',
    borderBottomWidth: 5,
    width: '50%',
  },
  womenBar: {
    borderBottomColor: '#FBA3E5',
    borderBottomWidth: 5,
    width: '50%',
  },
  toggleTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggle: {
    // Width depends on content
    alignSelf: 'flex-start',
    paddingTop: 10,
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
    marginTop: 10,
    marginBottom: 20,
    marginRight: 10,
    marginLeft: 10,
  },
});

export default styles;
