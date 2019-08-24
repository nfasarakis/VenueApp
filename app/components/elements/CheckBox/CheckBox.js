import React, { Component } from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';


export default class CheckBox extends Component {

  static propTypes = {
    // Additional custom style for the TouchableOpacity component in render()
    containerStyle: PropTypes.any,
    // Additional custom style for the Text component in render()
    textStyle: PropTypes.any,
    // Content of the Text component in render()
    title: PropTypes.string.isRequired,
    // [0,1] number denoting if checkbox in render() is checked on not
    isChecked: PropTypes.number.isRequired,
    // OnPress event handler for TouchableOpacity component in render()
    onIconPress: PropTypes.func.isRequired,
  }

  /**
   * [Selects Image component source property value corresponding to either
   * a checked checkbox or unchecked checkbox image]
   * @param  {number} isChecked
   * [1 for checked image checkbox, 0 for unchecked image checkbox]
   * @return {[object]}
   * [corrsponding image source property]
   */
  selectIconSource = (isChecked) => {
    return (isChecked)
      ? require('../images/checkboxChecked.png')
      : require('../images/checkbox.png');
  }

  /**
   * [Renders a touchable opacity component containing
   * A) A Image compoment corresponding to a checkbox
   * B) A Text component containing the checkbox label]
   * @return {[TouchableOpacity]} [TouchableOpacity component respresenting a checkbox]
   */
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[this.props.containerStyle, styles.defaultContainerStyle]}
        onPress={this.props.onIconPress}>
        <Image
          style={styles.iconStyle}
          source={this.selectIconSource(this.props.isChecked)}
        />
        <Text style={this.props.textStyle || styles.defaultTextStyle}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
