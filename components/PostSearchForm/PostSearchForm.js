import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/scripts/styles';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import GameService from '../games/GameService';

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
        ...platforms.map(platform => ({ "name": platform.name, "value": platform.id_platform }))
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
                style={styles.picker}
                selectedValue={this.state.gameSelected}
                onValueChange={this.handleGameSelect}
                dropdownIconColor="#495057"
                mode="dropdown"
              >

                {this.props.gameOptions.map((gameOption) => (
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

            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.platformSelected}
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

            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.modeSelected}
                onValueChange={this.handleModeSelect}
                dropdownIconColor="#495057"
                mode="dropdown"
              >
                {this.props.modeOptions.map((modeOption) => (
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

            <Button title="Buscar" onPress={this.handleSubmit} color={"#28a745"} />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    );
  }
}

export default PostSearchForm;