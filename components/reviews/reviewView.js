import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../assets/styles';
import { SIDEKICK_API } from "@env"

const Review = ({ item }) => {
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: `${SIDEKICK_API}images/${item.user.img}` }}
                        style={styles.userImage}
                    />
                </View>

                <View style={styles.textContainer}>
                    <View style={styles.userInfo}>
                        <Text style={[styles.text, styles.nameText, styles.boldText]}>{item.user.name}</Text>
                        <Text style={styles.text}>Habilidad: {item.abilityScore} <View style={styles.dot}></View> Karma: {item.karmaScore} id: {item.id_review}</Text>
                    </View>
                </View>
            </View>
            {item.comment ? (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.text}>{item.comment}</Text>
                </View>
            ) : null}

            <View style={styles.line}></View>
        </View>
    );
};

export default Review;