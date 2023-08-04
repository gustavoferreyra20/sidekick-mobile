import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../../assets/styles';
import ApplicationController from './applicationController';
import Loader from '../../assets/loader';

export class ApplicationsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendedApps: [],
            receivedApps: [],
            loading: true,
            page: 1,
            selectedButton: 'Enviadas',
        };
        this.controller = new ApplicationController();
        this.id_profile = this.props.route.params.id_user;
    }

    componentDidMount() {
        this.fetchApplications();
    }

    fetchApplications = async () => {
        try {
            const sendedApps = await this.controller.showSendedApps(this.id_profile);
            const receivedApps = await this.controller.showReceivedApp(this.id_profile);

            this.setState({ sendedApps, receivedApps, loading: false });
        } catch (error) {
            console.error('Error fetching applications:', error);
            this.setState({ loading: false });
        }
    };

    handleSendedPress = () => {
        this.setState({ selectedButton: 'Enviadas' });
    };

    handleReceivedPress = () => {
        this.setState({ selectedButton: 'Recibidas' });
    };

    render() {
        const { selectedButton, sendedApps, receivedApps, loading } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.headerApplications}>
                    <View style={styles.buttonContainerAAplications}>
                        <Button
                            color={selectedButton === 'Enviadas' ? '#047734' : '#0eaa61'}
                            title="Enviadas"
                            onPress={this.handleSendedPress}
                        />
                    </View>
                    <View style={styles.buttonContainerAAplications}>
                        <Button
                            color={selectedButton === 'Recibidas' ? '#047734' : '#0eaa61'}
                            title="Recibidas"
                            onPress={this.handleReceivedPress}
                        />
                    </View>
                </View>


                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <View style={styles.applicationsContainer}>
                        <View style={selectedButton != 'Enviadas' ? { display: 'none' } : {}}>
                            <Loader
                                data={sendedApps}
                                renderItem={({ item }) => {
                                    return <Text>{item.title}</Text>;
                                }}
                                style={styles.FlatList}
                            />
                        </View>
                        <View style={selectedButton != 'Recibidas' ? { display: 'none' } : {}}>
                            <Loader
                                data={receivedApps}
                                renderItem={({ item }) => {
                                    return <Text>{item.title}</Text>;
                                }}
                                style={styles.FlatList}
                            />
                        </View>
                    </View>

                )}
            </View>
        );
    }

}