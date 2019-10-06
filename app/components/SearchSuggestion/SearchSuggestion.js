import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
// Local images used in SearchSuggestion component
import searchIcon from '../images/locSearchIcon.png';

/**
 * SearchSuggestion Component: A clickable Component containing the name of a suggested
 *                             search area & the number of venues in that area
 *                             Executes callback passed in as prop when pressed
 *
 * The SearchSuggestion Component receives the following props
 *  @param {string} name Suggested search area
 *  @param {number} numVenues Number of venues within suggested search area
 *  @param {function} onSuggestionPress Callback for press events on SearchSuggestion
 *
 * @return {<TouchableOpacity>} TouchableOpacity containg a suggested are name &
 *                              number of venues contained within that area.
 */
export default function SearchSuggestion(props) {
  /**
   * @return {<TouchableOpacity>}
   */
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={props.onSuggestionPress}>
      <View style={styles.titleContainer}>
        <View style={styles.areaContainer}>
          <Image style={styles.areaSearchIcon} source={searchIcon} />
          <Text style={styles.area}> {props.name} </Text>
        </View>
        <Text style={styles.numVenues}> {props.numVenues} venues </Text>
      </View>
      <View style={styles.horLine} />
    </TouchableOpacity>
  );
}

SearchSuggestion.propTypes = {
  name: PropTypes.string.isRequired,
  numVenues: PropTypes.number.isRequired,
  onSuggestionPress: PropTypes.func.isRequired,
};
