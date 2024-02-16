import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../assets/scripts/styles';

const NotificationItem = ({ notification, onDelete }) => {
    return (
        <View >
            <View style={styles.notificationContainer}>
                <View style={styles.row}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.description}>{notification.message}</Text>
                    </View>
                    <View style={styles.usersContainer}>
                        <View style={{ minWidth: 50 }}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#dc3545' }]}
                                onPress={() => onDelete(notification.id_notification)}
                            >
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </View>
                <View style={styles.line} />
        </View>

    );
};

export default NotificationItem;
