import UserService from '../users/userService';

class NotificationController {

  getNotifications = async (id_user) => {
    return new Promise((resolve, reject) => {
      UserService.getNotifications(id_user).then((data) => {
        resolve(data)
      });
    });
  };
}

export default NotificationController;