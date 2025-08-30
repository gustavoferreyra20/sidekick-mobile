import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, Button } from 'react-native';
import styles from '../../assets/scripts/styles';
import ConfigCtrl from './ConfigCtrl';
import PopupService from '../popups/PopupService';


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
                    <Text style={styles.text}>Ingrese su contraseña original</Text>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                        placeholder="**********"
                        placeholderTextColor="#495057"
                    />
                    <Text style={styles.text}>Nueva contraseña</Text>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ newPassword: text })}
                        placeholder="**********"
                        placeholderTextColor="#495057"
                    />
                    <View style={styles.button}>
                        <Button
                            title="Cambiar contraseña"
                            onPress={() => this.handlerResetPassword()}
                            color="#28a745"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Cerrar sesión"
                            onPress={() => this.handlerLogout()}
                            color="#28a745"
                        />
                    </View>


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