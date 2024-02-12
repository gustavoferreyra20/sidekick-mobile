import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import styles from '../../assets/scripts/styles';
import { SIDEKICK_API } from "@env"

const Post = ({ post, btnSubmitApplication }) => {
    return (
        <View>
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

            <View style={styles.postBody}>
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

                {post.actualUsers < post.requiredUsers && (
                <Button
                    title="Unirse"
                    onPress={() => btnSubmitApplication(post.id_post)}
                    color={'#28a745'}
                />
            )}

            {post.actualUsers === post.requiredUsers && (
                <Button title="Post completo" disabled style={styles.completeButton} />
            )}
            </View>

            <View style={styles.line} />
        </View>
    );
};

export default Post;