
import React, { Component } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import { HomeScreen } from "../components/home/homeView";
import { GamesScreen } from "../components/games/gamesView";
import { NewPostScreen } from "../components/newPost/newPostView";
import { ApplicationsScreen } from "../components/applications/applicationsView";
import { ProfileScreen } from "../components/profile/profileView";
import { StoreScreen } from "../components/store/storeView";
import { ConfigScreen } from "../components/config/configView";
import { DrawerContentScreen } from "./DrawerContentView";

const Drawer = createDrawerNavigator();

export class DrawerCustomNavigator extends Component {

    render() {
        return (
            <Drawer.Navigator
                useLegacyImplementation={true}
                initialRouteName="Inicio"
                drawerContent={props => <DrawerContentScreen {...props} />}
                screenOptions={{
                    headerStyle: { backgroundColor: '#1ded8c' },
                    headerTintColor: 'black'
                }}
            >
                <Drawer.Screen name="Inicio" component={HomeScreen} />
                <Drawer.Screen name="Juegos" component={GamesScreen} />
                <Drawer.Screen name="Crear anuncio" component={NewPostScreen} />
                <Drawer.Screen name="Solicitudes" component={ApplicationsScreen} />
                <Drawer.Screen name="Perfil" component={ProfileScreen} />
                <Drawer.Screen name="Tienda" component={StoreScreen} />
                <Drawer.Screen name="configuracion" children={() => <ConfigScreen onLogout={() => this.props.onLogout()} />} />
                
            </Drawer.Navigator>
        );
    }

}

