import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/scripts/styles';
import {Ionicons} from "@expo/vector-icons";

const RewardItem = ({ item, handleBuyReward }) => {

    return (
        <View style={styles.rewardItemContainer}>
            <View style={styles.rewardItem}>
                <Image
                    source={{ uri: `https://sidekick-server-nine.vercel.app/api/images/${item.img}` }}
                    style={styles.rewardImage}
                    resizeMode="cover"
                />
                <Text style={styles.rewardPrice}>${item.price}</Text>
                <Text style={styles.rewardDescription}>{item.description}</Text>

                <TouchableOpacity
                  style={[styles.modernButton, styles.buttonWithIcon]}
                  onPress={() => handleBuyReward(item)}
                  activeOpacity={0.8}
                >
                    <Ionicons name="cart" size={16} color="#fff" style={{ marginRight: 6 }} />
                    <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default RewardItem;