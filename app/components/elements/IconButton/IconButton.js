import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

/**
 * IconButton Component: Custom clickable image with callbacks. Can be used as image button.
 *
 * The IconButton Component receives the following props
 *  @param {object} containerStyle Mandatory custom style for the TouchableOpacity
 *                                 acting as the clicable icon
 *  @param {object} iconStyle Mandatory custom style for the clickable image
 *  @param {object} iconSource Source property value for the clickable image
 *  @param {function} onIconPress OnPress event handler for the IconButton component
 *
 * @return {[View]} A styled TouchableOpacity component respresenting an image button
 */
export default function IconButton(props) {
  /**
   * @return {[TouchableOpacity]} [TouchableOpacity component respresenting an icon button]
   */
  return (
    <TouchableOpacity style={props.containerStyle} onPress={props.onIconPress}>
      <Image style={props.iconStyle} source={props.iconSource} />
    </TouchableOpacity>
  );
}

// PropTypes
IconButton.propTypes = {
  // Style for the TouchableOpacity component in render()
  containerStyle: PropTypes.any.isRequired,
  // Style for the Image component in render()
  iconStyle: PropTypes.any.isRequired,
  // Image component source property value for the Image component in render()
  iconSource: PropTypes.any.isRequired,
  // OnPress event handler for TouchableOpacity component in render()
  onIconPress: PropTypes.func.isRequired,
};
