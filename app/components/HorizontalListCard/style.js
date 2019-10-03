import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
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
