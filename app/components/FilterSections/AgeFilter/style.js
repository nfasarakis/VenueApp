import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Container for Age Filter
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
  // Title for Age Filter
  title: {
    fontSize: 13,
    color: '#4A4A4A',
    fontWeight: '600',
    fontFamily: 'System',
    marginBottom: 10,
  },
  // Container for all elements used for description
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  // Text Description for Age Filter
  description: {
    fontSize: 11,
    color: '#9B9B9B',
    fontWeight: '400',
    fontFamily: 'System',
  },
  // Container for text elements with men/women age ranges
  rangeContainer: {
    height: 15,
    width: 38,
    alignItems: 'center',
  },
  // Text element holding mens age range
  menRange: {
    fontSize: 10,
    color: '#6BA7EC',
    fontWeight: '400',
    fontFamily: 'System',
  },
  // Text element holding mens age range
  womenRange: {
    fontSize: 10,
    color: '#FBA3E5',
    fontWeight: '400',
    fontFamily: 'System',
  },
  // Add margins to the side of the sliders s.t in matches slider
  // width in Number component (22 pixels)
  // Will also be trying different values to find what looks best
  multiContainer: {
    paddingLeft: 10, // slider left margin in number component
    paddingRight: 10, // slider left margin in number component
  },
  // Adds additional margin to second slider in Age Filter
  sliderMargin: {
    marginTop: 20,
  }
});

export default styles;
