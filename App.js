import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DrawerCustomNavigator } from './navigators/DrawerCustomNavigator.js';
import { NavigationContainer } from '@react-navigation/native';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <DrawerCustomNavigator />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#535053',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
