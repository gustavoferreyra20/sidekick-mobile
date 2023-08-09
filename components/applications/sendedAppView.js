import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from '../../assets/styles';
import { SIDEKICK_API } from "@env"

const SendedApp = ({ item, onCancelApplication }) => {
  return (
    <View style={styles.sendedAppContainer}>
      <View style={styles.row}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.usersContainer}>
          <Text style={styles.usersText}>
            {item.actualUsers} / {item.requiredUsers}
          </Text>
        </View>
      </View>
      <View style={styles.line} />

      {item.applications.status === 'rejected' ? (
        <Text style={styles.text}>Solicitud rechazada</Text>
      ) : null}

      {item.applications.status === 'accepted' ? (
        <Text style={styles.text}>Solicitud aceptada</Text>
      ) : null}

      <View style={styles.cancelButton} >
        <Button title="Cancelar" color={"#dc3545"} onPress={() => onCancelApplication(item.id_post)} />
      </View>
    </View>
  );
};

export default SendedApp;