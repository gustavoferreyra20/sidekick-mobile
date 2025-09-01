import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../../assets/scripts/styles';

const RewardScreen = ({ item, handleBuyReward }) => {

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
                    style={styles.modernButton}
                    onPress={() => handleBuyReward(item)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default RewardScreen;