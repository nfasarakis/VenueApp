import React from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

/**
 * DEV_NOTE: BoilerPlate - Should Be populated with actual data passed as props from /CatalogTabScreens/*
 *
 * CatalogItem Component: Component containing the name, price & description of an item in a venue's Catalog
 *
 * The CatalogItem Component receives the following props
 *  @param {string} name The name of the displayed item
 *  @param {number} price The price of the displayed item
 *  @param {string} description Short description of the displayed item
 *
 * @return {[View]} A styled view containg the item's name, price & description
 */
export default function CatalogItem(props) {
  /**
   *
   * @return {[View]}
   */
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> {props.name} </Text>
        <Text style={styles.price}> {props.price + '$'} </Text>
      </View>
      <Text style={styles.description}> {props.description} </Text>
      <View style={styles.horLine} />
    </View>
  );
}

// PropTypes
CatalogItem.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  description: PropTypes.string,
};

// Default PropTypes
CatalogItem.defaultProps = {
  name: 'Name goes here',
  price: 5,
  description: 'No description has been provided',
};
