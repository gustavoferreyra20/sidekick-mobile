import GameService from '../../services/GameService';

class GamesCtrl {
    handleGetGames = async (limit = 20, offset = 0, sortBy = 'updated_at', sortOrder = 'desc') => {
        const res = await GameService.getAll(limit + 1, offset, sortBy, sortOrder);
        const rows = (res && res.games) ? res.games : [];

        return {
            games: rows.slice(0, limit),
            hasNext: rows.length > limit,
        };
    };
}

export default GamesCtrl;