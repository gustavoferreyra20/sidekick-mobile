import GameService from './GameService';

class GamesCtrl {

    handleGetGames = () => {
        return new Promise((resolve, reject) => {
            GameService.getAll().then((data) => {
                resolve(data)
            });
        });

    }

}

export default GamesCtrl;