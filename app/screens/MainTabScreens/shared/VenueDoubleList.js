import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {
  VerticalListCard,
  HorizontalListCard,
  TallSlimCard,
} from '../../../components';
import beakon from '../../../components/images/beakon-white.png';

/**
 * Navigates to a specific venue screen.
 * @param  {[Object]} item JSON containing info about the venue to display
 */
const navigateToVenue = (navigationProp, venue, venueList) => {
  // Clicking this will navigate be to the VenueStackNavigator.
  // Since the VenueStackNavigator contains as a child another
  // navigatitor (see router.js), specifically VenueDetailStackNavigator,
  // we need a way to properly navigate to the inner navigator with the
  // correct parameters.
  //
  // This can be achieved with the action property of the navigate function
  // It allows us to set a sub-action to run in the child router/screen,
  // if the screen we are navigating to is a navigator
  // // See: action prop in https://reactnavigation.org/docs/navigation-prop.html
  navigationProp.navigate(
    // Navigates me to screen Venue which is the VenueStackNavigator
    'Venue',
    // Parameters to pass to screen we are navigating to should be
    // empty here since we are navigating to a navigator
    {},
    // Sub-action to run if the screen we are going to is a navigator
    // In this case, screen Venue is
    NavigationActions.navigate({
      // Go to the venueDetails screen, which is the VenueDetailStackNavigator
      routeName: 'VenueDetails',
      // In ./routerConfig.js, we have set a default initial screen for this Stack
      // Pass the following parameters to the default initial screen
      params: {
        venue: venue,
        venueList: venueList,
      },
    }),
  );
};

/**
 * Generates the text title and subtitle above of the horizontal list depending on the current screen
 * @param {string} name Either "Discover", "Visited", "Favorites" or "Offers"
 * @return {View} A view composed of styled text components that act as the title/subtitle of the horizontal list
 */
const generateHorizTitle = (name, area) => {
  switch (name) {
    case 'Discover':
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>Recommended </Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>
            The best of the best: recommended venues with enticing offers
            {area === 'Close to you'
              ? ' close to your current location'
              : ' in ' + area}
          </Text>
        </View>
      );
    case 'Visited':
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>Most visited </Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>
            Venues that people
            {area === 'Close to you'
              ? ' close to your location '
              : ' in ' + area + ' '}
            have visited the most.
          </Text>
        </View>
      );
    case 'Favorites':
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>Most loved </Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>
            Venues that people
            {area === 'Close to you'
              ? ' close to your current location '
              : ' in ' + area + ' '}
            love the most.
          </Text>
        </View>
      );
    case 'Offers':
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>Featured Offers </Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>
            Check out the best offers available
            {area === 'Close to you'
              ? ' close to your current location'
              : ' in ' + area}
          </Text>
        </View>
      );
    default:
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>Oops! </Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>Something went wrong...</Text>
        </View>
      );
  }
};

/**
 * Generates the text title and subtitle above of the vertical list depending on the current screen
 * @param {string} name Either "Discover", "Visited", "Favorites" or "Offers"
 * @return {View} A view composed of styled text components that act as the title/subtitle of the vertical list
 */
const generateVerticTitle = (name, area) => {
  switch (name) {
    case 'Discover':
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>Discover new places</Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>
            Find the next venue to visit
            {area === 'Close to you'
              ? ' close to your current location'
              : ' around ' + area}
          </Text>
        </View>
      );
    case 'Visited':
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>The places {"you've"} been</Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>
            See the places you have visited
            {area === 'Close to you'
              ? ' close to your current location'
              : ' in ' + area}
          </Text>
        </View>
      );
    case 'Favorites':
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>Places you love</Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>
            Places you have marked as favorites
            {area === 'Close to you'
              ? ' close to your current location '
              : ' in ' + area + ' '}
            will appear here
          </Text>
        </View>
      );
    case 'Offers':
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>{"Don't break the bank"}</Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>
            Play it smart! Check out the following venues with offers
            {area === 'Close to you'
              ? ' close to your current location'
              : ' in ' + area}
          </Text>
        </View>
      );
    default:
      return (
        <View style={styles.storelistheaderContainer}>
          <Text style={styles.storelistheader}>Oops! </Text>
          {/*Applies a horz line*/}
          <View style={styles.horline} />
          <Text style={styles.storelistbody}>Something went wrong...</Text>
        </View>
      );
  }
};

