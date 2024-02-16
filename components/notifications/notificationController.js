import UserService from '../users/userService';
import NotificationService from '../notifications/notificationService'

class NotificationController {

  getNotifications = async (id_user) => {
    return new Promise((resolve, reject) => {
      UserService.getNotifications(id_user).then((data) => {
        resolve(data)
      });
    });
  };

  removeNotification = async (id_notification) => {
    return new Promise((resolve, reject) => {
      NotificationService.removeNotification(id_notification).then(() => {
        resolve()
      });
    });
  };
}

export default NotificationController;