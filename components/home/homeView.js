import React, { Component } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import PostSearchForm from '../PostSearchForm/PostSearchForm'; // Update the path to your PostSearchForm component
import styles from '../../assets/scripts/styles';
import HomeCtrl from './homeCtrl';
import MyModal from '../popups/popupService';
import Loader from '../../assets/scripts/loader';
import Post from '../posts/postsView';

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
    }

    async componentDidMount() {
        try {
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
        } catch (error) {
            console.error(error);
            this.setState({
                loading: false,
            });
        }
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

    btnSubmitApplication = (id_post) => {
        this.controller.submitApplication(id_post, this.id_user).then(() => {
            this.forceUpdate()
        })
    };

    render() {
        const { posts, loading, gameOptions, platformOptions, modeOptions, isPostSearchFormVisible } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Posts más recientes</Text>
                <View style={styles.hr_main} />

                <Button
                    title="Buscar"
                    onPress={this.togglePostSearchFormModal}
                    color="#0eaa61"
                />

                {loading ? (
                    <Text style={styles.text}>Loading...</Text>
                ) : (
                    <View style={styles.postsContainer}>
                        <Loader
                            data={posts}
                            renderItem={({ item }) => <Post post={item} btnSubmitApplication={this.btnSubmitApplication} />}
                        />
                    </View>
                )}

                <MyModal
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