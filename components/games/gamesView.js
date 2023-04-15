import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import GamesController from './gamesController';
import { SIDEKICK_API } from "@env"
import styles from '../../assets/styles';

export class GamesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      loading: true,
    };
    this.controller = new GamesController();
  }

  componentDidMount() {
    this.controller.handleGetGames().then((data) => {
      this.setState({
        games: data,
        loading: false,
      });
    });
  }

  renderGame = (game, index) => {
    return (
      <View key={index} style={styles.gameContainer}>
        <Image source={{ uri: `${SIDEKICK_API}images/${game.img}` }} style={styles.gameImage} />
        <Text style={styles.gameName}>{game.name}</Text>
      </View>
    );
  };

  render() {
    const { games, loading } = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.gamesContainer}>{games.map(this.renderGame)}</View>
      </View>
    );
  }

}