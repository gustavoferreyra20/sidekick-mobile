import { Component } from 'react';
import ContactInfService from '../contactInf/ContactInfService';
import UserService from '../users/UserService';
import AuthService from '../auth/AuthService';
import * as ImagePicker from 'expo-image-picker';

export default class RegistrationCtrl extends Component {
    constructor(props) {
        super(props);
        this.newUser = {
            name: '',
            email: '',
            description: '',
            password: '',
            contact_inf_list: [],
            profilePicture: null
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
            ContactInfService.getAll().then((data) => {
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
            ContactInfService.getAll().then((data) => {
                this.newUser.contact_inf_list.push({ platform: data[0], account: '' });
                resolve();
            });
        });
    }

    showTerms = () => {
        return new Promise((resolve, reject) => {
            this.msg = "Al usar nuestro servicio, aceptas cumplir con nuestros términos y condiciones. Esto incluye el respeto a la privacidad y el cumplimiento de las leyes aplicables. Nos reservamos el derecho de realizar cambios en cualquier momento. Gracias por tu comprensión y cooperación.";
            this.modalVisible = true;
            resolve();
        });
    }

    pickProfilePicture = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            // Aquí puedes guardar la imagen seleccionada en el estado de tu componente
            const uri = result.assets[0].uri;
            this.newUser.profilePicture = uri;
            return uri;
        } else {
            return null;
        }
    };

    takeProfilePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            return null;
        }
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            this.newUser.profilePicture = uri;
            return uri;
        } else {
            return null;
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
                                resolve({ error });
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
                                resolve({ error });
                            });
                    }
                });
            };

            registerUser()
                .then((result) => {
                    if (result?.error && result.error === "Usuario existente") {
                        this.msg = "Usuario existente";
                    } else if (result?.error) {
                        this.msg = "Ocurrió un error";
                        console.error("Error registering user:", result.error);
                    } else {
                        this.msg = "Usuario registrado con éxito";
                        this.function = () => this.props.navigation.navigate('Iniciar sesión');
                    }
                    this.modalVisible = true;
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

        if (this.newUser.password !== this.newUser.repeatPassword) {
            this.msg = "Las contraseñas no coinciden";
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