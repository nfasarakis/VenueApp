import React, { Component } from 'react';
import {View, Text, Image} from 'react-native';
import {TextButton} from '../../elements';
import PropTypes from 'prop-types';
import styles from './style';


export default class About extends Component {

  static propTypes = {
    // A JSON formated store/venue to display
    venue: PropTypes.object.isRequired,
  }

  /**
   * [Returns a View component representing the Map component
   * @return {[View]} [View representing the Map component]
   */
  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            {/*About section heading*/}
            <Text style={styles.heading}>
              On Map
            </Text>
            <TextButton
              containerStyle={styles.MapButton}
              textStyle={styles.MapButtonText}
              onButtonPress={()=>{}}
              title={'OPEN MAP'}
            />
          </View>
        </View>

        <Image
          style={styles.MapImage}
          source={require('../../images/map_detail_tmp.png')}
        />
        <View style={styles.seperator}></View>


      </View>
    );
  }
}
