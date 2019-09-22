import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, ScrollView, StatusBar, Platform} from 'react-native';
import {
  addVenues,
  addRecommendedVenues,
  addMostLovedVenues,
  addUserLovedVenues,
  addRecommentedWithOffers,
  addVenuesWithOffers,
  addMostVisitedVenues,
  addUserVisitedVenues,
} from '../../store/actions.js';
import {
  MainImage,
  StatisticsSelection,
  NumberFilter,
  AgeFilter,
  OrderByFilter,
  MusicFilter,
} from '../../components/FilterSections';
import styles from './style';

export default function FilterScreen(props) {
  // If true, scrolling is enabled on the scrollView component within the FilterOptions component
  // We use this to disable the scrollView when children components are handling gestures
  const [scroll, setScroll] = useState(true);
  // Either average or live statistics can be used
  // We use this to update child components so they reflect this selection
  const [statistics, setStatistics] = useState('average');
  // The percentage gender ratio shown on the description of the NumberFilter component
  // Used to refresh UI when the ratio change by child slider compoment
  const [genderRatio, setGenderRatio] = useState(50);
  // The min/max age of men/women shown on the description of the AgeFilter component
  // Used to refresh UI when ages change by child slider compoment
  const [minAgeMen, setMinAgeMen] = useState(15);
  const [maxAgeMen, setMaxAgeMen] = useState(50);
  const [minAgeWomen, setMinAgeWomen] = useState(15);
  const [maxAgeWomen, setMaxAgeWomen] = useState(50);
  // Filtered data can be ordered by rating, distance, number of people, ages of men/women or match
  // We use this to update child components so they reflect this selection
  const [orderBy, setOrderBy] = useState('Best Rating');
  // The music options selected in the child MusicFilter component
  const [music, setMusic] = useState(new Set([]));
  // React-redux dispatch hook
  const dispatch = useDispatch();

  /**
   * FOR DEVELOPMENT
   * Used to agregate and print the filtering parameters in the state
   * as selected by the all the child components
   */
  const filterVenues = async () => {
    // Print for debug
    console.warn(`Filtering parameters:
      Statistics: ${statistics}
      genderRatio: ${genderRatio}
      Age of men: ${minAgeMen}-${maxAgeMen}
      Age of women: ${minAgeWomen}-${maxAgeWomen}
      Music: ${[...music]}
      Ordering Results by: ${orderBy}`);
    // Update the state of all screens
    // DEV_only: PROD_ should use the filtering params
    dispatch(addVenues());
    dispatch(addRecommendedVenues());
    dispatch(addMostLovedVenues());
    dispatch(addUserLovedVenues());
    dispatch(addRecommentedWithOffers());
    dispatch(addVenuesWithOffers());
    dispatch(addMostVisitedVenues());
    dispatch(addUserVisitedVenues());
    // Go back to origin screen
    props.navigation.goBack();
  };

  /**
   * State updater: Toggles the scroll property of the state between true and false
   */
  const toggleScroll = () => setScroll(prevState => !prevState);

  /**
   * Updates the music property of the state
   * @param  {String} selection Value to include in the music set of the state
   */
  const updateMusic = selection =>
    setMusic(prevState => prevState.add(selection));

  /**
   * Renders a component representing the FilterScreen
   * @return {[View]} View representing the FilterScreen
   */
  return (
    <View style={styles.container}>
      {/*Make status bar white with a transparent background in iOS*/}
      {Platform.OS === 'ios' && (
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
      )}
      {/*A) component with the main image and filtering info*/}
      <MainImage
        originTab={props.navigation.state.params.originTab}
        order={orderBy}
        onReturn={props.navigation.goBack}
        onFilterPress={filterVenues}
      />
      {/* B) ScrollView containing filtering parameters*/}
      <ScrollView
        style={styles.scrollview}
        scrollEnabled={scroll}
        contentContainerStyle={styles.scrollViewContentContainer}>
        {/*B1) Component with options for statistics*/}
        <StatisticsSelection
          statistics={statistics}
          setStatistics={setStatistics}
        />
        {/*B2) Component with options for number filter*/}
        <NumberFilter
          statistics={statistics}
          scrollControl={toggleScroll}
          genderRatio={genderRatio}
          updateGenderRatio={setGenderRatio}
        />
        {/*B3) Component with options for age filter*/}
        <AgeFilter
          statistics={statistics}
          scrollControl={toggleScroll}
          minAgeMen={minAgeMen}
          maxAgeMen={maxAgeMen}
          minAgeWomen={minAgeWomen}
          maxAgeWomen={maxAgeWomen}
          updateMinAgeMen={setMinAgeMen}
          updateMaxAgeMen={setMaxAgeMen}
          updateMinAgeWomen={setMinAgeWomen}
          updateMaxAgeWomen={setMaxAgeWomen}
        />
        {/*B4) Component with options for order filter*/}
        <OrderByFilter
          labels={[
            'Best Rating',
            'Number of People',
            'Age of Men',
            'Age of Women',
            'Best Match',
            'Closest First',
          ]}
          order={orderBy}
          setOrder={setOrderBy}
        />
        {/*B5) Component with options for music filter*/}
        <MusicFilter updateMusic={updateMusic} />
      </ScrollView>
    </View>
  );
}
