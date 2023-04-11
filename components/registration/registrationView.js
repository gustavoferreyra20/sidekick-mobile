import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Switch, TouchableOpacity } from 'react-native';

export class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            description: '',
            password: '',
            toggleValue: false,
        };
    }

    handleSubmit = () => {
        console.log(`name: ${this.state.name}`);
        console.log(`Email: ${this.state.Email}`);
        console.log(`Description: ${this.state.description}`);
        console.log(`Password: ${this.state.password}`);
        console.log(`ToggleValue: ${this.state.toggleValue}`);
    }

    handleLoginPress = () => {
        this.props.navigation.navigate('Iniciar sesión');
    }

    handleDescriptionChange = (text) => {
        this.setState({ description: text });
    }

    toggleSwitch = () => {
        const value = !this.state.toggleValue;
        this.setState({ toggleValue: value });
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.text}>Nombre</Text>
                    <TextInput style={styles.textInput} value={this.state.name} onChangeText={text => this.setState({ name: text })} placeholder="Ingrese su nombre" required />

                    <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.textInput} value={this.state.email} onChangeText={text => this.setState({ email: text })} placeholder="Ingrese su email" required />

                    <Text style={styles.text}>Contanos un poco sobre vos</Text>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        numberOfLines={3}
                        maxLength={280}
                        value={this.state.description}
                        onChangeText={this.handleDescriptionChange}
                    />

                    <Text style={styles.text}>Password</Text>
                    <TextInput style={styles.textInput} secureTextEntry={true} value={this.state.password} onChangeText={text => this.setState({ password: text })} placeholder="**********" required />

                    <TouchableOpacity style={styles.switchContainer} onPress={this.toggleSwitch}>
                        <Text style={styles.switchText}>Aceptar términos y condiciones</Text>
                        <Switch value={this.state.toggleValue} onValueChange={this.toggleSwitch} />
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <Button title="Registrarse" onPress={this.handleSubmit} color="#0eaa61" />
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
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchText: {
        color: '#fff',
        fontSize: 16,
    },
});