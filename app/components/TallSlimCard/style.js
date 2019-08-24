import {StyleSheet} from 'react-native';

// CSS styles for component
const styles = StyleSheet.create({
  container: {
    // The preview container takes all available width
    width:'100%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  venueInfoContainer: {
    width: '100%',
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,
    alignItems: 'center',
  },
  /*name of the venue*/
  venueName: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'System',
    color: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 80,
  },
  iconNumber: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'System',
    color: 'white',
    paddingLeft: 5,
  },
});

export default styles;
