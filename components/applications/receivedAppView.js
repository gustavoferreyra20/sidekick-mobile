import React from 'react';
import { View, Text, Image, Button, FlatList } from 'react-native';
import styles from '../../assets/scripts/styles';
import { SIDEKICK_API } from "@env"

const Item = ({ user, post, changeStatus, rate }) => {
    if (user.applications.status !== 'rejected') {
        return (
            <View style={styles.profileHeader}>
                <Image source={{ uri: `${SIDEKICK_API}images/${user.img}` }} style={styles.userImage} />
                <View style={styles.profileHeaderData}>
                    <Text style={[styles.text, styles.nameText, styles.boldText]}>{user.name}</Text>
                    {user.applications.status === 'pending' && post.actualUsers < post.requiredUsers && (
                        <View style={styles.headerColumns}>
                            <View style={styles.buttonContainerColumns}>
                                <Button
                                    color={'#0eaa61'}
                                    title="Aceptar"
                                    onPress={() => changeStatus(post.id_post, user.applications.id_application, 'accepted')}
                                />
                            </View>
                            <View style={styles.buttonContainerColumns}>
                                <Button
                                    color={'#dc3545'}
                                    title="Rechazar"
                                    onPress={() => changeStatus(post.id_post, user.applications.id_application, 'rejected')}
                                />
                            </View>
                        </View>
                    )}

                    {user.applications.status === 'pending' && post.actualUsers == post.requiredUsers && (
                        <View style={styles.headerColumns}>
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
                        <View style={styles.headerColumns}>
                            <View style={styles.buttonContainerColumns}>
                                <Button
                                    color={'#0eaa61'}
                                    title="Calificar"
                                    onPress={() => rate(user.id_user, post.id_post)}
                                />
                            </View>
                            <View style={styles.buttonContainerColumns}>
                                <Button
                                    color={'#dc3545'}
                                    title="Eliminar"
                                    onPress={() => changeStatus(post.id_post, user.applications.id_application, 'rejected')}
                                />
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

const ReceivedApp = ({ post, onDeletePost, changeStatus, rate }) => {

    return (
        <View style={styles.sendedAppContainer}>
            <View style={styles.row}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{post.title}</Text>
                </View>
                <View style={styles.usersContainer}>
                    <Text style={styles.usersText}>
                        {post.actualUsers} / {post.requiredUsers}
                    </Text>
                </View>
            </View>
            <View style={styles.line} />

            <FlatList
                data={post.users}
                renderItem={({ item }) => <Item user={item} post={post} changeStatus={changeStatus} rate={rate} />}
                keyExtractor={item => item.id_user}
            />

            <View style={styles.cancelButton} >
                <Button title="Eliminar post" color={"#dc3545"} onPress={() => onDeletePost(post.id_post)} />
            </View>
        </View>
    );
};

export default ReceivedApp;