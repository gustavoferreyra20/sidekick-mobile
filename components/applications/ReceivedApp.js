import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/scripts/styles';
import {Ionicons} from "@expo/vector-icons";

const getPostStatusLabel = (post) => {
  const users = post.users || [];

  const accepted = users.filter(u => u.applications?.status === 'accepted').length;
  const complete = users.filter(u => u.applications?.status === 'complete').length;
  const pending = users.filter(u => u.applications?.status === 'pending').length;

  const isFull = post.actualusers >= post.requiredusers;

  if (isFull && complete > 0 && accepted === 0) return "Partida finalizada";
  if (isFull && accepted > 0) return "Post completo";
  if (!isFull && (accepted > 0 || complete > 0)) return "Partida en curso";
  if (accepted === 0 && complete === 0 && pending > 0) return "Solicitudes pendientes";
  return "Sin solicitudes activas";
};

const Item = ({user, post, changeStatus, rate, contact, handleUserNamePress}) => {

  if (user.applications.status === 'rejected') {
    return null;
  }

  return (
    <View style={styles.profileHeader}>
      <Image
        source={{uri: `${user.img}`}}
        style={styles.userImage}
      />

      <View style={styles.profileHeaderData}>
        <TouchableOpacity onPress={() => handleUserNamePress(user.id_user)}>
          <Text style={[styles.text, styles.nameText, styles.boldText]}>
            {user.name}
          </Text>
        </TouchableOpacity>

        {user.applications.status === 'accepted' && (
          <Text style={styles.text}>Usuario aceptado</Text>
        )}

        {user.applications.status === 'complete' && (
          <Text style={styles.text}>Usuario calificado</Text>
        )}

        {user.applications.status === 'pending' && post.actualusers < post.requiredusers && (
          <View style={styles.headerRows}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
              {/* Aceptar */}
              <TouchableOpacity
                style={[styles.modernButton, styles.buttonWithIcon, {
                  backgroundColor: '#28a745',
                  flex: 1,
                  marginRight: 8
                }]}
                onPress={() => changeStatus(post.id_post, user.applications.id_application, 'accepted')}
                activeOpacity={0.8}
              >
                <Ionicons name="checkmark" size={16} color="#fff" style={{marginRight: 4}}/>
                <Text style={[styles.buttonText, {fontSize: 14}]}>Aceptar</Text>
              </TouchableOpacity>

              {/* Rechazar */}
              <TouchableOpacity
                style={[styles.modernButton, styles.buttonWithIcon, {
                  backgroundColor: '#dc3545',
                  flex: 1,
                  marginLeft: 8
                }]}
                onPress={() => changeStatus(post.id_post, user.applications.id_application, 'rejected')}
                activeOpacity={0.8}
              >
                <Ionicons name="close" size={16} color="#fff" style={{marginRight: 4}}/>
                <Text style={[styles.buttonText, {fontSize: 14}]}>Rechazar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {user.applications.status === 'pending' && post.actualusers === post.requiredusers && (
          <View>
            <TouchableOpacity
              style={[styles.modernButton, {backgroundColor: '#F57C00', width: '100%'}]}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Post completo</Text>
            </TouchableOpacity>
          </View>
        )}

        {user.applications.status === 'accepted' && (
          <View style={[styles.headerRows, {justifyContent: 'space-between', marginTop: 8}]}>
            {/* Calificar */}
            <TouchableOpacity
              style={[styles.modernButton, styles.buttonWithIcon, {
                backgroundColor: '#28a745',
                flex: 1,
                marginHorizontal: 4
              }]}
              onPress={() => rate(user.id_user, post.id_post, user.applications.id_application)}
              activeOpacity={0.8}
            >
              <Ionicons name="star" size={16} color="#fff" style={{marginRight: 4}}/>
              <Text style={[styles.buttonText, {fontSize: 14}]}>Calificar</Text>
            </TouchableOpacity>

            {/* Eliminar */}
            <TouchableOpacity
              style={[styles.modernButton, {
                backgroundColor: '#dc3545',
                flex: 0.3,
                marginLeft: 8,
                justifyContent: 'center',
                alignItems: 'center'
              }]}
              onPress={() => changeStatus(post.id_post, user.applications.id_application, 'rejected')}
              activeOpacity={0.8}
            >
              <Ionicons name="trash" size={18} color="#fff"/>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const ReceivedApp = ({post, onDeletePost, changeStatus, rate, contact, handleUserNamePress}) => {
  const hasAccepted = (post.users || []).some(u => u.applications?.status === 'accepted');

  return (
    <View>
      <View style={styles.sendedAppContainer}>
        <View style={styles.row}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{post.title}</Text>
          </View>
          <View style={styles.usersContainer}>
            <Text style={styles.usersText}>
              {post.actualusers} / {post.requiredusers}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 8}}>
          <Text style={styles.text}>{getPostStatusLabel(post)}</Text>
        </View>

        <FlatList
          data={post.users}
          renderItem={({item}) => (
            <Item
              user={item}
              post={post}
              changeStatus={changeStatus}
              rate={rate}
              contact={contact}
              handleUserNamePress={handleUserNamePress}
            />
          )}
          keyExtractor={(item) => String(item.id_user)}
        />

        {hasAccepted && (
          <TouchableOpacity
            style={[styles.modernButton, styles.buttonWithIcon, {backgroundColor: '#17a2b8', width: '100%'}]}
            onPress={() => contact(post.id_post)}
            activeOpacity={0.8}
          >
            <Ionicons name="chatbubbles" size={16} color="#fff" style={{marginRight: 4}}/>
            <Text style={[styles.buttonText, {fontSize: 14}]}>Contactar</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.modernButton, styles.buttonWithIcon, {backgroundColor: '#dc3545', width: '100%'}]}
          onPress={() => onDeletePost(post.id_post)}
          activeOpacity={0.8}
        >
          <Ionicons name="trash" size={16} color="#fff" style={{marginRight: 6}}/>
          <Text style={styles.buttonText}>Eliminar post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.line}/>
    </View>
  );
};

export default ReceivedApp;
