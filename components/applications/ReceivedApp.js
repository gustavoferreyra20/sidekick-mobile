import React from 'react';
import { View, Text, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from '../../assets/scripts/styles';


const Item = ({ user, post, changeStatus, rate, contact, handleUserNamePress }) => {
    if (user.applications.status !== 'rejected' && user.applications.status !== 'complete') {
        return (
            <View style={styles.profileHeader}>
                <Image source={{ uri: `https://sidekick-server-nine.vercel.app/api/images/${user.img}` }} style={styles.userImage} />
                <View style={styles.profileHeaderData}>
                    <TouchableOpacity
                        onPress={() => handleUserNamePress(user.id_user)}>
                        <Text style={[styles.text, styles.nameText, styles.boldText]}>{user.name}</Text>
                    </TouchableOpacity>
                    {user.applications.status === 'pending' && post.actualusers < post.requiredusers && (
                        <View style={styles.headerRows}>
                            <View style={styles.buttonContainerColumns}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: '#28a745' }]}
                                    onPress={() => changeStatus(post.id_post, user.applications.id_application, 'accepted')}
                                >
                                    <Text style={styles.buttonText}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainerColumns}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: '#dc3545' }]}
                                    onPress={() => changeStatus(post.id_post, user.applications.id_application, 'rejected')}
                                >
                                    <Text style={styles.buttonText}>Rechazar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {user.applications.status === 'pending' && post.actualusers == post.requiredusers && (
                        <View style={styles.headerRows}>
                            <View style={styles.buttonContainerColumns}>
                                <Button
                                    color={'#dc3545'}
                                    title="Post completo"
                                    onPress={this.showReceivedApp}
                                    disabled={true}
                                />
                            </View>
                        </View>
                    )}

                    {user.applications.status === 'accepted' && (
                        <View style={styles.headerRows}>
                            <View style={styles.buttonContainerColumns}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: '#17a2b8' }]}
                                    onPress={() => contact(user.id_user)}
                                >
                                    <Text style={styles.buttonText}>Contactar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainerColumns}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: '#28a745' }]}
                                    onPress={() => rate(user.id_user, post.id_post, user.applications.id_application)}
                                >
                                    <Text style={styles.buttonText}>Calificar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainerColumns}>
                                <TouchableOpacity
                                    style={[styles.button, { backgroundColor: '#dc3545' }]}
                                    onPress={() => changeStatus(post.id_post, user.applications.id_application, 'rejected')}
                                >
                                    <Text style={styles.buttonText}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        );
    } else {
        return null;
    }
};

const ReceivedApp = ({ post, onDeletePost, changeStatus, rate, contact, handleUserNamePress }) => {

    return (
        <View >
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
                    renderItem={({ item }) => <Item user={item} post={post} changeStatus={changeStatus} rate={rate} contact={contact} handleUserNamePress={handleUserNamePress} />}
                    keyExtractor={item => item.id_user}
                />

                <View style={styles.cancelButton} >
                    <Button title="Eliminar post" color={"#dc3545"} onPress={() => onDeletePost(post.id_post)} />
                </View>
            </View>
            <View style={styles.line} />
        </View>
    );
};

export default ReceivedApp;