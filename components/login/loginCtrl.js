export default class LoginController {
  constructor(onLogin) {
    this.email = '';
    this.password = '';
    this.onLogin = onLogin;
  }

  handleLogin = () => {
    console.log(`Email: ${this.email}`);
    console.log(`Password: ${this.password}`);
    this.onLogin();
  };
}