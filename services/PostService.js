import AxiosInstance from '../middleware/AxiosInstance';

class PostService {
  static async getAll(args = null) {
    return new Promise((resolve, reject) => {
      var url = `posts`;

      if (args !== null) {
        const params = new URLSearchParams(args);
        url = `${url}?${params}`;
      }

      AxiosInstance.get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  static async save(post) {
    try {
      const url = `posts`;

      const data = {
        id_user: post.id_user,
        id_game: post.gameSelected,
        id_platform: post.platformSelected,
        id_mode: post.modeSelected,
        requiredusers: post.userRequire,
        actualusers: 0,
        title: post.title,
        description: post.description ?? ''
      };

      console.log("Saving post:", data);

      const response = await AxiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async remove(id_post) {
    await AxiosInstance.delete('posts/' + id_post)
      .catch(function (error) {
        console.log(error);
      });
  }

  static async removeApplication(id_post, id_application) {
    const url = 'posts/' + id_post + '/applications/' + id_application;
    await AxiosInstance.delete(url)
      .catch(function (error) {
        console.log(error);
      });
  }

  static async addApplication(id_post) {
    const url = 'posts/' + id_post + '/applications';

    await AxiosInstance.post(url, null)
      .catch(function (error) {
        console.log(error);
      });
  }

  static async updateApplication(id_post, id_application, status) {
    const url = 'https://sidekick-server-nine.vercel.app/api/posts/' + id_post + '/applications/' + id_application + '?status=' + status;

    await AxiosInstance.put(url)
      .catch(function (error) {
        console.log(error);
      });
  }
}

export default PostService;