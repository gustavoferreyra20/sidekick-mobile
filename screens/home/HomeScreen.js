import React, { Component } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import PostSearchForm from '../../components/posts/PostSearchForm';
import styles from '../../assets/scripts/styles';
import HomeCtrl from '../../controllers/home/HomeCtrl';
import Popup from '../../components/popups/Popup';
import Loader from '../../assets/scripts/loader';
import PostItem from '../../components/posts/PostItem';
import { Ionicons } from "@expo/vector-icons";

export class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            gameOptions: [],
            platformOptions: [{ name: "Cualquier plataforma", value: "any" }],
            modeOptions: [{ name: "Cualquier modo", value: "any" }],
            gameSelected: "any",
            platformSelected: "any",
            modeSelected: "any",
            posts: [],
            isPostSearchFormVisible: false,
        };

        this.controller = new HomeCtrl();
        this.id_user = this.props.route.params.sessionId;
        this.focusListener = null;
    }

    async componentDidMount() {
        await this.fetchData();
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.fetchData();
        });
    }

    componentWillUnmount() {
        if (this.focusListener) this.focusListener();
    }

    fetchData = async () => {
        this.setState({ loading: true });

        const rawGames = await this.controller.fetchGameOptions();

        const gameOptions = [
            { name: "Cualquier juego", value: "any" },
            ...rawGames
        ];

        const posts = await this.controller.getPosts();

        this.setState({
            loading: false,
            gameOptions,
            posts,
            gameSelected: "any",
            platformOptions: [{ name: "Cualquier plataforma", value: "any" }],
            modeOptions: [{ name: "Cualquier modo", value: "any" }],
            platformSelected: "any",
            modeSelected: "any",
        });
    };

    handleSubmit = async (
      gameValue,
      platformValue,
      modeValue,
      platformOptions,
      modeOptions
    ) => {
        this.setState({ loading: true });

        const posts = await this.controller.btnSearchPost(
          gameValue,
          platformValue,
          modeValue
        );

        this.setState({
            posts,
            loading: false,
            gameSelected: gameValue,
            platformSelected: platformValue,
            modeSelected: modeValue,
            platformOptions,
            modeOptions
        });
    };

    togglePostSearchFormModal = () => {
        this.setState(prev => ({
            isPostSearchFormVisible: !prev.isPostSearchFormVisible
        }));
    };

    btnSubmitApplication = (id_post, id_owner) => {
        this.controller.submitApplication(id_post, id_owner, this.id_user).then(() => {
            this.forceUpdate();
        });
    };

    handleUserNamePress = (id_user) => {
        this.props.navigation.navigate("Perfil", {
            sessionId: id_user,
            isCurrentUser: false
        });
    };

    render() {
        const {
            posts,
            loading,
            gameOptions,
            platformOptions,
            modeOptions,
            gameSelected,
            platformSelected,
            modeSelected,
            isPostSearchFormVisible
        } = this.state;

        return (
          <View style={styles.container}>
              <Text style={styles.heading}>Posts más recientes</Text>
              <View style={styles.hr_main} />

              <View style={[styles.headerRows, { flexDirection: 'row', alignItems: 'center' }]}>
                  <View style={[styles.buttonContainerColumns, { flex: 1 }]}>
                      <TouchableOpacity
                        style={[styles.modernButton, styles.buttonWithIcon, { width: '85%' }]}
                        onPress={this.togglePostSearchFormModal}
                      >
                          <Ionicons name="filter" size={20} color="#fff" style={{ marginRight: 8 }} />
                          <Text style={styles.buttonText}>Filtrar</Text>
                      </TouchableOpacity>
                  </View>

                  <View style={[styles.buttonContainerColumns, { flex: 1 }]}>
                      <TouchableOpacity
                        style={[styles.modernButton, styles.buttonWithIcon, { width: '85%' }]}
                        onPress={this.fetchData}
                      >
                          <Ionicons name="refresh" size={20} color="#fff" style={{ marginRight: 8 }} />
                          <Text style={styles.buttonText}>Restablecer</Text>
                      </TouchableOpacity>
                  </View>
              </View>

              {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#28a745" />
                </View>
              ) : (
                <View style={styles.postsContainer}>
                    <Loader
                      data={posts}
                      renderItem={({ item }) => (
                        <PostItem
                          post={item}
                          btnSubmitApplication={this.btnSubmitApplication}
                          handleUserNamePress={this.handleUserNamePress}
                          currentUserId={this.id_user}
                        />
                      )}
                    />
                </View>
              )}

              <Popup
                modalVisible={this.controller.modalVisible}
                setModalVisible={visible => {
                    this.controller.modalVisible = visible;
                    this.forceUpdate();
                }}
                modalType={this.controller.modalType}
                msg={this.controller.msg}
                actionConfirm={this.controller.modalFunction}
              />

              <Modal
                transparent={true}
                visible={isPostSearchFormVisible}
                onRequestClose={this.togglePostSearchFormModal}
              >
                  <PostSearchForm
                    gameOptions={gameOptions}
                    platformOptions={platformOptions}
                    modeOptions={modeOptions}
                    gameSelected={gameSelected}
                    platformSelected={platformSelected}
                    modeSelected={modeSelected}
                    controller={this.controller}
                    handleSubmit={this.handleSubmit}
                    togglePostSearchFormModal={this.togglePostSearchFormModal}
                  />
              </Modal>
          </View>
        );
    }
}
