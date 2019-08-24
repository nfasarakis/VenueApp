/* @flow */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // Takes up all space horizontally and verticaly
    flex: 1,
    //width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  venuePreviewContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  displayButton: {
    width: 160,
    borderColor: '#6BA7EC',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
  buttonActive: {
    backgroundColor: '#6BA7EC',
  },
  displayButtonText: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'System',
    color: '#6BA7EC',
  },
  textActive: {
    color: 'white',
    fontWeight: '700',
  },
  flatListContainer: {
    borderTopColor: '#979797',
    borderTopWidth: 0.5,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default styles;
