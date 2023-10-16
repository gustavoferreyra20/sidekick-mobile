import axios from 'axios';
import { SIDEKICK_API } from "@env";
import { log } from 'react-native-reanimated';

class GameService {
  static async getAll() {
    return new Promise((resolve, reject) => {
      axios.get(`${SIDEKICK_API}games`)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }

  static async getOne(condition) {
    return new Promise((resolve, reject) => {
      const url = `${SIDEKICK_API}games/bo`;
      const params = new URLSearchParams(condition);

      axios.get(`${url}?${params}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }

  static async getOptions(any = false) {
    try {
      const games = await this.getAll();
      const options = [];

      if (any) {
        options.push({ value: "any", name: "Cualquier juego" });
      }

      for (let i = 0; i < games.length; i++) {
        if (games[i]) {
          options.push({ value: games[i].id_game, name: games[i].name });
        }
      }

      return options;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

export default GameService;