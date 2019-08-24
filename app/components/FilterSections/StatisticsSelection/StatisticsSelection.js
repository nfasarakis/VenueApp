import React, { Component } from 'react';
import {Text, View, Animated, Platform, UIManager, LayoutAnimation} from 'react-native';
import {TextButton} from '../../elements';
import PropTypes from 'prop-types';
import styles from './style';

export default class  StatisticsSelection extends Component {

  static propTypes = {
    // String specifying whether average or live statistics are selected
    // Used to style to corresponding button
    statistics: PropTypes.string.isRequired,
    // Callback that sets the statistics to either live or average
    // Used to trigger state change in parent FilterScreen Component
    setStatistics: PropTypes.func.isRequired,
  }

  /**
   * Sets the Text description for the StatisticsSelection component
   * depending on whether the statistics used are average or live
   * @param  {[String]} statistics [Either average or live]
   * @return {[Text]}            [Text component containing description]
   */
  generateDescription = (statistics) => {
    if (statistics==='average') {
      return (
        <Animated.Text style={[styles.description, {transform: [{ scaleY: this.textScale }]}]}>
          Average statistics show the average number and ages of
          people visiting a venue. <Text style={styles.help}>Use these to predict the turnout at a venue at a later time</Text>
        </Animated.Text>
      );
    } else {
      return (
        <Animated.Text style={[styles.description, {transform: [{ scaleY: this.textScale }]}]}>
          Live statistics show the number and ages of
          people at a venue right now.  <Text style={styles.help}>Use these when deciding what venue to visit at this time</Text>
        </Animated.Text>
      );
    }
  }

  /**
   * Fades out/ Animates the description by animating it's Yscale
   * from 1 to 0 over a period of 250ms
   *
   * Fires setStatistics callback on complete, to set state in parent
   * FilterScreen component
   * @param  {[String]} statistics [Either average or live]
   */
  fadeoutDescription = (statistics) => {
    // Fadeout description
    Animated.timing(
      this.textScale,
      {
        toValue: 0,
        duration: 250,
      }
    ).start(()=>{
      // Execute callback to update state of parent
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.props.setStatistics(statistics);
    });
  }

  /**
   * Fades in/Animates the description by animating it's Yscale
   * from 0 to 1 over a period of 250 ms
   */
  fadeinNewDescription = () => {
    // Fadein description
    Animated.timing(
      this.textScale,
      {
        toValue: 1,
        duration: 250,
      }
    ).start();
  }

  /**
   * Lifecycle method: executes before first render()
   */
  componentWillMount() {
    // Enable LayoutAnimation under Android
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  /**
   * Lifecycle method: fires when component updates
   */
  componentWillUpdate() {
    /*When component updates, fade in the new description*/
    this.fadeinNewDescription();
  }

  // Initialize the scale of the description to be animated
  textScale = new Animated.Value(1);

  /**
   * View component representing the StatisticsSelection component
   * @return {[type]} A view component representing the StatisticsSelection component
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Statistics used
        </Text>
        {this.generateDescription(this.props.statistics)}

        {/*Statistics options buttons*/}
        <View style={styles.buttonsContainer}>
          <TextButton
            containerStyle={[styles.StatButton, this.props.statistics==='average'&&styles.active]}
            textStyle={[styles.StatButtonText, this.props.statistics==='average'&&styles.activeTxt]}
            onButtonPress={()=>{this.props.statistics!=='average'&&this.fadeoutDescription('average');}}
            title={'USE AVERAGE'}
          />
          <TextButton
            containerStyle={[styles.StatButton, this.props.statistics==='live'&&styles.active]}
            textStyle={[styles.StatButtonText, this.props.statistics==='live'&&styles.activeTxt]}
            onButtonPress={()=>{this.props.statistics!=='live'&&this.fadeoutDescription('live');}}
            title={'USE LIVE'}
          />
        </View>

      </View>
    );
  }

}
