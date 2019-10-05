import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightBlueDotContainer: {
    flexDirection: 'row',
  },
  lightBlueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: '#6BA7EC',
  },
});

export default styles;
