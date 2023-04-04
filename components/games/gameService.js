import axios from 'axios';
import { SIDEKICK_API } from "@env"

class GameService {

  static async getAll() {
    try {
      const response = await axios.get(`${SIDEKICK_API}games`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}

module.exports = GameService;
