import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from '../../assets/styles';
import StoreController from './storeCtrl';
import Reward from '../reward/rewardView';

export class StoreScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rewards: [],
            loading: true,
        };
        this.controller = new StoreController();
    }

    componentDidMount() {
        this.controller.handleGetRewards().then((data) => {
            this.setState({
                rewards: data,
                loading: false,
            });
        });
    }

    render() {
        const { rewards, loading } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Resalta a los mejores jugadores</Text>
                <View style={styles.line}></View>

                <View style={styles.container}>
                    {loading ? (
                        <Text>Loading rewards...</Text>
                    ) : (
                        <FlatList
                            data={rewards}
                            renderItem={({ item }) => <Reward item={item} handleBuyReward={(item) => this.controller.btnBuy(item)}
                            />}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            contentContainerStyle={styles.rewardsContainer}
                        />
                    )}
                </View>
            </View>
        );
    }
}