import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import styles from '../../assets/scripts/styles';

const SentApp = ({ item, onCancelApplication }) => {
  return (
    <View >
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


        {item.applications.status === 'rejected' ? (
          <Text style={styles.text}>Solicitud rechazada</Text>
        ) : null}

        {item.applications.status === 'accepted' ? (
          <Text style={styles.text}>Solicitud aceptada</Text>
        ) : null}

        <View style={styles.cancelButton} >
          <Button title="Cancelar" color={"#dc3545"} onPress={() => onCancelApplication(item.id_post, item.applications.id_application)} />
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default SentApp;