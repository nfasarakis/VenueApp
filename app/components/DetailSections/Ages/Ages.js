import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';


export default class Ages extends Component {

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
    if (this.state.showing==='Average') { this.setState({showing: 'Live'});}
    else { this.setState({showing: 'Average'});}
  }

  /**
   * Given object with positive Number property values, returns the
   * propname corresponding to the max propvalue.
   * Used to determine what age values to show on the description of the Ages component
   * @return {[number]} [propname corresponding to max prop value]
   */
  findMaxProp = (obj) => {
    let max=0; let propname='';
    for (const i in obj) {
      if (obj[i]>max){max=obj[i];propname=i;}
    }
    return propname;
  }

  /**
   * [calculates percentage of input x in relation to input y]
   * Result given in the [0,1] range and rounded to the thind decimal point
   * @param  {[Number]} x base value
   * @param  {[Number]} y value with which base value in compared against
   * @return {[Number]}   percentage of x in relation to y in the [0,1] range rounded to the 2nd decimal point
   */
  calcPercentageRatio = (x,y) => {
    return Math.round(100*(x/(y)))/100;
  }

  /**
  * Fades out/ Animates the description by animating it's Yscale
  * from 1 to 0 over a period of 250ms
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
   * Animates the widths of the 4 bars corresponding to men's ages and
   * the the widths of the 4 bars corresponding to women's ages,
   * in parallel
   *
   * @param  {[Object]} toValueMen   Object with potential men's ages as propnames and
   *                                 propvalues equal to the number of men in that age bracket
   *                                 Used to hold values in the [0,1] range to use for each bar's animation
   *                                 These values are interpolated to the ['0%', '100%'] range in the render() function
   * @param  {[Object]} toValueWomen Object with potential women's ages as propnames and
   *                                 propvalues equal to the number of women in that age bracket
   *                                 Used to hold values in the [0,1] range to use for each bar's animation
   *                                 These values are interpolated to the ['0%', '100%'] range in the render() function
   * @param  {[Number]} flag         if 1, also animate the description of the Ages component
   */
  animateBars = (toValueMen, toValueWomen, flag) => {
    Animated.parallel([
      Animated.timing(
        this.menBar_15_18_Width,
        {
          toValue: toValueMen['15-18'],
          duration: 500,
        }
      ),
      Animated.timing(
        this.menBar_18_24_Width,
        {
          toValue: toValueMen['18-24'],
          duration: 500,
        }
      ),
      Animated.timing(
        this.menBar_25_34_Width,
        {
          toValue: toValueMen['25-34'],
          duration: 500,
        }
      ),
      Animated.timing(
        this.menBar_34_50_Width,
        {
          toValue: toValueMen['34-50'],
          duration: 500,
        }
      ),
      Animated.timing(
        this.womenBar_15_18_Width,
        {
          toValue: toValueWomen['15-18'],
          duration: 500,
        }
      ),
      Animated.timing(
        this.womenBar_18_24_Width,
        {
          toValue: toValueWomen['18-24'],
          duration: 500,
        }
      ),
      Animated.timing(
        this.womenBar_25_34_Width,
        {
          toValue: toValueWomen['25-34'],
          duration: 500,
        }
      ),
      Animated.timing(
        this.womenBar_34_50_Width,
        {
          toValue: toValueWomen['34-50'],
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
    //When component mounts, animate bars in paralel so the initial values reflect the actual values
    // but do not animate description

    // Find the max age of men/women at this venue to use as
    // the max bar width
    // All other age bar widths are relative to this value
    const maxAgeValue = Math.max(
      this.agesMen[this.findMaxProp(this.agesMen)],
      this.agesWomen[this.findMaxProp(this.agesWomen)]
    );

    // Create object with potential men's ages as propnames and
    // propvalues equal to the number of men in that age bracket
    // Used as input to animateBar() function
    const toValueMen = {
      '15-18': this.calcPercentageRatio(this.agesMen['<18'], maxAgeValue),
      '18-24': this.calcPercentageRatio(this.agesMen['18-24'], maxAgeValue),
      '25-34': this.calcPercentageRatio(this.agesMen['25-34'], maxAgeValue),
      '34-50': this.calcPercentageRatio(this.agesMen['34+'], maxAgeValue)
    };
    // Create object with potential women's ages as propnames and
    // propvalues equal to the number of men in that age bracket
    // Used as input to animateBar() function
    const toValueWomen = {
      '15-18': this.calcPercentageRatio(this.agesWomen['<18'], maxAgeValue),
      '18-24': this.calcPercentageRatio(this.agesWomen['18-24'], maxAgeValue),
      '25-34': this.calcPercentageRatio(this.agesWomen['25-34'], maxAgeValue),
      '34-50': this.calcPercentageRatio(this.agesWomen['34+'], maxAgeValue)
    };

    // Animate the ages bars
    this.animateBars(toValueMen,toValueWomen,0);
  }

  /**
   * Lifecycle method: executes after each update
   */
  componentDidUpdate() {
    // When component updates, animate bars in paralel
    // and animate description*/

    // Find the max age of men/women at this venue to use as
    // the max bar width
    // All other age bar widths are relative to this value
    const maxAgeValue = Math.max(
      this.agesMen[this.findMaxProp(this.agesMen)],
      this.agesWomen[this.findMaxProp(this.agesWomen)]
    );

    // Create object with potential men's ages as propnames and
    // propvalues equal to the number of men in that age bracket
    // Used as input to animateBar() function
    const toValueMen = {
      '15-18': this.calcPercentageRatio(this.agesMen['<18'], maxAgeValue),
      '18-24': this.calcPercentageRatio(this.agesMen['18-24'], maxAgeValue),
      '25-34': this.calcPercentageRatio(this.agesMen['25-34'], maxAgeValue),
      '34-50': this.calcPercentageRatio(this.agesMen['34+'], maxAgeValue)
    };

    // Create object with potential women's ages as propnames and
    // propvalues equal to the number of men in that age bracket
    // Used as input to animateBar() function
    const toValueWomen = {
      '15-18': this.calcPercentageRatio(this.agesWomen['<18'], maxAgeValue),
      '18-24': this.calcPercentageRatio(this.agesWomen['18-24'], maxAgeValue),
      '25-34': this.calcPercentageRatio(this.agesWomen['25-34'], maxAgeValue),
      '34-50': this.calcPercentageRatio(this.agesWomen['34+'], maxAgeValue)
    };

    // Animate the ages bars and description
    this.animateBars(toValueMen,toValueWomen,1);
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

  // Initialize the values of the bars to be animated in the Ages component
  // All bars initially take up half the space
  // These values are corrected in componentDidMount()
  menBar_15_18_Width = new Animated.Value(0.5);
  menBar_18_24_Width = new Animated.Value(0.5);
  menBar_25_34_Width = new Animated.Value(0.5);
  menBar_34_50_Width = new Animated.Value(0.5);
  womenBar_15_18_Width = new Animated.Value(0.5);
  womenBar_18_24_Width = new Animated.Value(0.5);
  womenBar_25_34_Width = new Animated.Value(0.5);
  womenBar_34_50_Width = new Animated.Value(0.5);
  // Initialize the Yscale of the description to be animated
  // This value is corrected in componentDidMount()
  textScale = new Animated.Value(1);

  /**
   * [Returns a View component representing the Ages component
   * @return {[View]} [View representing the Ages component]
   */
  render() {

    if (this.state.showing==='Average') {
      this.agesMen = this.props.venue.AvgAgesMen;
      this.agesWomen = this.props.venue.AvgAgesWomen;
      this.description = 'Venue '
        +this.props.venue.name+ ' usually attracts men aged '
        +this.findMaxProp(this.agesMen)+' and women aged '
        +this.findMaxProp(this.agesWomen)+' on average ';
    } else {
      this.agesMen = this.props.venue.liveAgesMen;
      this.agesWomen = this.props.venue.liveAgesWomen;
      this.description = 'Venue '
        +this.props.venue.name+ ' has attracted mostly men aged '
        +this.findMaxProp(this.agesMen)+' and women aged '
        +this.findMaxProp(this.agesWomen)+' right now ';
    }

    return (
      <View style={styles.container}>

        {/*Patron Ages Description*/}
        <Text style={styles.heading}>
          Ages Here
        </Text>
        <Animated.Text style={[styles.description, {transform: [{ scaleY: this.textScale }]}]}>
          {this.description}
        </Animated.Text>

        {/*Ages visual < 18*/}
        <View style={styles.agesVisualContainer}>
          <Text style={styles.ageNumber}> 15-18 </Text>
          <View style={styles.agesBarContainer}>
            <Animated.View
              style={[styles.ageBarMen, {width: this.menBar_15_18_Width.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
              }]}>
            </Animated.View>
            <Animated.View
              style={[styles.ageBarWomen, {width: this.womenBar_15_18_Width.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
              }]}>
            </Animated.View>

            {/*Verical bars used only for styling*/}
            <View style={styles.vertBarContainer}>
              <View style={[styles.vertBar, {opacity: 1}]}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
            </View>

          </View>
        </View>

        {/*Ages visual < 18*/}
        <View style={styles.agesVisualContainer}>
          <Text style={styles.ageNumber}> 18-24 </Text>
          <View style={styles.agesBarContainer}>
            <Animated.View
              style={[styles.ageBarMen, {width: this.menBar_18_24_Width.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
              }]}>
            </Animated.View>
            <Animated.View
              style={[styles.ageBarWomen, {width: this.womenBar_18_24_Width.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
              }]}>
            </Animated.View>

            {/*Verical bars used only for styling*/}
            <View style={styles.vertBarContainer}>
              <View style={[styles.vertBar, {opacity: 1}]}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
            </View>

          </View>
        </View>

        {/*Ages visual < 18*/}
        <View style={styles.agesVisualContainer}>
          <Text style={styles.ageNumber}> 25-34 </Text>
          <View style={styles.agesBarContainer}>
            <Animated.View
              style={[styles.ageBarMen, {width: this.menBar_25_34_Width.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
              }]}>
            </Animated.View>
            <Animated.View
              style={[styles.ageBarWomen, {width: this.womenBar_25_34_Width.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
              }]}>
            </Animated.View>

            {/*Verical bars used only for styling*/}
            <View style={styles.vertBarContainer}>
              <View style={[styles.vertBar, {opacity: 1}]}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
            </View>

          </View>
        </View>

        {/*Ages visual < 18*/}
        <View style={styles.agesVisualContainer}>
          <Text style={[styles.ageNumber, {paddingBottom: 0}]}> 35-50 </Text>
          <View style={[styles.agesBarContainer, {paddingBottom: 0}]}>
            <Animated.View
              style={[styles.ageBarMen, {width: this.menBar_34_50_Width.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
              }]}>
            </Animated.View>
            <Animated.View
              style={[styles.ageBarWomen, {width: this.womenBar_34_50_Width.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
              }]}>
            </Animated.View>

            {/*Verical bars used only for styling*/}
            <View style={styles.vertBarContainer}>
              <View style={[styles.vertBar, {opacity: 1}]}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
              <View style={styles.vertBar}></View>
            </View>

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
