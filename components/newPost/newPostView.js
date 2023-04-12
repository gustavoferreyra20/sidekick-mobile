import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/styles';

export class NewPostScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>This is the new post screen</Text>
            </View>
        );
    }

}