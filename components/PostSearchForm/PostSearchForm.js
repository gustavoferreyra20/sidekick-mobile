import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/scripts/styles';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import GameService from '../games/gameService';

class PostSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSelected: '',
      platformSelected: '',
      modeSelected: '',
      platformOptions: this.props.platformOptions,
    };
  }

  handleGameSelect = (value) => {
    GameService.getPlatforms(value).then((platforms) => {
      let data = [
        { "name": "Cualquier plataforma", "value": "any" },
        ...platforms.map(platform => ({ "name": platform.name, "value": platform.value }))
      ];
  
      this.setState({ gameSelected: value, platformOptions: data });
    });

  };

  handlePlatformSelect = (value) => {
    this.setState({ platformSelected: value });
  };

  handleModeSelect = (value) => {
    this.setState({ modeSelected: value });
  };

  handleSubmit = () => {
    this.props.handleSubmit(
      this.state.gameSelected,
      this.state.platformSelected,
      this.state.modeSelected
    );
    this.props.togglePostSearchFormModal();
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.togglePostSearchFormModal()} style={styles.popupContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.popupContent}>

            <View style={styles.pickerContainer}>
              <Picker
                style={styles.pickerInput}
                selectedValue={this.state.gameSelected}
                onValueChange={this.handleGameSelect}
              >

                {this.props.gameOptions.map((gameOption) => (
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
                {this.props.modeOptions.map((modeOption) => (
                  <Picker.Item
                    key={modeOption.value}
                    label={modeOption.name}
                    value={modeOption.value}
                  />
                ))}
              </Picker>
            </View>

            <Button title="Buscar" onPress={this.handleSubmit} color={"#0eaa61"} />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    );
  }
}

export default PostSearchForm;