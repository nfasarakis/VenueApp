import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import styles from './style';
// Images used for rating in HorizontalListCard
import one_star from '../images/rating-icon-white.png';
import two_star from '../images/rating-icon-white.png';
import three_star from '../images/rating-icon-white.png';
import four_star from '../images/rating-icon-white.png';
import five_star from '../images/rating-icon-white.png';
// Images used for genders in HorizontalListCard
import manIcon from '../images/man-icon-card.png';
import womanIcon from '../images/woman-icon-card.png';

/**
 * HorizontalListCard: Card Component representaing a venue. Contains a hero image
 *                     along with relevant information (rating, distance, location etc).
 *                     Used in MainTabScreens/shared to generate the image list of venues
 *
 * The HorizontalListCard Component receives the following props
 *  @param {object} venue JSON formatted venue containing all venue info
 *  @param {function} onPress  Callback for press events on HorizontalListCard
 *
 * @return {TouchableOpacity} A carl-styled clickable view containing the venue
 *                            hero image & associated info
 */
export default function HorizontalListCard(props) {
  /**
   * Loads network image corresponding to venue passed as prop in HorizontalListCard.
   * Uses the media property of the passed in props.venue.
   *
   * @return {<Image>} Styled Image component respresenting the main venue image
   */
  const getStyledHeroImage = () => (
    <Image style={styles.mainImage} source={{uri: props.venue.media[0]}} />
  );

  /**
   * LOCAL_DEV ONLY
   * Loads local image corresponding to venue passed as prop in HorizontalListCard
   * Requires the images statistically
   *
   * @return {<Image>} Styled Image component respresenting the main venue image
   */
  const getStyledHeroImage_local = () => {
    // Store venue-name/local url key/value pairs. LOCAL_DEV ONLY
    const HeroImageLocal = {
      'Johnny Deppy Bar': require('../../../jsondata_DEV/images/ChIJhyeNH0SYoRQRkMU4ZDVfQ78_0.jpeg'),
      'Darwin koffie-bar': require('../../../jsondata_DEV/images/ChIJIxQjCPmYoRQRNKkNlR9hS_0_0.jpeg'),
      'Cibo Cafe-Bar-Restaurant': require('../../../jsondata_DEV/images/ChIJg0ZZPDyZoRQRiyO8hxi5cvM_0.jpeg'),
      'Maimou Bar': require('../../../jsondata_DEV/images/ChIJtzAWKPiYoRQRYYaK5sQMTS8_0.jpeg'),
      'Life Bar': require('../../../jsondata_DEV/images/ChIJwVK2ePeYoRQRY24pjGswLto_0.jpeg'),
      home: require('../../../jsondata_DEV/images/randomNormieKeyReeee_0.jpeg'),
    };
    // Return image corresponding to venue passed as prop in HorizontalListCard
    return (
      <Image
        style={styles.mainImage}
        source={HeroImageLocal[props.venue.name]}
      />
    );
  };

  /**
   * Loads local image corresponding to rating of venue passed as prop in HorizontalListCard
   * Uses the rating property of the passed in props.venue.
   *
   * @return {[Image]} [Image component respresenting star rating]
   */
  const displayRatingStars = () => {
    let starImages = [one_star, two_star, three_star, four_star, five_star];
    let venueRating = Math.ceil(props.venue.rating);
    return <Image style={styles.rating} source={starImages[venueRating - 1]} />;
  };

  /**
   * [Renders a preview of each venue containing information in props
   *  - An Image component that acts as the hero image for the venue
   *  - An absolutely positioned Text component containing a label for offers <-- Not added yet
   *  - A Text component containing the distance of the venue for the user's current location
   *  - A text component containing a match via ranking algorithm <-- Not implemented yet
   *  - An Image component respresenting the rating in stars
   *  - A absolutely positioned set of Image components and Text components for the gender ratio]
   *
   * @return {[TouchableOpacity]} [TouchableOpacity respresenting the RecommendedPreview component]
   */
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.7}
      style={styles.container}>
      {/*The main image of the detail Screen*/}
      {getStyledHeroImage_local()}

      {/*venue info container*/}
      {/*uses linear gradient component*/}
      <LinearGradient
        colors={['transparent', 'black']}
        style={styles.venueInfoContainer}>
        {/*venue name*/}
        <Text style={styles.venueName}> {props.venue.name} </Text>

        {/*distance, rating, match, genders*/}
        <View style={styles.venueInfoRow}>
          {/*DEV_NOTE: distance hardcoded temporarily*/}
          <Text style={styles.infoText}>1.5 Km</Text>

          {/*DEV_NOTE: match % hardcoded temporarily*/}
          <Text style={styles.infoText}>98% match</Text>

          {/*venue rating*/}
          {displayRatingStars()}

          <View style={styles.inlineGenderIconContainer}>
            {/*number of men at venue*/}
            <Image style={styles.cardGenderIcon} source={manIcon} />
            <Text style={[styles.genderNumber, styles.genderNumberMan]}>
              {props.venue.people.MenAvg}
            </Text>

            {/*number of women at venue*/}
            <Image style={styles.cardGenderIcon} source={womanIcon} />
            <Text style={styles.genderNumber}>
              {props.venue.people.WomenAvg}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// PropTypes
HorizontalListCard.propTypes = {
  venue: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};
