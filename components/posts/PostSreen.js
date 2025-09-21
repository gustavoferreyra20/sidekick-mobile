import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/scripts/styles';
import {Ionicons} from "@expo/vector-icons";

const PostSreen = ({ post, btnSubmitApplication, handleUserNamePress }) => {
    return (
        <View>
            <View style={styles.profileHeader}>
                <Image
                    style={styles.userImage}
                    source={{ uri: `${post.userImg}` }}
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
                  <View style={{ width: '100%' }}>
                      <TouchableOpacity
                        style={[styles.modernButton, styles.buttonWithIcon, { width: '100%' }]}
                        onPress={() => btnSubmitApplication(post.id_post, post.id_user)}
                        activeOpacity={0.8}
                      >
                          <Ionicons name="person-add" size={16} color="#fff" style={{ marginRight: 6 }} />
                          <Text style={styles.buttonText}>Unirse</Text>
                      </TouchableOpacity>
                  </View>
                )}

                {post.actualusers === post.requiredusers && (
                  <View style={{ width: '100%' }}>
                      <TouchableOpacity
                        style={[styles.modernButton, styles.buttonWithIcon, { width: '100%', backgroundColor: '#F57C00' }]}
                        activeOpacity={0.8}
                        onPress={() => {}}
                      >
                          <Ionicons name="lock-closed" size={16} color="#fff" style={{ marginRight: 6 }} />
                          <Text style={styles.buttonText}>Post completo</Text>
                      </TouchableOpacity>
                  </View>
                )}
            </View>

            <View style={styles.line} />
        </View>
    );
};

export default PostSreen;