import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, StatusBar, Platform} from 'react-native';
// Jim, this package has native dependencies
// You need to link it with react-native link
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import styles from './style';


export default class MainImage extends Component {

  static propTypes = {
    // A JSON formated store/venue to display
    venue: PropTypes.object.isRequired,
    // Event handler that fires when back button is pressed in VenueDetail component
    onReturn: PropTypes.func.isRequired,
  }

  /**
   * USED ONLY IF LOADING MAIN STORE IMAGES FROM LOCAL STORAGE
   * [Uses the store.name property of the prop pased down from the parent component
   * to return the corresponding Image component respresenting the store]
   * @return {[Image]} [Image component respresenting the main store image]
   */
   displayMainImage_local = () => {
     // Note: this way is dumb but string in require(*) has to be know statisticaly
     //  accoriding to the react-native docs
     if (this.props.venue.name == "Johnny Deppy Bar") {
       return (<Image style={styles.mainImage} source={require('../../../../jsondata/images/ChIJhyeNH0SYoRQRkMU4ZDVfQ78_0.jpeg')}/>)
     }
     if (this.props.venue.name == "Darwin koffie-bar") {
       return (<Image style={styles.mainImage} source={require('../../../../jsondata/images/ChIJIxQjCPmYoRQRNKkNlR9hS_0_0.jpeg')}/>)
     }
     if (this.props.venue.name == "Cibo Cafe-Bar-Restaurant") {
       return (<Image style={styles.mainImage} source={require('../../../../jsondata/images/ChIJg0ZZPDyZoRQRiyO8hxi5cvM_0.jpeg')}/>)
     }
     if (this.props.venue.name == "Maimou Bar") {
       return (<Image style={styles.mainImage} source={require('../../../../jsondata/images/ChIJtzAWKPiYoRQRYYaK5sQMTS8_0.jpeg')}/>)
     }
     if (this.props.venue.name == "Life Bar") {
       return (<Image style={styles.mainImage} source={require('../../../../jsondata/images/ChIJwVK2ePeYoRQRY24pjGswLto_0.jpeg')}/>)
     }
     if (this.props.venue.name == "home") {
       return (<Image style={styles.mainImage} source={require('../../../../jsondata/images/randomNormieKeyReeee_0.jpeg')}/>)
     }
   }

   /**
    * USED ONLY IF LOADING MAIN STORE IMAGES FROM WEB SERVER
    * [Uses the store.name property of the prop pased down from the parent component
    * to return the corresponding Image component respresenting the store]
    * @return {[Image]} [Image component respresenting the main store image]
    */
    displayMainImage_url = () => {
      <Image
        style={styles.mainImage}
        source={{uri: this.props.venue.media[0]}}
      />
    }

  /**
   * [Uses the store.rating property of the prop pased down from the parent component
   * to return the corresponding Image component respresenting the star rating]
   * @return {[Image]} [Image component respresenting star rating]
   */
  displayRatingStars = () => {
    // Note: this way is dumb but string in require(*) has to be know statisticaly
    //  accoriding to the react-native docs
    if (this.props.venue.rating <= 0.5) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
    if (this.props.venue.rating <= 1) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
    if (this.props.venue.rating <= 1.5) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
    if (this.props.venue.rating <= 2) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
    if (this.props.venue.rating <= 2.5) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
    if (this.props.venue.rating <= 3) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
    if (this.props.venue.rating <= 3.5) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
    if (this.props.venue.rating <= 4) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
    if (this.props.venue.rating <= 4.5) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
    if (this.props.venue.rating <= 5) {
      return (<Image style={styles.venueRating} source={require('../../images/rating-icon-white.png')}/>);
    }
  }

  /**
   * [Returns a View component containing
   * A) A background image for the venue
   * B) A back icon to return to previous screen
   * C) A favorite icon to add venue to favorites list
   * D) A brief description for the venue at the bottom of the image with
   *  D.1) the name of the venue
   *  D.2) the distance from the user's current location
   *  D.3) the percentage match based on the user's preference
   *  D.4) the rating of the venue
   *  D.5) the number of men/women at the venue on average/right-now
   * @return {[View]} [View representing the currently viewed venue's main image]
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

        {/*The main image of the detail Screen*/}
        {this.displayMainImage_local()}

        {/*Favorite icon and it's container*/}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.favouriteIconContainer}
          onPress={()=>{/*Do on favoutite press*/}}
        >
          <Image
            style={styles.favouriteIcon}
            source={require('../../images/favorite-icon.png')}
          />
        </TouchableOpacity>

        {/*Back button icon and it's container*/}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backIconContainer}
          onPress={()=>{this.props.onReturn();}}
        >
          <Image
            style={styles.backIcon}
            source={require('../../images/back-arrow-white.png')}
          />
        </TouchableOpacity>

        {/*venue info container*/}
        {/*uses linear gradient component*/}
        <LinearGradient colors={['transparent', 'black']} style={styles.venueInfoContainer}>
          <Text style={styles.venueName}>
            {this.props.venue.name}
          </Text>
          <View style={styles.venueInfoRow}>
            <Text style={styles.infoText}>
              1.5 Km
            </Text>
            <Text style={styles.infoText}>
              98% match
            </Text>
            {this.displayRatingStars()}
            <View style={styles.inlineGenderIconContainer}>
              <Image
                style={styles.cardGenderIcon}
                source={require('../../images/man-icon-card.png')}
              />
              <Text style={[styles.genderNumber, styles.genderNumberMan]}>
                {this.props.venue.people.MenAvg}
              </Text>
              <Image
                style={styles.cardGenderIcon}
                source={require('../../images/woman-icon-card.png')}
              />
              <Text style={styles.genderNumber}>
                {this.props.venue.people.WomenAvg}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
