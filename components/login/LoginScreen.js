import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginCtrl from './LoginCtrl';
import styles from '../../assets/scripts/styles';
import PopupService from '../popups/PopupService';

export class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.controller = new LoginCtrl(props.onLogin);
        this.state = {
            passwordVisible: false
        };
    }

    btnLogin = () => {
        this.controller.handleLogin().then(() => {
            this.forceUpdate();
        });
    };

    handleRegistrationPress = () => {
        this.props.navigation.navigate('Registrarse');
    };

    handleForgotPassword = () => {
        this.props.navigation.navigate('Recuperar contraseña');
    };

    setModalVisible = (visible) => {
        if (typeof this.controller.function === 'function') {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.text}>Email</Text>
                        <Text style={styles.required}>*</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.controller.email = text}
                        placeholder="Ingrese su email"
                        placeholderTextColor="#495057"
                        autoCapitalize="none"
                        required
                    />

                    <View style={styles.labelContainer}>
                        <Text style={styles.text}>Password</Text>
                        <Text style={styles.required}>*</Text>
                    </View>
                    <View style={{ position: 'relative', width: '100%' }}>
                        <TextInput
                            style={[styles.textInput, { paddingRight: 40 }]} // deja espacio para el icono
                            secureTextEntry={!this.state.passwordVisible}
                            onChangeText={text => this.controller.password = text}
                            placeholder="**********"
                            placeholderTextColor="#495057"
                            required
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible })}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 0,
                                bottom: 15,
                                justifyContent: 'center'
                            }}
                        >
                            <Ionicons
                                name={this.state.passwordVisible ? 'eye-off' : 'eye'}
                                size={24}
                                color="#495057"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.modernButton} onPress={this.btnLogin} activeOpacity={0.8}>
                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleForgotPassword} activeOpacity={0.6}>
                        <Text style={styles.linkText}>Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                    <Text style={styles.h1}>Todavía no te registraste?</Text>

                    <TouchableOpacity
                        style={styles.modernButton}
                        onPress={this.handleRegistrationPress}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>

                </View>

                <PopupService
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
                    modalType={this.controller.modalType}
                    msg={this.controller.msg}
                />
            </View>
        );
    }

}