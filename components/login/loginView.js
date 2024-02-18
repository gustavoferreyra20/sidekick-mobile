import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import LoginController from './loginCtrl';
import styles from '../../assets/scripts/styles';
import MyModal from '../popups/popupService';

export class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.controller = new LoginController(props.onLogin);
    }

    btnLogin = () => {
        this.controller.handleLogin().then(() => {
            this.forceUpdate()
        })
    }

    handleRegistrationPress = () => {
        this.props.navigation.navigate('Registrarse');
    }

    handleForgotPassword = () => {
        this.props.navigation.navigate('Recuperar contraseña');
    }

    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.controller.email = text}
                        placeholder="Ingrese su email"
                        placeholderTextColor="#495057"
                        required
                    />

                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={text => this.controller.password = text}
                        placeholder="**********"
                        placeholderTextColor="#495057"
                        required
                    />

                    <View style={styles.button}>
                        <Button title="Iniciar sesión" onPress={this.btnLogin} color="#28a745" />
                    </View>

                    <View style={styles.button}>
                        <Button
                            title="Olvidaste tu contraseña?"
                            onPress={() => this.handleForgotPassword()}
                            color="#28a745"
                        />
                    </View>

                    <Text style={styles.h1}>Todavia no te registraste?</Text>

                    <View style={styles.button}>
                        <Button
                            title="Registrarse"
                            onPress={() => this.handleRegistrationPress()}
                            color="#28a745"
                        />
                    </View>

                </View>

                <MyModal
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
                    modalType={this.controller.modalType}
                    msg={this.controller.msg}
                />
            </View>
        );
    }

}