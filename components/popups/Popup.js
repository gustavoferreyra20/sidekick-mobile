import React, {Component} from 'react';
import {Modal, View, Text, TouchableWithoutFeedback, TouchableOpacity, Image} from 'react-native';
import styles from '../../assets/scripts/styles';

class Popup extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Modal
                transparent={true}
                visible={this.props.modalVisible}
            >
                {this.props.modalType === "action" && (
                    <TouchableOpacity
                        onPress={() => {
                            this.props.actionConfirm();
                            this.props.setModalVisible(false);
                        }}
                        style={styles.popupContainer}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.popupContent}>
                                <Text style={[styles.text, {textAlign: "center"}]}>{this.props.msg}</Text>

                                <TouchableOpacity
                                    style={styles.modernButton}
                                    onPress={() => {
                                        this.props.actionConfirm();
                                        this.props.setModalVisible(false);
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.buttonText}>Aceptar</Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                )}

                {this.props.modalType === "alert" && (
                    <TouchableOpacity onPress={() => this.props.setModalVisible(false)} style={styles.popupContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.popupContent}>
                                <Text style={[styles.text, {textAlign: "center"}]}>{this.props.msg}</Text>

                                <TouchableOpacity
                                    style={styles.modernButton}
                                    onPress={() => this.props.setModalVisible(false)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.buttonText}>Aceptar</Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                )}

                {this.props.modalType === "confirm" && (
                    <TouchableOpacity
                        onPress={() => this.props.setModalVisible(false)}
                        style={styles.popupContainer}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.popupContent}>
                                <Text style={[styles.text, {textAlign: "center"}]}>
                                    {this.props.msg}
                                </Text>

                                <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
                                    <TouchableOpacity
                                        style={[styles.modernButton, {
                                            backgroundColor: '#28a745',
                                            flex: 1,
                                            marginRight: 8
                                        }]}
                                        onPress={() => {
                                            this.props.actionConfirm();
                                            this.props.setModalVisible(false);
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.buttonText}>Si</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.modernButton, {
                                            backgroundColor: '#dc3545',
                                            flex: 1,
                                            marginLeft: 8
                                        }]}
                                        onPress={() => this.props.setModalVisible(false)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={styles.buttonText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                )}

                {this.props.modalType === "contactInf" && (
                    <TouchableOpacity onPress={() => this.props.setModalVisible(false)} style={styles.popupContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.popupContent}>
                                <View style={styles.contactContainer}>
                                    {this.props.contactInf.map((contact, index) => (
                                        <View key={index} style={styles.contactItem}>
                                            {/* Assuming contact.img is the image URL */}
                                            <Image
                                                source={{uri: `https://sidekick-server-nine.vercel.app/api/images/${contact.img}`}}
                                                style={styles.contactInfImg}/>
                                            <Text
                                                style={styles.contactNickname}>{contact.users_contact_inf.nickname || "No nickname"}</Text>
                                        </View>
                                    ))}
                                </View>
                                <TouchableOpacity
                                    style={styles.modernButton}
                                    onPress={() => this.props.setModalVisible(false)}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.buttonText}>Aceptar</Text>
                                </TouchableOpacity>

                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                )}
            </Modal>
        )
    }
}

export default Popup;