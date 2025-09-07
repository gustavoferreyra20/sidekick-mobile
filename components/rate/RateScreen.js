import React, {Component} from 'react';
import {Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../../assets/scripts/styles';
import RateCtrl from './RateCtrl';
import Slider from '@react-native-community/slider';
import PopupService from '../popups/PopupService';
import {Ionicons} from "@expo/vector-icons";

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
                        style={styles.textAreaInput}
                        onChangeText={this.handleCommentChange}
                        placeholder="Escriba que te parecio el jugador"
                        value={this.state.form.comment}
                        multiline={true}
                        numberOfLines={3}
                        maxLength={100}
                        placeholderTextColor="#495057"
                    />

                    <View style={{ marginTop: 8 }}>
                        <TouchableOpacity
                          style={[styles.modernButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
                          onPress={this.handleShowRewards}
                          activeOpacity={0.8}
                        >
                            <Ionicons name="trophy" size={16} color="#fff" style={{ marginRight: 6 }} />
                            <Text style={styles.buttonText}>Premiar</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Rewards section */}
                    {this.state.showRewards && (
                        <ScrollView horizontal={true}>
                            {this.state.rewards.map((reward, index) => (
                                <View key={index} style={{ marginRight: 10 }}>
                                    <View style={styles.rewardItem}>
                                        <Image
                                            source={{ uri: `https://sidekick-server-nine.vercel.app/api/images/${reward.img}` }}
                                            style={styles.rewardImage}
                                        />
                                        <Text style={styles.rewardDescription} >{reward.description}</Text>
                                        <TouchableOpacity
                                          style={[styles.modernButton, styles.buttonWithIcon]}
                                          onPress={() => this.handleSelectReward(reward)}
                                          activeOpacity={0.8}
                                        >
                                            <Ionicons name="checkmark" size={16} color="#fff" style={{ marginRight: 6 }} />
                                            <Text style={styles.buttonText}>Seleccionar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    )}

                    {this.state.showRewards && this.state.rewards.length === 0 && (
                        <View style={styles.rewardItem}>
                            <Text style={styles.text}>No tienes ninguna medalla, quieres comprar alguna?</Text>
                        </View>

                    )}

                    {this.state.showRewards && (
                        <View style={styles.noRewardContainer}>
                            <TouchableOpacity
                              style={[styles.modernButton, styles.buttonWithIcon]}
                              onPress={() => this.handleGoToStore()}
                              activeOpacity={0.8}
                            >
                                <Ionicons name="cart" size={16} color="#fff" style={{ marginRight: 6 }} />
                                <Text style={styles.buttonText}>Comprar medallas</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {this.state.form.reward && (
                        <View style={styles.rewardItem}>
                            <Image
                                source={{ uri: `https://sidekick-server-nine.vercel.app/api/images/${this.state.form.reward.img}` }}
                                style={styles.rewardImage}
                            />
                            <Text style={styles.rewardDescription}>{this.state.form.reward.description}</Text>
                            <TouchableOpacity
                              style={[styles.modernButton, styles.buttonWithIcon, { backgroundColor: '#dc3545' }]}
                              onPress={() => this.handleDeleteReward()}
                              activeOpacity={0.8}
                            >
                                <Ionicons name="trash" size={16} color="#fff" style={{ marginRight: 6 }} />
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Calificar button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                          style={[styles.modernButton, styles.buttonWithIcon, { backgroundColor: '#17a2b8' }]}
                          onPress={() => {
                              this.controller.newReview(
                                this.state.form,
                                () => this.setState({}),
                                this.props.updateReview,
                                this.props.id_application
                              );
                          }}
                          activeOpacity={0.8}
                        >
                            <Ionicons name="send" size={16} color="#fff" style={{ marginRight: 6 }} />
                            <Text style={styles.buttonText}>Enviar Calificación</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.modernButton, styles.buttonWithIcon, { backgroundColor: '#dc3545' }]}
                          onPress={() => { this.props.updateReview() }}
                          activeOpacity={0.8}
                        >
                            <Ionicons name="arrow-back" size={16} color="#fff" style={{ marginRight: 6 }} />
                            <Text style={styles.buttonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>

                    <PopupService
                      modalVisible={this.controller.modalVisible}
                      setModalVisible={this.setModalVisible}
                      modalType={this.controller.modalType}
                      msg={this.controller.msg}
                      actionConfirm={this.controller.modalFunction}
                    />
                </View>
            </View>
        );
    }
}
