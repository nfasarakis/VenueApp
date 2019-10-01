import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#4A4A4A',
  },
  price: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#4A4A4A',
  },
  description: {
    fontSize: 11,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
  },
  horLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CDCBCB',
    marginTop: 15,
    marginBottom: 15,
  },
});

export default styles;
