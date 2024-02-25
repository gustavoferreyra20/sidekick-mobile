import React, { Component } from 'react';
import { Text, View, TextInput, Button, ScrollView, Image } from 'react-native';
import styles from '../../assets/scripts/styles';
import { SIDEKICK_API } from "@env";
import RateCtrl from './RateCtrl';
import Slider from '@react-native-community/slider';
import PopupService from '../popups/PopupService';

export class RateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            form: {
                id_post: this.props.rated_id_post,
                id_writeruser: this.props.id_profile,
                id_user: this.props.rated_id_user,
                abilityscore: 50,
                karmascore: 50,
                comment: '',
                reward: null
            },
            rewards: null,
            showRewards: false
        };
        this.controller = new RateCtrl();
    }

    async componentDidMount() {
        try {

            const rewards = await this.controller.showRewards(this.props.id_profile);

            this.setState({
                loading: false,
                rewards: rewards,
            });
        } catch (error) {

            console.error('Error fetching rewards:', error);
            this.setState({
                loading: false,
            });
        }
    }

    handleAbilityScoreChange = (value) => {
        this.setState(prevState => ({
            form: { ...prevState.form, abilityscore: value }
        }));
    };

    handleKarmaScoreChange = (value) => {
        this.setState(prevState => ({
            form: { ...prevState.form, karmascore: value }
        }));
    };

    handleCommentChange = (text) => {
        this.setState(prevState => ({
            form: { ...prevState.form, comment: text }
        }));
    };

    handleShowRewards = () => {
        this.setState((prevState) => ({
            showRewards: !prevState.showRewards,
        }));
    };

    handleSelectReward = (reward) => {
        this.setState(prevState => ({
            form: { ...prevState.form, reward: reward },
            showRewards: !prevState.showRewards
        }));
    };

    handleDeleteReward = () => {
        this.setState(prevState => ({
            form: { ...prevState.form, reward: null }
        }));
    };


    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    }

    handleGoToStore = () => {
        this.props.navigation.navigate("Tienda")
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.text}>Habilidad:</Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={this.state.form.abilityscore}
                        onValueChange={this.handleAbilityScoreChange}
                        minimumTrackTintColor="#007bff"
                        maximumTrackTintColor="gray"
                        thumbTintColor="#007bff"
                    />
                    <Text style={styles.text}>Karma:</Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={this.state.form.karmascore}
                        onValueChange={this.handleKarmaScoreChange}
                        minimumTrackTintColor="#007bff"
                        maximumTrackTintColor="gray"
                        thumbTintColor="#007bff"
                    />
                    <Text style={styles.text}>Comentario:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.handleCommentChange}
                        placeholder="Escriba que te parecio el jugador"
                        value={this.state.form.comment}
                        multiline={true}
                        numberOfLines={4}
                        placeholderTextColor="#495057"
                    />

                    <View style={styles.button}>
                        <Button title="Premiar" onPress={this.handleShowRewards} color="#28a745" />
                    </View>

                    {/* Rewards section */}
                    {this.state.showRewards && (
                        <ScrollView horizontal={true}>
                            {this.state.rewards.map((reward, index) => (
                                <View key={index} style={{ marginRight: 10 }}>
                                    <View style={styles.rewardItem}>
                                        <Image
                                            source={{ uri: `${SIDEKICK_API}images/${reward.img}` }}
                                            style={styles.rewardImage}
                                        />
                                        <Text style={styles.rewardDescription} >{reward.description}</Text>
                                        <Button
                                            title="Seleccionar"
                                            onPress={() => this.handleSelectReward(reward)}
                                            color="#28a745"
                                        />
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    )}

                    {this.state.showRewards && this.state.rewards.length == 0 && (
                        <View style={styles.rewardItem}>
                            <Text style={styles.text}>No tienes ninguna medalla, quieres comprar alguna?</Text>
                        </View>

                    )}

                    {this.state.showRewards && (
                        <View style={styles.noRewardContainer}>
                            <Button
                                title="Comprar medallas"
                                onPress={() => this.handleGoToStore()}
                                color="#28a745"
                            />
                        </View>
                    )}

                    {this.state.form.reward && (
                        <View style={styles.rewardItem}>
                            <Image
                                source={{ uri: `${SIDEKICK_API}images/${this.state.form.reward.img}` }}
                                style={styles.rewardImage}
                            />
                            <Text style={styles.rewardDescription}>{this.state.form.reward.description}</Text>
                            <Button
                                title="Eliminar"
                                onPress={() => this.handleDeleteReward()}
                                color="#FF0000"
                            />
                        </View>
                    )}
                </View>

                {/* Calificar button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Calificar"
                        onPress={() => {
                            this.controller.newReview(this.state.form, () => {
                                this.setState({});
                            }, this.props.updateReview, this.props.id_application);
                        }}
                        color="#28a745"
                    />

                    <Button
                        title="Volver"
                        onPress={() => { this.props.updateReview() }}
                        color="#FF0000"
                    />
                </View>

                <PopupService
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
                    modalType={this.controller.modalType}
                    msg={this.controller.msg}
                    actionConfirm={this.controller.modalFunction}
                />
            </View>
        );
    }
}
