import axiosInstance from '../../middleware/axiosInstance ';

class NotificationService {
    static async removeNotification(id_notification) {
        const url = 'notifications/' + id_notification;
        await axiosInstance.delete(url)
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default NotificationService;