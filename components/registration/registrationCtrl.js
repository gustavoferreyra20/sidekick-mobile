import Contact_infService from '../contact_inf/contact_infService';
import UserService from '../users/userService';
import * as ImagePicker from 'expo-image-picker';

export default class RegistrationController {
    constructor() {
        this.newUser = {
            name: '',
            email: '',
            description: '',
            password: '',
            contact_inf_list: []
        }

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
        let conditions = {
            email: this.newUser.email
        }

        UserService.get(conditions)
            .then((existentUser) => {

                if (!this.toggleValue) {
                    return console.log("Debe aceptar los terminos");
                }

                if (!this.newUser.name.length || !this.newUser.email.length || !this.newUser.password.length || !this.newUser.contact_inf_list[0].account.length) {
                    return console.log('Por favor complete todos los campos requeridos');
                }

                if (this.newUser.password.length < 8) {
                    return console.log("Contraseña demasiado corta");
                }

                if (existentUser.length > 0) {
                    return console.log("Usuario existente");
                }

                if (this.newUser.profilePicture != undefined) {
                    console.log("Guardar foto");
                }

                console.log(`New user: ${JSON.stringify(this.newUser)}`);
            });

    };
}