import axiosInstance from '../../middleware/axiosInstance ';

class Contact_infService {

  static async getAll() {
    return new Promise((resolve, reject) => {
      axiosInstance.get('contact_inf')
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