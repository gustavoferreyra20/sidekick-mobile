import React, { Component } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, Button } from 'react-native';
import styles from '../../assets/styles';
import HomeCtrl from './homeCtrl';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameOptions: [],
            platformOptions: [],
            modeOptions: [],
            gameSelected: '',
            platformSelected: '',
            modeSelected: '',
        };
        this.controller = new HomeCtrl();
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

    handleGameSelect = async (gameSelected) => {
        const platformOptions = await this.controller.setPlatforms(gameSelected); // Call the controller function to update platforms

        this.setState({
            gameSelected,
            platformOptions,
        });
    };

    handlePlatformSelect = (value) => {
        this.setState({ platformSelected: value });
    };

    handleModeSelect = (value) => {
        this.setState({ modeSelected: value });
    };

    handleSubmit = () => {
        this.controller.btnSearchPost(
            this.state.gameSelected,
            this.state.platformSelected,
            this.state.modeSelected
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Posts más recientes</Text>
                <View style={styles.hr_main} />

                <View style={styles.formContainer}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.pickerInput}
                            selectedValue={this.state.gameSelected}
                            onValueChange={this.handleGameSelect}
                        >
                            {this.state.gameOptions.map((gameOption) => (
                                <Picker.Item
                                    key={gameOption.value}
                                    label={gameOption.name}
                                    value={gameOption.value}
                                />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.pickerInput}
                            selectedValue={this.state.platformSelected}
                            onValueChange={this.handlePlatformSelect}
                        >
                            {this.state.platformOptions.map((platformOption) => (
                                <Picker.Item
                                    key={platformOption.value}
                                    label={platformOption.name}
                                    value={platformOption.value}
                                />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.pickerInput}
                            selectedValue={this.state.modeSelected}
                            onValueChange={this.handleModeSelect}
                        >
                            {this.state.modeOptions.map((modeOption) => (
                                <Picker.Item
                                    key={modeOption.value}
                                    label={modeOption.name}
                                    value={modeOption.value}
                                />
                            ))}
                        </Picker>
                    </View>

                    <Button title="Buscar" onPress={this.handleSubmit} color="#0eaa61" />
                </View>
            </View>
        );
    }
}
