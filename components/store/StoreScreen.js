import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from '../../assets/scripts/styles';
import StoreCtrl from './StoreCtrl';
import RewardScreen from '../reward/RewardScreen';

export class StoreScreen extends Component {
    componentDidMount() {
        this.controller.handleGetRewards().then((data) => {
            this.setState({
                rewards: data,
                loading: false,
            });
        });
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.controller.handleGetRewards().then((data) => {
                this.setState({
                    rewards: data,
                    loading: false,
                });
            });
        });
    }

    componentWillUnmount() {
        if (this.focusListener && typeof this.focusListener === 'function') {
            this.focusListener();
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            rewards: [],
            loading: true,
        };
        this.controller = new StoreCtrl();
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
                <View style={styles.hr_main}></View>

                <View style={styles.container}>
                    {loading ? (
                        <Text>Loading rewards...</Text>
                    ) : (
                        <FlatList
                            data={rewards}
                            renderItem={({ item }) => <RewardScreen item={item} handleBuyReward={(item) => this.controller.btnBuy(item)}
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