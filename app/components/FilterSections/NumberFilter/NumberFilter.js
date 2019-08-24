import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';
import {Slider} from '../../elements';
import PropTypes from 'prop-types';
import styles from './style';

export default class NumberFilter extends Component {

  static propTypes = {
    // String specifying whether average or live statistics are selected
    // Used to style to corresponding button
    statistics: PropTypes.string.isRequired,
    // Function that enables/disables parent component's ability to scroll
    scrollControl: PropTypes.func.isRequired,
    // Number containing the gender ratio, as provided by the parent component
    genderRatio: PropTypes.number.isRequired,
    // Callback that updates the genderRatio property of the state of the parent component
    // Used to update the state with the value produces by the slider
    updateGenderRatio: PropTypes.func.isRequired,
  }

  /**
   * [Renders a View Component containing
   * A) A Text component used as the title for the filter
   * B) A MultiCheckbox component containing two checkboxes
   * C) A Text component used as the description of the filter
   * D) A Slider compoment for the gender ratio]
   * @return {[View]} [View component respresenting the NumberFilter component]
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Number of people
        </Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Show venues with at least
          </Text>
          <View style={styles.ratioContainer}>
            <Text style={styles.ratio}>
              {this.props.genderRatio + '%'}
            </Text>
          </View>
          <Text style={styles.description}>
            {
              this.props.statistics==='average'
                ? 'women on average'
                : 'women right now'
            }
          </Text>
        </View>
        <View style={styles.sliderImageContainer}>
          <Image
            style={styles.genderIcon}
            source={require('../../images/man.png')}
          />
          <Slider
            containerStyle={styles.sliderContainerStyle}
            source={require('../../elements/images/sliderIconBlue.png')}
            lineColorLeft={'#6BA7EC'}
            lineColorRight={'#FBA3E5'}
            onSliderGestureStart={this.props.scrollControl}
            onSliderGestureEnd={this.props.scrollControl}
            onSliderValueUpdate={this.props.updateGenderRatio}
          />
          <Image
            style={styles.genderIcon}
            source={require('../../images/woman.png')}
          />
        </View>
      </View>
    );
  }
}
