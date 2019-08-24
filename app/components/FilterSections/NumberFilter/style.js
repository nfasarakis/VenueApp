import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Container for Number Filter
  container: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    // Seperator for the filter
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155,155,155,0.5)',
    marginBottom: 20,
  },
  // Title for Number Filter
  title: {
    fontSize: 13,
    fontFamily: 'System',
    color: '#4A4A4A',
    fontWeight: '600',
    marginBottom: 10,
  },
  // Container for all elements used for description
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  // Description for Number Filter
  description: {
    fontSize: 11,
    fontFamily: 'System',
    color: '#9B9B9B',
    fontWeight: '400',
  },
  // Container for text element with men/women ratio
  ratioContainer: {
    height: 15,
    width: 30,
    alignItems: 'center',
  },
  // Text element holding ratio
  ratio: {
    fontSize: 11,
    fontFamily: 'System',
    color: '#FBA3E5',
    fontWeight: '400',
  },
  // Container for slider and two gender images
  sliderImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // custom container for slider
  sliderContainerStyle: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  // Icons for genders across slider
  genderIcon: {
    height: 13,
    width: 13,
  },
});

export default styles;
