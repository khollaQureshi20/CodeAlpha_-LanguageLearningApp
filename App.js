// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigation from './Screens/MainNavigation';  // Import the new file

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigation /> 
    </NavigationContainer>
  );
};

export default App;
