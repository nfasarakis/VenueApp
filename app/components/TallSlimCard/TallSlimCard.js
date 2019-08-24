import React, { Component } from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import styles from './style';

export default class TallSlimCard extends Component {

  static propTypes = {
    // The store/venue name
    name: PropTypes.string.isRequired,
    // Array of store/venue URLs for media
    media: PropTypes.array.isRequired,
    // The icon to use on the TallSlimCard component
    iconSource: PropTypes.number.isRequired,
    // The style for the icon
    iconStyle: PropTypes.object.isRequired,
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
     if (this.props.name == "Johnny Deppy Bar") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJhyeNH0SYoRQRkMU4ZDVfQ78_0.jpeg')}/>)
     }
     if (this.props.name == "Darwin koffie-bar") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJIxQjCPmYoRQRNKkNlR9hS_0_0.jpeg')}/>)
     }
     if (this.props.name == "Cibo Cafe-Bar-Restaurant") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJg0ZZPDyZoRQRiyO8hxi5cvM_0.jpeg')}/>)
     }
     if (this.props.name == "Maimou Bar") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJtzAWKPiYoRQRYYaK5sQMTS8_0.jpeg')}/>)
     }
     if (this.props.name == "Life Bar") {
       return (<Image style={styles.mainImage} source={require('../../../jsondata/images/ChIJwVK2ePeYoRQRY24pjGswLto_0.jpeg')}/>)
     }
     if (this.props.name == "home") {
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
        source={{uri: this.props.media[0]}}
      />
    }

  /**
   *
   * @return {[View]}
   */
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={0.7}
        style={styles.container}
      >
        {/*The main image of the TallSlimCard component*/}
        {this.displayMainImage_local()}

        <LinearGradient colors={['transparent', 'black']} style={styles.venueInfoContainer}>
          <View style={styles.iconContainer}>
            <Image
              style={this.props.iconStyle}
              source={this.props.iconSource}
            />
            <Text style={styles.iconNumber}>
              {Math.round(100+100*Math.random())}
            </Text>
          </View>
          <Text style={styles.venueName}>
            {this.props.name}
          </Text>
        </LinearGradient>

      </TouchableOpacity>
    );
  }
}
