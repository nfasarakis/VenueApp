import {StyleSheet} from 'react-native';
import config from '../../config';

const styles = StyleSheet.create({
  container: {
    // Takes up all space horizontally and verticaly
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  venuePreviewContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
  },
  displayButton: {
    width: 150,
    borderColor: '#9B9B9B',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  buttonActive: {
    borderColor: '#D0021B',
  },
  displayButtonText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'System',
    color: '#9B9B9B',
  },
  textActive: {
    color: '#D0021B',
    fontWeight: '700',
  },
  flatListContainer: {
    borderTopWidth: 0.5,
    borderTopColor: '#979797',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
  mapFlatListItems: {
    width: config.dimensions.CARD_WIDTH_MAP,
    height: config.dimensions.CARD_HEIGHT_MAP,
    marginRight: 5,
    marginLeft: 5,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    // Android only
    backgroundColor: 'white',
    elevation: 5,
  },
});

export default styles;
