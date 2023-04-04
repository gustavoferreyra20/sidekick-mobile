import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import GameService from './gameService';

export class GamesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      loading: true,
    };
  }

  componentDidMount() {
    GameService.getAll().then((data) => {
      this.setState({
        games: data,
        loading: false,
      });
    });
  }

  renderGame = (game, index) => {
    return (
      <View key={index} style={styles.gameContainer}>
        <Image source={{ uri: `http://[2802:8010:9406:9100:41c6:96b7:8d04:577d]:3000/api/images/${game.img}` }} style={styles.gameImage} />
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#535053",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  gamesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
  },
  gameContainer: {
    alignItems: "center",
    margin: 10,
    width: "45%",
  },
  gameImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    maxWidth: "100%",
  },
  gameName: {
    color: "#fff",
  },
});