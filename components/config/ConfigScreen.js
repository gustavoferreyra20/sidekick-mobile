import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import styles from '../../assets/scripts/styles';
import ConfigCtrl from './ConfigCtrl';
import PopupService from '../popups/PopupService';
import {Ionicons} from "@expo/vector-icons";

const PasswordInput = ({ label, value, onChangeText, visible, setVisible, placeholder="**********" }) => (
    <View style={{ marginBottom: 16, width: '100%' }}>
        <Text style={styles.text}>{label}</Text>
        <View style={{ position: 'relative', width: '100%' }}>
            <TextInput
                style={[styles.textInput, { paddingRight: 40 }]}
                secureTextEntry={!visible}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#495057"
            />
            <TouchableOpacity
                onPress={() => setVisible(!visible)}
                style={{
                    position: 'absolute',
                    right: 10,
                    top: 0,
                    bottom: 12,
                    justifyContent: 'center'
                }}
            >
                <Ionicons
                    name={visible ? 'eye-off' : 'eye'}
                    size={24}
                    color="#495057"
                />
            </TouchableOpacity>
        </View>
    </View>
);


export class ConfigScreen extends Component {
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        if (this.focusListener && typeof this.focusListener === 'function') {
            this.focusListener();
        }
    }
    constructor(props) {
        super(props);
        this.sessionId = this.props.route.params.sessionId;
        this.controller = new ConfigCtrl();
        this.state = {
            password: '',
            newPassword: '',
            passwordVisible: false,
        };
    }

    handlerLogout() {
        this.props.onLogout();
    }

    handlerResetPassword() {
        this.controller.updatePAssword(this.sessionId, this.state.password, this.state.newPassword, this.props.onLogout)
            .then(() => {
                this.forceUpdate();
            })
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
                    <PasswordInput
                        label="Ingrese su contraseña original"
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                        visible={this.state.passwordVisible}
                        setVisible={(val) => this.setState({ passwordVisible: val })}
                    />

                    <PasswordInput
                        label="Nueva contraseña"
                        value={this.state.newPassword}
                        onChangeText={text => this.setState({ newPassword: text })}
                        visible={this.state.passwordVisible}
                        setVisible={(val) => this.setState({ passwordVisible: val })}
                    />

                    <TouchableOpacity
                        style={styles.modernButton}
                        onPress={() => this.handlerResetPassword()}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Cambiar contraseña</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.modernButton}
                        onPress={() => this.handlerLogout()}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Cerrar sesión</Text>
                    </TouchableOpacity>

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