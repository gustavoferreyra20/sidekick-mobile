import Contact_infService from '../contact_inf/contact_infService';

export default class RegistrationController {
    constructor() {
        this.name = '';
        this.email = '';
        this.description = '';
        this.password = '';
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


    handleRegistration = () => {
        console.log(`name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Description: ${this.description}`);
        console.log(`Password: ${this.password}`);
        console.log(`ToggleValue: ${this.toggleValue}`);
        console.log(`contact_inf: ${JSON.stringify(this.contact_inf_list)}`);
    };
}