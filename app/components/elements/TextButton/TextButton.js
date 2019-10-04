import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

/**
 * TextButton Component: Custom button with Text
 *
 * The extButton Component receives the following props
 *  @param {object} containerStyle Optional custom style for the TouchableOpacity
 *                                 acting as the button
 *  @param {object} textStyle Optional custom style for the text of the button
 *  @param {string} title Text that appears on the button
 *  @param {function} onButtonPress OnPress event handler for the TextButton
 *
 * @return {[View]} A styled TouchableOpacity component respresenting a checkbox component
 *                  with text on the left of the box
 */
export default function TextButton(props) {
  /**
   * @return {[TouchableOpacity]} TouchableOpacity component respresenting a text button
   */
  return (
    <TouchableOpacity
      style={props.containerStyle || styles.defaultContainerStyle}
      onPress={props.onButtonPress}>
      <Text style={props.textStyle || styles.defaultTextStyle}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

TextButton.propTypes = {
  containerStyle: PropTypes.any,
  textStyle: PropTypes.any,
  title: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func,
};
