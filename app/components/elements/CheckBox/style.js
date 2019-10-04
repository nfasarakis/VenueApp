import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Default style for the touchable container
  defaultContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Default style for the text next to the checkbox
  defaultTextStyle: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
  },
  // Default checkbox icon style
  iconStyle: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});

export default styles;
