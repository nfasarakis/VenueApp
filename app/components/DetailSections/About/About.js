import React, { Component } from 'react';
import {View, Text, Image, TouchableOpacity, Animated, Platform, UIManager, LayoutAnimation} from 'react-native';
import {TextButton} from '../../elements';
import PropTypes from 'prop-types';
import styles from './style';


export default class About extends Component {

  static propTypes = {
    // A JSON formated store/venue to display
    venue: PropTypes.object.isRequired,
    // Callback for press events on Catalog button
    onCatalogPress: PropTypes.func.isRequired,
    // Callback for press events on Offer button
    onOfferPress: PropTypes.func.isRequired,
  }

  // State of the About component
  state = {
    // Either About, Location, Music or Drinks
    // Use to determine what description contents to show
    activeTab: 'about',
  }

  /**
   * Fades in/Animates the description by animating it's Yscale
   * from 0 to 1 over a period of 250 ms
   */
  fadeInActiveTab = () => {
    Animated.timing(
      this.viewScale,
      {
        toValue: 1,
        duration: 250,
      }
    ).start();
  }

  /**
   * Fades out/ Animates the description by animating it's Yscale
   * from 1 to 0 over a period of 250ms
   *
   * Sets the state with the new description to show after animation completes
   * The setState call receives a callback that then fades in the new description
   * via a fadeInActiveTab() call
   * @param  {[String]} tabname String with which to set the new state
   */
  fadeOutActiveTab = (tabname) => {
    Animated.timing(
      this.viewScale,
      {
        toValue: 0,
        duration: 250,
      }
    ).start(()=>{
      // timing callback
      this.setState({activeTab: tabname},()=>{
        // setState callback
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.fadeInActiveTab();
      });
    });
  }

  /**
   * Maps possible state values to <Text> components used as a description
   * Genetares an object with property names corresponding to the possible values of
   * the state of the About component and property values equal to the description
   * corresponding to the possible state values
   * @return {[Text]} Text component corresponding to state values
   */
  generateDescription = () => {
    return {
      'about': <Text style={styles.description}>
        Fantastic interior design and open air roof. Good for
        coffee and snacks. Friendly staff and unique cocktails.
        {'\n'}
        Open: {this.props.venue.time}
      </Text>,
      'location': <Text style={styles.description}>
        Venue {this.props.venue.name} is located at {this.props.venue.address} and
        is open at {this.props.venue.time}
      </Text>,
      'music': this.props.venue.music
        ? <Text style={styles.description}>
            Venue {this.props.venue.name} usually plays {this.props.venue.music.join(', ')}
        </Text>
        : <Text style={styles.description}>
            The owner of {this.props.venue.name} has not specified what music
            plays
        </Text>,
      'drinks':<Text style={styles.description}>
        Venue {this.props.venue.name} serves Spirits, Beers, Cocktails and
        <Text style={{color:'#6BA7EC'}}>
          +7 more
        </Text>.
        See catalog for details.
      </Text>
    };
  }

  /**
   * Lifecycle method: executes before first render()
   */
  componentWillMount() {
    // Enable LayoutAnimation under Android
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  /**
   * Lyfecycle method: invoked before a mounted component receives new props
   * We use this to reset the state to default values when the props change
   *
   * This is for the case where we navigate to another detail view within a detail view
   * Since the virtual dom doesnt change, react doesnt unmount the component
   * A component that doesnt get unmounted remembers state
   * Therefore we manually reset the state to it's default value
   */
  componentWillReceiveProps(nextProps) {
    // if the component received new props
    if (this.props!==nextProps) {
      // reset the state
      this.setState({activeTab: 'about'});
    }
  }

  // Initialize the Yscale of the description to be animated
  viewScale = new Animated.Value(1);

  /**
   * [Renders a View component representing the About component
   * @return {[View]} [View representing the about component]
   */
  render() {
    return (
      <View style={styles.container}>

        {/*About section heading*/}
        <Text style={styles.heading}>
          About this place
        </Text>

        {/*About section offer iff it exists*/}
        <Text style={styles.offer}>
          OFFER: SECOND DRINK IS FREE!
        </Text>

        {/*About section display options*/}
        <View style={styles.optionsContainer}>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={()=>this.fadeOutActiveTab('about')}>
            <Image
              style={styles.optionIcon}
              source={require('../../images/music-note.png')}
            />
            <Text
              style={[styles.optionTitle, this.state.activeTab==='about'&&styles.active]}>
              About
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={()=>this.fadeOutActiveTab('location')}>
            <Image
              style={styles.optionIcon}
              source={require('../../images/music-note.png')}
            />
            <Text
              style={[styles.optionTitle, this.state.activeTab==='location'&&styles.active]}>
              Location
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={()=>this.fadeOutActiveTab('music')}>
            <Image
              style={styles.optionIcon}
              source={require('../../images/music-note.png')}
            />
            <Text
              style={[styles.optionTitle, this.state.activeTab==='music'&&styles.active]}>
              Music
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionItem, styles.optionItemLastChild]}
            onPress={()=>this.fadeOutActiveTab('drinks')}>
            <Image
              style={styles.optionIcon}
              source={require('../../images/music-note.png')}
            />
            <Text
              style={[styles.optionTitle, this.state.activeTab==='drinks'&&styles.active]}>
              Drinks
            </Text>
          </TouchableOpacity>

        </View>

        {/*About section description*/}
        <Animated.View style={{transform: [{ scaleY: this.viewScale }]}}>
          {this.generateDescription()[this.state.activeTab]}
        </Animated.View>

        {/*Catalog and offer buttons*/}
        <View style={styles.buttonsContainer}>
          <TextButton
            containerStyle={styles.AboutButton}
            textStyle={styles.AboutButtonText}
            onButtonPress={this.props.onCatalogPress}
            title={'SEE CATALOG'}
          />
          <TextButton
            containerStyle={styles.AboutButton}
            textStyle={styles.AboutButtonText}
            onButtonPress={this.props.onOfferPress}
            title={'OFFER CODE'}
          />
        </View>

        {/*Seperator line*/}
        <View style={styles.seperator}></View>

      </View>
    );
  }
}
