import axiosInstance from '../../middleware/axiosInstance ';
import { SIDEKICK_API } from "@env"

class UserService {

  static async get(id_user) {
    return new Promise((resolve, reject) => {

      axiosInstance.get('users/' + id_user)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async getApplications(id_user, type) {
    return new Promise((resolve, reject) => {

      axiosInstance.get('users/' + id_user + '/applications?type=' + type)
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

      axiosInstance.get('users/' + id_user + '/reviews')
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

      axiosInstance.get('users/' + id_user + '/stats')
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async addReview(id_user, data, sessionId) {
    return new Promise((resolve, reject) => {
      const url = 'users/' + id_user + '/reviews/' + sessionId;

      axiosInstance.put(url, data)
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async addReview(id_user) {
    return new Promise((resolve, reject) => {
      const url = 'users/' + id_user + '/rewards';

      axiosInstance.put(url, data)
        .catch(function (error) {
          console.log(error);
        });
    });
  }


  static async saveImage(file) {
    return new Promise((resolve, reject) => {
      const url = `${SIDEKICK_API}imageupload`;

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
        return response.json();
      })
        .then((data) => {
          resolve(data)
        }).catch(console.error)
    })
  }

  static async addContact_inf_list(id_user, id_contact_inf, nickname) {
    return new Promise((resolve, reject) => {
      const url = 'auth/' + id_user + '/contact_inf/' + id_contact_inf;

      const data = {
        nickname: nickname
      };

      axiosInstance.post(url, data)
        .catch(function (error) {
          console.log(error);
        });
    });
  }

}

export default UserService;
