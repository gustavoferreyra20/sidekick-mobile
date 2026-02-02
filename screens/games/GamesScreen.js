import React, {Component} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import GamesCtrl from '../../controllers/games/GamesCtrl';
import styles from '../../assets/scripts/styles';

export class GamesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      loading: true,
      page: 1,
      hasNext: false,
      limit: 20,
    };
    this.controller = new GamesCtrl();
    this._mounted = false;
    this.scrollRef = React.createRef();
  }

  scrollToTop = () => {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollTo({y: 0, animated: true});
    }
  };

  loadPage = () => {
    const {page, limit} = this.state;
    const offset = (page - 1) * limit;

    this.setState({loading: true}, () => {
      this.controller
        .handleGetGames(limit, offset)
        .then((data) => {
          if (!this._mounted) return;
          this.setState(
            {
              games: data.games || [],
              hasNext: !!data.hasNext,
              loading: false,
            },
            this.scrollToTop
          );
        })
        .catch(() => {
          if (!this._mounted) return;
          this.setState({games: [], hasNext: false, loading: false});
        });
    });
  };

  componentDidMount() {
    this._mounted = true;
    this.loadPage();

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.loadPage();
    });
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.focusListener && typeof this.focusListener === 'function') {
      this.focusListener();
    }
  }

  nextPage = () => {
    const {hasNext, loading} = this.state;
    if (hasNext && !loading) {
      this.setState(
        (prev) => ({page: prev.page + 1}),
        this.loadPage
      );
    }
  };

  prevPage = () => {
    const {page, loading} = this.state;
    if (page > 1 && !loading) {
      this.setState(
        (prev) => ({page: prev.page - 1}),
        this.loadPage
      );
    }
  };

  renderGame = (game) => (
    <View style={styles.gameContainer}>
      <Image
        source={{
          uri: `https://images.igdb.com/igdb/image/upload/t_720p/${game.cover.image_id}.jpg`
        }}
        style={styles.gameImage}
      />
      <Text style={styles.gameName}>{game.name}</Text>
    </View>
  );

  render() {
    const {games, loading, page, hasNext} = this.state;

    if (loading && (!games || games.length === 0)) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#28a745"/>
          </View>
        </View>
      );
    }

    const visibleGames = (games || []).filter(
      (g) => g?.cover?.image_id
    );

    return (
      <View style={{flex: 1, backgroundColor: '#020202'}}>
        <ScrollView
          ref={this.scrollRef}
          style={{flex: 1}}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: 10,
            paddingBottom: 24,
          }}
        >
          {visibleGames.map((game, index) => (
            <View
              key={game.id || index}
              style={{width: '48%', marginBottom: 10}}
            >
              {this.renderGame(game)}
            </View>
          ))}

          {!loading && visibleGames.length > 0 && (
            <View style={{width: '100%', marginTop: 10, paddingBottom: 16}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {page > 1 ? (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.prevPage}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: '#1e1e1e',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Ionicons name="chevron-back" size={22} color="#fff"/>
                  </TouchableOpacity>
                ) : (
                  <View style={{width: 44}}/>
                )}

                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                    marginHorizontal: 24
                  }}
                >
                  Página {page}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.nextPage}
                  disabled={!hasNext}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: '#1e1e1e',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: hasNext ? 1 : 0.4
                  }}
                >
                  <Ionicons name="chevron-forward" size={22} color="#fff"/>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}
