import React, { Component } from 'react';
import {View, ScrollView, StatusBar, Platform} from 'react-native';
import {MainImage, StatisticsSelection, NumberFilter, AgeFilter, OrderByFilter, MusicFilter} from '../../components/FilterSections';
import styles from './style';


export default class FilterScreen extends Component {

  // State of FilterOptions component
  state = {
    // If true, scrolling is enabled on the scrollView component within the FilterOptions component
    // We use this to disable the scrollView when children components are handling gestures
    scroll: true,
    // Either average or live statistics can be used
    // We use this to update child components so they reflect this selection
    statistics: 'average',
    // The percentage gender ratio shown on the description of the NumberFilter component
    // Used to refresh UI when the ratio change by child slider compoment
    genderRatio: 50,
    // The min/max age of men/women shown on the description of the AgeFilter component
    // Used to refresh UI when ages change by child slider compoment
    minAgeMen: 15,
    maxAgeMen: 50,
    minAgeWomen: 15,
    maxAgeWomen: 50,
    // Filtered data can be ordered by rating, distance, number of people, ages of men/women or match
    // We use this to update child components so they reflect this selection
    ordering: 'Best Rating',
    // The music options selected in the child MusicFilter component
    music: new Set([]),
  }

  /**
   * State updater: Toggles the scroll property of the state between true and false
   */
  toggleScroll = () => {
    this.setState((prevState) => {
      return {scroll: !prevState.scroll};
    });
  }

  /**
   * Sets the statistics property of the state to either average or live
   * @param {[String]} label Label with which to set the statistics property of the state
   */
  setStatistics = (label) => {
    this.setState({statistics: label});
  }

  /**
   * Updates gender ratio property of the state
   * @param  {[Number]} gr [The value with which to update the genderRatio state property]
   */
  updateGenderRatio = (gr) => {
    this.setState({genderRatio: gr});
  }

  /**
   * [Updates min/max age of men/women of the state
   * @param  {[number]} age [number with which to update corresponding state property]
   */
  updateMinAgeMen = (age) => { this.setState({minAgeMen: age});}
  updateMaxAgeMen = (age) => { this.setState({maxAgeMen: age});}
  updateMinAgeWomen = (age) => { this.setState({minAgeWomen: age});}
  updateMaxAgeWomen = (age) => { this.setState({maxAgeWomen: age});}

  /**
   * Sets the ordering property of the state to appropriate value
   * @param {[String]} label Label with which to set the ordering property of the state
   */
  setOrder = (label) => {
    this.setState({ordering: label});
  }

  /**
   * Updates the music property of the state
   * @param  {String} selection Value to include in the music set of the state
   */
  updateMusic = (selection) => {
    this.setState((prevState)=>{
      return {music: prevState.music.add(selection)};
    });
  }

  /**
   * FOR DEVELOPMENT
   * Used to agregate and print the filtering parameters in the state
   * as selected by the all the child components
   */
  filterVenues = async () => {
    //console.warn(`Filtering parameters:
    //  Statistics: ${this.state.statistics}
    //  genderRatio: ${this.state.genderRatio}
    //  Age of men: ${this.state.minAgeMen}-${this.state.maxAgeMen}
    //  Age of women: ${this.state.minAgeWomen}-${this.state.maxAgeWomen}
    //  Music: ${[...this.state.music]}
    //  Ordering Results by: ${this.state.ordering}`);
    const filteringParams = {
      statistics: this.state.statistics,
      genderRatio: this.state.genderRatio,
      ageMen: this.state.minAgeMen + ' - ' + this.state.maxAgeMen,
      ageWomen: this.state.minAgeWomen + ' - ' + this.state.maxAgeWomen,
      music: [...this.state.music],
      orderBy: this.state.ordering
    };

    // Retrieve function used to update state of screen that lauched filter screen
    // This function is passed in MainTabsNavigationOptions and
    // MapScreenNavigationOptions in routerConfig.js
    const {filterState} = this.props.navigation.state.params;
    filterState(filteringParams);

    // Go back to origin screen
    this.props.navigation.goBack();
  }

  /**
   * Renders a component representing the FilterScreen
   * @return {[View]} View representing the FilterScreen
   */
  render() {
    return (
      <View style={styles.container}>
        {/*Make status bar white with a transparent background in iOS*/}
        {
          Platform.OS === 'ios'&&<StatusBar
            backgroundColor="transparent"
            barStyle="light-content"
          />
        }
        {/*A) component with the main image and filtering info*/}
        <MainImage
          originTab = {this.props.navigation.state.params.originTab}
          order = {this.state.ordering}
          onReturn={this.props.navigation.goBack}
          onFilterPress = {this.filterVenues}
        />
        {/* B) ScrollView containing filtering parameters*/}
        <ScrollView
          style={styles.scrollview}
          scrollEnabled={this.state.scroll}
          contentContainerStyle={{alignItems: 'center'}}
        >
          {/*B1) Component with options for statistics*/}
          <StatisticsSelection
            statistics = {this.state.statistics}
            setStatistics = {this.setStatistics}
          />
          {/*B2) Component with options for number filter*/}
          <NumberFilter
            statistics = {this.state.statistics}
            scrollControl={this.toggleScroll}
            genderRatio = {this.state.genderRatio}
            updateGenderRatio = {this.updateGenderRatio}
          />
          {/*B3) Component with options for age filter*/}
          <AgeFilter
            statistics = {this.state.statistics}
            scrollControl={this.toggleScroll}
            minAgeMen={this.state.minAgeMen}
            maxAgeMen={this.state.maxAgeMen}
            minAgeWomen={this.state.minAgeWomen}
            maxAgeWomen={this.state.maxAgeWomen}
            updateMinAgeMen={this.updateMinAgeMen}
            updateMaxAgeMen= {this.updateMaxAgeMen}
            updateMinAgeWomen= {this.updateMinAgeWomen}
            updateMaxAgeWomen= {this.updateMaxAgeWomen}
          />
          {/*B4) Component with options for order filter*/}
          <OrderByFilter
            labels={['Best Rating', 'Number of People', 'Age of Men', 'Age of Women', 'Best Match', 'Closest First']}
            order = {this.state.ordering}
            setOrder = {this.setOrder}
          />
          {/*B5) Component with options for music filter*/}
          <MusicFilter
            updateMusic = {this.updateMusic}
          />
        </ScrollView>
      </View>
    );
  }
}
