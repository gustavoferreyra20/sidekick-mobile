import React from 'react';
import { View, Text, TouchableOpacity, Button } from 'react-native';
import styles from '../../assets/scripts/styles';

const SentApp = ({ item, onCancelApplication, contact }) => {
  return (
    <View >
      <View style={styles.sendedAppContainer}>
        <View style={styles.row}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.usersContainer}>
            <Text style={styles.usersText}>
              {item.actualusers} / {item.requiredusers}
            </Text>
          </View>
        </View>

        {item.applications.status === 'complete' ? (
          <Text style={styles.text}>Partida finalizada</Text>
        ) : null}

        {item.applications.status === 'rejected' ? (
          <Text style={styles.text}>Solicitud rechazada</Text>
        ) : null}

        {item.applications.status === 'accepted' ? (
          <View>
            <Text style={styles.text}>Solicitud aceptada</Text>
            <View style={styles.buttonContainerColumns}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#008CBA' }]}
                onPress={() => contact(item.id_user)}
              >
                <Text style={styles.buttonText}>Contactar</Text>
              </TouchableOpacity>
            </View>
          </View>

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