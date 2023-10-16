import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import styles from '../../assets/styles';
import { SIDEKICK_API } from "@env"

const Post = ({ post, btnSubmitApplication }) => {
    return (
        <View style={styles.postContainer}>
            <View style={styles.profileHeader}>
                <Image
                    style={styles.userImage}
                    source={{ uri: `${SIDEKICK_API}images/${post.userImg}` }}
                />

                <View style={styles.userInfo}>
                    <View style={styles.userInfoRow}>
                        <TouchableOpacity
                            onPress={() => {
                                // Handle navigation to the profile here
                            }}
                        >
                            <Text style={[styles.text, styles.nameText, styles.boldText]}>
                                {post.userName}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.textRight}>
                            <Text style={[styles.text, styles.boldText]}>
                                {post.actualUsers} / {post.requiredUsers}
                            </Text>
                        </Text>
                    </View>

                    <Text style={styles.usersText}>
                        {post.mode}
                        <Text style={styles.dot}> {'\u2B24'} </Text>
                        {post.platform}
                        <Text style={styles.dot}> {'\u2B24'} </Text>
                        Habilidad: <Text style={styles.ability}>{post.abilityScore}</Text>
                        <Text style={styles.dot}> {'\u2B24'} </Text>
                        Karma: <Text style={styles.karma}>{post.karmaScore}</Text>
                    </Text>
                </View>

            </View>

            <View style={styles.line} />

            <View style={styles.userInfo}>
                <View style={styles.userInfoRow}>
                    <Text style={styles.postTitle}>{post.title}</Text>
                </View>

                <View style={styles.postContent}>
                    <Image
                        style={styles.gameImage}
                        source={{ uri: `${SIDEKICK_API}images/${post.gameImg}` }}
                        alt={post.gameName}
                    />

                    <Text style={styles.description}>{post.description}</Text>
                </View>

            </View>

            {post.actualUsers < post.requiredUsers && (
                <Button
                    title="Unirse"
                    onPress={() => btnSubmitApplication(post.id_post)}
                    color={'#0eaa61'}
                />
            )}

            {post.actualUsers === post.requiredUsers && (
                <Button title="Post completo" disabled style={styles.completeButton} />
            )}
        </View>
    );
};

/* const styles = {
    container: {
        flexDirection: 'column',
        flex: 1,
        margin: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userInfo: {
        marginLeft: 10,
        flex: 1,
    },
    userName: {
        fontSize: 20,
    },
    userCount: {
        textAlign: 'right',
    },
    userDetails: {
        marginTop: 10,
    },
    dot: {
        color: 'gray',
    },
    line: {
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    title: {
        fontSize: 20,
    },
    gameImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    description: {
        marginTop: 10,
    },
    joinButton: {
        backgroundColor: 'green',
    },
    completeButton: {
        backgroundColor: 'yellow',
    },
}; */

export default Post;