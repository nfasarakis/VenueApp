import React, { Component } from 'react';
import {View, Animated} from 'react-native';
import styles from './style';

export default class LoadingIcon extends Component {

  // Animated value for opacity of dots
  opacityA = new Animated.Value(1);
  opacityB = new Animated.Value(1);
  opacityC = new Animated.Value(1);
  // Flag for looping animation
  finished = false;

  /**
   * Initiates a looping sequential animation of
   * the opacity of the dots to mimic a loading animation.
   * @param {[Number]} ms Duration during which a single dot fadesout/in
   *                      Total Animation duration = ms*numDots*2
   */
  LoopLoadingAnimation = (ms) => {
    this.loadingAnimation = Animated.sequence([
      Animated.timing(
        this.opacityA,
        {
          toValue:0.3,
          duration: ms,
        }
      ),
      Animated.timing(
        this.opacityB,
        {
          toValue:0.3,
          duration: ms,
        }
      ),
      Animated.timing(
        this.opacityC,
        {
          toValue:0.3,
          duration: ms,
        }
      ),
      Animated.timing(
        this.opacityA,
        {
          toValue:1,
          duration: ms,
        }
      ),
      Animated.timing(
        this.opacityB,
        {
          toValue:1,
          duration: ms,
        }
      ),
      Animated.timing(
        this.opacityC,
        {
          toValue:1,
          duration: ms,
        }
      )
    ]).start(()=>{
      if (!this.finished){
        this.LoopLoadingAnimation(ms);
      }
    });
  }

  /**
   * Stops the loading animation so it doesnt loop indefinately
   */
  stopLoadingAnimation = () => {
    this.finished = true;
  }

  /**
   * Lifecycle method: executes after first render
   * Starts a looping animation
   */
  componentDidMount() {
    this.LoopLoadingAnimation(100);
  }

  /**
   * Lifecycle method: executes before the component
   * unmounts
   * @return {[type]} [description]
   */
  componentWillUnmount(){
    // Stop animation here
    this.stopLoadingAnimation();
  }

  /**
   *
   * @return {[View]} [ScrollView representing the currently viewed venue]
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.lightBlueDotContainer}>
          <Animated.View style={[styles.lightBlueDot, {opacity:this.opacityA}]}></Animated.View>
          <Animated.View style={[styles.lightBlueDot, {opacity:this.opacityB}]}></Animated.View>
          <Animated.View style={[styles.lightBlueDot, {opacity:this.opacityC}]}></Animated.View>
        </View>
      </View>
    );
  }
}
