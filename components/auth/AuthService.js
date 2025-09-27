import axios from 'axios';

class AuthService {
  static async login(obj) {
    const url = `https://sidekick-server-nine.vercel.app/api/auth/login`;
    const data = {
      email: obj.email,
      password: obj.password,
    };

    try {
      const res = await axios.post(url, data);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
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