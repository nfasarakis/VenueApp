import React from 'react';
import {View, Image, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
// Image used for the search glyph
import searchGlyph from '../../images/search-glyph.png';

/**
 * SearchBar Component: A Custom searchbar that fires a callback when focused
 *                      Used to launch the SearchScreen in screens/SearchScreen
 *                      (i.e does not actually search)
 *                      Used in /TopTab for building a custom header for routerConfig.js
 *                      specifically for the MainTabNavigator.
 *
 * The SearchBar Component receives the following props
 *  @param {function} onSearchBarFocus CallBack function that fires on focus events
 *                                     for the SearchBar
 *
 * @return {[View]} A styled View component respresenting a searchbar
 */
export default function SearchBar(props) {
  /**
   * @return {[View]} View representing a SearchBar component
   */
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Image style={styles.searchicon} source={searchGlyph} />
        <TextInput
          style={styles.input}
          onFocus={() => props.onSearchBarFocus()}
          underlineColorAndroid="transparent"
          placeholder="Search around Athens"
        />
      </View>
    </View>
  );
}

// PropTypes
SearchBar.propTypes = {
  onSearchBarFocus: PropTypes.func.isRequired,
};
