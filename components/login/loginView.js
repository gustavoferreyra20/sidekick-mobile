import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import LoginController from './loginCtrl';
import styles from '../../assets/styles';

export class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.controller = new LoginController(props.onLogin);
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