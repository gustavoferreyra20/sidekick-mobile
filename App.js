import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { DrawerCustomNavigator } from './navigators/DrawerCustomNavigator.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { SIDEKICK_API } from "@env"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './assets/scripts/styles.js';

import { LoginScreen } from "./components/login/loginView.js";
import { RegistrationScreen } from "./components/registration/registrationView.js";
import { ForgotPasswordScreen } from './components/forgotPassword/ForgotPasswordScreen.js';

const Stack = createStackNavigator();

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: true,
      userSession: null
    }
  }

  componentDidMount = async () => {
    try {
      const storedSession = await SecureStore.getItemAsync('isLoggedIn');

      if (storedSession) {
        const userSession = JSON.parse(storedSession);
        await AsyncStorage.setItem('my-key', storedSession);

        const url = `${SIDEKICK_API}auth/validate`;
        await axios.post(url, { token: userSession.token })
          .catch(function (error) {
            console.log(error);
            reject("Error al validar");
          });;

        this.setState({ isLoggedIn: true, isLoading: false, sessionId: userSession.id });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error("Error in componentDidMount:", error);
      this.setState({ isLoading: false });
    }
  };

  setLogin = async (userSession) => {
    await SecureStore.setItemAsync('isLoggedIn', JSON.stringify(userSession));
    this.setState({ isLoggedIn: true, sessionId: userSession.id });
  };

  setLogout = async () => {
    await SecureStore.deleteItemAsync('isLoggedIn');
    this.setState({ isLoggedIn: false });
  };

  isTokenValid = (dbToken) => {
    const currentDate = new Date();
    const expirationDate = new Date(dbToken.expiration_date);
    return currentDate < expirationDate;
  }

  render() {

    if (this.state.isLoading) {
      // Display a loading indicator while checking the login status
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator color="#28a745" size="large" />
        </View>
      );
    }

    if (this.state.isLoggedIn) {
      return (
        <NavigationContainer>
          <DrawerCustomNavigator
            onLogout={() => this.setLogout()}
            sessionId={this.state.sessionId} />
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName="Iniciar sesión"
            screenOptions={{
              headerStyle: { backgroundColor: '#28a745' },
              headerTintColor: 'black',
            }}>
            <Stack.Screen
              name="Iniciar sesión"
              children={(props) => <LoginScreen {...props} onLogin={(res) => this.setLogin(res)} />}
            />
            <Stack.Screen name="Registrarse" component={RegistrationScreen} />
            <Stack.Screen name="Recuperar contraseña" component={ForgotPasswordScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  }
}