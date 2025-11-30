import AxiosInstance from '../middleware/AxiosInstance';

class NotificationService {
    static async removeNotification(id_notification) {
        const url = 'notifications/' + id_notification;
        await AxiosInstance.delete(url)
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default NotificationService;