import React, {Component} from 'react';
import {ActivityIndicator, Modal, Text, TouchableOpacity, View} from 'react-native';
import PostSearchForm from '../postSearchForm/PostSearchForm';
import styles from '../../assets/scripts/styles';
import HomeCtrl from './HomeCtrl';
import PopupService from '../popups/PopupService';
import Loader from '../../assets/scripts/loader';
import PostScreen from '../posts/PostScreen';
import {Ionicons} from "@expo/vector-icons";

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            gameOptions: [],
            platformOptions: [],
            modeOptions: [],
            posts: [],
            isPostSearchFormVisible: false,
        };
        this.controller = new HomeCtrl();
        this.id_user = this.props.route.params.sessionId;
        this.fetchData = this.fetchData.bind(this);
        this.focusListener = null;
    }

    async componentDidMount() {
        try {
            this.fetchData();
        } catch (error) {
            console.error(error);
            this.setState({
                loading: false,
            });
        }
        // Suscribirse al evento de foco
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.fetchData();
        });
    }

    componentWillUnmount() {
        // Limpiar la suscripción al evento de foco
        if (this.focusListener && typeof this.focusListener === 'function') {
            this.focusListener();
        }
    }

    async fetchData() {
        // Fetch and update game options
        const gameOptions = await this.controller.fetchGameOptions();
        // Fetch and update platform options
        const platformOptions = await this.controller.setPlatforms();
        // Fetch and update mode options
        const modeOptions = await this.controller.fetchModeOptions();

        await this.fetchPosts();

        this.setState({
            gameOptions,
            platformOptions,
            modeOptions,
        });
    }

    handleSubmit = async (game, platform, mode) => {
        try {
            let posts = await this.controller.btnSearchPost(game, platform, mode);
            this.setState({ loading: false, posts: posts });
        } catch (error) {
            console.error('Error fetching posts:', error);
            this.setState({ loading: false });
        }

    };

    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    };

    togglePostSearchFormModal = () => {
        this.setState((prevState) => ({
            isPostSearchFormVisible: !prevState.isPostSearchFormVisible,
        }));
    };

    fetchPosts = async () => {
        try {
            let posts = await this.controller.getPosts();
            this.setState({ loading: false, posts: posts });

        } catch (error) {
            console.error('Error fetching posts:', error);
            this.setState({ loading: false });
        }
    };

    btnSubmitApplication = (id_post, id_owner) => {
        this.controller.submitApplication(id_post, id_owner, this.id_user).then(() => {
            this.forceUpdate()
        })
    };

    handleUserNamePress = (id_user) => {
        this.props.navigation.navigate("Perfil", {
            sessionId: id_user,
            isCurrentUser: false
        });
    };

    render() {
        const { posts, loading, gameOptions, platformOptions, modeOptions, isPostSearchFormVisible } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Posts más recientes</Text>
                <View style={styles.hr_main} />

                <View style={[styles.headerRows, { flexDirection: 'row', alignItems: 'center' }]}>
                    <View style={[styles.buttonContainerColumns, { flex: 1 }]}>
                        <TouchableOpacity
                          style={[styles.modernButton, styles.buttonWithIcon, { width: '85%' }]}
                          onPress={this.togglePostSearchFormModal}
                          activeOpacity={0.8}
                        >
                            <Ionicons name="filter" size={20} color="#fff" style={{ marginRight: 8 }} />
                            <Text style={styles.buttonText}>Filtrar</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={[styles.buttonContainerColumns, { flex: 1 }]}>
                        <TouchableOpacity
                          style={[styles.modernButton, styles.buttonWithIcon, { width: '85%' }]}
                          onPress={this.fetchData}
                          activeOpacity={0.8}
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
                            renderItem={({ item }) => <PostScreen post={item} btnSubmitApplication={this.btnSubmitApplication} handleUserNamePress={this.handleUserNamePress} currentUserId={this.id_user} />}
                        />
                    </View>
                )}

                <PopupService
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
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
                        handleSubmit={this.handleSubmit}
                        togglePostSearchFormModal={this.togglePostSearchFormModal}
                    />
                </Modal>
            </View>
        );
    }
}