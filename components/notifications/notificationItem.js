import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../assets/scripts/styles';

const NotificationItem = ({ notification, onDelete }) => {
    return (
        /*     <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.leftColumn}>
                  <View style={styles.messageContainer}>
                    <Text style={styles.message}>{notification.message}</Text>
                <Text style={styles.grayText}>2 de enero de 2024</Text> 
                  </View>
                </View>
                <View style={styles.rightColumn}>
                  <TouchableOpacity onPress={() => onDelete(notification.id_notification)}>
                    <Text style={styles.deleteButton}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View> */
        <View >
            <View style={styles.sendedAppContainer}>
                <View style={styles.row}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.description}>{notification.message}</Text>
                    </View>
                    <View style={styles.usersContainer}>
                        <View style={{ minWidth: 50 }}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: '#dc3545' }]}
                                onPress={() => nDelete(notification.id_notification)}
                            >
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.line} />
            </View>
        </View>

    );
};

export default NotificationItem;
