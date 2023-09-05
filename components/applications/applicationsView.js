import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../../assets/styles';
import ApplicationController from './applicationController';
import Loader from '../../assets/loader';
import SendedApp from './sendedAppView';
import ReceivedApp from './receivedAppView';
import MyModal from '../popups/popupService';
import { RateView } from '../rate/rateView';

export class ApplicationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedButton: 'Enviadas',
            sendedApps: [],
            receivedApps: [],
            rate: { id_user: 0, id_post: 0, show: false }
        };
        this.controller = new ApplicationController();
        this.id_profile = this.props.route.params.id_user;
    }

    componentDidMount() {
        this.fetchApplications();
    }

    fetchApplications = async () => {
        try {
            let receivedApps = await this.controller.getReceivedApp(this.id_profile);
            let sendedApps = await this.controller.getSendedApps(this.id_profile);
            this.setState({ loading: false, receivedApps: receivedApps, sendedApps: sendedApps });
        } catch (error) {
            console.error('Error fetching applications:', error);
            this.setState({ loading: false });
        }
    };

    showSendedApps = async () => {
        let sendedApps = await this.controller.getSendedApps(this.id_profile);
        this.setState({ selectedButton: 'Enviadas', sendedApps: sendedApps });
    }

    showReceivedApp = async () => {
        let receivedApps = await this.controller.getReceivedApp(this.id_profile);
        this.setState({ selectedButton: 'Recibidas', receivedApps: receivedApps });
    }

    btnCancelApplication = async (id_post) => {
        await this.controller.cancelApplication(id_post, this.id_profile, this.showSendedApps);
        this.setState({});
    }

    btnChangeStatus = async (id_user, id_post, status) => {
        try {
            // Update the server first
            await this.controller.changeStatus(id_user, id_post, status);

            // Update the state after the server update is successful
            const updatedReceivedApps = this.state.receivedApps.map((grandparent) => {
                if (grandparent.id_post === id_post) {
                    const updatedUsers = grandparent.users.map((parent) => {
                        if (parent.id_user === id_user) {
                            return {
                                ...parent,
                                applications: {
                                    ...parent.applications,
                                    status: status
                                }
                            };
                        }
                        return parent;
                    });

                    const updatedActualUsers = status === 'accepted' ? grandparent.actualUsers + 1 : grandparent.actualUsers - 1;

                    return {
                        ...grandparent,
                        users: updatedUsers,
                        actualUsers: updatedActualUsers
                    };
                }
                return grandparent;
            });

            this.setState({ receivedApps: updatedReceivedApps });
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

    btnRate = (id_user, id_post) => {
        this.setState({ rate: { id_user: id_user, id_post: id_post, show: true } });
    };

    changeRate = () => {
        this.setState({ rate: !this.state.rate });
    };

    render() {
        const { selectedButton, loading, sendedApps, receivedApps, rate } = this.state;
        return (
            <View style={styles.container}>
                {rate.show ? (
                    <RateView id_profile={this.id_profile} rated_id_user={rate.id_user} rated_id_post={rate.id_post} navigation={this.props.navigation} changeRate={this.changeRate} />
                ) : (
                    <>
                        <View style={styles.headerApplications}>
                            <View style={styles.buttonContainerAplications}>
                                <Button
                                    color={selectedButton === 'Enviadas' ? '#047734' : '#0eaa61'}
                                    title="Enviadas"
                                    onPress={this.showSendedApps}
                                />
                            </View>
                            <View style={styles.buttonContainerAplications}>
                                <Button
                                    color={selectedButton === 'Recibidas' ? '#047734' : '#0eaa61'}
                                    title="Recibidas"
                                    onPress={this.showReceivedApp}
                                />
                            </View>
                        </View>

                        {loading ? (
                            <Text>Loading...</Text>
                        ) : (
                            <View style={styles.applicationsContainer}>
                                {this.state.selectedButton === 'Enviadas' && (
                                    <Loader
                                        data={sendedApps}
                                        renderItem={({ item }) => <SendedApp item={item} onCancelApplication={this.btnCancelApplication} />}
                                    />
                                )}
                                {this.state.selectedButton === 'Recibidas' && (
                                    <Loader
                                        data={receivedApps}
                                        renderItem={({ item }) => <ReceivedApp post={item} onDeletePost={this.btnCancelApplication} changeStatus={this.btnChangeStatus} rate={this.btnRate} />}
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