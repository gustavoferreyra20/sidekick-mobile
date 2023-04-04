import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const games = [
    { name: 'Fortnite', image: 'http://[2802:8010:9406:9100:41c6:96b7:8d04:577d]:3000/api/images/games/Fortnite.jpg' },
    { name: 'CSGO', image: 'http://[2802:8010:9406:9100:41c6:96b7:8d04:577d]:3000/api/images/games/CSGO.jpg' },
    { name: 'MultiVersus', image: 'http://[2802:8010:9406:9100:41c6:96b7:8d04:577d]:3000/api/images/games/MultiVersus.jpg' },
];

export class GamesScreen extends Component {

    renderGame = (game, index) => {
        return (
            <View key={index} style={styles.gameContainer}>
                <Image source={{ uri: game.image }} style={styles.gameImage} />
                <Text style={styles.gameName}>{game.name}</Text>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.gamesContainer}>{games.map(this.renderGame)}</View>
                <StatusBar style="auto" />
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