import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Default style for container for the slider element
  defaultContainerStyle: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // For ease of development, left/right lines are allowed to take a very large width
    // and are then cropped with the overflow property s.t they do not exceed container
    // This is practically only used during the initialization, since the line width is
    // then dirrectly controled in the panHandler for the icon
    overflow: 'hidden',
  },
  // The icon used for slider
  sliderIcon: {
    width: 20,
    height: 20, // <-- Should Add to config
    position: 'relative',
    // Make icons overlap lines
    zIndex: 1,
  },
  // Animated coloured lines across the icon
  animatedLineLeft: {
    borderBottomWidth: 1.5,
    // Align line with icon, keeping in mind that icon height is 20
    position: 'relative',
    bottom: 10, // Same as sliderIcon height / 2
  },
  // Animated coloured lines across the icon
  animatedLineRight: {
    borderBottomWidth: 1.5,
    // Align line with icon, keeping in mind that icon height is 20
    position: 'relative',
    bottom: 10, // Same as sliderIcon height / 2
  },
});

export default styles;
