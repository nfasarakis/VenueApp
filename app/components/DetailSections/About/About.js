import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {TextButton} from '../../elements';
import PropTypes from 'prop-types';
import styles from './style';

//PropTypes for component About
About.propTypes = {
  // A JSON formated store/venue to display
  venue: PropTypes.object.isRequired,
  // Callback for press events on Catalog button
  onCatalogPress: PropTypes.func.isRequired,
  // Callback for press events on Offer button
  onOfferPress: PropTypes.func.isRequired,
};

export default function About(props) {
  // Configure LayoutAnimation
  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

  // React hook for state: posible values are "About, Location, Music or Drinks"
  // Use to determine what description contents to show
  const [activeTab, setActiveTab] = useState('about');

  // React Effect hook
  // Sets up LayoutAnimation for android when component mounts
  useEffect(() => {
    // LayoutAnimation: Automatically animates views to their new positions when the next layout happens.
    // Enable under Android
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []); // Run only on mount

  // React effect hook
  // Each time an update is triggered via state change, set the LayoutAnimation
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }, [activeTab]);

  /**
   * Maps possible state values to <Text> components used as a description
   * Genetares an object with property names corresponding to the possible values of
   * the state of the About component and property values equal to the description
   * corresponding to the possible state values
   * @return {[Text]} Text component corresponding to state values
   */
  const generateDescription = () => {
    return {
      about: (
        <Text style={styles.description}>
          Fantastic interior design and open air roof. Good for coffee and
          snacks. Friendly staff and unique cocktails. {'\n'} Open:{' '}
          {props.venue.time}{' '}
        </Text>
      ),
      location: (
        <Text style={styles.description}>
          Venue {props.venue.name} is located at {props.venue.address}
          and is open at {props.venue.time}
        </Text>
      ),
      music: props.venue.music ? (
        <Text style={styles.description}>
          Venue {props.venue.name} usually plays {props.venue.music.join(', ')}
        </Text>
      ) : (
        <Text style={styles.description}>
          The owner of {props.venue.name} has not specified what music plays
        </Text>
      ),
      drinks: (
        <Text style={styles.description}>
          Venue {props.venue.name} serves Spirits, Beers, Cocktails and
          <Text style={styles.coloredSubtext}> +7 more </Text>. See catalog for
          details.
        </Text>
      ),
    };
  };

  /**
   * [Returns a View component representing the About component
   * @return {[View]} [View representing the about component]
   */
  return (
    <View style={styles.container}>
      {/*About section heading*/}
      <Text style={styles.heading}> About this place </Text>

      {/*About section offer iff it exists*/}
      <Text style={styles.offer}> OFFER: SECOND DRINK IS FREE!</Text>

      {/*About section display options*/}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => setActiveTab('about')}>
          <Image
            style={styles.optionIcon}
            source={require('../../images/music-note.png')}
          />
          <Text
            style={[
              styles.optionTitle,
              activeTab === 'about' && styles.active,
            ]}>
            About
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => setActiveTab('location')}>
          <Image
            style={styles.optionIcon}
            source={require('../../images/music-note.png')}
          />
          <Text
            style={[
              styles.optionTitle,
              activeTab === 'location' && styles.active,
            ]}>
            Location
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => setActiveTab('music')}>
          <Image
            style={styles.optionIcon}
            source={require('../../images/music-note.png')}
          />
          <Text
            style={[
              styles.optionTitle,
              activeTab === 'music' && styles.active,
            ]}>
            Music
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionItem, styles.optionItemLastChild]}
          onPress={() => setActiveTab('drinks')}>
          <Image
            style={styles.optionIcon}
            source={require('../../images/music-note.png')}
          />
          <Text
            style={[
              styles.optionTitle,
              activeTab === 'drinks' && styles.active,
            ]}>
            Drinks
          </Text>
        </TouchableOpacity>
      </View>

      {/*About section description*/}
      <View>{generateDescription()[activeTab]}</View>

      {/*Catalog and offer buttons*/}
      <View style={styles.buttonsContainer}>
        <TextButton
          containerStyle={styles.AboutButton}
          textStyle={styles.AboutButtonText}
          onButtonPress={props.onCatalogPress}
          title={'SEE CATALOG'}
        />
        <TextButton
          containerStyle={styles.AboutButton}
          textStyle={styles.AboutButtonText}
          onButtonPress={props.onOfferPress}
          title={'OFFER CODE'}
        />
      </View>

      {/*Seperator line*/}
      <View style={styles.seperator} />
    </View>
  );
}
