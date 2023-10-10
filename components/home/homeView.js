import React, { Component } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import PostSearchForm from '../PostSearchForm/PostSearchForm'; // Update the path to your PostSearchForm component
import styles from '../../assets/styles';
import HomeCtrl from './homeCtrl';
import MyModal from '../popups/popupService';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameOptions: [],
            platformOptions: [],
            modeOptions: [],
            isPostSearchFormVisible: false,
        };
        this.controller = new HomeCtrl();
    }

    async componentDidMount() {
        try {
            // Fetch and update game options
            const gameOptions = await this.controller.fetchGameOptions();
            // Fetch and update platform options
            const platformOptions = await this.controller.setPlatforms();
            // Fetch and update mode options
            const modeOptions = await this.controller.fetchModeOptions();

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

    handleSubmit = (game, platform, mode) => {
        this.controller.btnSearchPost(game, platform, mode);
    };

    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    };

    // Toggle the visibility of the PostSearchForm modal
    togglePostSearchFormModal = () => {
        this.setState((prevState) => ({
            isPostSearchFormVisible: !prevState.isPostSearchFormVisible,
        }));
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Posts más recientes</Text>
                <View style={styles.hr_main} />

                <Button
                    title="Show PostSearchForm"
                    onPress={this.togglePostSearchFormModal}
                    color="#0eaa61"
                />

                <MyModal
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
                    modalType={this.controller.modalType}
                    msg={this.controller.msg}
                    actionConfirm={this.controller.modalFunction}
                />

                <Modal // Assuming you have a Modal component
                    transparent={true}
                    visible={this.state.isPostSearchFormVisible}
                    onRequestClose={this.togglePostSearchFormModal}
                >

                    <PostSearchForm
                        gameOptions={this.state.gameOptions}
                        platformOptions={this.state.platformOptions}
                        modeOptions={this.state.modeOptions}
                        handleSubmit={this.handleSubmit}
                        togglePostSearchFormModal={this.togglePostSearchFormModal}
                    />
                </Modal>
            </View>
        );
    }
}