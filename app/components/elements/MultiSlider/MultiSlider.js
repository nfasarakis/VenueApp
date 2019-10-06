import React, {Component} from 'react';
import {View, PanResponder, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

/**
 * MultiSlider Component: Custom animated range slider. Uses animated & PanResponder
 *                        libs to implement the slider.
 *                        The slider has a left track, an knob icon and a right track.
 *                        Animations on slider compoment are performed by manipulating
 *                        the positions of either of the knobs as the user interacts with them.
 *                        This works since the knobs are positioned absolutely and the track between
 *                        the knobs grows to fill any space between them.
 *                        E.g, the track between knobs responsds tp moving either abs. positioned knob
 *                        by growing/shrinking.
 *
 * The MultiSlider Component receives the following props
 *  @param {object} containerStyle Optional custom style for the slider container
 *  @param {object} source Mandatory source for the both icons used as the slider knobs
 *  @param {string} lineColor Color of the track between the two knobs
 *  @param {function} onSliderGestureStart Callback fired during the start of the
 *                                         gestures performed on the slider
 *  @param {function} onSliderGestureEnd Callback fired during the end of the
 *                                       gestures performed on the slider
 *  @param {function} onSliderMinValueUpdate Callback fired whenever the slider value updates
 *                                          the minimum value as the user interacts with it
 *  @param {function} onSliderMaxValueUpdate Callback fired whenever the slider value updates
 *                                          the maximum value as the user interacts with it
 *
 * @return {<View>} An intractable animated slider components
 *
 * DEV_NOTE: All animated values are stored as instances since animated library
 * does not use setState to update values
 *
 * DEV_NOTE: Since the slider knobs are placed absolutely, their position are expressed
 * as pixels w.r.t the parent component, i.e in [0, sliderIconWidth] range.
 * To retrieve the values in the [15,50] used by the parent, we interpolate them.
 * See interpolate()
 */
export default class MultiSlider extends Component {
  /**
   * Lifecycle method. Forbids re-renders caused by parent components.
   * Everytime the slider passes it's value to the parent via the
   * onSliderMinValueUpdate() or onSliderMinValueUpdate() callback,
   * the parent re-renders, causing the slider to re-render.
   * This component should never re-render since it depends on animations.
   * Animations and Animated values bypass the react render() method
   * hence, we should never need to update this component
   * @return {[false]}       [Always block updates]
   */
  shouldComponentUpdate() {
    return false;
  }

  /**
   * [Initializes the positions on the slider icons and the animated line start and width in the Slider compoment
   * Coordinates are absolute w.r.t the Slider component top-level View, i.e in the [0, sliderWidth] range]
   */
  initializePositions = () => {
    // random absolute coordinates
    this.sliderAinitXpos = 80;
    this.sliderBinitXpos = 220;
    // Initial x position of both slider icons to be animated
    this.sliderAXPos = new Animated.Value(this.sliderAinitXpos);
    this.sliderBXPos = new Animated.Value(this.sliderBinitXpos);
    // Initial width and left position for the line between the slider icons
    this.lineWidth = new Animated.Value(
      Math.abs(this.sliderAinitXpos - this.sliderBinitXpos),
    );
    this.lineStart = new Animated.Value(
      Math.min(this.sliderAinitXpos, this.sliderBinitXpos),
    );
    // Store previous x positions of slider icons
    // Used to update animated values in PanResponder handlers
    // Why? There is no obvious way to read the current value while animating
    //      according to the RN docs. So we track it separately in this variable
    //      and use it to calculate the new Xpos during the move gesture.
    // Note: we could also alternatively add a Listener with a callback but
    //       according to the docs, this may present permormance issues.
    this.sliderAPreviousXpos = this.sliderAinitXpos;
    this.sliderBPreviousXpos = this.sliderBinitXpos;
  };

  /**
   * Transforms absolute value from [0, sliderWidth] range to relative [min,max] range
   * @param  {number} value A number in the [0, sliderWidth] range
   * @param  {number} min   Lower bound of the relative coordinate range
   * @param  {number} max   Upper bound of the relative coordinate range
   * @return {number}       values intropolated in the @param min @param max range
   */
  interpolate = (value, min, max) => {
    // Note: subtracting 20 from sliderWidth since icon takes 20pixels (i.e iconWidth = 20)
    // Note <-- Add this to global config file
    const bucket = (this.sliderWidth - 20) / (max - min);
    return Math.ceil(value / bucket) + min;
  };

  /**
   * Event handler for onLayout events, i.e, this function always fires after the render() method
   * Calculates the width of the slider rendered on the screen.
   * This width is responsive to the screen and therefore not known before render
   * Used to initialize any values that depend on the rendered Slider component width
   * @param  {[object]} layout RN variable containing information about the layout of the rendered component
   */
  calcSliderWidth = layout => {
    const {width} = layout;
    this.sliderWidth = width;
    /**
     * The initial Slider values given in initializePositions() are in absolute coordinates
     * i.e in the [0, sliderWidth] range.
     * To transform them into relative coordinates used by the parent components as initial values,
     * i.e in the [15, 50] range, we need the Slider component width.
     * Since the Silder component width is first available here, tranform and update the values
     */
    this.props.onSliderMinValueUpdate(
      this.interpolate(this.sliderAPreviousXpos, 15, 50),
    );
    this.props.onSliderMaxValueUpdate(
      this.interpolate(this.sliderBPreviousXpos, 15, 50),
    );
  };

  /**
   * Object containing two pan handlers that are shared between the two
   * PanResponders - one for each knob - used in the Mutlislider component
   */
  handlers = {
    /**
     * Actives the PanResponder
     */
    onStartShouldSetPanResponder: () => true,
    /**
     * Handler that fires when gesture start is detected
     * Calls onSliderGestureStart Callback
     */
    onPanResponderGrant: () => {
      this.props.onSliderGestureStart();
    },
  };

  /**
   * Calculate new position based on the move and check that it doesn't fall
   * out of the [0, sliderWidth - sliderIconSize] range.
   * @param  {[number]} prev [previous position]
   * @param  {[number]} dx   [amount moved]
   * @return {[number]}      [new position]
   */
  calcPos = (prev, dx) => {
    let xPos = prev + dx;
    if (xPos <= 0) {
      // We have reached the left end, so restict it
      xPos = 0;
    }
    if (xPos >= this.sliderWidth - 20) {
      // We have reached the right end, so restrict it
      xPos = this.sliderWidth - 20;
    }
    return xPos;
  };

  // PanResponder object for left slider icon: corresponds to min slider value
  // Used to track gestures on the slider
  sliderAPanResposnder = PanResponder.create({
    ...this.handlers,
    /**
     * Handler that fires when move events/gestures are detected
     * Calculates the new coordiates of the left slider icon/knob as it's moved.
     * Coordinates are absolute w.r.t the Slider component top-level View,
     * i.e in the [0, sliderWidth] range
     * Uses new coord to update the width and left position of the track between knobs
     * s.t it starts and ends on both slider knobs
     *
     * @param  {[object]} evt native event object, see PanResponder docs]
     * @param  {[object]} gestureState built-in RN object, containing information
     *                                 about the gesture, see PanResponder docs
     */
    onPanResponderMove: (evt, gestureState) => {
      // New coordinate value: distance measured from the swipe plus previous X pos
      const xPos = this.calcPos(this.sliderAPreviousXpos, gestureState.dx);

      // Set new values for the position of the slider icon and animated line
      this.sliderAXPos.setValue(xPos);
      this.lineWidth.setValue(Math.abs(xPos - this.sliderBPreviousXpos));
      this.lineStart.setValue(Math.min(xPos, this.sliderBPreviousXpos));

      // Execute callback for min slider value update after interpolating results
      this.props.onSliderMinValueUpdate(this.interpolate(xPos, 15, 50));
    },
    /**
     * Handler that fires when gesture end/release is detected
     * Updates the value of the previous slider icon position, s.t it reflects the currect position
     * This allows us to use the up-to-date version of previous icon position the next time onPanResponderMove() is called
     * to determine the new final position.
     * Also calls onSliderGestureEnd Callback
     *
     * @param  {object} evt native event object, see PanResponder docs
     * @param  {object} gestureState built-in RN object, containing information
     *                               about the gesture, see PanResponder docs
     */
    onPanResponderRelease: (evt, gestureState) => {
      const xPos = this.calcPos(this.sliderAPreviousXpos, gestureState.dx);
      // Store final coord value as slider icon is released to use next time a gesture starts
      this.sliderAPreviousXpos = xPos;
      // Execute callback for end of gesture
      this.props.onSliderGestureEnd();
    },
  });

  // PanResponder object for right slider icon: corresponds to max slider value
  // Used to track gestures on the slider
  sliderBPanResposnder = PanResponder.create({
    ...this.handlers,
    /* Similar to sliderAPanResposnder.onPanResponderMove */
    onPanResponderMove: (evt, gestureState) => {
      // New coordinate value: distance measured from the swipe plus previous X pos
      const xPos = this.calcPos(this.sliderBPreviousXpos, gestureState.dx);

      // Set new values for the position of the slider icon and animated line
      this.sliderBXPos.setValue(xPos);
      this.lineWidth.setValue(Math.abs(xPos - this.sliderAPreviousXpos));
      this.lineStart.setValue(Math.min(xPos, this.sliderAPreviousXpos));

      // Execute callback for max slider value update after interpolating results
      this.props.onSliderMaxValueUpdate(this.interpolate(xPos, 15, 50));
    },
    /* Similar to sliderAPanResposnder.onPanResponderRelease */
    onPanResponderRelease: (evt, gestureState) => {
      const xPos = this.calcPos(this.sliderBPreviousXpos, gestureState.dx);
      this.sliderBPreviousXpos = xPos;
      // Execute callback for end of gesture
      this.props.onSliderGestureEnd();
    },
  });

  /**
   * Renders a View Component containing
   * A onLayout property that fires a callback when the component is rendered
   * - A horizontal line
   * - Two absolutely positioned icons with animated CSS positioning properties
   * - A animated line between the icons
   * Each icon also gets a set of corresponding PanResponder handlers passed to it using the spread operation
   * These handlers are used to handle swipping gestures
   * @return {<View>} View component respresenting a range slider component
   */
  render() {
    this.initializePositions();
    return (
      <View
        style={[this.props.containerStyle, styles.defaultContainerStyle]}
        onLayout={event => this.calcSliderWidth(event.nativeEvent.layout)}>
        <View style={styles.horizontalRule} />
        <Animated.View
          style={[
            styles.animatedLine,
            {borderBottomColor: this.props.lineColor},
            {width: this.lineWidth},
            {left: this.lineStart},
          ]}
        />
        <Animated.Image
          {...this.sliderAPanResposnder.panHandlers}
          style={[styles.sliderIconA, {left: this.sliderAXPos}]}
          source={this.props.source}
        />
        <Animated.Image
          {...this.sliderBPanResposnder.panHandlers}
          style={[styles.sliderIconB, {left: this.sliderBXPos}]}
          source={this.props.source}
        />
      </View>
    );
  }
}

// PropTypes
MultiSlider.propTypes = {
  containerStyle: PropTypes.any,
  source: PropTypes.any.isRequired,
  lineColor: PropTypes.string.isRequired,
  onSliderGestureStart: PropTypes.func.isRequired,
  onSliderGestureEnd: PropTypes.func.isRequired,
  onSliderMinValueUpdate: PropTypes.func.isRequired,
  onSliderMaxValueUpdate: PropTypes.func.isRequired,
};
