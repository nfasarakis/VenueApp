import React, {useState, useEffect} from 'react';
import {View, Animated} from 'react-native';
import styles from './style';

/**
 * LoadingIcon Component: Custom loading icon comprised of three blinking dots.
 *                        Each "dot" is an animated View, where the animated value
 *                        is the opacity
 *                        Uses the react-native animated library.
 *
 * The LoadingIcon Component receives no props
 *
 * @return {[View]} A styled View containing three blinking animated Views in a row.
 */
export default function LoadingIcon() {
  // State contains animated value for opacity of dots
  // DEV_NOTE: react-native animated library
  //    -> does not actually call setSet() to render/update the animated values, do we dont return it.
  //    -> but animated values are placed in state as a convention.
  //    -> Could alt. use a ref but since values are reflected in UI, state is used as a convention
  let [opacityA] = useState(new Animated.Value(1));
  let [opacityB] = useState(new Animated.Value(1));
  let [opacityC] = useState(new Animated.Value(1));

  /**
   * Set's up a looping animation when component mounts
   */
  useEffect(() => {
    console.warn('Animation');
    /**
     * Initiates a looping sequential animation of
     * the opacity of the dots to mimic a loading animation.
     * @param {number} ms Duration during which a single dot fadesout/in
     *                      Total Animation duration = ms*numDots*2
     */
    const loopLoadingAnimation = ms => {
      Animated.sequence([
        Animated.timing(opacityA, {
          toValue: 0.3,
          duration: ms,
          useNativeDriver: true,
        }),
        Animated.timing(opacityB, {
          toValue: 0.3,
          duration: ms,
          useNativeDriver: true,
        }),
        Animated.timing(opacityC, {
          toValue: 0.3,
          duration: ms,
          useNativeDriver: true,
        }),
        Animated.timing(opacityA, {
          toValue: 1,
          duration: ms,
          useNativeDriver: true,
        }),
        Animated.timing(opacityB, {
          toValue: 1,
          duration: ms,
          useNativeDriver: true,
        }),
        Animated.timing(opacityC, {
          toValue: 1,
          duration: ms,
          useNativeDriver: true,
        }),
        // When anim. completes, loop it via the start() callback
      ]).start(() => loopLoadingAnimation(ms));
    };
    // Execute animation every 100ms
    loopLoadingAnimation(100);
  }, [opacityA, opacityB, opacityC]);

  /**
   * @return {[View]} View containing 3 dots animated via Animated package
   */
  return (
    <View style={styles.container}>
      <View style={styles.lightBlueDotContainer}>
        {/*Animated views -> blinking dots driven by loopLoadingAnimation()*/}
        <Animated.View style={[styles.lightBlueDot, {opacity: opacityA}]} />
        <Animated.View style={[styles.lightBlueDot, {opacity: opacityB}]} />
        <Animated.View style={[styles.lightBlueDot, {opacity: opacityC}]} />
      </View>
    </View>
  );
}
