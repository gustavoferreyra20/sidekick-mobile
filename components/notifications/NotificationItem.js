import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../../assets/scripts/styles';

const NotificationItem = ({notification, onDelete}) => {
    return (
        <View>
            <View style={styles.notificationContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.description}>{notification.message}</Text>
                </View>

                <View style={{ marginTop: 8 }}>
                    <TouchableOpacity
                        style={[styles.modernButton, { backgroundColor: '#dc3545', width: '90%' }]}
                        onPress={() => onDelete(notification.id_notification)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.line} />
        </View>

    );
};

export default NotificationItem;
