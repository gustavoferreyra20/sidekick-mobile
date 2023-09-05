import React, { Component } from 'react';
import { Text, View, TextInput, Button, ScrollView, Image } from 'react-native';
import styles from '../../assets/styles';
import { SIDEKICK_API } from "@env";
import RateController from './rateCtrl';
import Slider from '@react-native-community/slider';
import MyModal from '../popups/popupService';

export class RateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            form: {
                id_post: this.props.rated_id_post,
                id_writerUser: this.props.id_profile,
                id_user: this.props.rated_id_user,
                abilityScore: 50,
                karmaScore: 50,
                comment: '',
            }
        };
        this.controller = new RateController();
    }

    handleAbilityScoreChange = (value) => {
        this.setState(prevState => ({
            form: { ...prevState.form, abilityScore: value }
        }));
    };

    handleKarmaScoreChange = (value) => {
        this.setState(prevState => ({
            form: { ...prevState.form, karmaScore: value }
        }));
    };

    handleCommentChange = (text) => {
        this.setState(prevState => ({
            form: { ...prevState.form, comment: text }
        }));
    };

    handleShowRewards = async () => {
        const rewards = await this.controller.showRewards(this.props.id_profile)
        this.setState({ rewards: rewards });
    };

    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
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
                        value={this.state.form.abilityScore}
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
                        value={this.state.form.karmaScore}
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
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Premiar" onPress={this.handleShowRewards} color="#0eaa61" />
                    </View>

                    {/* Rewards section */}
                    <ScrollView horizontal={true}>
                        {this.state.rewards && (this.state.rewards.map((reward, index) => (
                            <View key={index} style={{ marginRight: 10 }}>
                                <View style={styles.rewardItem}>
                                    <Image
                                        source={{ uri: `${SIDEKICK_API}images/${reward.img}` }}
                                        style={styles.rewardImage}
                                    />
                                    <Text>{reward.description}</Text>
                                    <Button
                                        title="Seleccionar"
                                        onPress={() => this.controller.btnSelectReward(this.state.form, reward)}
                                        color="#0eaa61"
                                    />
                                </View>
                            </View>
                        )))}
                    </ScrollView>

                    {this.state.form.reward && (
                        <View style={styles.rewardContainer}>
                            <Image
                                source={{ uri: this.state.form.reward.img }}
                                style={styles.rewardImage}
                            />
                            <Text>{this.state.form.reward.description}</Text>
                            <Button
                                title="Eliminar"
                                onPress={() => this.controller.btnDeleteReward(this.state.form)}
                                color="#FF0000"
                            />
                        </View>
                    )}

                    {this.state.rewards && (this.state.rewards.length === 0 && (
                        <View style={styles.noRewardContainer}>
                            <Text style={styles.text}>No tienes ninguna medalla, quieres comprar alguna?</Text>
                            <Button
                                title="Comprar"
                                onPress={this.controller.btnGoToStore}
                                color="#0eaa61"
                            />
                        </View>
                    ))}
                </View>

                {/* Calificar button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Calificar"
                        onPress={() => {
                            this.controller.newReview(this.state.form, () => {
                                this.setState({});
                            }, this.props.changeRate);
                        }}
                        color="#0eaa61"
                    />
                </View>

                <MyModal
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
