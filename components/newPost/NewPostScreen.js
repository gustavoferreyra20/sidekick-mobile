import React, {Component} from 'react';
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View} from 'react-native';
import NewPostCtrl from './NewPostCtrl';
import styles from '../../assets/scripts/styles';
import {Picker} from '@react-native-picker/picker';
import PopupService from '../popups/PopupService';
import {Ionicons} from "@expo/vector-icons";

export class NewPostScreen extends Component {

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
        gameSelected: '',
        platformSelected: '',
        modeSelected: '',
        userRequire: '1',
        description: '',
      },
      gameOptions: [],
      platformOptions: [],
      modeOptions: [],
      loading: true,
    };
    this.controller = new NewPostCtrl();
  }

  async componentDidMount() {
    try {
      const gameOptions = await this.controller.fetchGameOptions();
      const firstGame = gameOptions.length > 0 ? gameOptions[0] : null;

      let platformOptions = [];
      let modeOptions = [];

      if (firstGame) {
        platformOptions = await this.controller.setPlatforms(firstGame);
        modeOptions = await this.controller.setModes(firstGame);
      }

      this.setState({
        gameOptions,
        platformOptions,
        modeOptions,
        loading: false,
        form: {
          ...this.state.form,
          gameSelected: firstGame?.value || '',
          platformSelected: platformOptions[0]?.value || '',
          modeSelected: modeOptions[0]?.value || '',
        },
      });
    } catch (error) {
      console.error(error);
      this.setState({loading: false});
    }
  }


  /* Modal */
  setModalVisible = (visible) => {
    if (typeof this.controller.function === "function") {
      this.controller.function();
    }
    this.controller.modalVisible = visible;
    this.forceUpdate();
  }

  /* Handlers */
  handleTitleChange = (text) => {
    this.setState(prev => ({
      form: {...prev.form, title: text},
    }));
  };

  handleGameSelect = async (gameId) => {
    const selectedGame = this.state.gameOptions.find(g => g.value === gameId);

    const platformOptions = await this.controller.setPlatforms(selectedGame);
    const modeOptions = await this.controller.setModes(selectedGame);

    this.setState(prev => ({
      form: {
        ...prev.form,
        gameSelected: gameId,
        platformSelected: platformOptions[0]?.value || '',
        modeSelected: modeOptions[0]?.value || '',
      },
      platformOptions,
      modeOptions,
    }));
  };

  handlePlatformSelect = (value) => {
    this.setState(prev => ({
      form: {...prev.form, platformSelected: value},
    }));
  };

  handleModeSelect = (value) => {
    this.setState(prev => ({
      form: {...prev.form, modeSelected: value},
    }));
  };

  handleUserRequireSelect = (value) => {
    this.setState(prev => ({
      form: {...prev.form, userRequire: value},
    }));
  };

  handleDescriptionChange = (text) => {
    this.setState(prev => ({
      form: {...prev.form, description: text},
    }));
  };

  handleCreatePost = async () => {
    this.controller.createPost(this.state.form, this.reloadForm).then(() => {
      this.forceUpdate();
    });
  };

  reloadForm = async () => {
    const gameOptions = await this.controller.fetchGameOptions();
    const firstGame = gameOptions.length > 0 ? gameOptions[0] : null;

    let platformOptions = [];
    let modeOptions = [];

    if (firstGame) {
      platformOptions = await this.controller.setPlatforms(firstGame);
      modeOptions = await this.controller.setModes(firstGame);
    }

    this.setState({
      gameOptions,
      platformOptions,
      modeOptions,
      form: {
        id_user: this.props.route.params.sessionId,
        title: '',
        gameSelected: firstGame?.value || '',
        platformSelected: platformOptions[0]?.value || '',
        modeSelected: modeOptions[0]?.value || '',
        userRequire: '1',
        description: '',
      },
    });
  };

  render() {

    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#28a745"/>
          </View>
        </View>
      );
    }

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

          {/* Game Picker */}
          <Text style={styles.text}>Juego:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.form.gameSelected}
              onValueChange={this.handleGameSelect}
              dropdownIconColor="#495057"
              mode="dropdown"
            >
              {this.state.gameOptions.map(game => (
                <Picker.Item
                  key={game.value}
                  label={game.name}
                  value={game.value}
                  style={styles.pickerItem}
                  color='E7E9EA'
                />
              ))}
            </Picker>
          </View>

          {/* Platform Picker */}
          <Text style={styles.text}>Plataforma:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.form.platformSelected}
              onValueChange={this.handlePlatformSelect}
              dropdownIconColor="#495057"
              mode="dropdown"
            >
              {this.state.platformOptions.map(platform => (
                <Picker.Item
                  key={platform.value}
                  label={platform.name}
                  value={platform.value}
                  style={styles.pickerItem}
                  color='E7E9EA'
                />
              ))}
            </Picker>
          </View>

          {/* Mode Picker */}
          <Text style={styles.text}>Modo de juego:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.form.modeSelected}
              onValueChange={this.handleModeSelect}
              dropdownIconColor="#495057"
              mode="dropdown"
            >
              {this.state.modeOptions.map(mode => (
                <Picker.Item
                  key={mode.value}
                  label={mode.name}
                  value={mode.value}
                  style={styles.pickerItem}
                  color='E7E9EA'
                />
              ))}
            </Picker>
          </View>

          {/* Users required */}
          <Text style={styles.text}>Usuarios requeridos:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.form.userRequire}
              onValueChange={this.handleUserRequireSelect}
              dropdownIconColor="#495057"
              mode="dropdown"
            >
              <Picker.Item label="1" value="1" style={styles.pickerItem} color='E7E9EA'/>
              <Picker.Item label="2" value="2" style={styles.pickerItem} color='E7E9EA'/>
              <Picker.Item label="3" value="3" style={styles.pickerItem} color='E7E9EA'/>
            </Picker>
          </View>

          <TextInput
            style={styles.textAreaInput}
            placeholder="Descripción del anuncio"
            value={this.state.form.description}
            multiline={true}
            numberOfLines={4}
            maxLength={280}
            onChangeText={this.handleDescriptionChange}
            placeholderTextColor="#495057"
          />

          <TouchableOpacity
            style={[styles.modernButton, styles.buttonWithIcon]}
            onPress={this.handleCreatePost}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={16} color="#fff" style={{marginRight: 6}}/>
            <Text style={styles.buttonText}>Crear anuncio</Text>
          </TouchableOpacity>

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