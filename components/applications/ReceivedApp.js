import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/scripts/styles';
import {Ionicons} from "@expo/vector-icons";

const Item = ({user, post, changeStatus, rate, contact, handleUserNamePress}) => {
    if (user.applications.status !== 'rejected' && user.applications.status !== 'complete') {
        return (
            <View style={styles.profileHeader}>
                <Image source={{uri: `${user.img}`}}
                       style={styles.userImage}/>
                <View style={styles.profileHeaderData}>
                    <TouchableOpacity
                        onPress={() => handleUserNamePress(user.id_user)}>
                        <Text style={[styles.text, styles.nameText, styles.boldText]}>{user.name}</Text>
                    </TouchableOpacity>
                    {user.applications.status === 'pending' && post.actualusers < post.requiredusers && (
                        <View style={styles.headerRows}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                                {/* Aceptar */}
                                <TouchableOpacity
                                  style={[styles.modernButton, styles.buttonWithIcon, { backgroundColor: '#28a745', flex: 1, marginRight: 8 }]}
                                  onPress={() => changeStatus(post.id_post, user.applications.id_application, 'accepted')}
                                  activeOpacity={0.8}
                                >
                                    <Ionicons name="checkmark" size={16} color="#fff" style={{ marginRight: 4 }} />
                                    <Text style={[styles.buttonText, { fontSize: 14 }]}>Aceptar</Text>
                                </TouchableOpacity>

                                {/* Rechazar */}
                                <TouchableOpacity
                                  style={[styles.modernButton, styles.buttonWithIcon, { backgroundColor: '#dc3545', flex: 1, marginLeft: 8 }]}
                                  onPress={() => changeStatus(post.id_post, user.applications.id_application, 'rejected')}
                                  activeOpacity={0.8}
                                >
                                    <Ionicons name="close" size={16} color="#fff" style={{ marginRight: 4 }} />
                                    <Text style={[styles.buttonText, { fontSize: 14 }]}>Rechazar</Text>
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
                      <View style={[styles.headerRows, { justifyContent: 'space-between', marginTop: 8 }]}>

                          {/* Contactar */}
                          <TouchableOpacity
                            style={[styles.modernButton, styles.buttonWithIcon, { backgroundColor: '#17a2b8', flex: 1.2, marginRight: 8 }]}
                            onPress={() => contact(post.id_post)}
                            activeOpacity={0.8}
                          >
                              <Ionicons name="chatbubbles" size={16} color="#fff" style={{ marginRight: 4 }} />
                              <Text style={[styles.buttonText, { fontSize: 14 }]}>Contactar</Text>
                          </TouchableOpacity>

                          {/* Calificar */}
                          <TouchableOpacity
                            style={[styles.modernButton, styles.buttonWithIcon, { backgroundColor: '#28a745', flex: 1, marginHorizontal: 4 }]}
                            onPress={() => rate(user.id_user, post.id_post, user.applications.id_application)}
                            activeOpacity={0.8}
                          >
                              <Ionicons name="star" size={16} color="#fff" style={{ marginRight: 4 }} />
                              <Text style={[styles.buttonText, { fontSize: 14 }]}>Calificar</Text>
                          </TouchableOpacity>

                          {/* Eliminar */}
                          <TouchableOpacity
                            style={[styles.modernButton, { backgroundColor: '#dc3545', flex: 0.3, marginLeft: 8, justifyContent: 'center', alignItems: 'center' }]}
                            onPress={() => changeStatus(post.id_post, user.applications.id_application, 'rejected')}
                            activeOpacity={0.8}
                          >
                              <Ionicons name="trash" size={18} color="#fff" />
                          </TouchableOpacity>

                      </View>
                    )}
                </View>
            </View>
        );
    } else {
        return null;
    }
};

const ReceivedApp = ({post, onDeletePost, changeStatus, rate, contact, handleUserNamePress}) => {

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


                <FlatList
                    data={post.users}
                    renderItem={({item}) => <Item user={item} post={post} changeStatus={changeStatus} rate={rate}
                                                  contact={contact} handleUserNamePress={handleUserNamePress}/>}
                    keyExtractor={item => item.id_user}
                />


                <TouchableOpacity
                  style={[styles.modernButton, styles.buttonWithIcon, { backgroundColor: '#dc3545', width: '100%' }]}
                  onPress={() => onDeletePost(post.id_post)}
                  activeOpacity={0.8}
                >
                    <Ionicons name="trash" size={16} color="#fff" style={{ marginRight: 6 }} />
                    <Text style={styles.buttonText}>Eliminar post</Text>
                </TouchableOpacity>


            </View>
            <View style={styles.line}/>
        </View>
    );
};

export default ReceivedApp;