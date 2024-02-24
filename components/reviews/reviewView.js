import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../assets/scripts/styles';
import { SIDEKICK_API } from "@env"

const Review = ({ item, handleUserNamePress }) => {

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
                        <TouchableOpacity onPress={() => handleUserNamePress(item.id_writeruser)}>
                            <Text style={[styles.text, styles.nameText, styles.boldText]}>
                                {item.user.name}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Habilidad: {item.abilityscore} <View style={styles.dot}></View> Karma: {item.karmascore} id: {item.id_review}</Text>
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