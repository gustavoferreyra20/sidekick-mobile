import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
              <View style={{ marginTop: 8 }}>
                <TouchableOpacity
                    style={[styles.modernButton, { backgroundColor: '#008CBA', width: '100%' }]}
                    onPress={() => contact(item.id_user)}
                    activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Contactar</Text>
                </TouchableOpacity>
              </View>
            </View>
        ) : null}

        <View>
          <TouchableOpacity
              style={[styles.modernButton, { backgroundColor: '#dc3545', width: '100%' }]}
              onPress={() => onCancelApplication(item.id_post, item.applications.id_application)}
              activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={styles.line} />
    </View>
  );
};

export default SentApp;