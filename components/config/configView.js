import React, { Component } from 'react';
import { Button, View } from 'react-native';
import styles from '../../assets/scripts/styles';

export class ConfigScreen extends Component {

    handlerLogout() {
        this.props.onLogout();
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this.handlerLogout()}
                    title="Cerrar Sesión"
                    color="#0eaa61"
                />
            </View>
        );
    }

}