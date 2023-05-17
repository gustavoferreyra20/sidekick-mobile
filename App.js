import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { DrawerCustomNavigator } from './navigators/DrawerCustomNavigator.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { SIDEKICK_API } from "@env"
import axios from 'axios';

import { LoginScreen } from "./components/login/loginView.js";
import { RegistrationScreen } from "./components/registration/registrationView.js";

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

  async componentDidMount() {
    const storedSession = await SecureStore.getItemAsync('isLoggedIn');

    if (storedSession != undefined) {
      const userSession = JSON.parse(storedSession);
      const url = `${SIDEKICK_API}tokens/bo?id_user=${userSession.id_user}&token=${userSession.token}`;
      axios.get(url)
        .then((response) => {
          if (response.data.length > 0) {
            const dbToken = response.data[0];

            if (this.isTokenValid(dbToken)) {
              this.setState({ isLoggedIn: true, isLoading: false, userSession: userSession });
            } else {
              this.setState({ isLoading: false });
            }
          } else {
            this.setState({ isLoading: false });
          }
        }).catch(function (error) {
          console.log(error);
        });

    }
  }

  setLogin = async (userSession) => {
    await SecureStore.setItemAsync('isLoggedIn', JSON.stringify(userSession));
    this.setState({ isLoggedIn: true, userSession: userSession });
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
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (this.state.isLoggedIn) {
      return (
        <NavigationContainer>
          <DrawerCustomNavigator
            onLogout={() => this.setLogout()}
            userSession={this.state.userSession} />
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
              children={(props) => <LoginScreen {...props} onLogin={(res) => this.setLogin(res)} />}
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
