import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import styles from '../../assets/scripts/styles';


const PostSreen = ({ post, btnSubmitApplication, handleUserNamePress }) => {
    return (
        <View>
            <View style={styles.profileHeader}>
                <Image
                    style={styles.userImage}
                    source={{ uri: `https://sidekick-server-nine.vercel.app/api/images/${post.userImg}` }}
                />

                <View style={styles.userInfo}>
                    <View style={styles.userInfoRow}>
                        <TouchableOpacity
                            onPress={() => handleUserNamePress(post.id_user)}>
                            <Text style={[styles.text, styles.nameText, styles.boldText]}>
                                {post.userName}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.textRight}>
                            <Text style={[styles.text, styles.boldText]}>
                                {post.actualusers} / {post.requiredusers}
                            </Text>
                        </Text>
                    </View>

                    <Text style={styles.usersText}>
                        {post.mode}
                        <Text style={styles.dot}> {'\u2B24'} </Text>
                        {post.platform}
                        <Text style={styles.dot}> {'\u2B24'} </Text>
                        Habilidad: <Text style={styles.ability}>{post.abilityscore}</Text>
                        <Text style={styles.dot}> {'\u2B24'} </Text>
                        Karma: <Text style={styles.karma}>{post.karmascore}</Text>
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
                        source={{ uri: `https://sidekick-server-nine.vercel.app/api/images/${post.gameImg}` }}
                        alt={post.gameName}
                    />

                    <Text style={styles.description}>{post.description}</Text>
                </View>

                {post.actualusers < post.requiredusers && (
                    <Button
                        title="Unirse"
                        onPress={() => btnSubmitApplication(post.id_post)}
                        color={'#28a745'}
                    />
                )}

                {post.actualusers === post.requiredusers && (
                    <Button title="Post completo" disabled style={styles.completeButton} />
                )}
            </View>

            <View style={styles.line} />
        </View>
    );
};

export default PostSreen;