/**
 * VenueDoubleList: Component that combines new FlatList components, one horizontal and
 *                  one vertical, to display props.horizontalListItems & props.verticalListItems
 *                  resp.
 *                  The horizontal FlatList acts as a header to the vertical FlatList
 *                  to achive custom scrolling behaviour, s.t the horizontal FlatList
 *                  scrolls as an item of the VerticalListCard
 *                  Used by the discover/offers screens
 *
 * The VenueDoubleList Component receives the following props
 *  @param {string} screenName String with the id of the screen/parent that displays the VenueDoubleList
 *  @param {object} navigationProp  The navigation object passed via reactnavigation to
 *                                  the VenueDoubleList component's parent screen.
 *  @param {string} area String specifying what area the venues in VenuneDoubleList are
 *                       located in. Used to generate helpfull text information
 *  @param {Array} verticalListItems Array of items/venues to be displayed via the vertical FlatList
 *  @param {Array} horizontalListItems Array of items/venues to be displayed via the horizontal FlatList
 *
 * @return {View} View composing the horizontal & vertical FlatList components as we as titles/subtitles for each
 */
export function VenueDoubleList({
  screenName,
  navigationProp,
  area = 'Close to you',
  verticalListItems,
  horizontalListItems,
}) {
  /**
   * Generates a custom component to be used in the ListHeaderComponent prop of the FlatList
   * This component contains
   * A) A view composed of styled text components for the title/subtitle of the horizontal list
   * B) A horizontal scrolling list of venues for recommended/mostLoved/mostVisited
   * C) A view composed of styled text components for the title/subtitle of the vertical list
   *
   * The reason this is done is so we can embed a horizontal Flatlist plus titles as an item in the vertical flatlist
   * This allows the horizontal flatlist plus titles to scroll as an item of the vertical flatlist.
   * Demo it to see it in action.
   * I cannot think of another way to achieve this effect
   * @return {<View>} A horizontal flatList composed with title and subtitles for itself as well as
   *                  a title and subtitle for the vertical Flatlist it acts as a ListHeaderComponent prop for
   */
  const generateListHeaderComponent = () => {
    return (
      <View style={styles.container}>
        {generateHorizTitle(screenName, area)}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horFlatList}
          data={horizontalListItems}
          //Optimization parameter
          //Our item heights are 170 + 2 margin as seen in style.js
          getItemLayout={(data, index) => ({
            length: 172,
            offset: 172 * index,
            index,
          })}
          renderItem={({item}) => (
            <View style={styles.horFlatListItems}>
              <HorizontalListCard
                venue={item}
                onPress={() => {
                  navigateToVenue(navigationProp, item, horizontalListItems);
                }}
              />
            </View>
          )}
        />
        {generateVerticTitle(screenName, area)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
        data={verticalListItems}
        ListHeaderComponent={generateListHeaderComponent()}
        //Optimization parameter
        //Our item heights are 200 + 10 margin as seen in style.js
        getItemLayout={(data, index) => ({
          length: 210,
          offset: 210 * index,
          index,
        })}
        renderItem={({item}) => (
          <View style={styles.vertFlatListItems}>
            <VerticalListCard
              venue={item}
              onPress={() => {
                navigateToVenue(navigationProp, item, verticalListItems);
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

/**
 * VenueDoubleListTall: Like VenueDoubleList, but with different horizontal FlatList component
 *                      Used by the visited/favourites screens
 *
 * The VenueDoubleListTall Component receives the following props
 *  @param {string} screenName String with the id of the screen/parent that displays the VenueDoubleList
 *  @param {object} navigationProp  The navigation object passed via reactnavigation to
 *                                  the VenueDoubleList component's parent screen.
 *  @param {string} area String specifying what area the venues in VenuneDoubleList are
 *                       located in. Used to generate helpfull text information
 *  @param {Array} verticalListItems Array of items/venues to be displayed via the vertical FlatList
 *  @param {Array} horizontalListItems Array of items/venues to be displayed via the horizontal FlatList
 *
 * @return {View} View composing the horizontal & vertical FlatList components as we as titles/subtitles for each
 */
export function VenueDoubleListTall({
  screenName,
  navigationProp,
  area = 'Close to you',
  verticalListItems,
  horizontalListItems,
}) {
  /**
   * Generates a custom component to be used in the ListHeaderComponent prop of the FlatList
   * This component contains
   * A) A view composed of styled text components for the title/subtitle of the horizontal list
   * B) A horizontal scrolling list of venues for recommended/mostLoved/mostVisited
   * C) A view composed of styled text components for the title/subtitle of the vertical list
   *
   * The reason this is done is so we can embed a horizontal Flatlist plus titles as an item in the vertical flatlist
   * This allows the horizontal flatlist plus titles to scroll as an item of the vertical flatlist.
   * Demo it to see it in action.
   * I cannot think of another way to achieve this effect
   * @return {<View>} A horizontal flatList composed with title and subtitles for itself and the vertical Flatlist it
   *                  acts as a ListHeaderComponent prop for
   */
  const generateListHeaderComponent = () => {
    return (
      <View style={styles.container}>
        {generateHorizTitle(screenName, area)}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horFlatList}
          data={horizontalListItems}
          //Optimization parameter
          //Our item heights are 200 + 2 margin as seen in style.js
          getItemLayout={(data, index) => ({
            length: 202,
            offset: 202 * index,
            index,
          })}
          renderItem={({item}) => (
            <View
              style={[styles.horFlatListItems, styles.tallHorFlatListItems]}>
              <TallSlimCard
                name={item.name}
                media={item.media}
                iconSource={beakon}
                iconStyle={styles.beakonIcon}
                onPress={() => {
                  navigateToVenue(navigationProp, item, horizontalListItems);
                }}
              />
            </View>
          )}
        />
        {generateVerticTitle(screenName, area)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
        data={verticalListItems}
        ListHeaderComponent={generateListHeaderComponent()}
        //Optimization parameter
        //Our item heights are 200 + 10 margin as seen in style.js
        getItemLayout={(data, index) => ({
          length: 210,
          offset: 210 * index,
          index,
        })}
        renderItem={({item}) => (
          <View style={styles.vertFlatListItems}>
            <VerticalListCard
              venue={item}
              onPress={() => {
                navigateToVenue(navigationProp, item, verticalListItems);
              }}
            />
          </View>
        )}
      />
    </View>
  );
}

// CSS styles
const styles = StyleSheet.create({
  container: {
    // Takes up all space horizontally and verticaly
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  // Container for the information appearing before the storelist
  storelistheaderContainer: {
    width: '100%',
    paddingLeft: 5,
    paddingTop: 20,
    paddingBottom: 10,
  },
  // Style for the header in the information before the storelist
  storelistheader: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
    fontFamily: 'System',
  },
  // Style for the red horizontal line in information before storelist
  horline: {
    width: 25,
    borderBottomWidth: 2,
    borderBottomColor: '#D0021B',
    marginTop: 10,
    marginBottom: 10,
  },
  // Style for the body of the information before storelist
  storelistbody: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'System',
    color: '#9B9B9B',
  },
  horFlatList: {
    paddingLeft: 0,
  },
  horFlatListItems: {
    width: 300,
    height: 170,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2,
    position: 'relative',
    // iOS only
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}, // w moves shadow right, h moves shaddow down
    shadowOpacity: 0.4,
    shadowRadius: 4,
    // Android only
    backgroundColor: 'white',
    elevation: 5,
  },
  tallHorFlatListItems: {
    width: 160,
    height: 200,
  },
  beakonIcon: {
    width: 13,
    height: 17.5,
  },
  vertFlatListItems: {
    width: '100%',
    height: 200,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 10,
    position: 'relative',
    // iOS only
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2}, // w moves shadow right, h moves shaddow down
    shadowOpacity: 0.4,
    shadowRadius: 4,
    // Android only
    backgroundColor: 'white',
    elevation: 5,
  },
});
