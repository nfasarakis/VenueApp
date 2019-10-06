import React from 'react';
import {IconButton, SearchBar} from '../elements';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-navigation';
import styles from './style';

/**
 * TopTab Component: Component used as custom header in MainTabsNavigationOptions
 *                   in /routerConfig.js
 *                   Contains two clickable icons, a searchbar and corresp. callbacks
 *
 * The TopTab Component receives the following props
 *  @param {function} onFilterIconPress CallBack function that fires on Press events for the filterIcon
 *  @param {function} onMapIconPress CallBack function that fires on Press events for the mapIcon
 *  @param {function} onSuggestionPress  CallBack function that fires when SearchBar is focused
 *
 * @return {<TouchableOpacity>} TouchableOpacity containg a suggested are name &
 *                              number of venues contained within that area.
 */
export default function TopTab(props) {
  /**
   * @return {<View>} [View respresenting the TopTab component]
   */
  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        containerStyle={{}}
        iconSource={require('../images/filter-icon.png')}
        iconStyle={styles.filtericon}
        onIconPress={props.onFilterIconPress}
      />
      <SearchBar onSearchBarFocus={props.onSearchBarFocus} />
      <IconButton
        containerStyle={{}}
        iconSource={require('../images/map-icon.png')}
        iconStyle={styles.mapicon}
        onIconPress={props.onMapIconPress}
      />
    </SafeAreaView>
  );
}

//PropTypes
TopTab.propTypes = {
  onFilterIconPress: PropTypes.func.isRequired,
  onMapIconPress: PropTypes.func.isRequired,
  onSearchBarFocus: PropTypes.func.isRequired,
};
