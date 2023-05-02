import { Component } from 'react';
import Contact_infService from '../contact_inf/contact_infService';
import UserService from '../users/userService';
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
        this.msg = "",
            this.modalType = "alert",
            this.modalVisible = false,
            this.contactOptions = [],
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
            let conditions = {
                email: this.newUser.email
            }

            UserService.get(conditions)
                .then((existentUser) => {

                    if (!this.toggleValue) {
                        this.msg = "Debe aceptar los terminos"
                        this.modalVisible = true
                        resolve();
                        return
                    }

                    if (!this.newUser.name.length || !this.newUser.email.length || !this.newUser.password.length || !this.newUser.contact_inf_list[0].account.length) {
                        this.msg = "Por favor complete todos los campos requeridos"
                        this.modalVisible = true
                        resolve();
                        return
                    }

                    if (this.newUser.password.length < 8) {
                        this.msg = "Contraseña demasiado corta"
                        this.modalVisible = true
                        resolve();
                        return
                    }

                    if (existentUser.length > 0) {
                        this.msg = "Usuario existente"
                        this.modalVisible = true
                        resolve();
                        return
                    }

                    if (this.newUser.profilePicture != undefined) {
                        console.log("Guardar foto");
                    }

                    console.log(`New user: ${JSON.stringify(this.newUser)}`);
                });
        });

    };
}