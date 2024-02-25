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

    submitApplication = (id_post, id_user) => {
        return new Promise((resolve, reject) => {
            UserService.getApplications(id_user, 'sent').then((res) => {

                if (res.some((item) => item.id_post === id_post)) {
                    this.msg = "Ya existe una solicitud pendiente";
                    this.modalVisible = true;
                    resolve();
                    return;
                } else {
                    PostService.addApplication(id_post, id_user)
                        .then(() => {
                            this.msg = "Solicitud enviada";
                            this.modalVisible = true;
                            resolve();
                            return;
                        });
                }
            });
        });
    }

}