import React, { Component } from 'react';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, StyleSheet } from "react-native";
import { Image } from 'react-native';

export class DrawerContentScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            focused: false
        };
    }

    updateFocus = (isFocused) => {
        this.setState({ focused: isFocused });
    }

    render() {

        return (
            <View style={styles.container}>
                <DrawerContentScrollView {...this.props}>
                    <View style={styles.topDrawer}>
                        <DrawerItem
                            icon={() => <Image source={require('../assets/img/icons/home.png')} style={styles.icon} />}
                            label="Inicio"
                            onPress={() => {
                                this.props.navigation.navigate("Inicio");
                                this.setState({ focusedItemIndex: 1 });
                            }}
                            labelStyle={{ color: "#fff" }}
                            focused={this.state.focusedItemIndex === 1}
                            style={
                                this.state.focusedItemIndex === 1 ?
                                    { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                                    :
                                    null
                            }
                        />
                        <DrawerItem
                            icon={() => <Image source={require('../assets/img/icons/plays.png')} style={styles.icon} />}
                            label="Juegos"
                            onPress={() => {
                                this.props.navigation.navigate("Juegos");
                                this.setState({ focusedItemIndex: 2 });
                            }}
                            labelStyle={{ color: "#fff" }}
                            focused={this.state.focusedItemIndex === 2}
                            style={
                                this.state.focusedItemIndex === 2 ?
                                    { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                                    :
                                    null
                            }
                        />
                        <DrawerItem
                            icon={() => <Image source={require('../assets/img/icons/plus.png')} style={styles.icon} />}
                            label="Crear anuncio"
                            onPress={() => {
                                this.props.navigation.navigate("Crear anuncio");
                                this.setState({ focusedItemIndex: 3 });
                            }}
                            labelStyle={{ color: "#fff" }}
                            focused={this.state.focusedItemIndex === 3}
                            style={
                                this.state.focusedItemIndex === 3 ?
                                    { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                                    :
                                    null
                            }
                        />
                        <DrawerItem
                            icon={() => <Image source={require('../assets/img/icons/messages.png')} style={styles.icon} />}
                            label="Solicitudes"
                            onPress={() => {
                                this.props.navigation.navigate("Solicitudes");
                                this.setState({ focusedItemIndex: 4 });
                            }}
                            labelStyle={{ color: "#fff" }}
                            focused={this.state.focusedItemIndex === 4}
                            style={
                                this.state.focusedItemIndex === 4 ?
                                    { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                                    :
                                    null
                            }
                        />
                        <DrawerItem
                            icon={() => <Image source={require('../assets/img/icons/home.png')} style={styles.icon} />}
                            label="Perfil"
                            onPress={() => {
                                this.props.navigation.navigate("Perfil");
                                this.setState({ focusedItemIndex: 5 });
                            }}
                            labelStyle={{ color: "#fff" }}
                            focused={this.state.focusedItemIndex === 5}
                            style={
                                this.state.focusedItemIndex === 5 ?
                                    { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                                    :
                                    null
                            }
                        />
                        <DrawerItem
                            icon={() => <Image source={require('../assets/img/icons/plays.png')} style={styles.icon} />}
                            label="Tienda"
                            onPress={() => {
                                this.props.navigation.navigate("Tienda");
                                this.setState({ focusedItemIndex: 6 });
                            }}
                            labelStyle={{ color: "#fff" }}
                            focused={this.state.focusedItemIndex === 6}
                            style={
                                this.state.focusedItemIndex === 6 ?
                                    { backgroundColor: "rgba(255, 255, 255, 0.1)" }
                                    :
                                    null
                            }
                        />
                    </View>
                </DrawerContentScrollView>
                <View style={styles.bottomDrawer}>
                    <DrawerItem
                        icon={() => <Image source={require('../assets/img/icons/settings.png')} style={styles.icon} />}
                        label="Configuracion"
                        onPress={() => this.props.navigation.navigate("configuracion")}
                        labelStyle={{ color: "#fff" }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3e3c3d',
    },
    icon: {
        height: 45,
        width: 45,
    },
    topDrawer: {
        flex: 1
    },
    bottomDrawer: {
        flex: -1,
        justifyContent: 'flex-end',
        marginBottom: 15,
        borderTopColor: '#1ded8c',
        borderTopWidth: 1
    }
});