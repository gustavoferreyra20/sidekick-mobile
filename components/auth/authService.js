import axios from 'axios';
import { SIDEKICK_API } from "@env";

class AuthService {
  static async login(obj) {
    const url = `${SIDEKICK_API}auth/login`;
    const data = {
      email: obj.email,
      password: obj.password,
    };

    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then((res) => {
          if (res.data) {
            let userSession = res.data;
            resolve(userSession);
          } else {
            reject("Usuario y/o contraseña incorrectas");
          }
        })
        .catch(function (error) {
          console.log(error);
          reject("Usuario y/o contraseña incorrectas");
        });
    });
  }

  static async register(obj) {
    const url = `${SIDEKICK_API}auth/register`;

    return new Promise((resolve, reject) => {
      axios.post(url, obj)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error.response && error.response.status === 400) {
            reject("Usuario existente");
          } else {
            console.log(error);
            reject("Error en el registro");
          }
        });
    });
  }
}

export default AuthService;