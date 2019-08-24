import React, { Component } from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';


export default class TextButton extends Component {

  static propTypes = {
    // Optional custom style for the top-level TouchableOpacity component in render()
    containerStyle: PropTypes.any,
    // Optional custom style the Text component in render()
    textStyle: PropTypes.any,
    // String containing the text to appear in the button
    title: PropTypes.string.isRequired,
    // Event handler fired when button is pressed
    onButtonPress: PropTypes.func,
  }

  /**
   * [Renders a TouchableOpacity component containing
   * A) A text component]
   * @return {[TouchableOpacity]} [TouchableOpacity component respresenting a text button]
   */
  render() {
    return (
      <TouchableOpacity
        style={this.props.containerStyle || styles.defaultContainerStyle}
        onPress={this.props.onButtonPress}>
        <Text style={this.props.textStyle || styles.defaultTextStyle}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
