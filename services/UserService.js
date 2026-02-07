import AxiosInstance from '../middleware/AxiosInstance';


class UserService {

  static async get(id_user) {
    return new Promise((resolve, reject) => {

      AxiosInstance.get('users/' + id_user)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async getContactInf(id_user) {
    return new Promise((resolve, reject) => {

      AxiosInstance.get(`users/${id_user}/contact_inf`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static async getNotifications(id_user) {
    return new Promise((resolve, reject) => {

      AxiosInstance.get(`users/${id_user}/notifications`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  static async getApplications(id_user, type) {
    return new Promise((resolve, reject) => {

      AxiosInstance.get('users/' + id_user + '/applications?type=' + type)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async getReviews(id_user) {
    return new Promise((resolve, reject) => {

      AxiosInstance.get('users/' + id_user + '/reviews')
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async getStats(id_user) {
    return new Promise((resolve, reject) => {

      AxiosInstance.get('users/' + id_user + '/stats')
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async getRewards(id_user) {
    return new Promise((resolve, reject) => {

      AxiosInstance.get('users/' + id_user + '/rewards')
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async addReview(review) {
    return new Promise((resolve, reject) => {
      const url = 'users/' + review.id_user + '/reviews/';

      AxiosInstance.post(url, review)
        .then(response => {
          resolve(response.data);  // Resolve with the response data
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async saveImage(file, id_user) {
    return new Promise((resolve, reject) => {
      const url = `https://sidekick-server-nine.vercel.app/api/images/${id_user}`;

      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = file;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append('file', { uri: localUri, name: filename, type });

      fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response.status === 200) {
          resolve("Image uploaded successfully");
        } else if (response.status === 404) {
          reject("404 - Not found");
        } else {
          reject("Error uploading image");
        }
      }).catch((error) => {
        reject(error);
      });
    })
  }

  static async addContact_inf_list(id_user, id_contact_inf, nickname) {
    return new Promise((resolve, reject) => {
      const url = 'auth/' + id_user + '/contact_inf/' + id_contact_inf;

      const data = {
        nickname: nickname
      };

      AxiosInstance.post(url, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async update(id_user, data) {
    return AxiosInstance.put('users/' + id_user, data)
      .catch(function (error) {
        console.log(error);
      });
  }

  static async checkPassword(id_user, originalPassword) {
    return new Promise((resolve, reject) => {
      AxiosInstance.post('users/' + id_user + '/checkPassword', originalPassword)
        .then((res) => {
          resolve(res.data.match);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async getAIReview(id_user) {
    return new Promise((resolve, reject) => {
      AxiosInstance.get('users/' + id_user + '/ai-review')
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          // 404 is expected when user has no AI review record
          if (error.response && error.response.status !== 404) {
            console.log(error);
          }
          resolve(null);
        });
    });
  }
}

export default UserService;
