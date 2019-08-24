import React, { Component } from 'react';
import {View, Text, Animated} from 'react-native';
import {CheckBox} from '../../elements';
import PropTypes from 'prop-types';
import styles from './style';


export default class OrderByFilter extends Component {

  static propTypes = {
    // Array of string labels used on each CheckBox component contained in the OrderByFilter
    labels: PropTypes.array.isRequired,
    // String specifying the order in which the filtered items are returned
    // Used to set corresponding string in description
    order: PropTypes.string.isRequired,
    // Callback that sets the order accoring to what is selected in the multicheckbox component
    // Used to trigger state change in parent FilterScreen Component
    setOrder: PropTypes.func.isRequired,
  }

  // State of the OrderBy component
  state = {
    // Array of labels.length length with indexes corresponding to the rendered CheckBoxes in MutlicheckBox
    //    1 denotes a checked checkbox and
    //    0 denotes an uncheched checkbox
    // Used to refresh UI when child checkboxes are clicked
    // First checkbox is checked by default
    checked: [1, ...(new Array(this.props.labels.length-1).fill(0))],
  }

  /**
   * [Causes a re-render in which the checkbox at position @param index is active, while all the rest are inactive.
   * This is achieved by updating the checked array of the OrderByFilter state.
   * @param  {[number]} index [position in checked array in which value 1 should be pushed]
   */
  updateChecked = (index) => {
    const arr = new Array(this.state.checked.length).fill(0);
    arr[index] = 1;
    this.setState({checked: arr});
  }

  /**
   * Generates a string corresponding to each possible value of the state
   * Used as the description of the OrderByFilter component
   * @return {[String]} The description of the OrderByFilter component
   */
  getDescription = () => {
    if (this.props.order==='Best Rating') {return 'with the best rating first';}
    if (this.props.order==='Number of People') {return 'with the most people first';}
    if (this.props.order==='Age of Men') {return 'with men\'s ages that best fit your selection first';}
    if (this.props.order==='Age of Women') {return 'with women\'s ages that best fit your selection first';}
    if (this.props.order==='Best Match') {return 'that best match your preferences first';}
    if (this.props.order==='Closest First') {return 'that are closer to your current location first';}
  }

  /**
    * Fades out/ Animates the description by animating it's Yscale
    * from 1 to 0 over a period of 100ms
    *
    * Sets the state with the new description to show and checks the corresponding checkbox
    * after animation completes
   * @param  {[String]} label Value passed to a callback that updates parent component's state
   * @param  {[Number]} index Index of the checkbox to check by updating
   *                          the checked array of the state of this component
   */
  fadeoutDescription = (label, index) => {
    // Fadeout description
    Animated.timing(
      this.textScale,
      {
        toValue: 0,
        duration: 100,
      }
    ).start(()=>{
      // Execute callback to update state of parent
      this.props.setOrder(label);
      // Update checked array of state
      this.updateChecked(index);
    });
  }

  /**
   * Fades in/Animates the description by animating it's Yscale
   * from 0 to 1 over a period of 100 ms
   */
  fadeinNewDescription = () => {
    // Fadein description
    Animated.timing(
      this.textScale,
      {
        toValue: 1,
        duration: 100,
      }
    ).start();
  }

  /**
   * [Generates a keyed array of @param labels.length CheckBox components]
   * @param  {[Array]} labels [Array of string labels. Each label appears next to a CheckBox]
   * @return {[Array]}        [Array of CheckBox components]
   */
  generateCheckBoxes(labels) {
    // Map labels array. For each label, return a checkbox
    return labels.map((label, index)=>{
      return (<CheckBox
        key={index}
        containerStyle={styles.checkBoxContainer}
        textStyle = {styles.checkBoxText}
        isChecked={this.state.checked[index]}
        onIconPress={()=>{this.fadeoutDescription(label, index);}}
        title={label}
      />);
    });
  }

  /**
   * Lifecycle method: executes after each update
   */
  componentDidUpdate() {
    /*When component updates, fade in the new description*/
    this.fadeinNewDescription();
  }

  // Initialize the scale of the description to be animated
  textScale = new Animated.Value(1);

  /**
   * [Renders a View Component containing
   * A) A Text compoment used as the title for the OrderByFilter
   * B) A Text component used as the description of the OrderByFilter
   * B) A set of checkboxed with options for ordering the filtering results
   * @return {[View]} [View component respresenting the OrderByFilter component]
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Order By
        </Text>
        <Animated.Text style={[styles.description, {transform: [{ scaleY: this.textScale }]}]}>
          Your results will be ordered by showing venues {this.getDescription()}
        </Animated.Text>
        {/*generate checkboxes*/}
        <View style={styles.MultiCheckboxContainer}>
          {this.generateCheckBoxes(this.props.labels)}
        </View>
      </View>
    );
  }
}
