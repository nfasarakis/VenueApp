import {StyleSheet, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  safeAreaContainer: {
    // Takes up all space horizontally and verticaly
    // Take up full width available
    width: '100%',
    // Make flex-children arrange in a row
    flexDirection: 'row',
    // Space flex-children on the main axis
    justifyContent: 'space-between',
    // Center flex-children on the cross axis
    alignItems: 'center',
    // Pad 15 around container but 30 on the top
    padding: 10,
    // Different padding on iOS/Android due to different status bars
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
  },
  backIcon: {
    marginLeft: 9,
    width: 15,
    height: 16,
  },
  emptyView: {
    width: 25,
    height: 25,
  },
  mapContainer: {
    // Take map out of flow and make it cover screen
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 80,
    // Map is placed on the background
    zIndex: -1,
  },
  tabContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(248,248,248,0.98)',
    borderTopColor: '#979797',
    borderTopWidth: 1,
  },
  tabIconContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 8,
    paddingBottom: 8,
  },
  discoverTabIcon: {
    width: 23,
    height: 20,
  },
  favoritesTabIcon: {
    width: 21,
    height: 20,
  },
  visitedTabIcon: {
    width: 24,
    height: 20,
  },
  offersTabIcon: {
    width: 25,
    height: 20,
  },
  tabText: {
    fontSize: 10,
    fontFamily: 'System',
    color: '#9B9B9B',
  },
  activeColor: {
    color: '#D0021B',
  },
});

export default styles;
