import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../../assets/scripts/styles';


const ReviewScreen = ({ item, handleUserNamePress }) => {

    return (
        <View style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: `${item.user.img}` }}
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
                        <Text style={styles.text}>Habilidad: {item.abilityscore} <View style={styles.dot}></View> Karma: {item.karmascore}</Text>
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

export default ReviewScreen;