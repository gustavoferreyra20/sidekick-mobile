import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../assets/scripts/styles';
import NotificationController from './notificationController';
import NotificationItem from './notificationItem';
import Loader from '../../assets/scripts/loader';

export class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            loading: true,
        };
        this.controller = new NotificationController();
    };

    componentDidMount() {
        this.loadNotifications()
    };

    loadNotifications = async () => {
        const notifications = await this.controller.getNotifications(this.props.route.params.sessionId);
        this.setState({ notifications: notifications, loading: false });
    };

    render() {
        const { loading, notifications } = this.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.line}></View>
                <Loader
                    data={notifications}
                    renderItem={({ item }) => <NotificationItem notification={item} />}
                    style={styles.FlatList}
                />
            </View>
        );
    }
}