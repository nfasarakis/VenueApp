import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  setSearchArea,
  addVenues,
  addRecommendedVenues,
  addMostLovedVenues,
  addUserLovedVenues,
  addRecommentedWithOffers,
  addVenuesWithOffers,
  addMostVisitedVenues,
  addUserVisitedVenues,
} from '../../store/actions.js';
import {useDispatch} from 'react-redux';
import SearchSuggestion from '../../components/SearchSuggestion';
import styles from './style';
import searchGlyph from '../../components/images/search-glyph.png';
import backIcon from '../../components/images/xBtn_black.png';

export default function SearchScreen(props) {
  // React-redux dispatch hook
  const dispatch = useDispatch();

  // Update state of all screens using search parameters
  const performSearch = searchParam => {
    // Dismiss keyboard if active
    Keyboard.dismiss();

    console.warn('Searching with ' + searchParam);

    // Update the state of all screens
    // DEV_only: PROD_ should use the searchParam
    dispatch(setSearchArea(searchParam));
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
   *
   * @return {[View]}
   */
  return (
    <View style={styles.container}>
      {/*Back button icon and it's container*/}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.backIconContainer}
        onPress={() => props.navigation.goBack()}>
        <Image style={styles.backIcon} source={backIcon} />
      </TouchableOpacity>

      <View style={styles.textInputContainer}>
        <Image style={styles.searchIcon} source={searchGlyph} />
        <TextInput
          style={styles.textInput}
          placeholder={'Search areas around Athens'}
          autoFocus={false}
        />
      </View>
      <View style={styles.horLine} />
      <ScrollView onScrollBeginDrag={() => Keyboard.dismiss()}>
        <SearchSuggestion
          name="Try Close to you"
          numVenues={128}
          onSuggestionPress={() => performSearch('Close to you')}
        />
        <SearchSuggestion
          name="Try Athens"
          numVenues={439}
          onSuggestionPress={() => performSearch('Athens')}
        />
        <SearchSuggestion
          name="Try Chalandri"
          numVenues={32}
          onSuggestionPress={() => performSearch('Chalandri')}
        />
        <SearchSuggestion
          name="Try Agia Paraskevi"
          numVenues={47}
          onSuggestionPress={() => performSearch('Agia Paraskevi')}
        />
        <SearchSuggestion
          name="Try Holargos"
          numVenues={39}
          onSuggestionPress={() => performSearch('Holargos')}
        />
        <SearchSuggestion
          name="Try Panormou"
          numVenues={49}
          onSuggestionPress={() => performSearch('Panormou')}
        />
      </ScrollView>
    </View>
  );
}
