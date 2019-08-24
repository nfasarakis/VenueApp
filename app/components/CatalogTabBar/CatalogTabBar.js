import React, { Component } from 'react';
import {View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';
import {TextButton} from '../elements';
import PropTypes from 'prop-types';
import styles from './style';

export default class CatalogTabBar extends Component {

  static propTypes = {
    // Callbacks for click events
    // Contains navigation logic passed through the navigator when
    //  defined in config/router.js
    onButtonPress: PropTypes.func.isRequired,
    onBackPress: PropTypes.func.isRequired,
  }

  // State of the CatalogTabBar
  state = {
    // Either AllDrinks, Beers, Spirits, Cocktails, Shots, Specials
    // Used to set active Tab style and disallow naviating from
    // the same screen to the same screen which crashes the app
    activeTab : 'AllDrinks',
  }

  /**
   * Handles presses on the buttons of the CatalogTabBar
   * @param {[type]} label Label of pressed button
   */
  handlePress = (label) => {
    if (this.state.activeTab!==label) {
      // Update state and execute naviagtion callback
      this.setState({activeTab:label}, () => {
        // Callback that handles navigation
        this.props.onButtonPress(label);
      });
    }
  }

  /**
   *
   * @return {[View]}
   */
  render() {
    return (
      <View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            activeOpacity={0.5}
            onPress={()=>{this.props.onBackPress();}}
          >
            <Image
              style={styles.backIcon}
              source={require('../images/back-arrow-blue.png')}
            />
            <Text style={styles.backButtonText}> Details </Text>
          </TouchableOpacity>
          {/*Hor ScrollView for catalog options*/}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TextButton
              containerStyle={this.state.activeTab==='AllDrinks'?styles.ActiveButton:styles.OptionButton}
              textStyle={this.state.activeTab==='AllDrinks'?styles.ActiveText:styles.OptionButtonText}
              onButtonPress={()=>{this.handlePress('AllDrinks');}}
              title={'ALL DRINKS'}
            />
            <TextButton
              containerStyle={this.state.activeTab==='Beers'?styles.ActiveButton:styles.OptionButton}
              textStyle={this.state.activeTab==='Beers'?styles.ActiveText:styles.OptionButtonText}
              onButtonPress={()=>{this.handlePress('Beers');}}
              title={'BEERS'}
            />
            <TextButton
              containerStyle={this.state.activeTab==='Spirits'?styles.ActiveButton:styles.OptionButton}
              textStyle={this.state.activeTab==='Spirits'?styles.ActiveText:styles.OptionButtonText}
              onButtonPress={()=>{this.handlePress('Spirits');}}
              title={'SPIRITS'}
            />
            <TextButton
              containerStyle={this.state.activeTab==='Cocktails'?styles.ActiveButton:styles.OptionButton}
              textStyle={this.state.activeTab==='Cocktails'?styles.ActiveText:styles.OptionButtonText}
              onButtonPress={()=>{this.handlePress('Cocktails');}}
              title={'COCKTAILS'}
            />
            <TextButton
              containerStyle={this.state.activeTab==='Shots'?styles.ActiveButton:styles.OptionButton}
              textStyle={this.state.activeTab==='Shots'?styles.ActiveText:styles.OptionButtonText}
              onButtonPress={()=>{this.handlePress('Shots');}}
              title={'SHOTS'}
            />
            <TextButton
              containerStyle={this.state.activeTab==='Specials'?styles.ActiveButton:styles.OptionButton}
              textStyle={this.state.activeTab==='Specials'?styles.ActiveText:styles.OptionButtonText}
              onButtonPress={()=>{this.handlePress('Specials');}}
              title={'SPECIALS'}
            />
          </ScrollView>
        </View>
        <View style={styles.seperator}></View>
      </View>
    );
  }
}
