import React, { Component } from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TextButton} from '../../elements';
import PropTypes from 'prop-types';
import styles from './style';

export default class MusicFilter extends Component {

  static propTypes = {
    // Array of strings containing the labels/music choises to use on the text buttons in the MusicFilter
    labels: PropTypes.array,
    // Callbacks that updates the music property of the state of the parent component
    // Used to update the state with the value selected by the TextButtons
    updateMusic: PropTypes.func.isRequired,
  }

  static defaultProps = {
    // Default value of labels property
    // Used mainly during development
    labels: ['HipHop', 'RnB', 'Classic Rock', 'Metal',
      'DubStep', 'Drum & Bass', 'Pop', 'Greek', 'Normie Music'],
  }

  // State of the music filter
  state = {
    // Array with indexes corrsp to the buttons with the music labels.
    // 0=innactive, 1=active
    // Used to refresh UI when child TextButtons are clicked
    activeButtons: new Array(this.props.labels.length).fill(0),
  }

  /**
   * Updates state of parent component with music selection
   * Also Updates activeButtons array property of the state by toggling the value at position 'index' between 1 and 0]
   * @param  {[Number]} index [index of activeButtons array whose containing value should be toogled]
   */
  toggleActiveButtons = (index) => {
    if (this.state.activeButtons[index]===0) {
      // music is about to be selected, so update state
      // of parent component
      this.props.updateMusic(this.props.labels[index] || MusicFilter.defaultProps[index]);
    }
    this.setState((prevState) => {
      const arr = prevState.activeButtons;
      arr[index] = !arr[index];
      return {activeButtons: arr};
    });
  }

  /**
   * [Generates a TextButton for each string in the labels array of the state of MusicFilter
   * Consecutive pairs of TextButtons are wrapped in Views
   * This is so we can arrange them in a two-row horizontal grid ussing CSS properties]
   * @param  {[Array]} labels [Array of strings containing the text contents of each TextButton]
   * @return {[Array]}        [Array of Views, each View containing two TextButtons]
   */
  generateTextBoxes(labels) {
    // Map labels array
    return labels.map((label, index)=>{
      // If index is odd
      if (index%2==1) {
        // Return a View containing 2 TextButtons with label[index-1] and label[index] text values
        return (
          <View key={index}>
            <TextButton
              containerStyle={[styles.buttonContainer,this.state.activeButtons[index-1]&&styles.buttonContainerActive]}
              textStyle={[styles.buttonText,this.state.activeButtons[index-1]&&styles.activeButtonText]}
              title={labels[index-1]}
              onButtonPress={()=>{this.toggleActiveButtons(index-1);}}
            />
            <TextButton
              containerStyle={[styles.buttonContainer,this.state.activeButtons[index]&&styles.buttonContainerActive]}
              textStyle={[styles.buttonText,this.state.activeButtons[index]&&styles.activeButtonText]}
              title={labels[index]}
              onButtonPress={()=>{this.toggleActiveButtons(index);}}
            />
          </View>
        );
      }
      // If length.labels is odd and index = labels.length-1, return last element
      // This is a case not caught in the above if
      if (index==labels.length-1 && labels.length%2==1) {
        return (
          <View key={index}>
            <TextButton
              containerStyle={[styles.buttonContainer,this.state.activeButtons[index]&&styles.buttonContainerActive]}
              textStyle={[styles.buttonText,this.state.activeButtons[index]&&styles.activeButtonText]}
              title={labels[index]}
              onButtonPress={()=>{this.toggleActiveButtons(index);}}
            />
          </View>
        );
      }
    });
  }

  /**
   * [Renders a View Component containing
   * A) A Text component for the title for the MusicFilter component
   * B) A Text component for the description for the MusicFilter component
   * C) A collection of TextButtons arranges in a two-row horizontal ScrollView]
   * @return {[View]} [View component that represents the MusicFilter component]
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Music Selection
        </Text>
        <Text style={styles.description}>
          Show venues that play
        </Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.horScrollView}
        >
          {this.generateTextBoxes(this.props.labels || MusicFilter.defaultProps.labels)}
        </ScrollView>
      </View>
    );
  }
}
