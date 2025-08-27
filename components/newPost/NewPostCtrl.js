import { Component } from 'react';

// Import your services
import GameService from '../games/GameService'; // Update the import paths accordingly
import PostService from '../posts/PostService';
import ModeService from '../modes/ModeService';
import PlatformService from '../platforms/PlatformService';

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
      this.showModal("Anuncio creado con éxito");
      reloadForm();
    } catch (error) {
      this.showModal("Error al guardar el anuncio. Por favor, intente de nuevo");
    }
  }

  showModal = (msg, type = "action") => {
    this.msg = msg;
    this.modalType = type;
    this.modalVisible = true;
  };
}