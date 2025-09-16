import React from 'react';
import {View, ActivityIndicator, StatusBar} from 'react-native';
import { DrawerCustomNavigator } from './navigators/DrawerCustomNavigator.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './assets/scripts/styles.js';

import { LoginScreen } from "./components/login/LoginScreen.js";
import { RegistrationScreen } from "./components/registration/RegistrationScreen.js";
import { ForgotPasswordScreen } from './components/forgotPassword/ForgotPasswordScreen.js';
import {SafeAreaView} from "react-native-safe-area-context";

const Stack = createStackNavigator();

export const AppContainer = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent={false}/>
      {children}
    </SafeAreaView>
  );
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

export default class App extends React.Component {

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

        const url = `https://sidekick-server-nine.vercel.app/api/auth/validate`;
        await axios.post(url, { token: userSession.token })
          .catch(function (error) {
            console.log(error);
            reject("Error al validar");
          });;

        const token = await registerForPushNotificationsAsync();
        this.sendTokenAndSessionId(token, userSession.id);

        this.setState({ isLoggedIn: true, isLoading: false, sessionId: userSession.id });
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error("Error in componentDidMount:", error);
      this.setState({ isLoading: false });
    }
  };

  sendTokenAndSessionId = async (token, sessionId) => {
    try {
      const url = `https://sidekick-server-nine.vercel.app/api/auth/token`;

      // Make HTTP request to send token and session id to endpoint
      const response = await axios.post(url, {
        token: token,
        sessionId: sessionId,
      });

    } catch (error) {
      console.error('Error sending token and session id:', error);
    }
  };

  setLogin = async (userSession) => {
    await SecureStore.setItemAsync('isLoggedIn', JSON.stringify(userSession));
    this.setState({ isLoggedIn: true, sessionId: userSession.id });

    const token = await registerForPushNotificationsAsync();
    this.sendTokenAndSessionId(token, userSession.id);

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
        <AppContainer>
          <View style={styles.centerContainer}>
            <ActivityIndicator color="#28a745" size="large" />
          </View>
        </AppContainer>
      );
    }

    if (this.state.isLoggedIn) {
      return (
        <AppContainer>
          <NavigationContainer>
            <DrawerCustomNavigator
              onLogout={() => this.setLogout()}
              sessionId={this.state.sessionId}
            />
          </NavigationContainer>
        </AppContainer>
      );
    } else {
      return (
        <AppContainer>
          <NavigationContainer independent={true}>
            <Stack.Navigator
              initialRouteName="Iniciar sesión"
              screenOptions={{
                headerStyle: { backgroundColor: '#28a745' },
                headerTintColor: 'black',
              }}
            >
              <Stack.Screen
                name="Iniciar sesión"
                children={(props) => (
                  <LoginScreen {...props} onLogin={(res) => this.setLogin(res)} />
                )}
              />
              <Stack.Screen name="Registrarse" component={RegistrationScreen} />
              <Stack.Screen
                name="Recuperar contraseña"
                component={ForgotPasswordScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContainer>
      );
    }
  }
}