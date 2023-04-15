import GameService from './gameService';

class GamesController {

    handleGetGames = () => {
        return new Promise((resolve, reject) => {
            GameService.getAll().then((data) => {
                resolve(data)
            });
        });

    }

}

export default GamesController;