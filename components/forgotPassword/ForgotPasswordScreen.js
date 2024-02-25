import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from '../../assets/scripts/styles';
import ForgotPasswordController from './ForgotPasswordController';
import PopupService from '../popups/PopupService';


export class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.controller = new ForgotPasswordController();
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
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.controller.email = text}
                        placeholder="Ingrese su email"
                        placeholderTextColor="#495057"
                        required
                    />
                    <View style={styles.button}>
                        <Button
                            title="Reiniciar contraseña"
                            onPress={() => this.handlerResetPassword()}
                            color="#28a745"
                        />
                    </View>
                    <Text style={styles.text}>Su contraseña debe contener <Text style={{ color: "red" }}>8</Text> caracteres como mímimo.</Text>

                    <PopupService
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