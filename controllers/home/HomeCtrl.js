import { Component } from 'react';
import GameService from '../../services/GameService';
import PostService from '../../services/PostService';
import UserService from '../../services/UserService';

export default class HomeCtrl extends Component {
    constructor(props) {
        super(props);
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => {};
        this.modalVisible = false;
    }

    fetchGameOptions = async () => {
        return await GameService.getOptions(true);
    };

    setPlatforms = async (game) => {
        if (!game || !game.full || !Array.isArray(game.full.platforms)) return [];
        return game.full.platforms.map(p => ({
            value: p.id,
            name: p.name
        }));
    };

    fetchModeOptions = async (game) => {
        if (!game || !game.full || !Array.isArray(game.full.game_modes)) return [];
        return game.full.game_modes
          .filter(m => m.name.toLowerCase() !== "single player")
          .map(m => ({
              value: m.id,
              name: m.name
          }));
    };

    getPosts = async () => {
        return await PostService.getAll();
    };

    btnSearchPost = async (gameValue, platformValue, modeValue) => {
        const params = {};

        if (gameValue && gameValue !== "any") params.id_game = gameValue;
        if (platformValue && platformValue !== "any") params.id_platform = platformValue;
        if (modeValue && modeValue !== "any") params.id_mode = modeValue;

        return await PostService.getAll(params);
    };

    submitApplication = async (id_post, id_owner, id_user) => {
        try {
            if (id_owner === id_user) {
                this.msg = "No puedes unirte a tus posts";
                this.modalVisible = true;
                return;
            }

            const res = await UserService.getApplications(id_user, 'sent');

            if (res.some(item => item.id_post === id_post)) {
                this.msg = "Ya existe una solicitud";
                this.modalVisible = true;
                return;
            }

            await PostService.addApplication(id_post);
            this.msg = "Solicitud enviada";
            this.modalVisible = true;

        } catch (error) {
            this.msg = "Error inesperado. Intente nuevamente.";
            this.modalVisible = true;
        }
    };
}
