import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  areaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaSearchIcon: {
    width: 10,
    height: 13,
    marginRight: 10,
  },
  area: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'System',
    color: '#4A4A4A',
  },
  numVenues: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
  },
  horLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCBCB',
    marginBottom: 20,
  },
});

export default styles;
