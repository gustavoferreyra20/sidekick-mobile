import { Component } from 'react';

// Import your services
import GameService from '../games/gameService';
import PostService from '../posts/postService';
import ModeService from '../modes/modeService';
import PlatformService from '../platforms/platformService';

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
}