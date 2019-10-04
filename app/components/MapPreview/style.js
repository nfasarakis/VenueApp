import {StyleSheet} from 'react-native';
import config from '../../config';

const styles = StyleSheet.create({
  container: {
    width: config.dimensions.CARD_WIDTH_MAP,
    marginRight: 5,
    marginLeft: 5,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    // Android only
    backgroundColor: 'white',
    elevation: 5,
  },
  mainImage: {
    width: '100%',
    height: config.dimensions.CARD_HEIGHT_MAP,
  },
  favorite: {
    position: 'absolute',
    top: 12,
    right: 10,
    width: 15,
    height: 15,
  },
  venueInfoContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
  venueName: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'System',
    color: 'white',
    paddingTop: 30,
    paddingLeft: 10,
  },
  venueInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  infoText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'System',
    color: 'white',
    paddingRight: 10,
  },
  rating: {
    width: 65,
    height: 10,
    marginRight: 10,
  },
  inlineGenderIconContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  cardGenderIcon: {
    width: 11,
    height: 11,
  },
  genderNumber: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'System',
    color: 'white',
    paddingLeft: 5,
  },
  genderNumberMan: {
    paddingRight: 10,
  },
});

export default styles;
