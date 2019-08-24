import React, { Component } from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
// Jim, this package has native dependencies
// You need to link it with react-native link
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import styles from './style';

export default class VerticalListCard extends Component {

  static propTypes = {
    // A JSON formated store/venue
    store: PropTypes.object.isRequired,
    // Callback for press events on TouchableOpacity component representing a StorePreview
    onPress: PropTypes.func.isRequired,
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
     if (this.props.store.name == "Johnny Deppy Bar") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJhyeNH0SYoRQRkMU4ZDVfQ78_0.jpeg')}/>)
     }
     if (this.props.store.name == "Darwin koffie-bar") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJIxQjCPmYoRQRNKkNlR9hS_0_0.jpeg')}/>)
     }
     if (this.props.store.name == "Cibo Cafe-Bar-Restaurant") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJg0ZZPDyZoRQRiyO8hxi5cvM_0.jpeg')}/>)
     }
     if (this.props.store.name == "Maimou Bar") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJtzAWKPiYoRQRYYaK5sQMTS8_0.jpeg')}/>)
     }
     if (this.props.store.name == "Life Bar") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJwVK2ePeYoRQRY24pjGswLto_0.jpeg')}/>)
     }
     if (this.props.store.name == "home") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/randomNormieKeyReeee_0.jpeg')}/>)
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
        source={{uri: this.props.store.media[0]}}
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
    if (this.props.store.rating <= 0.5) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
    if (this.props.store.rating <= 1) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
    if (this.props.store.rating <= 1.5) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
    if (this.props.store.rating <= 2) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
    if (this.props.store.rating <= 2.5) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
    if (this.props.store.rating <= 3) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
    if (this.props.store.rating <= 3.5) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
    if (this.props.store.rating <= 4) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
    if (this.props.store.rating <= 4.5) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
    if (this.props.store.rating <= 5) {
      return (<Image style={styles.rating} source={require('../images/rating-icon-white.png')}/>);
    }
  }

  /**
   * [Renders a preview of each store containing information in props
   * passed down from parent StoreList component. Contains
   * A) An Image component that displays the store/venue
   * A.1) An absolutely positioned Text component containing a label for offers
   * A.2) An absolutely positioned Image component respresenting a favorite option
   * B) A Text component containing the store/venue name
   * C) An Image and Text component containing the address of the store/venue
   * D) An Image and Text component respresenting the operating hours
   * E) An Image component respresenting the rating in stars
   * F) A absolutely positioned set of Image components and Text components for the gender ratio]
   * @return {[TouchableOpacity]} [TouchableOpacity respresenting the StorePreview component]
   */
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={0.7}
        style={styles.container}
      >

        {/*The main image of the detail Screen*/}
        {this.displayMainImage_local()}

        {/*venue info container*/}
        {/*uses linear gradient component*/}
        <LinearGradient colors={['transparent', 'black']} style={styles.venueInfoContainer}>
          <Text style={styles.venueName}>
            {this.props.store.name}
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
                source={require('../images/man-icon-card.png')}
              />
              <Text style={[styles.genderNumber, styles.genderNumberMan]}>
                {this.props.store.people.MenAvg}
              </Text>
              <Image
                style={styles.cardGenderIcon}
                source={require('../images/woman-icon-card.png')}
              />
              <Text style={styles.genderNumber}>
                {this.props.store.people.WomenAvg}
              </Text>
            </View>
          </View>
        </LinearGradient>

      </TouchableOpacity>
    );
  }
}
