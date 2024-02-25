import axiosInstance from '../../middleware/axiosInstance ';

class ContactInfService {

  static async getAll() {
    return new Promise((resolve, reject) => {
      axiosInstance.get('ContactInf')
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