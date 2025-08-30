import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import GamesCtrl from './GamesCtrl';

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
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.controller.handleGetGames().then((data) => {
        this.setState({
          games: data,
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

  renderGame = (game, index) => {
    return (
      <View key={index} style={styles.gameContainer}>
        <Image source={{ uri: `https://sidekick-server-nine.vercel.app/api/images/${game.img}` }} style={styles.gameImage} />
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