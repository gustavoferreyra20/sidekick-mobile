import axios from 'axios';
import { SIDEKICK_API } from "@env"

class UserService {

  static async get(condition) {
    return new Promise((resolve, reject) => {
      const url = `${SIDEKICK_API}users/bo?`;
      const params = new URLSearchParams(condition);

      axios.get(url + params)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async save(obj) {
    return new Promise((resolve, reject) => {
      const url = `${SIDEKICK_API}users`;

      axios.post(url, obj)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async addContact_inf_list(args) {
    return new Promise((resolve, reject) => {
      const url = `${SIDEKICK_API}users/join?`;

      axios.put(url, args)
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

  static async login(obj) {
    return new Promise((resolve, reject) => {
      this.get(obj).then((res) => {
        // create the cookie
        if (res.length > 0) {
          console.log(res)
          resolve(true)
        } else {
          resolve(false)
        }
      })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

}

export default UserService;
