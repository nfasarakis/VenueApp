import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

export default function CatalogItem() {
  /**
   *
   * @return {[View]}
   */
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> Title </Text>
        <Text style={styles.price}> 5{'$'} </Text>
      </View>
      <Text style={styles.description}> Short description goes here </Text>
      <View style={styles.horLine} />
    </View>
  );
}
