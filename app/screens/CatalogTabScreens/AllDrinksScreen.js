import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import CatalogItem from '../../components/CatalogItem';
import styles from './style';

/**
 * DEV_NOTE: BoilerPlate - Should Be populated with actual venue data
 *
 * AllDrinksScreen Component: Screen containing list of all drinks a specific venues offers
 *
 * The AllDrinksScreen Component receives the following props
 *  @param {object} navigation The navigation object passed by the React-Native-Navigation
 *                             Includes the corresponding venue in this.props.navigation.state.venue
 *                             The venue value is passed when navigating from the details screen.
 *
 * @return {[View]} A view-wrapped scrollable list containg all drinks as items
 */
export default function AllDrinksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/*vertical ScrollView with catalog items*/}
      <ScrollView>
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
        <CatalogItem />
      </ScrollView>
    </SafeAreaView>
  );
}
