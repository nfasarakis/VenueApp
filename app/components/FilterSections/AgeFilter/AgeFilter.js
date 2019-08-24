import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {MultiSlider} from '../../elements';
import PropTypes from 'prop-types';
import styles from './style';


export default class AgeFilter extends Component {

  static propTypes = {
    // String specifying whether average or live statistics are selected
    // Used to style to corresponding button
    statistics: PropTypes.string.isRequired,
    // Function that enables/disables parent component's ability to scroll
    scrollControl: PropTypes.func.isRequired,
    // Number containing the min/max men/women ages
    // as provided by the parent component
    minAgeMen: PropTypes.number.isRequired,
    maxAgeMen: PropTypes.number.isRequired,
    minAgeWomen: PropTypes.number.isRequired,
    maxAgeWomen: PropTypes.number.isRequired,
    // Callbacks that updates the ages properties of the state of the parent component
    // Used to update the state with the value produces by the slider
    updateMinAgeMen: PropTypes.func.isRequired,
    updateMaxAgeMen: PropTypes.func.isRequired,
    updateMinAgeWomen: PropTypes.func.isRequired,
    updateMaxAgeWomen: PropTypes.func.isRequired
  }

  /**
   * [Renders a View Component containing
   * A) A Text compoment used as the title of the AgeFilter
   * B) A MultiCheckbox component containing two checkboxes
   * C) A Text description for the AgeFilter
   * D) A MultiSlider component for the mens ages
   * E) A MultiSlider component for the womens ages]
   * @return {[View]} [A View respresenting the AgeFilter]
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Age of people
        </Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Show venues with men mostly aged
          </Text>
          {/*Wrap in View so I can control width via CSS
            This avoids the jumping on text after the range
            when it gets continually updated via state changes*/}
          <View style={styles.rangeContainer}>
            <Text style={styles.menRange}>
              {' ' + this.props.minAgeMen + '-' + this.props.maxAgeMen + ' '}
            </Text>
          </View>
          {/*NOTE: NEED TO FIND A BETTER WAY TO DO THIS
            Because I created a view above for fixed text, I need to create a
            new text element to continue the description

            The problem is that {flexDirection:row wrap} on the description
            container may cause the next text element to move to the next
            line if it doesnt fit.
            Breaking it up solves this issue temporarily*/}
          <Text style={styles.description}>
            and
          </Text>
          <Text style={styles.description}>
            {' '}women
          </Text>
          <Text style={styles.description}>
            {' '}mostly
          </Text>
          <Text style={styles.description}>
            {' '}aged
          </Text>
          <View style={styles.rangeContainer}>
            <Text style={styles.womenRange}>
              {' ' + this.props.minAgeWomen + '-' + this.props.maxAgeWomen + ' '}
            </Text>
          </View>
          <Text style={styles.description}>
            {
              this.props.statistics==='average'
                ? 'on average'
                : 'right now'
            }
          </Text>
        </View>
        <View style={styles.multiContainer}>
          <MultiSlider
            source={require('../../elements/images/sliderIconBlue.png')}
            lineColor={'#6BA7EC'}
            onSliderGestureStart={this.props.scrollControl}
            onSliderGestureEnd={this.props.scrollControl}
            onSliderMinValueUpdate={this.props.updateMinAgeMen}
            onSliderMaxValueUpdate={this.props.updateMaxAgeMen}
          />
          <MultiSlider
            containerStyle={styles.sliderMargin}
            source={require('../../elements/images/sliderIconPink.png')}
            lineColor={'#FBA3E5'}
            onSliderGestureStart={this.props.scrollControl}
            onSliderGestureEnd={this.props.scrollControl}
            onSliderMinValueUpdate={this.props.updateMinAgeWomen}
            onSliderMaxValueUpdate={this.props.updateMaxAgeWomen}
          />
        </View>
      </View>
    );
  }
}
