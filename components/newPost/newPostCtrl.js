import { Component } from 'react';

// Import your services
import GameService from '../games/GameService'; // Update the import paths accordingly
import PostService from '../posts/postService';
import ModeService from '../modes/modeService';
import PlatformService from '../platforms/platformService';

export default class NewPostCtrl extends Component {

  constructor(props) {
    super(props);
    this.msg = "";
    this.modalType = "alert";
    this.modalFunction = () => { };
    this.modalVisible = false;
  }

  fetchGameOptions = async () => {
    return await GameService.getOptions(false);
  }

  fetchModeOptions = async () => {
    return await ModeService.getOptions(false);
  }

  setPlatforms = async (arg = null) => {
    const game = (arg != null) ? arg : null;

    return await PlatformService.getOptions(game, false);
  }

  createPost = async (postData, reloadForm) => {
    if (!postData.title.length) {
      this.modalType = "alert";
      this.msg = "Por favor complete todos los campos requeridos";
      this.modalVisible = true;
      return;
    }

    try {
      await PostService.save(postData);
      this.modalType = "action";
      this.msg = "Anuncio creado con exito";
      this.modalVisible = true;
      reloadForm();
    } catch (error) {
      console.error("Error saving post:", error);
      // Handle error as needed
    }

  }
}