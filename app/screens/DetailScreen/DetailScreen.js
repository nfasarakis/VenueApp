import React, { Component } from 'react';
import {View, ScrollView} from 'react-native';
import {About, Genders, Ages, Map, Visited} from '../../components/DetailSections';
import styles from './style';

export default class DetailScreen extends Component {

  /**
   * Given a venue, extract all other venues from the list of venues
   * whose keys match the keys in the given venue's also visited property
   * @param  {[Object]} currentVenue JSON of the venue whose related/visited venues we want
   * @param  {[Object]} venueList    List of all venues to search over
   * @return {[Array]}              Array of JSONs containing the visited venues that
   *                                correspond to the also_visited property of the input venue
   */
  getAlsoVisited = (currentVenue, venueList) => {
    // We need to think if we want to create a seperate api-end point for this
    // However, if the full JSON is not too large, this will do fine
    const alsoVisited=[];
    venueList.forEach((element) => {
      if (currentVenue.also_visited.includes(element.key)) {
        alsoVisited.push(element);
      }
    });
    return alsoVisited;
  }

  /**
   *
   * @return {[View]} [ScrollView representing the currently viewed venue's details subscreen]
   */
  render() {
    // Get navigation papams and navigate function provided via
    // this.props.navigation
    // this.props.navigation comes from the DetailStackNavigator
    //  defined in config/router.js
    // params are passed via the Discover/Favorites/Visited/Offers screens
    // as options when they call their corresponding navigate functions
    // navigate function is passed by default
    const {params} = this.props.navigation.state;
    const navigate = this.props.navigation.navigate;
    return (
      <View style={styles.container}>

        <ScrollView>
          {/*B) component with the about section*/}
          <About
            venue={params.venue}
            onCatalogPress={()=>navigate('Catalog', {
              venue:params.venue,
            })}
            onOfferPress={()=>navigate('Offer', {
              venue:params.venue,
            })}
          />
          {/*C) component with the genderinfo section*/}
          <Genders
            venue={params.venue}
          />
          {/*D) component with the agesinfo section*/}
          <Ages
            venue={params.venue}
          />
          {/*E) component with the mapinfo section*/}
          <Map
            venue={params.venue}
          />
          {/*F) component with the related/visited section*/}
          <Visited
            venue={params.venue}
            venueList={params.venueList}
            alsoVisited={this.getAlsoVisited(params.venue, params.venueList)}
            navigateTo={navigate}
          />
        </ScrollView>
      </View>
    );
  }
}
