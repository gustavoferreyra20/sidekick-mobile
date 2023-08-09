import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../../assets/styles';
import ApplicationController from './applicationController';
import Loader from '../../assets/loader';
import SendedApp from './sendedAppView';
import MyModal from '../popups/popupService';

export class ApplicationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedButton: 'Enviadas',
            sendedApps: [],
            receivedApps: [],
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
        //console.log('Enviadas: ' + sendedApps.length)
        this.setState({ selectedButton: 'Enviadas', sendedApps: sendedApps });
    }

    showReceivedApp = async () => {
        let receivedApps = await this.controller.getReceivedApp(this.id_profile);
        //console.log('Recibidas: ' + receivedApps.length)
        this.setState({ selectedButton: 'Recibidas', receivedApps: receivedApps });
    }

    btnCancelApplication = async (id_post) => {
        await this.controller.cancelApplication(id_post, this.id_profile, this.showSendedApps);
        this.setState({});
    }

    setModalVisible = (visible) => {
        if (typeof this.controller.function === "function") {
            this.controller.function();
        }

        this.controller.modalVisible = visible;
        this.forceUpdate();
    }

    render() {
        const { selectedButton, loading, sendedApps, receivedApps } = this.state;

        return (
            <View style={styles.container}>
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
                                renderItem={({ item }) => <Text>{item.title}</Text>}
                            />
                        )}
                    </View>
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