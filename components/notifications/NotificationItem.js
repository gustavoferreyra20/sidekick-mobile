import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/scripts/styles';
import {Ionicons} from "@expo/vector-icons";

const NotificationItem = ({ notification, onDelete }) => {
  return (
    <View style={{ alignItems: 'center', marginVertical: 6 }}>
      <View style={[styles.notificationContainer, { width: '90%' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>

          <View style={{ flex: 0.8, flexShrink: 1 }}>
            <Text
              style={styles.description}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {notification.message}
            </Text>
          </View>

          <View style={{ flex: 0.2, alignItems: 'flex-end', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => onDelete(notification.id_notification)}
              activeOpacity={0.6}
            >
              <Ionicons name="trash" size={24} color="#ff6b6b" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationItem;
