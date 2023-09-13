import React, { Component } from 'react';
import { Text, View, TextInput, Button, ScrollView, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import styles from '../../assets/styles';
import { Picker } from '@react-native-picker/picker';

export class NewPostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                gameSelected: 'game1',
                platformSelected: 'platform1',
                modeSelected: 'mode1',
                userRequire: '1',
                description: '',
            }
        };
    }

    handleTitleChange = (text) => {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                title: text,
            },
        }));
    };

    handleGameSelect = (value) => {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                gameSelected: value,
            },
        }));
    };

    handlePlatformSelect = (value) => {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                platformSelected: value,
            },
        }));
    };

    handleModeSelect = (value) => {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                modeSelected: value,
            },
        }));
    };

    handleUserRequireSelect = (value) => {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                userRequire: value,
            },
        }));
    };

    handleDescriptionChange = (text) => {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                description: text,
            },
        }));
    };

    handleCreatePost = () => {
        console.log(this.state.form)
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>

                    <View style={styles.labelContainer}>
                        <Text style={styles.text}>Título</Text>
                    </View>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Ingrese el título"
                        value={this.state.title}
                        onChangeText={this.handleTitleChange}
                    />

                    {/* Game selection */}
                    <Text style={styles.text}>Juego:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.pickerInput}
                            selectedValue={this.state.form.gameSelected}
                            onValueChange={this.handleGameSelect}
                        >
                            <Picker.Item label="Game 1" value="game1" />
                            <Picker.Item label="Game 2" value="game2" />
                            {/* Add more games as needed */}
                        </Picker>
                    </View>

                    {/* Platform selection */}
                    <Text style={styles.text}>Plataforma:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.pickerInput}
                            selectedValue={this.state.form.platformSelected}
                            onValueChange={this.handlePlatformSelect}
                        >
                            <Picker.Item label="Platform 1" value="platform1" />
                            <Picker.Item label="Platform 2" value="platform2" />
                            {/* Add more platforms as needed */}
                        </Picker>
                    </View>

                    {/* Mode selection */}
                    <Text style={styles.text}>Modo de juego:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.pickerInput}
                            selectedValue={this.state.form.modeSelected}
                            onValueChange={this.handleModeSelect}
                        >
                            <Picker.Item label="Mode 1" value="mode1" />
                            <Picker.Item label="Mode 2" value="mode2" />
                            {/* Add more modes as needed */}
                        </Picker>
                    </View>

                    {/* Users required selection */}
                    <Text style={styles.text}>Usuarios requeridos:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.pickerInput}
                            selectedValue={this.state.form.userRequire}
                            onValueChange={this.handleUserRequireSelect}
                        >
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                        </Picker>
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.text}>Descripcion del anuncio</Text>
                    </View>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Description"
                        value={this.state.description}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={this.handleDescriptionChange}
                    />

                    <Button title="Crear anuncio" onPress={this.handleCreatePost} color="#0eaa61" />
                </View>
            </View>
        );
    }
}