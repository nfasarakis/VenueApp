import React, { Component } from 'react';
import {Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
//import styles from './style';


export default class IconButton extends Component {

  static propTypes = {
    // Style for the TouchableOpacity component in render()
    containerStyle: PropTypes.any.isRequired,
    // Style for the Image component in render()
    iconStyle: PropTypes.any.isRequired,
    // Image component source property value for the Image component in render()
    iconSource: PropTypes.any.isRequired,
    // OnPress event handler for TouchableOpacity component in render()
    onIconPress: PropTypes.func.isRequired,
  }

  /**
   * [Renders a touchable opacity component containing
   * A) An Image component]
   * @return {[TouchableOpacity]} [TouchableOpacity component respresenting an icon button]
   */
  render() {
    return (
      <TouchableOpacity
        style={this.props.containerStyle}
        onPress={this.props.onIconPress}>
        <Image
          style={this.props.iconStyle}
          source={this.props.iconSource}
        />
      </TouchableOpacity>
    );
  }
}
