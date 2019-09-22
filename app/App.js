import React from 'react';
import {Provider} from 'react-redux';
import {MainStackNavigator} from './config/router.js';
import {createAppContainer} from 'react-navigation';
import store from './store';

// Create new Navigator
const AppContainer = createAppContainer(MainStackNavigator);

export default function App() {
  return (
    // Root of the app's navigation logic
    // Includes a provider via react-redux to make store available via Context
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
