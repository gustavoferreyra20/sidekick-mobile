import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../assets/scripts/styles';

export default class SearchableDropdown extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false,
      searchText: '',
      isLoading: false,
      searchResults: [],
      currentRequestId: 0,
    };
    
    this.searchTimeout = null;
  }

  componentDidMount() {
    // Initialize with provided options if any
    if (this.props.options) {
      this.setState({ searchResults: this.props.options });
    }
  }

  componentDidUpdate(prevProps) {
    // Update search results when options prop changes
    if (prevProps.options !== this.props.options) {
      this.setState({ searchResults: this.props.options || [] });
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
      searchText: prevState.isOpen ? '' : prevState.searchText,
    }));
  };

  closeDropdown = () => {
    this.setState({
      isOpen: false,
      searchText: '',
    });
  };

  handleSelect = (option) => {
    this.setState({
      isOpen: false,
      searchText: '',
      searchResults: this.props.options || [],
    });
    
    if (this.props.onSelect) {
      this.props.onSelect(option);
    }
  };

  performSearch = (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) {
      // Reset to original options if search is too short
      this.setState({
        searchResults: this.props.options || [],
        isLoading: false,
      });
      return;
    }

    const currentRequestId = this.state.currentRequestId + 1;
    this.setState({ 
      currentRequestId,
      isLoading: true 
    });

    if (this.props.onSearch) {
      this.props.onSearch(searchTerm)
        .then((results) => {
          // Only update if this is still the most recent request
          if (this.state.currentRequestId === currentRequestId) {
            this.setState({
              searchResults: results || [],
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          // Only handle error if this is still the most recent request
          if (this.state.currentRequestId === currentRequestId) {
            console.log('Error searching:', error);
            this.setState({
              searchResults: [],
              isLoading: false,
            });
          }
        });
    }
  };

  handleSearchTextChange = (text) => {
    this.setState({ searchText: text });

    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Reset loading if search is cleared or too short
    if (!text || text.length < 3) {
      this.setState({ isLoading: false });
    }

    // Debounce search: wait 500ms after user stops typing
    this.searchTimeout = setTimeout(() => {
      this.performSearch(text);
    }, 500);
  };

  renderSearchResults = () => {
    const { searchText, isLoading, searchResults } = this.state;
    
    if (isLoading) {
      return (
        <View style={styles.dropdownMessage}>
          <ActivityIndicator size="small" color="#28a745" />
          <Text style={styles.dropdownMessageText}>Buscando...</Text>
        </View>
      );
    }

    if (searchText && searchText.length >= 3 && searchResults.length === 0) {
      return (
        <View style={styles.dropdownMessage}>
          <Text style={styles.dropdownMessageText}>
            No se encontraron resultados para "{searchText}"
          </Text>
        </View>
      );
    }

    if (searchText && searchText.length > 0 && searchText.length < 3) {
      return (
        <View style={styles.dropdownMessage}>
          <Text style={styles.dropdownMessageText}>
            Escribe al menos 3 caracteres para buscar
          </Text>
        </View>
      );
    }

    if ((!searchText || searchText.length === 0) && (!searchResults || searchResults.length === 0)) {
      return (
        <View style={styles.dropdownMessage}>
          <Text style={styles.dropdownMessageText}>
            Escribe para buscar opciones
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={searchResults}
        keyExtractor={(item, index) => `${item.value || index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => this.handleSelect(item)}
          >
            <Text style={styles.dropdownItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.dropdownList}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    );
  };

  render() {
    const { selectedOption, placeholder } = this.props;
    const { isOpen, searchText } = this.state;

    return (
      <View style={styles.searchableDropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={this.toggle}
          activeOpacity={0.8}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedOption?.name || placeholder || 'Seleccionar'}
          </Text>
          <Ionicons 
            name={isOpen ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#495057" 
          />
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={isOpen}
          onRequestClose={this.closeDropdown}
          animationType="fade"
        >
          <TouchableOpacity
            style={styles.dropdownOverlay}
            activeOpacity={1}
            onPress={this.closeDropdown}
          >
            <TouchableWithoutFeedback>
              <View style={styles.dropdownModal}>
                <View style={styles.dropdownHeader}>
                  <TextInput
                    style={styles.dropdownSearchInput}
                    value={searchText}
                    onChangeText={this.handleSearchTextChange}
                    placeholder="Buscar..."
                    placeholderTextColor="#6c757d"
                    autoFocus={true}
                  />
                  <TouchableOpacity
                    onPress={this.closeDropdown}
                    style={styles.dropdownCloseButton}
                  >
                    <Ionicons name="close" size={24} color="#495057" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.dropdownDivider} />
                
                <View style={styles.dropdownContent}>
                  {this.renderSearchResults()}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}