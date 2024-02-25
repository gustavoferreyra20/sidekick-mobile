import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import GamesCtrl from './GamesCtrl';
import { SIDEKICK_API } from "@env";
import styles from '../../assets/scripts/styles';

export class GamesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      loading: true,
    };
    this.controller = new GamesCtrl();
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
           <Text style={styles.text}>Loading...</Text>
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