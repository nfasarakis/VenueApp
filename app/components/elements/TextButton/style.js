import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Default style for text button container
  defaultContainerStyle: {
    width: 130,
    height: 40,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  // Default style for text within text button
  defaultTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
    color: 'black',
  }
});

export default styles;
