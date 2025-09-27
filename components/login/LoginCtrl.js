import AuthService from '../auth/AuthService';

export default class LoginCtrl {
  constructor(onLogin) {
    this.email = '';
    this.password = '';
    this.onLogin = onLogin;
    this.msg = "";
    this.modalType = "alert";
    this.modalFunction = () => { };
    this.modalVisible = false;
  }

  handleLogin = () => {
    return new Promise((resolve, reject) => {

      if (!this.email.length || !this.password.length) {
        this.msg = "Por favor complete todos los campos requeridos"
        this.modalVisible = true
        resolve();
        return;
      }

      if (this.password.length < 8) {
        this.msg = "Contraseña demasiado corta"
        this.modalVisible = true
        resolve();
        return;
      }

      AuthService.login({ email: this.email, password: this.password })
        .then((response) => {
          this.onLogin(response);
          resolve();
        })
        .catch((error) => {
          if (error.response?.status === 403) {
            this.msg = "¡Casi listo! Revisa tu correo para activar tu cuenta y comenzar a usar la aplicación";
          } else {
            this.msg = "Usuario y/o contraseña incorrectas";
          }
          this.modalVisible = true;
          resolve();
        });
    });
  };
}