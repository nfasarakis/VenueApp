import React, { Component } from 'react';
import {View, Text, FlatList} from 'react-native';
import VenueCard from '../../VenueCard';
import PropTypes from 'prop-types';
import styles from './style';


export default class Visited extends Component {

  static propTypes = {
    // A JSON formated store/venue to display
    venue: PropTypes.object.isRequired,
    // Array of JSONs of all venues
    venueList: PropTypes.array.isRequired,
    // Array of JSON formated stores that users have visited after visiting venue
    alsoVisited: PropTypes.array.isRequired,
    // Callback for press events on items in the alsoVisited list
    // contains this.props.navigation.navigate passed from parent
    navigateTo: PropTypes.func.isRequired,
  }

  /**
   * Navigates to a specific venue screen after preparing the
   * corresponding navigation parameters passed by the navigator
   * @param  {[Object]} item JSON containing info about the venue to display
   */
  viewVenue = (item) => {
    this.props.navigateTo(
      'VenueDetails',
      {
        venue:item,
        venueList: this.props.venueList,
      }
    );
  }

  /**
   * [Returns a View component representing the Visited component
   * @return {[View]} [View representing the Visited component]
   */
  render() {
    return (
      <View style={styles.container}>

        {/*Visited section heading*/}
        <Text style={styles.heading}>
          You Might Like
        </Text>

        {/*Visited section description*/}
        <Text style={styles.description}>
          People who visited {this.props.venue.name} also visited
        </Text>

        {/*List of also visited venues*/}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horFlatList}
          data={this.props.alsoVisited}
          renderItem={
            // Each item in the list is a RecommendedPreview component
            ({item}) =>
              <View style={styles.vertFlatListItems}>
                <VenueCard venue={item} onPress={()=>{this.viewVenue(item);}}/>
              </View>
          }
        />

      </View>
    );
  }
}
