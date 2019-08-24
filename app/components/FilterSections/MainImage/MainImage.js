import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
// Jim, this package has native dependencies
// You need to link it with react-native link
import LinearGradient from 'react-native-linear-gradient';
import {TextButton} from '../../elements';
import PropTypes from 'prop-types';
import styles from './style';


export default class MainImage extends Component {

  static propTypes = {
    // String specifying what tab lauched the filter screen
    // Used in the header for filter description
    originTab: PropTypes.string.isRequired,
    // String specifying the order in which the filtered items are returned
    // Used to set corresponding string in description
    order: PropTypes.string.isRequired,
    // Event handler that fires when back button is pressed
    onReturn: PropTypes.func.isRequired,
    // Event handler that fires when filter button is pressed
    onFilterPress: PropTypes.func.isRequired,
  }

  /**
   * [Returns a View component representing the mainImage component
   * @return {[View]} [View representing the mainImage component]
   */
  render() {
    return (
      <View style={styles.container}>

        {/*The main image of the detail Screen*/}
        <Image
          style={styles.mainImage}
          source={require('../../images/filterScreenBg.jpeg')}
        />

        {/*filter info container*/}
        {/*uses linear gradient component*/}
        <LinearGradient colors={['transparent', 'black']} style={styles.gradientForeground}>

          <View style={styles.filterInfoContainer}>
            <Text style={styles.heading}>
              FILTER RESULTS &gt; LOCATION &gt; {this.props.originTab.toUpperCase()}    
            </Text>
            <View style={styles.seperator}></View>
            <View style={styles.filteringParametersContainer}>
              <View style={styles.orderByContainer}>
                <Text style={styles.description}> Ordering by {this.props.order} </Text>
                {
                  this.props.order==='Best Rating' &&
                  <Image style={styles.rating} source={require('../../images/rating-icon-white.png')}/>
                }
              </View>
              <TextButton
                containerStyle={styles.filterButtonContainer}
                textStyle={styles.filterButtonText}
                onButtonPress={this.props.onFilterPress}
                title={'FILTER VENUES'}
              />
            </View>
          </View>
        </LinearGradient>

        {/*Back button icon and it's container*/}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.backIconContainer}
          onPress={()=>{this.props.onReturn();}}
        >
          <Image
            style={styles.backIcon}
            source={require('../../images/xIcon.png')}
          />
        </TouchableOpacity>

      </View>
    );
  }
}
