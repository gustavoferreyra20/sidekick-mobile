import AxiosInstance from '../../middleware/AxiosInstance';

class GameService {

  static async getAll() {
    return new Promise((resolve, reject) => {
      AxiosInstance.get(`games`)
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

  static async getPlatforms(id_game) {
    try {
      return new Promise((resolve, reject) => {
        AxiosInstance.get('games/' + id_game + '/platforms')
          .then((res) => {
            resolve(res.data);
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

export default GameService;