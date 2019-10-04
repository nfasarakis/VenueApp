import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    // Make this container flex to fill available space
    flex: 1,
    height: 25,
    // But limit max width
    maxWidth: 400,
    // Add margins
    marginLeft: 15,
    marginRight: 15,
  },
  search: {
    // Make this flex-container take up all available space
    flex: 1,
    // Make flex-children in search bar arrange in a row
    flexDirection: 'row',
    // And align them on the cross-axis
    alignItems: 'center',
    // Add a left padding of 10 (distance between glyph and border)
    paddingLeft: 10,
    // Border styles
    borderWidth: 1,
    borderRadius: 10,
    // Colors: border/background
    borderColor: '#9B9B9B',
    backgroundColor: 'white',
  },
  searchicon: {
    width: 15,
    height: 15,
    // Space between image and search text
    marginRight: 10,
  },
  input: {
    // Styling for input
    flex: 1, // Needed for placeholder to be visible in Android
    color: '#9B9B9B',
    fontSize: 13,
    // I dont know why this works for not showing the default bottom border in adroid
    // But it seems like it does
    // I think android renders the invisible border but it is out of bounds and
    // transparent so it doesnt show
    // However, if I set height=30 for example,
    // android tries to fit the both text and invisible border in 30 pixels, so it
    // pushes the text up. Just a guess
    // So my guess is that for a fontSize of 13, a height of 40 is sufficient for
    // everything to look ok.
    // This is futher confirmed by uncommenting the css border rule bellow
    //
    //borderWidth: 2,
    //
    height: 40,
  },
});

export default styles;
