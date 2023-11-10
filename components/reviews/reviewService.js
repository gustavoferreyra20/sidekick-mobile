import axiosInstance from '../../middleware/axiosInstance ';

class ReviewService {
  static async addReward(id_review, id_reward) {
    return new Promise((resolve, reject) => {
      const url = 'reviews/' + id_review + '/rewards/' + id_reward;

      axiosInstance.post(url)
        .then((res) => {
          resolve(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
}

export default ReviewService;