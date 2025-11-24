import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/scripts/styles';
import { Ionicons } from "@expo/vector-icons";

export default class PostSearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameSelected: props.gameSelected || 'any',
      platformSelected: props.platformSelected || 'any',
      modeSelected: props.modeSelected || 'any',

      platformOptions:
        props.platformOptions?.length
          ? props.platformOptions
          : [{ name: "Cualquier plataforma", value: "any" }],

      modeOptions:
        props.modeOptions?.length
          ? props.modeOptions
          : [{ name: "Cualquier modo", value: "any" }],
    };
  }

  handleGameSelect = async (value) => {
    if (value === "any") {
      this.setState({
        gameSelected: "any",
        platformOptions: [{ name: "Cualquier plataforma", value: "any" }],
        modeOptions: [{ name: "Cualquier modo", value: "any" }],
        platformSelected: "any",
        modeSelected: "any",
      });
      return;
    }

    const selectedGame = this.props.gameOptions.find(g => g.value === value);
    if (!selectedGame) return;

    const platformOptions = await this.props.controller.setPlatforms(selectedGame);
    const modeOptions = await this.props.controller.fetchModeOptions(selectedGame);

    this.setState({
      gameSelected: value,
      platformOptions,
      modeOptions,
      platformSelected: platformOptions[0]?.value || "",
      modeSelected: modeOptions[0]?.value || "",
    });
  };

  handleSubmit = () => {
    this.props.handleSubmit(
      this.state.gameSelected,
      this.state.platformSelected,
      this.state.modeSelected,
      this.state.platformOptions,
      this.state.modeOptions
    );

    this.props.togglePostSearchFormModal();
  };

  render() {
    const {
      gameSelected,
      platformSelected,
      modeSelected,
      platformOptions,
      modeOptions,
    } = this.state;

    const { gameOptions } = this.props;
    const disableSubFilters = gameSelected === "any";

    return (
      <TouchableOpacity
        onPress={this.props.togglePostSearchFormModal}
        style={styles.popupContainer}
      >
        <TouchableWithoutFeedback>
          <View style={styles.popupContent}>

            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={gameSelected}
                onValueChange={this.handleGameSelect}
                dropdownIconColor="#495057"
                mode="dropdown"
              >
                <Picker.Item
                  label="Cualquier juego"
                  value="any"
                  style={styles.pickerItem}
                  color="#E7E9EA"
                />

                {gameOptions
                  .filter(g => g.value !== "any")
                  .map((gameOption) => (
                    <Picker.Item
                      key={gameOption.value}
                      label={gameOption.name}
                      value={gameOption.value}
                      style={styles.pickerItem}
                      color="#E7E9EA"
                    />
                  ))}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                enabled={!disableSubFilters}
                style={[styles.picker, disableSubFilters && { opacity: 0.5 }]}
                selectedValue={platformSelected}
                onValueChange={(v) => this.setState({ platformSelected: v })}
                dropdownIconColor="#495057"
                mode="dropdown"
              >
                {platformOptions.map((opt) => (
                  <Picker.Item
                    key={opt.value}
                    label={opt.name}
                    value={opt.value}
                    style={styles.pickerItem}
                    color="#E7E9EA"
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                enabled={!disableSubFilters}
                style={[styles.picker, disableSubFilters && { opacity: 0.5 }]}
                selectedValue={modeSelected}
                onValueChange={(v) => this.setState({ modeSelected: v })}
                dropdownIconColor="#495057"
                mode="dropdown"
              >
                {modeOptions.map((opt) => (
                  <Picker.Item
                    key={opt.value}
                    label={opt.name}
                    value={opt.value}
                    style={styles.pickerItem}
                    color="#E7E9EA"
                  />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={[styles.modernButton, styles.buttonWithIcon, { width: '50%' }]}
              onPress={this.handleSubmit}
              activeOpacity={0.8}
            >
              <Ionicons name="search" size={16} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>

          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    );
  }
}
