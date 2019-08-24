import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';
import {TextButton} from '../elements';
import styles from './style';

export default function CatalogTabBar(props) {
  // Array of possible labels
  // Mapped over to create TextButton components for each label
  const possibleLabels = [
    'AllDrinks',
    'Beers',
    'Spirits',
    'Cocktails',
    'Shots',
    'Specials',
  ];
  // State hook
  const [activeTab, setActiveTab] = useState('AllDrinks');

  /**
   * Handles presses on the buttons of the CatalogTabBar
   * @param {[string]} label Label of pressed button
   */
  const handlePress = label => setActiveTab(label);

  // React effect hook
  useEffect(() => {
    props.onButtonPress(activeTab);
  }, [activeTab, props]);

  /**
   *
   * @return {[View]}
   */
  return (
    <View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          activeOpacity={0.5}
          onPress={() => props.onBackPress()}>
          <Image
            style={styles.backIcon}
            source={require('../images/back-arrow-blue.png')}
          />
          <Text style={styles.backButtonText}> Details </Text>
        </TouchableOpacity>

        {/*Hor ScrollView for catalog options*/}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {/*Generate TextButton component for each label*/}
          {possibleLabels.map((item, index) => (
            <TextButton
              key={index}
              containerStyle={
                activeTab === item ? styles.ActiveButton : styles.OptionButton
              }
              textStyle={
                activeTab === item ? styles.ActiveText : styles.OptionButtonText
              }
              onButtonPress={() => handlePress(item)}
              title={item.toUpperCase()}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.seperator} />
    </View>
  );
}
