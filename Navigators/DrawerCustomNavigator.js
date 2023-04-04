
import React, { Component } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import { HomeScreen } from "../screens/home";
import { GamesScreen } from "../screens/games";
import { NewPostScreen } from "../screens/newPost";
import { ApplicationsScreen } from "../screens/applications";
import { ProfileScreen } from "../screens/profile";
import { StoreScreen } from "../screens/store";
import { ConfigScreen } from "../screens/config";
import { DrawerContentScreen } from "../screens/DrawerContentScreen";

const Drawer = createDrawerNavigator();

export class DrawerCustomNavigator extends Component {

    render() {
        return (
            <Drawer.Navigator
                useLegacyImplementation={true}
                initialRouteName="Inicio"
                headerMode={'none'}
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
                <Drawer.Screen name="configuracion" component={ConfigScreen} />
            </Drawer.Navigator>
        );
    }

}

