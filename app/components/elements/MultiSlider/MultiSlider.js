import React, { Component } from 'react';
import {View, PanResponder, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';


export default class MultiSlider extends Component {

  static propTypes = {
    // Additional custom style for the top-level View component in render()
    containerStyle: PropTypes.any,
    // Image component source property for both icons in the Slider component
    source: PropTypes.any.isRequired,
    // Hex string containing the color of the line that connects both Image/icons in the Slider component
    lineColor: PropTypes.string.isRequired,
    // Event handlers fired during the start and end of gestures on the Slider component
    // Used mainly to disable/enable scroll on ancestor ScrollViews
    onSliderGestureStart: PropTypes.func.isRequired,
    onSliderGestureEnd: PropTypes.func.isRequired,
    // Event handlers fired when on min/max value updates of the Slider Component
    // Used mainly to triger re-renders of elements depending on these values in parent components
    onSliderMinValueUpdate: PropTypes.func.isRequired,
    onSliderMaxValueUpdate: PropTypes.func.isRequired,
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
    * The initial Slider values given in initializePositions() are in absolute coordinates
    * To transorm them into relative coordinates used by the parent components, we need the Slider component width.
    * Since the Silder component width is first available here, tranform and update the values
    */
    this.props.onSliderMinValueUpdate(this.interpolate(this.sliderAPreviousXpos,15,50));
    this.props.onSliderMaxValueUpdate(this.interpolate(this.sliderBPreviousXpos,15,50));
  }

  /**
   * [Transform absolute value from [0, sliderWidth] to relative [min,max] range]
   * @param  {[number]} value [A number in the [0, sliderWidth] range]
   * @param  {[number]} min   [Lower bound of the relative coordinate range]
   * @param  {[number]} max   [Upper bound of the relative coordinate range]
   * @return {[number]}       [values intropolated in the @param min @param max range]
   */
  interpolate = (value, min, max) => {
    // Note: subtracting 20 from sliderWidth since icon takes 20pixels (i.e iconWidth = 20)
    const bucket = (this.sliderWidth-20)/(max-min);
    return Math.ceil(value/bucket)+min;
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
    this.lineWidth = new Animated.Value(Math.abs(this.sliderAinitXpos - this.sliderBinitXpos));
    this.lineStart = new Animated.Value(Math.min(this.sliderAinitXpos, this.sliderBinitXpos));
    // Store previous x positions of slider icons
    // Used to update animated values in PanResponder handlers
    this.sliderAPreviousXpos = this.sliderAinitXpos;
    this.sliderBPreviousXpos = this.sliderBinitXpos;
  }

  handlers = {
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
  }

  /**
   * Calculate new position based on the move and check that it doesn't fall
   * out of any right-left bound [0, sliderWidth - sliderIconSize].
   * @param  {[number]} prev [previous position]
   * @param  {[number]} dx   [ammount moved]
   * @return {[number]}      [new position]
   */
  calcPos = (prev, dx) => {
    let xPos = prev + dx;
    if (xPos <= 0) {
      // We have reached the left end, so restict it
      xPos=0;
    }
    if (xPos >= this.sliderWidth-20) {
      // We have reached the right end, so restrict it
      xPos=this.sliderWidth-20;
    }
    return xPos;
  }

  // PanResponder object for left slider icon: corresponds to min slider value
  // Used to track gestures on the slider
  sliderAPanResposnder = PanResponder.create({
    ...this.handlers,
    /**
     * [Handler that fires when move events/gestures are detected
     * Calculates the new coordiates of the slider icon as it's moved.
     * Coordinates are absolute w.r.t the Slider component top-level View, i.e in the [0, sliderWidth] range
     * Also updates the width and left position of the slider s.t it starts and ends on both slider icons]
     * @param  {[object]} evt          [native event object, see PanResponder docs]
     * @param  {[object]} gestureState [built-in RN object, containing information about the gesture, see PanResponder docs]
     */
    onPanResponderMove: (evt, gestureState) => {
      const xPos = this.calcPos(this.sliderAPreviousXpos, gestureState.dx);

      // Set new values for the position of the slider icon and animated line
      this.sliderAXPos.setValue(xPos);
      this.lineWidth.setValue(Math.abs(xPos - this.sliderBPreviousXpos));
      this.lineStart.setValue(Math.min(xPos,this.sliderBPreviousXpos));

      /* Execute callback for min slider value update after interpolating results
         Should propably add the min/max interpolation range variables as props,
         so that the this multi slider component is fully reusable
      */
      this.props.onSliderMinValueUpdate(this.interpolate(xPos,15,50));
    },
    /**
     * [Handler that fires when gesture end/release is detected
     * Updates the value of the previous slider icon position, s.t it reflects the currect position
     * This allows us to use the up-to-date version of previous icon position the next time onPanResponderMove() is called
     * Also calls onSliderGestureEnd Callback]
     * @param  {[object]} evt          [native event object, see PanResponder docs]
     * @param  {[object]} gestureState [built-in RN object, containing information about the gesture, see PanResponder docs]
     */
    onPanResponderRelease: (evt, gestureState) => {
      const xPos = this.calcPos(this.sliderAPreviousXpos, gestureState.dx);
      this.sliderAPreviousXpos = xPos;
      // Execute callback for end of gesture
      this.props.onSliderGestureEnd();
    }
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
      this.lineStart.setValue(Math.min(xPos,this.sliderAPreviousXpos));

      // Execute callback for max slider value update after interpolating results
      this.props.onSliderMaxValueUpdate(this.interpolate(xPos,15,50));

    },
    /* Similar to sliderAPanResposnder.onPanResponderRelease */
    onPanResponderRelease: (evt, gestureState) => {
      const xPos = this.calcPos(this.sliderBPreviousXpos, gestureState.dx);
      this.sliderBPreviousXpos = xPos;
      // Execute callback for end of gesture
      this.props.onSliderGestureEnd();
    }
  });

  /**
   * [Renders a View Component containing
   * A onLayout property that fires a callback when the component is rendered
   * A) A horizontal line
   * B) Two absolutely positioned icons with animated CSS positioning properties
   * C) A animated line between the icons
   * Each icon also gets a set of corresponding PanResponder handlers passed to it using the spread operation
   * These handlers are used to handle swipping gestures]
   * @return {[View]} [View component respresenting a slider component]
   */
  render() {
    this.initializePositions();
    return (
      <View
        style={[this.props.containerStyle,styles.defaultContainerStyle]}
        onLayout={(event)=>{this.calcSliderWidth(event.nativeEvent.layout);}}
      >
        <View style={styles.horizontalRule}>
        </View>
        <Animated.View
          style={[styles.animatedLine,
            {borderBottomColor: this.props.lineColor},
            {width: this.lineWidth},
            {left: this.lineStart}]}
        >
        </Animated.View>
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
