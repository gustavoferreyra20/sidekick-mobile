import React, { Component } from 'react';
import { Text, View, TextInput, Button, ScrollView, Image } from 'react-native';
import styles from '../../assets/styles';
import { SIDEKICK_API } from "@env";
import RateController from './rateCtrl';

export class RateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rewards: [],
            loading: true,
            form: {
                abilityScore: '50',
                karmaScore: '50',
                comment: '',
                reward: null
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.text}>Habilidad:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.handleAbilityScoreChange}
                        placeholder="50"
                        keyboardType="numeric"
                        value={this.state.form.abilityScore}
                    />

                    <Text style={styles.text}>Karma:</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={this.handleKarmaScoreChange}
                        placeholder="50"
                        keyboardType="numeric"
                        value={this.state.form.karmaScore}
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
                        <Button title="Premiar" onPress={this.controller.btnAddReward} color="#0eaa61" />
                    </View>

                    {/* Rewards section */}
                    <ScrollView horizontal={true}>
                        {this.state.rewards.map((reward, index) => (
                            <View key={index} style={styles.rewardContainer}>
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
                        ))}
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

                    {this.state.rewards.length === 0 && (
                        <View style={styles.noRewardContainer}>
                            <Text>No tienes ninguna medalla, quieres comprar alguna?</Text>
                            <Button
                                title="Comprar"
                                onPress={this.controller.btnGoToStore}
                                color="#0eaa61"
                            />
                        </View>
                    )}
                </View>

                {/* Calificar button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Calificar"
                        onPress={() => this.controller.newReview(this.state.form)}
                        color="#0eaa61"
                    />
                </View>
            </View>
        );
    }
}
