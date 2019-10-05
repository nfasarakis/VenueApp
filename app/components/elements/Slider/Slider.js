import React, {Component} from 'react';
import {View, PanResponder, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

/**
 * Slider Component: Custom animated slider. Uses animated & PanResponder libraries
 *                   to implement the slider.
 *                   The slider has a left track, an knob icon and a right track.
 *                   Animations on slider compoment are performed by manipulating
 *                   the widths of these lines as the user inteacts with the knob,
 *                   This works since the tracks and icon are placed relatively in a flex-row container
 *                   E.g, increasing the width of the left track pushes the icon to the right and vise/versa
 *
 * The Slider Component receives the following props
 *  @param {object} containerStyle Optional custom style for the slider container
 *  @param {object} source Mandatory source for the icon used as the slider knob
 *  @param {string} lineColorLeft Color of the track on the left of the knob
 *  @param {string} lineColorRight Color of the track on the right of the knob
 *  @param {function} onSliderGestureStart Callback fired during the start of the
 *                                         gestures performed on the slider
 *  @param {function} onSliderGestureEnd Callback fired during the end of the
 *                                       gestures performed on the slider
 *  @param {function} onSliderValueUpdate Callback fired whenever the slider value updates
 *                                        as the user interacts with it
 *
 * @return {<View>} An intractable animated slider components
 *
 * DEV_NOTE: All animated values are stored as instances since animated library
 * does not use setState to update values
 */
export default class Slider extends Component {
  /**
   * Lifecycle method. Forbids re-renders caused by parent components.
   * Everytime the slider passes it's value to the parent via the onSliderValueUpdate()
   * callback, the parent re-renders, causing the slider to re-render.
   * This component should never re-render since it depends on animations.
   * Animations and Animated values bypass the react render() method
   * hence, we should never need to update this component
   */
  shouldComponentUpdate() {
    return false;
  }

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
     * The initial lineWidth values given in initializePositions() are arbitrary
     * They depend on the width of the slider which was not available during initializePositions()
     * Since the Silder component width is first available here, set the values correcty
     */
    this.leftLineWidth.setValue(this.sliderWidth / 2 - 10); // 10 -> sliderIcon width/2
    this.rightLineWidth.setValue(this.sliderWidth / 2 - 10); // 10 -> sliderIcon width/2
    this.leftLinePreviousWidth = this.sliderWidth / 2 - 10; // 10 -> sliderIcon width/2
    this.rightLinePreviousWidth = this.sliderWidth / 2 - 10; // 10 -> sliderIcon width/2
  };

  /**
   * Initializes the widths of the lines left and right of the slider icon in the Slider compoment
   * Animations on this Slider compoment are performed by manipulating the widths of these lines.
   * This works since the lines and icon are placed relatively in a flex-row container
   * E.g, increasing the width of the left line pushes the icon to the right and vise/versa
   */
  initializePositions = () => {
    // Initial line widths: large enough so the component renders them
    //    correctly (see overflow property on container CSS)
    // These values get corrected instantly in calcLineWidth(), a callback
    //    executed during the onLayout event
    this.leftLineWidth = new Animated.Value(500);
    this.rightLineWidth = new Animated.Value(500);
    // Store previous line widths of lines across the slider icons
    // Used to update animated values in the PanResponder handlers
    this.leftLinePreviousWidth = 500;
    this.rightLinePreviousWidth = 500;
  };

  /**
   * Calculates new widths of the lines across the icon based on the value of the move gesture
   * Checks and inforces that new values are in bound
   * @param  {number} prevLeftWidth  The previous stored value of the left line width
   * @param  {number} prevRightWidth The previous stored value of the right line width
   * @param  {number} dx Distance measured by the gesture in pixels as recorded by panHandlers
   * @return {Array} Array containing the new values for the left and right width]
   */
  calcLineWidth = (prevLeftWidth, prevRightWidth, dx) => {
    // New lineWidth values: distance measured from the swipe (+/-) previous line widths
    let leftWidth = prevLeftWidth + dx;
    let rightWidth = prevRightWidth - dx;
    // Restrict the value to to stay in bounds
    // Keep in mind that the icon width is 20 pixels
    if (leftWidth <= 0) {
      // We have reached the left end, so restrict left line width
      leftWidth = 0;
      // An set right line width to maximum posible value, i.e the Slider width
      rightWidth = this.sliderWidth - 20;
    }
    if (rightWidth <= 0) {
      // We have reached the right end, so retrict right line width
      rightWidth = 0;
      // An set left line width to maximum posible value, i.e the Slider width
      leftWidth = this.sliderWidth - 20;
    }
    return [leftWidth, rightWidth];
  };

  // PanResponder object for the slider icon: corresponds to slider value
  // Used to track gestures on the slider
  sliderPanResposnder = PanResponder.create({
    /**
     * Actives the PanResponder
     * @return {boolen} true for activating the PanResponder
     */
    onStartShouldSetPanResponder: () => true,
    /**
     * Handler that fires when gesture start is detected
     * Calls props.onSliderGestureStart Callback
     */
    onPanResponderGrant: () => {
      this.props.onSliderGestureStart();
    },
    /**
     * Handler that fires when move events/gestures are detected
     * Calculates the new widths of the lines left and right of the slider icon,
     * as the later is moved by the user
     * @param  {[object]} evt native event object, see PanResponder docs
     * @param  {[object]} gestureState built-in RN object, containing information
     *                                 about the gesture, see PanResponder docs
     */
    onPanResponderMove: (evt, gestureState) => {
      // Compute new values for widths of lines left and right of the slider icon
      const [newLeftLineWidth, newRightLineWidth] = this.calcLineWidth(
        this.leftLinePreviousWidth,
        this.rightLinePreviousWidth,
        gestureState.dx,
      );

      // Set new values for the left and right line
      this.leftLineWidth.setValue(newLeftLineWidth);
      this.rightLineWidth.setValue(newRightLineWidth);

      // Execute slider value update callback after transforming the value to the [0, 100%] range
      // Value is the percentage of the right line w.r.t the full slider length
      const nom = newRightLineWidth;
      const den = newLeftLineWidth + newRightLineWidth;
      this.props.onSliderValueUpdate(Math.ceil((nom * 100) / den));
    },
    /**
     * Handler that fires when gesture end/release is detected
     * Updates the value of the previous left/right line widths, s.t they reflect the currect left/right line widths
     * This allows us to use the up-to-date version of these widths the next time onPanResponderMove() is called
     * Also calls onSliderGestureEnd Callback
     * @param  {[object]} evt native event object, see PanResponder docs
     * @param  {[object]} gestureState built-in RN object, containing information
     *                                 about the gesture, see PanResponder docs
     */
    onPanResponderRelease: (evt, gestureState) => {
      // Update value of previous line widths
      [
        this.leftLinePreviousWidth,
        this.rightLinePreviousWidth,
      ] = this.calcLineWidth(
        this.leftLinePreviousWidth,
        this.rightLinePreviousWidth,
        gestureState.dx,
      );

      // Execute callback for end of gesture
      this.props.onSliderGestureEnd();
    },
  });

  /**
   * Renders a View Component containing
   *  -- onLayout property that fires a callback when the component is rendered
   *  -- Two horizontal lines with animated CSS width properies
   *  -- An Image compoment component respresenting the slider icon
   * The icon gets a set of corresponding PanResponder handlers passed to it using the spread operation
   * These handlers are used to handle swipping gestures
   * @return {<View>} View component respresenting a slider component
   */
  render() {
    this.initializePositions();
    return (
      <View
        style={[styles.defaultContainerStyle, this.props.containerStyle]}
        onLayout={event => this.calcSliderWidth(event.nativeEvent.layout)}>
        <Animated.View
          style={[
            styles.animatedLineLeft,
            {borderBottomColor: this.props.lineColorLeft},
            {width: this.leftLineWidth},
          ]}
        />
        <Animated.Image
          {...this.sliderPanResposnder.panHandlers}
          style={styles.sliderIcon}
          source={this.props.source}
        />
        <Animated.View
          style={[
            styles.animatedLineRight,
            {borderBottomColor: this.props.lineColorRight},
            {width: this.rightLineWidth},
          ]}
        />
      </View>
    );
  }
}

//PropTypes
Slider.propTypes = {
  containerStyle: PropTypes.any,
  source: PropTypes.any.isRequired,
  lineColorLeft: PropTypes.string.isRequired,
  lineColorRight: PropTypes.string.isRequired,
  onSliderGestureStart: PropTypes.func.isRequired,
  onSliderGestureEnd: PropTypes.func.isRequired,
  onSliderValueUpdate: PropTypes.func.isRequired,
};
