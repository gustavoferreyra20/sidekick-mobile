import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {DrawerCustomNavigator} from './Navigators/DrawerCustomNavigator.js';
import { NavigationContainer } from '@react-navigation/native';

export default class App extends Component{
  render(){
    return(
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
