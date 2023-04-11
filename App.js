import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DrawerCustomNavigator } from './navigators/DrawerCustomNavigator.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from "./components/login/loginView.js";
import { RegistrationScreen } from "./components/registration/registrationView.js";

const Stack = createStackNavigator();

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false }
  }

  setLogin() {
    this.setState({ isLoggedIn: true });
  }

  setLogout() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
        <NavigationContainer>
          <DrawerCustomNavigator onLogout={() => this.setLogout()} />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName="Iniciar sesión"
            screenOptions={{
              headerStyle: { backgroundColor: '#1ded8c' },
              headerTintColor: 'black',
            }}>
            <Stack.Screen
              name="Iniciar sesión"
              children={(props) => <LoginScreen {...props} onLogin={() => this.setLogin()} />}
            />
            <Stack.Screen name="Registrarse" component={RegistrationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
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
