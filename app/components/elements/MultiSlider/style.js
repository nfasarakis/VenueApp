import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Default style for container for the slider element
  defaultContainerStyle: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
    // For absolutely positioning icon children
    position: 'relative',
  },
  // Acts as a horizontal line
  horizontalRule: {
    borderBottomWidth: 1,
    borderBottomColor: '#9B9B9B',
  },
  // First icon used for slider
  sliderIconA: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    left: '20%',
  },
  // Second icon used for slider
  sliderIconB: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    right: '20%',
  },
  // Animated coloured line between the icons
  animatedLine: {
    borderBottomWidth: 1.5,
    top: -1, // Same as horizontalRule border Width
  },
});

export default styles;
