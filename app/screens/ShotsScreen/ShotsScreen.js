import React, { Component } from 'react';
import {View, ScrollView,} from 'react-native';
import CatalogItem from '../../components/CatalogItem';
import styles from './style';

export default class ShotsScreen extends Component {

  /**
   *
   * @return {[View]}
   */
  render() {
    return (
      <View style={styles.container}>

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

      </View>
    );
  }
}
