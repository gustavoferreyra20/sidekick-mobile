export default class LoginController {
  constructor() {
    this.email = '';
    this.password = '';
  }

  handleEmailChange = (text) => {
    this.email = text;
  };

  handlePasswordChange = (text) => {
    this.password = text;
  };

  handleLogin = () => {
    console.log(`Email: ${this.email}`);
    console.log(`Password: ${this.password}`);
  };
}