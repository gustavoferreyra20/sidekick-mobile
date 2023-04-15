import axios from 'axios';
import { SIDEKICK_API } from "@env"

class Contact_infService {

  static async getAll(args = null) {
    return new Promise((resolve, reject) => {
      let url = SIDEKICK_API + 'contact_inf';
      const params = new URLSearchParams(args)

      if (args !== null) {
        url = url + '/bo?' + params;
      }

      axios.get(url)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    })
  }
}

export default Contact_infService;