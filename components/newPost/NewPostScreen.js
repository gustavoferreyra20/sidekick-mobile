import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import NewPostCtrl from './NewPostCtrl';
import styles from '../../assets/scripts/styles';
import { Picker } from '@react-native-picker/picker';
import PopupService from '../popups/PopupService';
import GameService from '../games/GameService';

export class NewPostScreen extends Component {
    async componentDidMount() {
        await this.reloadForm();
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.reloadForm();
        });
    }

    componentWillUnmount() {
        if (this.focusListener && typeof this.focusListener === 'function') {
            this.focusListener();
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            form: {
                id_user: this.props.route.params.sessionId,
                title: '',
                gameSelected: '1',
                platformSelected: '1',
                modeSelected: '1',
                userRequire: '1',
                description: '',
            },
            gameOptions: [],
            platformOptions: [],
            modeOptions: [],
        };
        this.controller = new NewPostCtrl();
    }


    async componentDidMount() {
        try {
            // Fetch and update game options
            const gameOptions = await this.controller.fetchGameOptions();
            // Fetch and update platform options
            const platformOptions = await this.controller.setPlatforms();
            // Fetch and update mode options
            const modeOptions = await this.controller.fetchModeOptions();

            this.setState({
                gameOptions,
                platformOptions,
                modeOptions,
            });
        } catch (error) {

            console.error(error);

            this.setState({
                loading: false,
            });
        }
    }

    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    }

    handleTitleChange = (text) => {
        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                title: text,
            },
        }));
    };

    handleGameSelect = async (value) => {
        GameService.getPlatforms(value).then((platforms) => {

            let data = [
                ...platforms.map(platform => ({ "name": platform.name, "value": platform.id_platform }))
            ];

            this.setState((prevState) => ({
                form: {
                    ...prevState.form,
                    gameSelected: value,
                },
                platformOptions: data,
                platformSelected: data[0],
            }));
        });
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

    handleCreatePost = async () => {
        this.controller.createPost(this.state.form, this.reloadForm).then(() => {
            this.forceUpdate()
        })
    };


    reloadForm = async () => {
        // Fetch and update game options
        const gameOptions = await this.controller.fetchGameOptions();
        // Fetch and update platform options
        const platformOptions = await this.controller.setPlatforms();
        // Fetch and update mode options
        const modeOptions = await this.controller.fetchModeOptions();

        this.setState((prevState) => ({
            form: {
                ...prevState.form,
                id_user: this.props.route.params.sessionId,
                title: '',
                gameSelected: '1',
                platformSelected: '1',
                modeSelected: '1',
                userRequire: '1',
                description: '',
            },
            gameOptions,
            platformOptions,
            modeOptions,
        }));

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>

                    <View style={styles.labelContainer}>
                        <Text style={styles.text}>Título</Text>
                        <Text style={styles.required}>*</Text>
                    </View>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Ingrese el título"
                        value={this.state.form.title}
                        onChangeText={this.handleTitleChange}
                        placeholderTextColor="#495057"
                    />

                    {/* Game selection */}
                    <Text style={styles.text}>Juego:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.form.gameSelected}
                            onValueChange={this.handleGameSelect}
                            dropdownIconColor="#495057"
                            mode="dropdown"
                        >
                            {this.state.gameOptions.map((gameOption) => (
                                <Picker.Item
                                    key={gameOption.value}
                                    label={gameOption.name}
                                    value={gameOption.value}
                                    style={styles.pickerItem}
                                    color='E7E9EA'
                                />
                            ))}

                        </Picker>
                    </View>

                    {/* Platform selection */}
                    <Text style={styles.text}>Plataforma:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.form.platformSelected}
                            onValueChange={this.handlePlatformSelect}
                            dropdownIconColor="#495057"
                            mode="dropdown"
                        >

                            {this.state.platformOptions.map((platformOption) => (
                                <Picker.Item
                                    key={platformOption.value}
                                    label={platformOption.name}
                                    value={platformOption.value}
                                    style={styles.pickerItem}
                                    color='E7E9EA'
                                />
                            ))}

                        </Picker>
                    </View>

                    {/* Mode selection */}
                    <Text style={styles.text}>Modo de juego:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.form.modeSelected}
                            onValueChange={this.handleModeSelect}
                            dropdownIconColor="#495057"
                            mode="dropdown"
                        >

                            {this.state.modeOptions.map((modeOption) => (
                                <Picker.Item
                                    key={modeOption.value}
                                    label={modeOption.name}
                                    value={modeOption.value}
                                    style={styles.pickerItem}
                                    color='E7E9EA'
                                />
                            ))}

                        </Picker>
                    </View>

                    {/* Users required selection */}
                    <Text style={styles.text}>Usuarios requeridos:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.form.userRequire}
                            onValueChange={this.handleUserRequireSelect}
                            dropdownIconColor="#495057"
                            mode="dropdown"
                        >
                            <Picker.Item label="1" value="1" style={styles.pickerItem}
                                color='E7E9EA' />
                            <Picker.Item label="2" value="2" style={styles.pickerItem}
                                color='E7E9EA' />
                            <Picker.Item label="3" value="3" style={styles.pickerItem}
                                color='E7E9EA' />
                        </Picker>
                    </View>

                    <View style={styles.labelContainer}>
                        <Text style={styles.text}>Descripcion del anuncio</Text>
                    </View>

                    <TextInput
                        style={styles.textInput}
                        placeholder="Description"
                        value={this.state.form.description}
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={this.handleDescriptionChange}
                        placeholderTextColor="#495057"
                    />

                    <Button title="Crear anuncio" onPress={this.handleCreatePost} color="#28a745" />
                </View>

                <PopupService
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
                    modalType={this.controller.modalType}
                    msg={this.controller.msg}
                    actionConfirm={this.controller.modalFunction}
                />
            </View>
        );
    }
}