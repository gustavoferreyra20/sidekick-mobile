import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class ProfileScreen extends Component {

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>This is the profile screen</Text>
                <StatusBar style="auto" />
            </View>
        );
    }
    
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#535053',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
        color: '#fff'
    }
  });