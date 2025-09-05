
import React, { Component } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import { HomeScreen } from "../components/home/HomeScreen";
import { NotificationScreen } from "../components/notifications/NotificationScreen";
import { GamesScreen } from "../components/games/GamesScreen";
import { NewPostScreen } from "../components/newPost/NewPostScreen";
import { ApplicationsScreen } from "../components/applications/ApplicationsScreen";
import { ProfileScreen } from "../components/profile/ProfileScreen";
import { StoreScreen } from "../components/store/StoreScreen";
import { ConfigScreen } from "../components/config/ConfigScreen";
import { DrawerContentScreen } from "./DrawerContentView";

const Drawer = createDrawerNavigator();

export class DrawerCustomNavigator extends Component {

    render() {
        return (
            <Drawer.Navigator
                initialRouteName="Inicio"
                drawerContent={props => <DrawerContentScreen {...props} />}
                screenOptions={{
                    headerStyle: { backgroundColor: '#28a745' },
                    headerTintColor: 'black'
                }}
            >
                <Drawer.Screen
                    name="Inicio"
                    component={HomeScreen}
                    initialParams={{
                        sessionId: this.props.sessionId
                    }} />
                <Drawer.Screen
                    name="Notificaciones"
                    component={NotificationScreen}
                    initialParams={{
                        sessionId: this.props.sessionId
                    }} />
                <Drawer.Screen
                    name="Juegos"
                    component={GamesScreen}
                    initialParams={{
                        sessionId: this.props.sessionId
                    }} />
                <Drawer.Screen
                    name="Crear anuncio"
                    component={NewPostScreen}
                    initialParams={{
                        sessionId: this.props.sessionId
                    }} />
                <Drawer.Screen
                    name="Solicitudes"
                    component={ApplicationsScreen}
                    initialParams={{
                        sessionId: this.props.sessionId
                    }} />
                <Drawer.Screen
                    name="Perfil"
                    component={ProfileScreen}
                    initialParams={{
                        sessionId: this.props.sessionId,
                        isCurrentUser: true
                    }} />
                <Drawer.Screen
                    name="Tienda"
                    component={StoreScreen} />
                <Drawer.Screen name="Configuración"
                    initialParams={{
                        sessionId: this.props.sessionId
                    }}>
                    {(props) => <ConfigScreen {...props} onLogout={() => this.props.onLogout()} />}
                </Drawer.Screen>
            </Drawer.Navigator>
        );
    }

}

