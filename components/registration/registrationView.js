import React, { Component } from 'react';
import { Text, View, TextInput, Button, Switch, TouchableOpacity } from 'react-native';
import RegistrationController from './registrationCtrl';
import styles from '../../assets/styles';

export class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleValue: false,
        };
        this.controller = new RegistrationController();
    }

    toggleSwitch = () => {
        const value = !this.state.toggleValue;
        this.controller.toggleSwitch(value)
        this.setState({ toggleValue: value });
    };

    handleLoginPress = () => {
        this.props.navigation.navigate('Iniciar sesión');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.text}>Nombre</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.controller.handleNameChange(text)}
                        placeholder="Ingrese su nombre"
                        required
                    />

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.controller.handleEmailChange(text)}
                        placeholder="Ingrese su email"
                        required
                    />

                    <Text style={styles.text}>Contanos un poco sobre vos</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={3}
                        maxLength={280}
                        onChangeText={text => this.controller.handleDescriptionChange(text)}
                    />

                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={text => this.controller.handlePasswordChange(text)}
                        placeholder="**********"
                        required
                    />

                    <TouchableOpacity style={styles.switchContainer} onPress={this.toggleSwitch}>
                        <Text style={styles.switchText}>Aceptar términos y condiciones</Text>
                        <Switch value={this.state.toggleValue} onValueChange={this.toggleSwitch} />
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <Button title="Registrarse" onPress={this.controller.handleRegistration} color="#0eaa61" />
                    </View>

                    <Text style={styles.h1}>Ya tienes una cuenta?</Text>

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Iniciar sesión"
                            onPress={this.handleLoginPress}
                            color="#0eaa61" />
                    </View>

                </View>
            </View>
        );
    }

}