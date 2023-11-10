import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../../assets/scripts/styles';
import ApplicationController from './applicationController';
import Loader from '../../assets/scripts/loader';
import SentApp from './sentAppView';
import ReceivedApp from './receivedAppView';
import MyModal from '../popups/popupService';
import { RateView } from '../rate/rateView';

export class ApplicationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedButton: 'Enviadas',
            sentApps: [],
            receivedApps: [],
            rate: { id_user: 0, id_post: 0, id_application: 0, show: false }
        };
        this.controller = new ApplicationController();
        this.id_profile = this.props.route.params.sessionId;
    }

    componentDidMount() {
        this.fetchApplications();
    }

    fetchApplications = async () => {
        try {
            let receivedApps = await this.controller.getApplications(this.id_profile, 'received');
            let sentApps = await this.controller.getApplications(this.id_profile, 'sent');
            this.setState({ loading: false, receivedApps: receivedApps, sentApps: sentApps });
        } catch (error) {
            console.error('Error fetching applications:', error);
            this.setState({ loading: false });
        }
    };

    showSentApps = async () => {
        let sentApps = await this.controller.getApplications(this.id_profile, 'sent');
        this.setState({ selectedButton: 'Enviadas', sentApps: sentApps });
    }

    showReceivedApp = async () => {
        let receivedApps = await this.controller.getApplications(this.id_profile, 'received');
        this.setState({ selectedButton: 'Recibidas', receivedApps: receivedApps });
    }

    btnCancelApplication = async (id_post, id_application) => {
        await this.controller.cancelApplication(id_post, id_application, this.showSentApps);
        this.setState({});
    }

    btnDeletePost = async (id_post) => {
        await this.controller.remove(id_post, this.showReceivedApp);
        this.setState({});
    }

    btnChangeStatus = async (id_user, id_post, status) => {
        try {
            this.controller.changeStatus(id_user, id_post, status).then(this.showReceivedApp());
        } catch (error) {
            console.error('Error:', error);
        }
    };

    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    }

    btnRate = (id_user, id_post, id_application) => {
        this.setState({ rate: { id_user: id_user, id_post: id_post, id_application: id_application, show: true } });
    };

    updateReview = async () => {
        this.setState({ rate: !this.state.rate });
        await this.showReceivedApp();
    };

    render() {
        const { selectedButton, loading, sentApps, receivedApps, rate } = this.state;
        return (
            <View style={styles.container}>
                {rate.show ? (
                    <RateView id_profile={this.id_profile} rated_id_user={rate.id_user} rated_id_post={rate.id_post} id_application={rate.id_application} navigation={this.props.navigation} updateReview={this.updateReview} />
                ) : (
                    <>
                        <View style={styles.headerColumns}>
                            <View style={styles.buttonContainerColumns}>
                                <Button
                                    color={selectedButton === 'Enviadas' ? '#047734' : '#0eaa61'}
                                    title="Enviadas"
                                    onPress={this.showSentApps}
                                />
                            </View>
                            <View style={styles.buttonContainerColumns}>
                                <Button
                                    color={selectedButton === 'Recibidas' ? '#047734' : '#0eaa61'}
                                    title="Recibidas"
                                    onPress={this.showReceivedApp}
                                />
                            </View>
                        </View>

                        {loading ? (
                            <Text style={styles.text}>Loading...</Text>
                        ) : (
                            <View style={styles.applicationsContainer}>
                                {this.state.selectedButton === 'Enviadas' && (
                                    <Loader
                                        data={sentApps}
                                        renderItem={({ item }) => <SentApp item={item} onCancelApplication={this.btnCancelApplication} />}
                                    />
                                )}
                                {this.state.selectedButton === 'Recibidas' && (
                                    <Loader
                                        data={receivedApps}
                                        renderItem={({ item }) => <ReceivedApp post={item} onDeletePost={this.btnDeletePost} changeStatus={this.btnChangeStatus} rate={this.btnRate} />}
                                    />
                                )}
                            </View>
                        )}
                    </>
                )}
                <MyModal
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
                    modalType={this.controller.modalType}
                    msg={this.controller.msg}
                    actionConfirm={this.controller.modalFunction}
                />
            </View>
        );
    }
}