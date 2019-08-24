import React, { Component } from 'react';
import {View, TouchableOpacity, TextInput, Image, ScrollView, Keyboard} from 'react-native';
import SearchSuggestion from '../../components/SearchSuggestion';
import styles from './style';

export default class SearchScreen extends Component {

  performSearch = (searchParam) => {
    // Dismiss keyboard if active
    Keyboard.dismiss();
    // Retrieve function used to update state of all tabs and map screen
    // This function is passed via MainTabsNavigationOptions and
    // MapScreenNavigationOptions in routerConfig.js
    const {search} = this.props.navigation.state.params;
    search(searchParam);
    // Go back to origin screen
    this.props.navigation.goBack();
  }

  /**
   *
   * @return {[View]}
   */
  render() {
    return (
      <View style={styles.container}>

        {/*Back button icon and it's container*/}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backIconContainer}
          onPress={()=>{this.props.navigation.goBack();}}
        >
          <Image
            style={styles.backIcon}
            source={require('../../components/images/xBtn_black.png')}
          />
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <Image
            style={styles.searchIcon}
            source={require('../../components/images/search-glyph.png')}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Search areas around Athens'}
            autoFocus={false}
          />
        </View>
        <View style={styles.horLine}></View>
        <ScrollView
          onScrollBeginDrag={()=>Keyboard.dismiss()}
        >
          <SearchSuggestion
            name='Try Close to you'
            numVenues={128}
            onSuggestionPress={()=>{this.performSearch('Close to you');}}
          />
          <SearchSuggestion
            name='Try Athens'
            numVenues={439}
            onSuggestionPress={()=>{this.performSearch('Athens');}}
          />
          <SearchSuggestion
            name='Try Chalandri'
            numVenues={32}
            onSuggestionPress={()=>{this.performSearch('Chalandri');}}
          />
          <SearchSuggestion
            name='Try Agia Paraskevi'
            numVenues={47}
            onSuggestionPress={()=>{this.performSearch('Agia Paraskevi');}}
          />
          <SearchSuggestion
            name='Try Holargos'
            numVenues={39}
            onSuggestionPress={()=>{this.performSearch('Holargos');}}
          />
          <SearchSuggestion
            name='Try Panormou'
            numVenues={49}
            onSuggestionPress={()=>{this.performSearch('Panormou');}}
          />
        </ScrollView>
      </View>
    );
  }
}
