import React, { Component } from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

export default class SearchSuggestion extends Component {

  static propTypes = {
    // String specifying name of area in SearchSuggestion
    name: PropTypes.string.isRequired,
    // Number specifying number of venues in area
    // SHOULD COME FROM A SERVER SEARCH
    numVenues: PropTypes.number.isRequired,
    // Callback for press events on Search SearchSuggestion
    onSuggestionPress: PropTypes.func.isRequired,
  }

  /**
   *
   * @return {[View]}
   */
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onSuggestionPress}
      >
        <View style={styles.titleContainer}>
          <View style={styles.areaContainer}>
            <Image
              style={styles.areaSearchIcon}
              source={require('../images/locSearchIcon.png')}
            />
            <Text style={styles.area}> {this.props.name} </Text>
          </View>
          <Text style={styles.numVenues}> {this.props.numVenues} venues </Text>
        </View>
        <View style={styles.horLine}></View>
      </TouchableOpacity>
    );
  }
}
