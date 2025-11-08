import AxiosInstance from '../../middleware/AxiosInstance';

class GameService {

  static async getAll(limit = 10, offset = 0, sortBy = 'updated_at', sortOrder = 'desc') {
    return new Promise((resolve, reject) => {
      AxiosInstance.get(`/games/igdb?limit=${limit}&offset=${offset}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log("errorservice: ", error);
          reject(error);
        });
    });
  }

  static async getOptions(any = false) {
    try {
      const res = await this.getAll();
      const games = res.games;
      const options = [];

      if (any) {
        options.push({ value: "any", name: "Cualquier juego" });
      }

      for (let i = 0; i < games.length; i++) {
        if (games[i]) {
          options.push({
            value: games[i].id,
            name: games[i].name,
            full: games[i]
          });
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