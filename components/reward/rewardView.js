import { View, Text, Image, Button } from 'react-native';
import styles from '../../assets/scripts/styles';
import { SIDEKICK_API } from "@env";

const Reward = ({ item, handleBuyReward }) => {

    return (
        <View style={styles.rewardItemContainer}>
            <View style={styles.rewardItem}>
                <Image
                    source={{ uri: `${SIDEKICK_API}images/${item.img}` }}
                    style={styles.rewardImage}
                    resizeMode="cover"
                />
                <Text style={styles.rewardPrice}>${item.price}</Text>
                <Text style={styles.rewardDescription}>{item.description}</Text>
                <Button title="Comprar" onPress={() => handleBuyReward(item)} color="#28a745" />
            </View>
        </View>
    );
};

export default Reward;