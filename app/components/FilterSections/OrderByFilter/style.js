import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Container for OrderBy Filter
  container: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    // No need for bottom padding since it is given by the checkboxes
    // paddingBottom: 20,
    // Seperator for the filter
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155,155,155,0.5)',
    marginBottom: 20,
  },
  // Title for OrderBy Filter
  title: {
    fontSize: 13,
    color: '#4A4A4A',
    fontWeight: '600',
    fontFamily: 'System',
    marginBottom: 10,
  },
  // Text Description for Age Filter
  description: {
    fontSize: 11,
    color: '#9B9B9B',
    fontWeight: '400',
    fontFamily: 'System',
    paddingBottom: 20,
  },
  MultiCheckboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkBoxContainer: {
    paddingBottom: 20,
    width: '50%',
    maxWidth: 180,
  },
  checkBoxText: {
    fontSize: 11,
    color: '#9B9B9B',
    fontWeight: '400',
    fontFamily: 'System',
  }
});

export default styles;
