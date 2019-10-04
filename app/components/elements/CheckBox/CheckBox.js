import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
// Images used in CheckBox component
import checked from '../images/checkboxChecked.png';
import unchecked from '../images/checkbox.png';

/**
 * CheckBox Component: Custom checkbox component
 *
 * The CheckBox Component receives the following props
 *  @param {object} containerStyle Optional custom style for the TouchableOpacity
 *                                 acting as the checkbox container
 *  @param {object} textStyle Optional custom style for the text left of the checkbox
 *  @param {string} title Text that appears left of the checkbox
 *  @param {boolean} isChecked Boolean specifying if checkbox should render as checked on not
 *  @param {function} onIconPress OnPress event handler for the CheckBox component
 *
 * @return {[View]} A styled TouchableOpacity component respresenting a checkbox component
 *                  with text on the left of the box
 */
export default function CheckBox(props) {
  /**
   * @return {[TouchableOpacity]} TouchableOpacity component respresenting a checkbox
   */
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[props.containerStyle, styles.defaultContainerStyle]}
      onPress={props.onIconPress}>
      <Image
        style={styles.iconStyle}
        source={props.isChecked ? checked : unchecked}
      />
      <Text style={props.textStyle || styles.defaultTextStyle}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

//PropTypes
CheckBox.propTypes = {
  containerStyle: PropTypes.any,
  textStyle: PropTypes.any,
  title: PropTypes.string.isRequired,
  isChecked: PropTypes.number.isRequired,
  onIconPress: PropTypes.func.isRequired,
};
