import axios from 'axios';
import { SIDEKICK_API } from "@env";

class PostService {
  static async getAll(args = null) {
    return new Promise((resolve, reject) => {
      var url = `${SIDEKICK_API}posts`;

      if (args !== null) {
        const params = new URLSearchParams(args);
        url = `${url}/bo?${params}`;
      }

      axios.get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async save(post) {
    const url = `${SIDEKICK_API}posts`;
    let data = {
      id_user: post.id_user,
      id_game: post.gameSelected,
      id_platform: post.platformSelected,
      id_mode: post.modeSelected,
      requiredUsers: post.userRequire,
      actualUsers: 0,
      title: post.title,
      description: (post.description != null) ? post.description : ''
    };

    await axios.post(url, data)
      .catch(function (error) {
        console.log(error);
      });
  }

  static async remove(id_post) {
    const url = `${SIDEKICK_API}posts/bo?id_post=${id_post}`;
    await axios.delete(url)
      .catch(function (error) {
        console.log(error);
      });
  }

  static async getApplications(args) {
    return new Promise((resolve, reject) => {
      var url = `${SIDEKICK_API}posts/join?`;
      const params = new URLSearchParams(args);

      axios.get(`${url}${params}`)
        .then((res) => {
          resolve(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async removeApplication(id_post, id_user) {
    const url = `${SIDEKICK_API}posts/join?id_post=${id_post}&id_user=${id_user}`;
    await axios.delete(url)
      .catch(function (error) {
        console.log(error);
      });
  }

  static async addApplication(args) {
    const url = `${SIDEKICK_API}posts/join?`;
    const params = new URLSearchParams(args);

    await axios.put(`${url}${params}`)
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default PostService;