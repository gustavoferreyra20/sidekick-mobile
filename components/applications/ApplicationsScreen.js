import React, { Component } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../../assets/scripts/styles';
import ApplicationCtrl from './ApplicationCtrl';
import Loader from '../../assets/scripts/loader';
import SentApp from './SentApp';
import ReceivedApp from './ReceivedApp';
import PopupService from '../popups/PopupService';
import { RateScreen } from '../rate/RateScreen';

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
        this.controller = new ApplicationCtrl();
        this.id_profile = this.props.route.params.sessionId;
    }

    componentDidMount() {
        this.fetchApplications();
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.fetchApplications();
        });
    }

    componentWillUnmount() {
        if (this.focusListener && typeof this.focusListener === 'function') {
            this.focusListener();
        }
    }

    handleUserNamePress = (id_user) => {
        this.props.navigation.navigate("Perfil", {
            sessionId: id_user,
            isCurrentUser: false
        });
    };

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
        await this.controller.changeStatus(id_user, id_post, status, this.showReceivedApp);
        this.setState({});
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

    btnContact = async (id_user) => {
        await this.controller.contact(id_user);
        this.setState({});
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
                    <RateScreen id_profile={this.id_profile} rated_id_user={rate.id_user} rated_id_post={rate.id_post} id_application={rate.id_application} navigation={this.props.navigation} updateReview={this.updateReview} />
                ) : (
                    <>
                        <View style={styles.headerRows}>
                            <View style={styles.buttonContainerColumns}>
                                <TouchableOpacity
                                    style={[styles.modernButton,
                                        {
                                            backgroundColor: selectedButton === 'Enviadas' ? '#047734' : '#28a745',
                                            width: '90%'
                                        }]}
                                    onPress={this.showSentApps}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.buttonText}>Enviadas</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.buttonContainerColumns}>
                                <TouchableOpacity
                                    style={[styles.modernButton,
                                        {
                                            backgroundColor: selectedButton === 'Recibidas' ? '#047734' : '#28a745',
                                            width: '90%'
                                        }]}
                                    onPress={this.showReceivedApp}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.buttonText}>Recibidas</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {loading ? (
                            <Text style={styles.text}>Loading...</Text>
                        ) : (
                            <View style={styles.applicationsContainer}>
                                {this.state.selectedButton === 'Enviadas' && (
                                    <Loader
                                        data={sentApps}
                                        renderItem={({ item }) => <SentApp item={item} onCancelApplication={this.btnCancelApplication} contact={this.btnContact} />}
                                    />
                                )}
                                {this.state.selectedButton === 'Recibidas' && (
                                    <Loader
                                        data={receivedApps}
                                        renderItem={({ item }) => <ReceivedApp post={item} onDeletePost={this.btnDeletePost} changeStatus={this.btnChangeStatus} rate={this.btnRate} contact={this.btnContact} handleUserNamePress={this.handleUserNamePress} />}
                                    />
                                )}
                            </View>
                        )}
                    </>
                )}
                <PopupService
                    modalVisible={this.controller.modalVisible}
                    setModalVisible={this.setModalVisible}
                    modalType={this.controller.modalType}
                    contactInf={this.controller.contactInf}
                    msg={this.controller.msg}
                    actionConfirm={this.controller.modalFunction}
                />
            </View>
        );
    }
}