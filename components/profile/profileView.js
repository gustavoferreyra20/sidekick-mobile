import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles';

export class ProfileScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>This is the profile screen</Text>
            </View>
        );
    }

}