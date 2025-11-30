import { Component } from 'react';
import { Text, View, TextInput, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RegistrationCtrl from '../../controllers/auth/RegistrationCtrl';
import styles from '../../assets/scripts/styles';
import Popup from '../../components/popups/Popup';
import {Ionicons} from "@expo/vector-icons";

export class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profilePicture: null,
        };
        this.controller = new RegistrationCtrl(props);
    }

    toggleSwitch = () => {
        const value = !this.controller.toggleValue;
        this.controller.toggleValue = value;
        this.forceUpdate();
    };

    handleLoginPress = () => {
        this.props.navigation.navigate('Iniciar sesión');
    }

    btnAddAccount = () => {
        this.controller.handleAddAccount().then(() => {
            this.forceUpdate();
        });
    }

    btnRemoveAccount = () => {
        this.controller.handleRemoveAccount().then(() => {
            this.forceUpdate();
        });
    }

    btnTerms = () => {
        this.controller.showTerms().then(() => {
            this.forceUpdate();
        });
    }

    componentDidMount = () => {
        this.controller.handleGetOptions().then(() => {
            this.setState({ loading: false });
            this.forceUpdate()
        })
    }

    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    }

    btnRegistration = () => {
        this.controller.handleRegistration().then(() => {
            this.forceUpdate()
        })
    }

    render() {
        return (
            <View style={{ backgroundColor: "#020202" }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} >
                    <View style={styles.formContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.text}>Nombre</Text>
                            <Text style={styles.required}>*</Text>
                        </View>

                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.controller.newUser.name = text}
                            placeholder="Ingrese su nombre"
                            placeholderTextColor="#495057"
                        />

                        <View style={styles.labelContainer}>
                            <Text style={styles.text}>Email</Text>
                            <Text style={styles.required}>*</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={text => this.controller.newUser.email = text}
                            placeholder="Ingrese su email"
                            placeholderTextColor="#495057"
                            autoCapitalize="none"
                        />

                        {this.state.profilePicture ? (
                          <View style={{ alignItems: 'center' }}>
                              {/* Vista previa circular */}
                              <Image
                                source={{ uri: this.state.profilePicture }}
                                style={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 75,
                                    marginBottom: 15,
                                    borderWidth: 2,
                                    borderColor: '#28a745'
                                }}
                              />

                              {/* Botón eliminar */}
                              <TouchableOpacity
                                style={[styles.modernButton, styles.buttonWithIcon, { backgroundColor: '#dc3545' }]}
                                onPress={() => {
                                    this.controller.newUser.profilePicture = "";
                                    this.setState({ profilePicture: null });
                                }}
                                activeOpacity={0.8}
                              >
                                  <Ionicons name="trash" size={20} color="#fff" style={{ marginRight: 8 }} />
                                  <Text style={styles.buttonText}>Eliminar foto</Text>
                              </TouchableOpacity>
                          </View>
                        ) : (
                          <>
                              {/* Botón seleccionar */}
                              <TouchableOpacity
                                style={[styles.modernButton, styles.buttonWithIcon]}
                                onPress={() => {
                                    this.controller.pickProfilePicture().then((res) => {
                                        if (res) this.setState({ profilePicture: res });
                                    });
                                }}
                                activeOpacity={0.8}
                              >
                                  <Ionicons name="image" size={20} color="#fff" style={{ marginRight: 8 }} />
                                  <Text style={styles.buttonText}>Seleccionar foto</Text>
                              </TouchableOpacity>

                              {/* Botón tomar */}
                              <TouchableOpacity
                                style={[styles.modernButton, styles.buttonWithIcon]}
                                onPress={() => {
                                    this.controller.takeProfilePicture().then((res) => {
                                        if (res) this.setState({ profilePicture: res });
                                    });
                                }}
                                activeOpacity={0.8}
                              >
                                  <Ionicons name="camera" size={20} color="#fff" style={{ marginRight: 8 }} />
                                  <Text style={styles.buttonText}>Tomar foto</Text>
                              </TouchableOpacity>
                          </>
                        )}

                        <TextInput
                            style={styles.textAreaInput}
                            multiline={true}
                            numberOfLines={3}
                            maxLength={280}
                            onChangeText={text => this.controller.newUser.description = text}
                            placeholderTextColor="#495057"
                            placeholder="Contanos un poco sobre vos..."
                        />

                        <View style={styles.labelContainer}>
                            <Text style={styles.text}>Contacto</Text>
                            <Text style={styles.required}>*</Text>
                        </View>
                        {this.controller.newUser.contact_inf_list.length > 0 && this.controller.newUser.contact_inf_list.map((ContactInf, index) => (
                            <View style={styles.contactContainer} key={index}>
                                <View
                                    style={styles.pickerContainer}
                                >
                                    <Picker
                                        style={styles.picker}
                                        selectedValue={ContactInf?.platform}
                                        onValueChange={(value) => {
                                            const index = this.controller.newUser.contact_inf_list.indexOf(ContactInf);
                                            this.controller.newUser.contact_inf_list[index].platform = value;
                                            this.setState({})
                                        }}
                                        dropdownIconColor="#495057"
                                        mode="dropdown"
                                    >
                                        {this.controller.contactOptions.map(option => (
                                            <Picker.Item key={option.id_contact_inf} label={option.name} value={option} style={styles.pickerItem} color='E7E9EA' />
                                        ))}
                                    </Picker>
                                </View>

                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Ingrese su cuenta o id"
                                    value={this.controller.newUser.contact_inf?.[index]?.account}
                                    onChangeText={(text) => {
                                        const index = this.controller.newUser.contact_inf_list.indexOf(ContactInf);
                                        this.controller.newUser.contact_inf_list[index].account = text;
                                    }}
                                    placeholderTextColor="#495057"
                                    autoCapitalize="none"
                                />
                            </View>
                        ))}

                        <TouchableOpacity
                            style={styles.modernButton}
                            onPress={this.btnAddAccount}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Agregar otra cuenta</Text>
                        </TouchableOpacity>

                        {this.controller.newUser.contact_inf_list.length > 1 && (
                            <TouchableOpacity
                                style={[styles.modernButton, { backgroundColor: '#D4403A' }]}
                                onPress={this.btnRemoveAccount}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.buttonText}>Eliminar último</Text>
                            </TouchableOpacity>
                        )}

                        <View style={styles.labelContainer}>
                            <Text style={styles.text}>Password</Text>
                            <Text style={styles.required}>*</Text>
                        </View>

                        <View style={{ position: 'relative', width: '100%' }}>
                            <TextInput
                                style={[styles.textInput, { paddingRight: 40 }]}
                                secureTextEntry={!this.state.passwordVisible}
                                onChangeText={text => this.controller.newUser.password = text}
                                placeholder="**********"
                                placeholderTextColor="#495057"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible })}
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 0,
                                    bottom: 15,
                                    justifyContent: 'center'
                                }}
                            >
                                <Ionicons
                                    name={this.state.passwordVisible ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#495057"
                                />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.text}>
                            Su contraseña debe contener <Text style={{ color: "red" }}>8</Text> caracteres como mínimo.
                        </Text>

                        <View style={styles.labelContainer}>
                            <Text style={styles.text}>Repetir Password</Text>
                            <Text style={styles.required}>*</Text>
                        </View>

                        <View style={{ position: 'relative', width: '100%' }}>
                            <TextInput
                                style={[styles.textInput, { paddingRight: 40 }]}
                                secureTextEntry={!this.state.passwordVisible}
                                onChangeText={text => this.controller.newUser.repeatPassword = text}
                                placeholder="**********"
                                placeholderTextColor="#495057"
                                autoCapitalize="none"
                            />

                            <TouchableOpacity
                                onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible })}
                                style={{
                                    position: 'absolute',
                                    right: 10,
                                    top: 0,
                                    bottom: 15,
                                    justifyContent: 'center'
                                }}
                            >
                                <Ionicons
                                    name={this.state.passwordVisible ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#495057"
                                />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.modernButton}
                            onPress={this.btnTerms}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Ver terminos y condiciones</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.switchContainer} onPress={this.toggleSwitch}>
                            <Text style={styles.switchText}>Aceptar términos y condiciones</Text>
                            <Switch value={this.controller.toggleValue} onValueChange={this.toggleSwitch} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.modernButton}
                            onPress={this.btnRegistration}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </TouchableOpacity>

                        <Text style={styles.h1}>Ya tienes una cuenta?</Text>

                        <TouchableOpacity
                            style={styles.modernButton}
                            onPress={this.handleLoginPress}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Iniciar sesión</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>

                <Popup
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
                    modalType={this.controller.modalType}
                    msg={this.controller.msg}
                />
            </View>
        );
    }

}