import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import LoginController from './loginCtrl';

export class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.controller = new LoginController();
    }

    handleRegistrationPress = () => {
        this.props.navigation.navigate('Registrarse');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.controller.handleEmailChange}
                        placeholder="Ingrese su email"
                        required
                    />

                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={this.controller.handlePasswordChange}
                        placeholder="**********"
                        required
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Iniciar sesión" onPress={this.controller.handleLogin} color="#0eaa61" />
                    </View>

                    <Text style={styles.h1}>Todavia no te registraste?</Text>

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Registrarse"
                            onPress={() => this.handleRegistrationPress()}
                            color="#0eaa61"
                        />
                    </View>

                </View>
            </View>
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
    formContainer: {
        width: '80%',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    textInput: {
        backgroundColor: '#fff',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    buttonContainer: {
        marginTop: 16,
    },
    h1: {
        marginTop: 24,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    header: {
        backgroundColor: '#1ded8c',
        height: 60,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});