import { Component } from 'react';
import Contact_infService from '../contact_inf/contact_infService';
import UserService from '../users/userService';
import AuthService from '../auth/authService';
import * as ImagePicker from 'expo-image-picker';

export default class RegistrationController extends Component {
    constructor(props) {
        super(props);
        this.newUser = {
            name: '',
            email: '',
            description: '',
            password: '',
            contact_inf_list: []
        }
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => { };
        this.modalVisible = false;
        this.contactOptions = [];
        this.toggleValue = false;
    }

    handleGetOptions = () => {
        return new Promise((resolve, reject) => {
            Contact_infService.getAll().then((data) => {
                this.contactOptions = data;
                this.newUser.contact_inf_list = [{ platform: data[0], account: '' }];
                resolve();
            });
        });

    }

    handleRemoveAccount = () => {
        this.newUser.contact_inf_list.pop();
        return Promise.resolve();
    }

    handleAddAccount = () => {
        return new Promise((resolve, reject) => {
            Contact_infService.getAll().then((data) => {
                this.newUser.contact_inf_list.push({ platform: data[0], account: '' });
                resolve();
            });
        });
    }

    pickProfilePicture = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            // Aquí puedes guardar la imagen seleccionada en el estado de tu componente
            this.newUser.profilePicture = result.assets[0].uri;
            return true;
        } else {
            return false;
        }
    };

    takeProfilePicture = async () => {
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            // Aquí puedes guardar la imagen tomada en el estado de tu componente
            this.newUser.profilePicture = result.assets[0].uri;
            return true;
        } else {
            return false;
        }
    };

    handleRegistration = () => {
        return new Promise((resolve, reject) => {
            if (!this.checkParams()) {
                resolve();
                return;
            }

            const registerUser = () => {
                return new Promise((resolve, reject) => {
                    const registerPromise = AuthService.register(this.newUser);

                    if (this.newUser.profilePicture) {
                        // Save image and register user only if the user is new
                        registerPromise
                            .then((user) => {
                                // Add contact info after user registration
                                const contactInfoPromises = this.newUser.contact_inf_list.map(element => {
                                    return UserService.addContact_inf_list(user.id_user, element.platform.id_contact_inf, element.account);
                                });
                                return Promise.all(contactInfoPromises)
                                    .then(() => UserService.saveImage(this.newUser.profilePicture, user.id_user)); // Save image after adding contact info
                            })
                            .then(() => {
                                resolve();
                            })
                            .catch((error) => {
                                console.error("Error saving image:", error);
                                reject(error);
                            });
                    } else {
                        // Register user without saving image
                        registerPromise
                            .then((user) => {
                                const contactInfoPromises = this.newUser.contact_inf_list.map(element => {
                                    return UserService.addContact_inf_list(user.id_user, element.platform.id_contact_inf, element.account);
                                });
                                return Promise.all(contactInfoPromises)
                            })
                            .then(() => {
                                resolve();
                            })
                            .catch((error) => {
                                console.error("Error registering user:", error);
                                reject(error);
                            });
                    }
                });
            };

            registerUser()
                .then(() => {
                    this.msg = "Usuario registrado con éxito";
                    this.modalVisible = true;
                    this.function = () => {
                        this.props.navigation.navigate('Iniciar sesión');
                    };
                    resolve();
                })
                .catch((error) => {
                    if (error == "Usuario existente") {
                        this.msg = "Usuario existente";
                        this.modalVisible = true;
                    } else {
                        console.log("Error registering user:", error);
                        this.msg = "Ocurrio un error";
                        this.modalVisible = true;
                    }
                    resolve();
                });
        });
    };

    checkParams = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!this.toggleValue) {
            this.msg = "Debe aceptar los terminos"
            this.modalVisible = true
            return false;
        }

        if (!this.newUser.name || !this.newUser.email || !this.newUser.password || !this.newUser.contact_inf_list[0].account) {
            this.msg = "Por favor complete todos los campos requeridos";
            this.modalVisible = true;
            return false;
        }

        if (this.newUser.password.length < 8) {
            this.msg = "Contraseña demasiado corta";
            this.modalVisible = true;
            return false;
        }

        if (!emailRegex.test(this.newUser.email)) {
            this.msg = "Por favor ingrese un correo electrónico válido";
            this.modalVisible = true;
            return false;
        }

        return true;
    };

    saveUser = async (user) => {
        return new Promise((resolve, reject) => {
            UserService.save(user)
                .then(function (id_createdUser) {
                    UserService.addContact_inf_list({ id_user: id_createdUser, contact_inf_list: user.contact_inf_list });
                    resolve();
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }
}