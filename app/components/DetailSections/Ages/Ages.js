import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

Ages.propTypes = {
  // A JSON formated store/venue to display
  venue: PropTypes.object.isRequired,
};

export default function Ages(props) {
  // State Hook: Ages component either display's ages on average or real-time ages
  const [showing, setShowing] = useState('Average');

  // Effect hook to run only on mount and updates
  // Animates bars from zero
  useEffect(() => {
    // Find the max age of men/women at this venue to use as the max bar width
    // All other age bar widths are relative to this value
    const maxAgeValue = Math.max(
      agesMen[findMaxProp(agesMen)],
      agesWomen[findMaxProp(agesWomen)],
    );

    // Create object with men ages brackets as propnames and
    // propvalues equal to the number of men in that age bracket
    // Used as input to animateBar() function
    const toValueMen = {
      '15-18': calcPercentageRatio(agesMen['<18'], maxAgeValue),
      '18-24': calcPercentageRatio(agesMen['18-24'], maxAgeValue),
      '25-34': calcPercentageRatio(agesMen['25-34'], maxAgeValue),
      '34-50': calcPercentageRatio(agesMen['34+'], maxAgeValue),
    };
    // Create object with women's ages brackets as propnames and
    // propvalues equal to the number of women in that age bracket
    // Used as input to animateBar() function
    const toValueWomen = {
      '15-18': calcPercentageRatio(agesWomen['<18'], maxAgeValue),
      '18-24': calcPercentageRatio(agesWomen['18-24'], maxAgeValue),
      '25-34': calcPercentageRatio(agesWomen['25-34'], maxAgeValue),
      '34-50': calcPercentageRatio(agesWomen['34+'], maxAgeValue),
    };

    // Animate the ages bars
    animateBars(toValueMen, toValueWomen, 500, 1);
  });

  /**
   * State updater. Toggles the value of the showing property of the state
   * between average or live
   */
  const toggleAvgLive = () => {
    showing === 'Average' ? setShowing('Live') : setShowing('Average');
  };

  /**
   * Given object with positive Number property values, returns the
   * propname corresponding to the max propvalue.
   * Used to determine what age values to show on the description of the Ages component
   * @return {[number]} [propname corresponding to max prop value]
   */
  const findMaxProp = obj => {
    let max = 0;
    let propname = '';
    for (var i in obj) {
      if (obj[i] > max) {
        max = obj[i];
        propname = i;
      }
    }
    return propname;
  };

  /**
   * [calculates percentage of input x in relation to input y]
   * Result given in the [0,1] range and rounded to the thind decimal point
   * @return {[Number]}   * (x / y / / ) / ) / e of x in relation to y in the [0,1] range rounded to the 2nd decimal point
   */
  const calcPercentageRatio = (x, y) => {
    return Math.round(100 * (x / y)) / 100;
  };

  /**
   * Fades out/ Animates the description by animating it's Yscale
   * from 1 to 0 over a period of 250ms
   *
   * Sets the state with the new description to show
   * after animation completes
   */
  const toggleDescr = () => {
    // Animate bars to zero
    const toValue = {
      '15-18': 0,
      '18-24': 0,
      '25-34': 0,
      '34-50': 0,
    };
    animateBars(toValue, toValue, 100, 0);
    // Fadeout description
    Animated.timing(textScale, {
      toValue: 0,
      duration: 100,
    }).start(() => {
      // timing callback
      toggleAvgLive();
    });
  };

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
  const animateBars = (toValueMen, toValueWomen, duration, flag) => {
    Animated.parallel([
      Animated.timing(menBar_15_18_Width, {
        toValue: toValueMen['15-18'],
        duration: duration,
      }),
      Animated.timing(menBar_18_24_Width, {
        toValue: toValueMen['18-24'],
        duration: duration,
      }),
      Animated.timing(menBar_25_34_Width, {
        toValue: toValueMen['25-34'],
        duration: duration,
      }),
      Animated.timing(menBar_34_50_Width, {
        toValue: toValueMen['34-50'],
        duration: duration,
      }),
      Animated.timing(womenBar_15_18_Width, {
        toValue: toValueWomen['15-18'],
        duration: duration,
      }),
      Animated.timing(womenBar_18_24_Width, {
        toValue: toValueWomen['18-24'],
        duration: duration,
      }),
      Animated.timing(womenBar_25_34_Width, {
        toValue: toValueWomen['25-34'],
        duration: duration,
      }),
      Animated.timing(womenBar_34_50_Width, {
        toValue: toValueWomen['34-50'],
        duration: duration,
      }),
      flag &&
        Animated.timing(textScale, {
          toValue: 1,
          duration: duration / 2,
        }),
    ]).start();
  };

  // Initialize the values of the bars to be animated in the Ages component
  // These values are then animated to their actual values in useEffect
  const menBar_15_18_Width = new Animated.Value(0);
  const menBar_18_24_Width = new Animated.Value(0);
  const menBar_25_34_Width = new Animated.Value(0);
  const menBar_34_50_Width = new Animated.Value(0);
  const womenBar_15_18_Width = new Animated.Value(0);
  const womenBar_18_24_Width = new Animated.Value(0);
  const womenBar_25_34_Width = new Animated.Value(0);
  const womenBar_34_50_Width = new Animated.Value(0);
  // Initialize the Yscale of the description to be animated
  // This value is corrected in useEffect
  let textScale = new Animated.Value(0);

  // Condence props into smaller variable names for readability
  if (showing === 'Average') {
    var agesMen = props.venue.AvgAgesMen;
    var agesWomen = props.venue.AvgAgesWomen;
    var description =
      'Venue ' +
      props.venue.name +
      ' usually attracts men aged ' +
      findMaxProp(agesMen) +
      ' and women aged ' +
      findMaxProp(agesWomen) +
      ' on average ';
  } else {
    var agesMen = props.venue.liveAgesMen;
    var agesWomen = props.venue.liveAgesWomen;
    var description =
      'Venue ' +
      props.venue.name +
      ' has attracted mostly men aged ' +
      findMaxProp(agesMen) +
      ' and women aged ' +
      findMaxProp(agesWomen) +
      ' right now ';
  }

  return (
    <View style={styles.container}>
      {/*Patron Ages Description*/}
      <Text style={styles.heading}> Ages Here </Text>
      <Animated.Text
        style={[styles.description, {transform: [{scaleY: textScale}]}]}>
        {description}
      </Animated.Text>

      {/*Ages visual < 18*/}
      <View style={styles.agesVisualContainer}>
        <Text style={styles.ageNumber}> 15-18 </Text>
        <View style={styles.agesBarContainer}>
          <Animated.View
            style={[
              styles.ageBarMen,
              {
                width: menBar_15_18_Width.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.ageBarWomen,
              {
                width: womenBar_15_18_Width.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />

          {/*Verical bars used only for styling*/}
          <View style={styles.vertBarContainer}>
            <View style={styles.vertBarBold} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
          </View>
        </View>
      </View>

      {/*Ages visual < 18*/}
      <View style={styles.agesVisualContainer}>
        <Text style={styles.ageNumber}> 18-24 </Text>
        <View style={styles.agesBarContainer}>
          <Animated.View
            style={[
              styles.ageBarMen,
              {
                width: menBar_18_24_Width.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.ageBarWomen,
              {
                width: womenBar_18_24_Width.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />

          {/*Verical bars used only for styling*/}
          <View style={styles.vertBarContainer}>
            <View style={styles.vertBarBold} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
          </View>
        </View>
      </View>

      {/*Ages visual < 18*/}
      <View style={styles.agesVisualContainer}>
        <Text style={styles.ageNumber}> 25-34 </Text>
        <View style={styles.agesBarContainer}>
          <Animated.View
            style={[
              styles.ageBarMen,
              {
                width: menBar_25_34_Width.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.ageBarWomen,
              {
                width: womenBar_25_34_Width.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />

          {/*Verical bars used only for styling*/}
          <View style={styles.vertBarContainer}>
            <View style={styles.vertBarBold} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
          </View>
        </View>
      </View>

      {/*Ages visual < 18*/}
      <View style={styles.agesVisualContainer}>
        <Text style={[styles.ageNumber, styles.removeBottomPadding]}>
          35-50
        </Text>
        <View style={[styles.agesBarContainer, styles.removeBottomPadding]}>
          <Animated.View
            style={[
              styles.ageBarMen,
              {
                width: menBar_34_50_Width.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.ageBarWomen,
              {
                width: womenBar_34_50_Width.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />

          {/*Verical bars used only for styling*/}
          <View style={styles.vertBarContainer}>
            <View style={styles.vertBarBold} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
            <View style={styles.vertBar} />
          </View>
        </View>
      </View>

      {/*Toggle between average and live*/}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.toggleTextContainer}
        onPress={toggleDescr}>
        <Text style={[styles.toggle, showing === 'Average' && styles.active]}>
          Here on average
        </Text>
        <View style={styles.toggleTextSeperator} />
        <Text style={[styles.toggle, showing === 'Live' && styles.active]}>
          Here right now
        </Text>
      </TouchableOpacity>
      {/*Seperator line*/}
      <View style={styles.seperator} />
    </View>
  );
}
