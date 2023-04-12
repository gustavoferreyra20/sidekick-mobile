export default class LoginController {
  constructor(onLogin) {
    this.email = '';
    this.password = '';
    this.onLogin = onLogin;
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
    this.onLogin();
  };
}