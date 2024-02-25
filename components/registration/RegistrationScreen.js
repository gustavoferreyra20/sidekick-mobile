import { Component } from 'react';
import { Text, View, TextInput, Button, Switch, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RegistrationCtrl from './RegistrationCtrl';
import styles from '../../assets/scripts/styles';
import PopupService from '../popups/PopupService';

export class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profilePicture: false,
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
                            <Text style={styles.text}>Name</Text>
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
                        />

                        {this.state.profilePicture && (
                            <View style={styles.button}>
                                <Button
                                    title="Eliminar foto"
                                    onPress={() => {
                                        this.controller.newUser.profilePicture = "";
                                        this.setState({ profilePicture: false });
                                    }}
                                    color="#D4403A"
                                />
                            </View>
                        )
                        }

                        <View style={styles.button}>
                            <Button
                                title="Seleccionar foto"
                                disabled={this.state.profilePicture}
                                onPress={() => {
                                    this.controller.pickProfilePicture().then((res) => {
                                        this.setState({ profilePicture: res });
                                    })
                                }}
                                color="#28a745"
                            />
                        </View>
                        <View style={styles.button}>
                            <Button
                                title="Tomar foto"
                                disabled={this.state.profilePicture}
                                onPress={() => {
                                    this.controller.takeProfilePicture().then((res) => {
                                        this.setState({ profilePicture: res });
                                    })
                                }}
                                color="#28a745"
                            />
                        </View>

                        <Text style={styles.text}>Contanos un poco sobre vos</Text>
                        <TextInput
                            style={styles.textInput}
                            multiline={true}
                            numberOfLines={3}
                            maxLength={280}
                            onChangeText={text => this.controller.newUser.description = text}
                            placeholderTextColor="#495057"
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
                                />
                            </View>
                        ))}

                        <View style={styles.button}>
                            <Button title="Agregar otra cuenta" onPress={this.btnAddAccount} color="#28a745" />
                        </View>
                        {this.controller.newUser.contact_inf_list.length > 1 && (
                            <View style={styles.button}>
                                <Button title="Eliminar último" onPress={this.btnRemoveAccount} color="#D4403A" />
                            </View>
                        )}

                        <View style={styles.labelContainer}>
                            <Text style={styles.text}>Password</Text>
                            <Text style={styles.required}>*</Text>
                        </View>

                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            onChangeText={text => this.controller.newUser.password = text}
                            placeholder="**********"
                            placeholderTextColor="#495057"
                        />
                        <Text style={styles.text}>Su contraseña debe contener <Text style={{ color: "red" }}>8</Text> caracteres como mímimo.</Text>


                        <View style={styles.button}>
                            <Button title="Ver terminos y condiciones" onPress={this.btnTerms} color="#28a745" />
                        </View>
                        <TouchableOpacity style={styles.switchContainer} onPress={this.toggleSwitch}>
                            <Text style={styles.switchText}>Aceptar términos y condiciones</Text>
                            <Switch value={this.controller.toggleValue} onValueChange={this.toggleSwitch} />
                        </TouchableOpacity>

                        <View style={styles.button}>
                            <Button title="Registrarse" onPress={this.btnRegistration} color="#28a745" />
                        </View>

                        <Text style={styles.h1}>Ya tienes una cuenta?</Text>

                        <View style={styles.button}>
                            <Button
                                title="Iniciar sesión"
                                onPress={this.handleLoginPress}
                                color="#28a745" />
                        </View>
                    </View>
                </ScrollView>

                <PopupService
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
                    modalType={this.controller.modalType}
                    msg={this.controller.msg}
                />
            </View>
        );
    }

}