import React, { Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../../assets/scripts/styles';
import { Ionicons } from "@expo/vector-icons";
import SearchableDropdown from '../SearchableDropdown';

export default class PostSearchForm extends Component {
  constructor(props) {
    super(props);

    // Find the currently selected game option or default to first game
    const currentGameOption = props.gameOptions?.find(g => g.value === props.gameSelected) || props.gameOptions?.[0] || null;

    this.state = {
      gameSelected: props.gameSelected || (props.gameOptions?.[0]?.value || ''),
      selectedGameOption: currentGameOption,
      platformSelected: props.platformSelected || 'any',
      modeSelected: props.modeSelected || 'any',

      platformOptions: props.platformOptions || [],
      modeOptions: props.modeOptions || [],
    };
  }

  componentDidUpdate(prevProps) {
    // If gameOptions changed and we don't have a selected game, select the first one
    if (prevProps.gameOptions !== this.props.gameOptions && this.props.gameOptions?.length > 0) {
      if (!this.state.gameSelected || this.state.gameSelected === 'any') {
        const firstGame = this.props.gameOptions[0];
        if (firstGame) {
          this.setState({
            gameSelected: firstGame.value,
            selectedGameOption: firstGame,
          });
        }
      }
    }
    
    // Update platform and mode options when props change
    if (prevProps.platformOptions !== this.props.platformOptions) {
      this.setState({ 
        platformOptions: this.props.platformOptions || [],
        platformSelected: this.props.platformSelected || this.props.platformOptions?.[0]?.value || ""
      });
    }
    
    if (prevProps.modeOptions !== this.props.modeOptions) {
      this.setState({ 
        modeOptions: this.props.modeOptions || [],
        modeSelected: this.props.modeSelected || this.props.modeOptions?.[0]?.value || ""
      });
    }
  }

  handleGameSelect = async (selectedGame) => {
    const platformOptions = await this.props.controller.setPlatforms(selectedGame);
    const modeOptions = await this.props.controller.fetchModeOptions(selectedGame);

    this.setState({
      gameSelected: selectedGame.value,
      selectedGameOption: selectedGame,
      platformOptions,
      modeOptions,
      platformSelected: platformOptions[0]?.value || "",
      modeSelected: modeOptions[0]?.value || "",
    });
  };

  handleGameSearch = async (searchTerm) => {
    return await this.props.controller.searchGames(searchTerm);
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
    const disableSubFilters = !gameSelected || !this.state.selectedGameOption;

    return (
      <TouchableOpacity
        onPress={this.props.togglePostSearchFormModal}
        style={styles.popupContainer}
      >
        <TouchableWithoutFeedback>
          <View style={styles.popupContent}>

            <SearchableDropdown
              options={gameOptions}
              selectedOption={this.state.selectedGameOption}
              onSelect={this.handleGameSelect}
              onSearch={this.handleGameSearch}
              placeholder="Seleccionar juego"
            />

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
