import AxiosInstance from '../../middleware/AxiosInstance';

class ContactInfService {

  static async getAll() {
    return new Promise((resolve, reject) => {
      AxiosInstance.get('contact_inf')
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

export default ContactInfService;