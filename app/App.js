import React from 'react';
import {MainStackNavigator} from './config/router.js';
import {createAppContainer} from 'react-navigation';

// Create new Navigator
const AppContainer = createAppContainer(MainStackNavigator);

export default function App() {
  return (
    // Root of the app's navigation logic
    <AppContainer />
  );
}
