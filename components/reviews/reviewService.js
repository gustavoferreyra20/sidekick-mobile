import axios from 'axios';
import { SIDEKICK_API } from "@env";

class ReviewService {
  static async getAll(args = null) {
    return new Promise((resolve, reject) => {
      var url = `${SIDEKICK_API}reviews`;
      const params = new URLSearchParams(args);

      if (args !== null) {
        url = `${url}/join?${params}`;
      }

      axios.get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async getAvg(args) {
    return new Promise((resolve, reject) => {
      const url = `${SIDEKICK_API}reviews/avg?`;
      const params = new URLSearchParams(args);

      axios.get(`${url}${params}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async save(data) {
    return new Promise((resolve, reject) => {
      const url = `${SIDEKICK_API}reviews`;

      axios.post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
}

export default ReviewService;