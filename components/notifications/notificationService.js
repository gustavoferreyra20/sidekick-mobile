import UserService from '../users/userService';

class NotificationService {
    // Define hasNotifications as a static property
    static hasNotifications = false;

    // Define the checkNotifications function
    static checkNotifications = () => {
        UserService.getNotifications(userSession.id)
            .then(function (response) {
                NotificationService.hasNotifications = response.filter(notification => notification.status === 'unread').length > 0;

                if (NotificationService.hasNotifications) {
                    /*                     var notificationTab = document.getElementById('notification-tab');
                    
                                        var existingDot = document.getElementById('notification-dot');
                    
                                        if (!existingDot && notificationTab) {
                                            var dotSpan = document.createElement('span');
                                            dotSpan.className = 'dot';
                                            dotSpan.id = 'notification-dot';
                    
                                            notificationTab.appendChild(dotSpan);
                                        } */
                    console.log("Hay notificaciones")
                } else {
                    /*       var notificationTab = document.getElementById('notification-tab');
                          var existingDot = document.getElementById('notification-dot');
      
                          if (existingDot) {
                              notificationTab.removeChild(existingDot);
                          } */
                    console.log("No hay notificaciones")
                }

            })
            .catch(function (error) {
                console.error('Error checking notifications:', error);
            });
    };

    // Start polling for notifications every 5 seconds
    static intervalPromise = setInterval(NotificationService.checkNotifications, 5000);

    // Define the hasNotifications static method
    static hasNotifications() {
        return NotificationService.hasNotifications;
    }

    // Define the setNotifications static method
    static setNotifications(value) {
        NotificationService.hasNotifications = value;
    }
}

export default NotificationService;