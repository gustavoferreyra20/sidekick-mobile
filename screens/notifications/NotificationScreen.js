import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from '../../assets/scripts/styles';
import NotificationCtrl from '../../controllers/notifications/NotificationCtrl';
import NotificationItem from '../../components/notifications/NotificationItem';
import Loader from '../../assets/scripts/loader';

export class NotificationScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            loading: true,
        };
        this.controller = new NotificationCtrl();
    };

    componentDidMount() {
        this.loadNotifications();
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.loadNotifications();
        });
    }

    componentWillUnmount() {
        if (this.focusListener && typeof this.focusListener === 'function') {
            this.focusListener();
        }
    }

    loadNotifications = async () => {
        const notifications = await this.controller.getNotifications(this.props.route.params.sessionId);
        this.setState({ notifications: notifications, loading: false });
    };

    btnDelete = async (id_notification) => {
        await this.controller.removeNotification(id_notification);
        await this.loadNotifications()
    }

    render() {
        const { loading, notifications } = this.state;

        if (loading) {
            return (
                <View style={styles.container}>
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#28a745" />
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Loader
                    data={notifications}
                    renderItem={({ item }) => <NotificationItem notification={item} onDelete={this.btnDelete} />}
                    style={styles.FlatList}
                />
            </View>
        );
    }
}