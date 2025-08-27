import { Component } from 'react';

// Import your services
import GameService from '../games/GameService';
import PostService from '../posts/PostService';
import ModeService from '../modes/ModeService';
import PlatformService from '../platforms/PlatformService';
import UserService from '../users/UserService';

export default class HomeCtrl extends Component {
    constructor(props) {
        super(props);
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => { };
        this.modalVisible = false;
    }

    fetchGameOptions = async () => {
        return await GameService.getOptions(true);
    }

    fetchModeOptions = async () => {
        return await ModeService.getOptions(true);
    }

    setPlatforms = async (arg = null) => {
        const game = (arg != null) ? arg : null;

        return await PlatformService.getOptions(game, true);
    }

    getPosts = async () => {
        return await PostService.getAll();
    }

    btnSearchPost = async (game, platform, mode) => {
        const params = {};

        if (game !== 'any') {
            params.id_game = game;
        }

        if (platform !== 'any') {
            params.id_platform = platform;
        }

        if (mode !== 'any') {
            params.id_mode = mode;
        }

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

            if (res.some((item) => item.id_post === id_post)) {
                this.msg = "Ya existe una solicitud";
                this.modalVisible = true;
                return;
            }

            await PostService.addApplication(id_post);
            this.msg = "Solicitud enviada";
            this.modalVisible = true;

        } catch (error) {
            console.error("Error en submitApplication:", error);
            this.msg = "Ocurrió un error, intenta nuevamente";
            this.modalVisible = true;
        }
    };

}