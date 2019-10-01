import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import CatalogItem from '../../components/CatalogItem';
import styles from './style';

/**
 * DEV_NOTE: BoilerPlate - Should Be populated with actual venue data
 *
 * ShotsScreen Component: Screen containing list of all shots a specific venues offers
 *
 * The ShotsScreen Component receives the following props
 *  @param {object} navigation The navigation object passed by the React-Native-Navigation
 *                             Includes the corresponding venue in this.props.navigation.state.venue
 *                             The venue value is passed when navigating from the details screen.
 *
 * @return {[View]} A view-wrapped scrollable list containg all shots as items
 */
export default function ShotsScreen() {
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
