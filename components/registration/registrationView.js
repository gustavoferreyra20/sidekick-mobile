import React, { Component } from 'react';
import { Text, View, TextInput, Button, Switch, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RegistrationController from './registrationCtrl';
import styles from '../../assets/styles';

export class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleValue: false,
            loading: true,
        };
        this.controller = new RegistrationController();
    }

    toggleSwitch = () => {
        const value = !this.state.toggleValue;
        this.controller.toggleValue = value;
        this.setState({ toggleValue: value });
    };

    handleLoginPress = () => {
        this.props.navigation.navigate('Iniciar sesión');
    }

    btnAddAccount = () => {
        this.controller.handleAddAccount().then(() => {
            this.forceUpdate();
        });
    }

    btnRemoveAccount = () => {
        this.controller.handleRemoveAccount().then(() => {
            this.forceUpdate();
        });
    }

    componentDidMount = () => {
        this.controller.handleGetOptions().then(() => {
            this.setState({ loading: false });
            this.forceUpdate()
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.text}>Nombre</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.controller.name = text}
                        placeholder="Ingrese su nombre"
                        required
                    />

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.controller.email = text}
                        placeholder="Ingrese su email"
                        required
                    />

                    <Text style={styles.text}>Contanos un poco sobre vos</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={3}
                        maxLength={280}
                        onChangeText={text => this.controller.description = text}
                    />

                    <Text style={styles.text}>Contacto</Text>
                    {this.controller.contact_inf_list.length > 0 && this.controller.contact_inf_list.map((contact_inf, index) => (
                        <View style={styles.contactContainer} key={index}>
                            <Picker
                                style={styles.textInput}
                                selectedValue={contact_inf?.platform}
                                onValueChange={(value) => {
                                    const index = this.controller.contact_inf_list.indexOf(contact_inf);
                                    this.controller.contact_inf_list[index].platform = value;
                                    this.setState({})
                                }}
                                prompt="Seleccione una opción"
                            >
                                {this.controller.contactOptions.map(option => (
                                    <Picker.Item key={option.id_contact_inf} label={option.name} value={option} />
                                ))}
                            </Picker>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Ingrese su cuenta o id"
                                value={this.controller.contact_inf?.[index]?.account}
                                onChangeText={(text) => {
                                    const index = this.controller.contact_inf_list.indexOf(contact_inf);
                                    this.controller.contact_inf_list[index].account = text;
                                }}
                            />
                        </View>
                    ))}

                    <View style={styles.buttonContainer}>
                        <Button title="Agregar otra cuenta" onPress={this.btnAddAccount} color="#0eaa61" />
                    </View>
                    {this.controller.contact_inf_list.length > 1 && (
                        <View style={styles.buttonContainer}>
                            <Button title="Eliminar último" onPress={this.btnRemoveAccount} color="#D4403A" />
                        </View>
                    )}

                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={text => this.controller.password = text}
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