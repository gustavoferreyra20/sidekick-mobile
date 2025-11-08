import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/scripts/styles';
import {Ionicons} from "@expo/vector-icons";

const PostScreen = ({ post, btnSubmitApplication, handleUserNamePress, currentUserId }) => {
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
                        {post.modeName}
                        <Text style={styles.dot}> {'\u2B24'} </Text>
                        {post.platformName}
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
                        source={{ uri: `https://images.igdb.com/igdb/image/upload/t_720p/${post.coverImage}.jpg` }}
                        alt={post.gameName}
                    />

                    <Text style={styles.description}>{post.description}</Text>
                </View>

                {/* BOTÓN CREADOR */}
                {post.id_user === currentUserId && (
                  <View style={{ width: '100%', marginTop: 8 }}>
                      <TouchableOpacity
                        style={[styles.modernButton, styles.buttonWithIcon, { width: '100%', backgroundColor: '#2196F3' }]}
                        activeOpacity={0.8}
                        disabled
                      >
                          <Ionicons name="ribbon" size={16} color="#fff" style={{ marginRight: 6 }} />
                          <Text style={styles.buttonText}>Creador</Text>
                      </TouchableOpacity>
                  </View>
                )}

                {/* BOTÓN UNIRSE */}
                {post.id_user !== currentUserId && post.actualusers < post.requiredusers && (
                  <View style={{ width: '100%', marginTop: 8 }}>
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

                {/* BOTÓN POST COMPLETO */}
                {post.id_user !== currentUserId && post.actualusers >= post.requiredusers && (
                  <View style={{ width: '100%', marginTop: 8 }}>
                      <TouchableOpacity
                        style={[styles.modernButton, styles.buttonWithIcon, { width: '100%', backgroundColor: '#F57C00' }]}
                        activeOpacity={0.8}
                        disabled
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

export default PostScreen;