/* Contains all config options for the transitions between screens
 * performed by each stack navigator defined in app/config/router.js
 */

import {Animated, Easing} from 'react-native';

// Transition config for VenueStackNavigator
// Screens slide from bottom to top over 500ms
export const VenueTransitionConfig = () => {
  // The transitionConfig obect has two properties
  // 1) A transitionSpec object
  // 2) A screenInterpolator function
  return {
    // 1) transitionSpec object configures animation timing properties
    transitionSpec: {
      duration: 400,
      easing: Easing.linear,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    // 2) screenInterpolator function configures layout transformations
    // This function gets called twice for each screen on the stack
    screenInterpolator: sceneProps => {
      // Arg sceneProps contains info about the transition
      // as well as an animated value called position
      const {position, layout, scene} = sceneProps;
      const width = layout.initWidth;
      const index = scene.index;

      // On first call, index referes to the current screen
      // On second call, index refers to the screen we are navigating to
      // The interpolation looks at both index-1 and index+1 for that reason
      // maybe??
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [width, 0, 0],
      });
      const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 0.5, index + 1],
        outputRange: [1, 1, 0.8, 0],
      });

      const slideInFromRight = {transform: [{translateX}], opacity};
      return slideInFromRight;
    },
  };
};

// Transition Config for TabWrapperStackNavigator
// MapScreen FadesIn/Out
export const TabWrapperTransitionConfig = () => {
  return {
    transitionSpec: {
      duration: 400,
      easing: Easing.linear,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const {position, scene} = sceneProps;
      //const width = layout.initWidth;
      const index = scene.index;

      // FadeIn animation
      const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [0, 1, 1],
      });
      const FadeIn = {opacity};

      return FadeIn;
    },
  };
};

// Transition config for MainStackNavigator
// Filter Screen slider in from bottom to top
export const MainTransitionConfig = () => {
  return {
    transitionSpec: {
      duration: 400,
      easing: Easing.linear,
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const {position, layout, scene} = sceneProps;
      const height = layout.initHeight;
      //const width = layout.initWidth;
      const index = scene.index;

      // Slide in from bottom animation
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });
      const opacity = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [1, 1, 0],
      });
      const slideInFromBottom = {transform: [{translateY}], opacity};

      return slideInFromBottom;
    },
  };
};
