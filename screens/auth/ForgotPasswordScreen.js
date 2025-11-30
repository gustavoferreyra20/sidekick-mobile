import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../../assets/scripts/styles';
import ForgotPasswordCtrl from '../../controllers/auth/ForgotPasswordCtrl';
import Popup from '../../components/popups/Popup';

export class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.controller = new ForgotPasswordCtrl();
    }

    handlerResetPassword = () => {
        this.controller.resetPassword(this.handleLoginPress).then(() => {
            this.forceUpdate()
        })
    };

    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    }

    handleLoginPress = () => {
        this.props.navigation.navigate('Iniciar sesión');
    }

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
                        required
                    />

                    <TouchableOpacity
                        style={styles.modernButton}
                        onPress={() => this.handlerResetPassword()}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Restablecer contraseña</Text>
                    </TouchableOpacity>

                    <Popup
                        modalVisible={this.controller.modalVisible}
                        setModalVisible={this.setModalVisible}
                        modalType={this.controller.modalType}
                        msg={this.controller.msg}
                        actionConfirm={this.controller.modalFunction}
                    />
                </View>
            </View>
        );
    }
}