import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';
import PropTypes from 'prop-types';
import {TextButton} from '../elements';
import backIcon from '../images/back-arrow-blue.png';
import styles from './style';

// Array of possible labels to display as tabs
// Mapped over to create TextButton components for each label
const possibleLabels = [
  'AllDrinks',
  'Beers',
  'Spirits',
  'Cocktails',
  'Shots',
  'Specials',
];

/**
 * CatalogTabBar Component: Component used as a custom header for the CatalogTabNavigator
 * in routerConfig.js
 *
 * The CatalogTabBar Component receives the following props
 *  @param {function} onButtonPress Callback to run once one of the button in the
 *                                  rendered CatalogTabBar is pressed
 *  @param {function} onBackPress Callback to run once the back button is pressed
 *
 * @return {View} A styled view containg a horizontal ScrollView containing buttons,
 *                  Each of which represent a tab in the catalog.
 */
export default function CatalogTabBar(props) {
  // State holds the currently active tab with potential values given by possibleLabels Array
  const [activeTab, setActiveTab] = useState('AllDrinks');

  // Whenever the activeTab updates or the component receives new props
  useEffect(() => {
    // Execute onButtonPress callback with the activeTab
    props.onButtonPress(activeTab);
  });

  return (
    <View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          activeOpacity={0.5}
          onPress={() => props.onBackPress()}>
          <Image style={styles.backIcon} source={backIcon} />
          <Text style={styles.backButtonText}> Details </Text>
        </TouchableOpacity>

        {/*Hor ScrollView for catalog options*/}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {/*Generate TextButton component for each of the possible labels*/}
          {possibleLabels.map((item, index) => (
            <TextButton
              key={index}
              containerStyle={
                activeTab === item ? styles.ActiveButton : styles.OptionButton
              }
              textStyle={
                activeTab === item ? styles.ActiveText : styles.OptionButtonText
              }
              onButtonPress={() => setActiveTab(item)}
              title={item.toUpperCase()}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.seperator} />
    </View>
  );
}

// PropTypes
CatalogTabBar.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
};
