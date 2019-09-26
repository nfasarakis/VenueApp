import React, { Component } from 'react';
import {View} from 'react-native';
import {IconButton, SearchBar} from '../elements';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-navigation';
import styles from './style';


export default class TopTab extends Component {

  static propTypes = {
    // CallBack function that fires on Press events for the filterIcon
    onFilterIconPress: PropTypes.func.isRequired,
    // CallBack function that fires on Press events for the toggling between
    // list view and map view
    onMapIconPress: PropTypes.func.isRequired,
    // CallBack function that fires on focus events for the SearchBar
    onSearchBarFocus: PropTypes.func.isRequired,
    // True when we are viewing the TopTab as a header for the
    // Map Screen (see routerConfig.js)
    isMapScreen: PropTypes.bool.isRequired
  }

  /**
   * [Renders a Tab at the top of the Screen containing
   * A) An IconButton component respresenting the filtering option
   * B) A SearchBar component for performing searches on the venues
   * C) An IconButton component respresenting the map-view option]
   * @return {[View]} [View respresenting the TopTab component]
   */
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <IconButton
          containerStyle={{}}
          iconSource={require('../images/filter-icon.png')}
          iconStyle={styles.filtericon}
          onIconPress={this.props.onFilterIconPress}
        />
        <SearchBar
          onSearchBarFocus={this.props.onSearchBarFocus}
        />
        <IconButton
          containerStyle={{}}
          iconSource={
            this.props.isMapScreen
              ? require('../images/list-icon.png')
              : require('../images/map-icon.png')
          }
          iconStyle={
            this.props.isMapScreen
              ? styles.listIcon
              : styles.mapicon
          }
          onIconPress={this.props.onMapIconPress}
        />
      </SafeAreaView>
    );
  }

}
