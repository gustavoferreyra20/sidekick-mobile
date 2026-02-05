import AxiosInstance from '../middleware/AxiosInstance';

class ChatService {

  static async getHistory(postId) {
    return new Promise((resolve) => {
      AxiosInstance.get(`/chat/history?postId=${Number(postId)}`)
        .then((res) => {
          resolve(res.data?.history || []);
        })
        .catch((err) => {
          console.log('[ChatService] getHistory error', err);
          resolve([]);
        });
    });
  }

  static async sendMessage(postId, message) {
    return new Promise((resolve) => {
      AxiosInstance.post('/chat/message', {
        postId: Number(postId),
        message: String(message ?? ''),
      })
        .then((res) => {
          resolve(res.data || {ok: true});
        })
        .catch((err) => {
          console.log('[ChatService] sendMessage error', err);
          resolve({ok: false, error: 'send_failed'});
        });
    });
  }

  static async getAblyToken(postId) {
    return new Promise((resolve) => {
      AxiosInstance.get(`/chat/ably-token?postId=${Number(postId)}`)
        .then((res) => resolve(res.data))
        .catch((err) => {
          console.log('[ChatService] getAblyToken error', err);
          resolve(null);
        });
    });
  }
}

export default ChatService;