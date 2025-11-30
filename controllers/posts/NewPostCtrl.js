import {Component} from 'react';

// Import your services
import GameService from '../../services/GameService'; // Update the import paths accordingly
import PostService from '../../services/PostService';

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

  setPlatforms = async (game) => {
    if (!game || !game.full) return [];
    return game.full.platforms.map(p => ({
      value: p.id,
      name: p.name
    }));
  };

  setModes = async (game) => {
    if (!game || !game.full) return [];

    return game.full.game_modes
      .filter(m => m.name.toLowerCase() !== "single player")
      .map(m => ({
        value: m.id,
        name: m.name
      }));
  };

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