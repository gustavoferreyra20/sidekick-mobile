import axios from 'axios';
import { SIDEKICK_API } from "@env"

class GameService {

  static async getAll() {
    return new Promise((resolve, reject) => {
      axios.get(`${SIDEKICK_API}games`)
        .then((res) => {
          resolve(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

}

export default GameService;
