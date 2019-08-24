import React, { Component } from 'react';
import {View, Image, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

export default class SearchBar extends Component {

  static propTypes = {
    // CallBack function that fires on focus events for the SearchBar
    onSearchBarFocus: PropTypes.func.isRequired,
  }

  /**
   * [Renders a SearchBar component containing
   * A) A Image component representing the search icon/glyph
   * B) A TextInput component for accepting user input]
   * @return {[View]} [View representing a SearchBar component]
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <Image
            style={styles.searchicon}
            source={require('../../images/search-glyph.png')}
          />
          <TextInput
            style={styles.input}
            onFocus={()=>this.props.onSearchBarFocus()}
            underlineColorAndroid='transparent'
            placeholder="Search around Athens"
          />
        </View>
      </View>
    );
  }

}
