import api from '../../assets/js/api'

class GameService {

  static async getAll() {
    try {
      const response = await api.get('/games');
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}

module.exports = GameService;
