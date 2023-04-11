import React, { Component } from 'react';
import { StyleSheet, Button, View } from 'react-native';

export class ConfigScreen extends Component {

    handlerLogout() {
        this.props.onLogout();
    }

    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.buttonStyle}
                    onPress={() => this.handlerLogout()}
                    title="Cerrar Sesión"
                    color="#0eaa61"
                />
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
});