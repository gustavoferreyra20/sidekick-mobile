import Contact_infService from '../contact_inf/contact_infService';
import * as ImagePicker from 'expo-image-picker';

export default class RegistrationController {
    constructor() {
        this.name = '';
        this.email = '';
        this.description = '';
        this.password = '';
        this.profilePicture = '';
        this.contact_inf_list = [],
            this.contactOptions = [],
            this.toggleValue = false;
    }

    handleGetOptions = () => {
        return new Promise((resolve, reject) => {
            Contact_infService.getAll().then((data) => {
                this.contactOptions = data;
                this.contact_inf_list = [{ platform: data[0], account: '' }];
                resolve();
            });
        });

    }

    handleRemoveAccount = () => {
        this.contact_inf_list.pop();
        return Promise.resolve();
    }

    handleAddAccount = () => {
        return new Promise((resolve, reject) => {
            Contact_infService.getAll().then((data) => {
                this.contact_inf_list.push({ platform: data[0], account: '' });
                resolve();
            });
        });
    }

    pickProfilePicture = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
            // Aquí puedes guardar la imagen seleccionada en el estado de tu componente
            this.profilePicture = result.assets[0].uri;
            console.log(this.profilePicture)
            return true;
        } else {
            return false;
        }
    };

    takeProfilePicture = async () => {
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            // Aquí puedes guardar la imagen tomada en el estado de tu componente
            this.profilePicture = result.assets[0].uri;
            console.log(this.profilePicture)
            return true;
        } else {
            return false;
        }
    };

    handleRegistration = () => {
        console.log(`name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Description: ${this.description}`);
        console.log(`Password: ${this.password}`);
        console.log(`ToggleValue: ${this.toggleValue}`);
        console.log(`contact_inf: ${JSON.stringify(this.contact_inf_list)}`);
    };
}