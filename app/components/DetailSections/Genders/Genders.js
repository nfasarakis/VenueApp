import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';


export default class Genders extends Component {

  static propTypes = {
    // A JSON formated store/venue to display
    venue: PropTypes.object.isRequired,
  }

  // State of the Genders component
  state = {
    // Shows either average or live statistics
    // Used to determine what statistics to show on the horizontal bars
    showing: 'Average',
  }

  /**
   * State updaters. Toggles the value of the showing property of the state
   * between average or live
   */
  updateAvgLive = () => {
    if (this.state.showing==='Average') {this.setState({showing: 'Live'});}
    else {this.setState({showing: 'Average'});}
  }

  /**
  * Fades out/ Animates the description by animating it's Yscale
  * from 1 to 0 over a period of 100ms
  *
  * Sets the state with the new description to show
  * after animation completes
   */
  toggleAvgLive = () => {
    // Fadeout description
    Animated.timing(
      this.textScale,
      {
        toValue: 0,
        duration: 100,
      }
    ).start(()=>{
      // timing callback
      this.updateAvgLive();
    });
  }

  /**
   * [calculates percentage of input x in relation to input y]
   * Result given in the [0,1] range and rounded to the thind decimal point
   * @param  {[Number]} x base value
   * @param  {[Number]} y value with which base value in compared against
   * @return {[Number]}   percentage of x in relation to y in the [0,1] range rounded to the 2nd decimal point
   */
  calcPercentageRatio = (x,y) => {
    return Math.round(100*(x/(x+y)))/100;
  }

  /**
   * [calculates percentage of men and women in relation to total number of patrons]
   * Pecentage is given in the [0,1] range and rounded to the thind decimal point
   * @return {[Number]} percentage of men/women in relation to total number of people,
   *                    in the [0,1] range, rounded to the second decimal point
   */
  calcMenPercentageRatio = (numMen, numWomen) => {
    return this.calcPercentageRatio(numMen, numWomen);
  }
  calcWomenPercentageRatio = (numMen, numWomen) => {
    return 1-this.calcPercentageRatio(numMen, numWomen);
  }

  /**
    * Animates the width of the bars corresponding to number of men and
    * the width of the bars corresponding to number of women,
    * in parallel
    *
   * @param  {[type]} toValueMen   value in [0,1] range in which to animate men bar
   *                               These values are interpolated to the ['0%', '100%'] range in the render() function
   * @param  {[type]} toValueWomen value in [0,1] range in which to animate men bar
   *                               These values are interpolated to the ['0%', '100%'] range in the render() function
   * @param  {[Number]} flag       if 1, also animate the description of the Genders component
   */
  animateBars = (toValueMen, toValueWomen, flag) => {
    Animated.parallel([
      Animated.timing(
        this.menBarWidth,
        {
          toValue: toValueMen,
          duration: 500,
        }
      ),
      Animated.timing(
        this.womenBarWidth,
        {
          toValue: toValueWomen,
          duration: 500,
        }
      ),
      (flag) && Animated.timing(
        this.textScale,
        {
          toValue: 1,
          duration: 250,
        }
      ),
    ]).start();
  }

  /**
   * Lifecycle method: executes before first render()
   */
  componentDidMount() {
    /*When component mounts, animate bars in paralel so the initial values reflect the actual values
    do not animate description*/
    this.animateBars(
      this.calcMenPercentageRatio(this.numMen, this.numWomen),
      this.calcWomenPercentageRatio(this.numMen, this.numWomen),
      0
    );
  }

  /**
   * Lyfecycle method: invoked before a mounted component receives new props
   * We use this to reset the state to default values when the props change
   *
   * This is for the case where we navigate to another detail view within a detail view
   * Since the virtual dom doesnt change, react doesnt unmount the component
   * A component that doesnt get unmounted remembers state
   * Therefore we manually reset the state to it's default value
   */
  componentWillReceiveProps(nextProps) {
    // if the component received new props
    if (this.props!==nextProps) {
      // reset the state
      this.setState({showing: 'Average'});
    }
  }

  /**
   * Lifecycle method: executes after each update
   */
  componentDidUpdate() {
    /*When component updates, animate bars in paralel
    and animate description*/
    this.animateBars(
      this.calcMenPercentageRatio(this.numMen, this.numWomen),
      this.calcWomenPercentageRatio(this.numMen, this.numWomen),
      1
    );
  }

  // Initialize the values of the bars to be animated in the Genders component
  // Both bars initially take up half the space
  // These values are corrected in componentDidMount()
  menBarWidth = new Animated.Value(0.5);
  womenBarWidth = new Animated.Value(0.5);
  // Initialize the scale of the description to be animated
  // This value is corrected in componentDidMount()
  textScale = new Animated.Value(1);


  /**
   * [Returns a View component representing the Genders component
   * @return {[View]} [View representing the Genders component]
   */
  render() {
    if (this.state.showing==='Average') {
      this.numMen = this.props.venue.people.MenAvg;
      this.numWomen = this.props.venue.people.WomenAvg;
      this.description = 'Venue '
        +this.props.venue.name+' is usually visited by '
        +this.numMen+' men and '
        +this.numWomen+' women on average';
    } else {
      this.numMen = this.props.venue.people.MenLive;
      this.numWomen = this.props.venue.people.WomenLive;
      this.description = 'Venue '
        +this.props.venue.name+' currently has '
        +this.numMen+' men and '
        +this.numWomen+' women on visiting right now';
    }

    return (
      <View style={styles.container}>

        <Text style={styles.heading}>
          People Here
        </Text>
        <Animated.Text style={[styles.description, {transform: [{ scaleY: this.textScale }]}]}>
          {this.description}
        </Animated.Text>

        {/*People visual*/}
        <View style={styles.peopleVisualContainer}>
          <View>
            <Image
              style={styles.genderIcon}
              source={require('../../images/man.png')}
            />
            <Text style={styles.menVisualText}>
              {this.numMen}
            </Text>
          </View>
          <View style={styles.genderBarContainer}>
            {/*Make width depend on ratio*/}
            <Animated.View
              style={[styles.menBar,
                {width: this.menBarWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
                }
              ]}>
            </Animated.View>
            {/*Make width depend on ratio*/}
            <Animated.View
              style={[styles.womenBar,
                {width: this.womenBarWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
                }
              ]}>
            </Animated.View>
          </View>
          <View>
            <Image
              style={styles.genderIcon}
              source={require('../../images/woman.png')}
            />
            <Text style={styles.womenVisualText}>
              {this.numWomen}
            </Text>
          </View>
        </View>

        {/*Toggle between average and live*/}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.toggleTextContainer}
          onPress={this.toggleAvgLive}
        >
          <Text style={[styles.toggle, this.state.showing==='Average'&&styles.active]}>
              Here on average
          </Text>
          <View style={styles.toggleTextSeperator}>
          </View>
          <Text style={[styles.toggle, this.state.showing==='Live'&&styles.active]}>
            Here right now
          </Text>
        </TouchableOpacity>

        {/*Seperator line*/}
        <View style={styles.seperator}></View>

      </View>
    );
  }
}
