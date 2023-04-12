export default class RegistrationController {
    constructor() {
        this.name = '';
        this.email = '';
        this.description = '';
        this.password = '';
        this.toggleValue = false;
    }

    handleRegistration = () => {
        console.log(`name: ${this.name}`);
        console.log(`Email: ${this.email}`);
        console.log(`Description: ${this.description}`);
        console.log(`Password: ${this.password}`);
        console.log(`ToggleValue: ${this.toggleValue}`);
    };

    handleNameChange = (text) => {
        this.name = text;
    };

    handleEmailChange = (text) => {
        this.email = text;
    };

    handleDescriptionChange = (text) => {
        this.description = text;
    };

    handlePasswordChange = (text) => {
        this.password = text;
    };

    toggleSwitch = (bool) => {
        this.toggleValue = bool;
    };

}