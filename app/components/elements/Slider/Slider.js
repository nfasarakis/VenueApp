import React, { Component } from 'react';
import {View, PanResponder, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';


export default class Slider extends Component {

  static propTypes = {
    // Additional custom style for the top-level View component in render()
    containerStyle: PropTypes.any,
    // Image component source property for the icons in the Slider component
    source: PropTypes.any.isRequired,
    // Hex string containing the colors of the lines left and right of icon in the Slider component
    lineColorLeft: PropTypes.string.isRequired,
    lineColorRight: PropTypes.string.isRequired,
    // Event handlers fired during the start and end of gestures on the Slider component
    // Used mainly to disable/enable scroll on ancestor ScrollViews
    onSliderGestureStart: PropTypes.func.isRequired,
    onSliderGestureEnd: PropTypes.func.isRequired,
    // Event handler fired when on value updates of the Slider Component
    // Used mainly to triger re-renders of elements depending on these values in parent components
    onSliderValueUpdate: PropTypes.func.isRequired,
  }

  /**
   * [Lifecycle method. Forbids re-renders caused by parent components.
   * This component never re-renders since it depends on animations.
   * Animations and Animated values bypass the react render() method
   * hence, we should never need to update this component
   * Used for optimization purposes]
   * @return {[false]}       [Always block updates]
   */
  shouldComponentUpdate(){return false;}

  /**
   * [Calculates the width of the slider rendered on the screen.
   * Event handler for onLayout events, i.e, this function always fires after the render() method]
   * Used to restrict slider icon/images whithin the bounds of the slider.
   * Also used to initialize any values that depend on the Slider component width
   * @param  {[object]} layout [RN variable containing information about the layout of the rendered component]
   */
  calcSliderWidth = (layout) => {
    const {width} = layout;
    this.sliderWidth = width;
    /** Hack!
    * The initial lineWidth values given in initializePositions() depend on the Slider component width
    * Since the Silder component width is first available here, set the values correcty
    */
    this.leftLineWidth.setValue((this.sliderWidth/2)-10);
    this.rightLineWidth.setValue((this.sliderWidth/2)-10);
    this.leftLinePreviousWidth = (this.sliderWidth/2)-10;
    this.rightLinePreviousWidth = (this.sliderWidth/2)-10;
  }

  /**
   * [Initializes the widths of the lines left and right of the slider icon in the Slider compoment
   * Animations on this Slider compoment are performed by manipulating the widths of these lines.
   * This works since the lines and icon are placed relatively in a flex-row container
   * E.g, increasing the width of the left line pushes the icon to the right and vise/versa
   * ]
   */
  initializePositions = () => {
    // Initial line widths: large enough so the component renders them correctly (see overflow property on container CSS)
    // These values get corrected instantly during the onLayout event
    this.leftLineWidth = new Animated.Value(500);
    this.rightLineWidth = new Animated.Value(500);
    // Store previous line widths of lines across the slider icons
    // Used to update animated values in the PanResponder handlers
    this.leftLinePreviousWidth = 500;
    this.rightLinePreviousWidth = 500;
  }


  /**
   * [Calculates new widths of the lines across the icon based on the value of the move gesture
   * Checks and inforces that new values are in bound]
   * @param  {[number]} prevLeftWidth  [The previous stored value of the left line width]
   * @param  {[number]} prevRightWidth [The previous stored value of the right line width]
   * @param  {[number]} dx             [Distance measured by the gesture in pixels as recorded by panHandlers]
   * @return {[Array]}                [Array containing the new values for the left and right width]
   */
  calcLineWidth = (prevLeftWidth, prevRightWidth, dx) => {
    // New lineWidth values: distance measured from the swipe (+/-) previous line widths
    let leftWidth = prevLeftWidth + dx;
    let rightWidth = prevRightWidth - dx;
    // Restrict the value to to stay in bounds
    // Keep in mind that the icon width is 20 pixels
    if (leftWidth<=0) {
      // We have reached the left end, so restrict left line width
      leftWidth = 0;
      // An set right line width to maximum posible value, i.e the Slider width
      rightWidth = this.sliderWidth-20;
    }
    if (rightWidth <= 0) {
      // We have reached the right end, so retrict right line width
      rightWidth = 0;
      // An set left line width to maximum posible value, i.e the Slider width
      leftWidth = this.sliderWidth-20;
    }
    return [leftWidth, rightWidth];
  }

  // PanResponder object for the slider icon: corresponds to slider value
  // Used to track gestures on the slider
  sliderPanResposnder = PanResponder.create({
    /**
     * [Actives the PanResponder]
     * @return {[boolen]} [true for activating the PanResponder]
     */
    onStartShouldSetPanResponder: () => true,
    /**
     * [Handler that fires when gesture start is detected
     * Calls onSliderGestureStart Callback]
     */
    onPanResponderGrant: () => {
      this.props.onSliderGestureStart();
    },
    /**
     * [Handler that fires when move events/gestures are detected
     * Calculates the new widths of the lines left and right of the slider icon, as the later is moved]
     * @param  {[object]} evt          [native event object, see PanResponder docs]
     * @param  {[object]} gestureState [built-in RN object, containing information about the gesture, see PanResponder docs]
     */
    onPanResponderMove: (evt, gestureState) => {

      // Compute new values for widths of lines left and right of the slider icon
      const [newLeftLineWidth, newRightLineWidth] = this.calcLineWidth(this.leftLinePreviousWidth,
        this.rightLinePreviousWidth, gestureState.dx);

      // Set new values for the left and right line
      this.leftLineWidth.setValue(newLeftLineWidth);
      this.rightLineWidth.setValue(newRightLineWidth);

      // Execute callback for slider value update before transforming the value
      // Value is the percentage of the right line w.r.t the full slider lenght
      const nom = newRightLineWidth;
      const den = newLeftLineWidth+newRightLineWidth;
      this.props.onSliderValueUpdate(Math.ceil(nom*100/den));

    },
    /**
     * [Handler that fires when gesture end/release is detected
     * Updates the value of the previous left/right line widths, s.t they reflect the currect left/right line widths
     * This allows us to use the up-to-date version of these widths the next time onPanResponderMove() is called
     * Also calls onSliderGestureEnd Callback]
     * @param  {[object]} evt          [native event object, see PanResponder docs]
     * @param  {[object]} gestureState [built-in RN object, containing information about the gesture, see PanResponder docs]
     */
    onPanResponderRelease: (evt, gestureState) => {

      // Update value of previous line widths
      [this.leftLinePreviousWidth, this.rightLinePreviousWidth]
      = this.calcLineWidth(this.leftLinePreviousWidth,
          this.rightLinePreviousWidth, gestureState.dx);

      // Execute callback for end of gesture
      this.props.onSliderGestureEnd();

    }
  });

  /**
   * [Renders a View Component containing
   * A onLayout property that fires a callback when the component is rendered
   * A) Two horizontal lines with animated CSS width properies
   * B) An Image compoment component respresenting the slider icon
   * The icon gets a set of corresponding PanResponder handlers passed to it using the spread operation
   * These handlers are used to handle swipping gestures]
   * @return {[View]} [View component respresenting a slider component]
   */
  render() {
    this.initializePositions();
    return (
      <View
        style={[styles.defaultContainerStyle, this.props.containerStyle]}
        onLayout={(event)=>{this.calcSliderWidth(event.nativeEvent.layout);}}
      >
        <Animated.View
          style={[styles.animatedLineLeft,
            {borderBottomColor: this.props.lineColorLeft},
            {width: this.leftLineWidth}]}
        >
        </Animated.View>
        <Animated.Image
          {...this.sliderPanResposnder.panHandlers}
          style={styles.sliderIcon}
          source={this.props.source}
        />
        <Animated.View
          style={[styles.animatedLineRight,
            {borderBottomColor: this.props.lineColorRight},
            {width: this.rightLineWidth}]}
        >
        </Animated.View>
      </View>
    );
  }
}
