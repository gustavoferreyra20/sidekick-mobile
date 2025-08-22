import axios from 'axios';

class AuthService {
  static async login(obj) {
    const url = `https://sidekick-server-nine.vercel.app/api/auth/login`;
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

  static async resetPassword(obj) {
    const url = `https://sidekick-server-nine.vercel.app/api/auth/resetPassword`;

    return new Promise((resolve, reject) => {
      axios.post(url, obj)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
          reject("Error en el registro");
        });
    });
  }

  static async register(obj) {
    const url = `https://sidekick-server-nine.vercel.app/api/auth/register`;

    return new Promise((resolve, reject) => {
      axios.post(url, obj)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          if (error.response && error.response.status === 409) {
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