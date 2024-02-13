import React, { Component } from 'react';
import { Modal, View, Text, Button, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import styles from '../../assets/scripts/styles';
import { SIDEKICK_API } from "@env"

class MyModal extends Component {
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
                    <TouchableOpacity onPress={() => this.props.setModalVisible(false)} style={styles.popupContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.popupContent}>
                                <Text style={[styles.text, { textAlign: "center" }]}>{this.props.msg}</Text>
                                <View style={styles.button}>
                                    <Button
                                        title="Aceptar"
                                        onPress={() => {
                                            this.props.actionConfirm();
                                            this.props.setModalVisible(false);
                                        }}
                                        color="#28a745"
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                )}

                {this.props.modalType === "alert" && (
                    <TouchableOpacity onPress={() => this.props.setModalVisible(false)} style={styles.popupContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.popupContent}>
                                <Text style={[styles.text, { textAlign: "center" }]}>{this.props.msg}</Text>
                                <View style={styles.button}>
                                    <Button
                                        title="Aceptar"
                                        onPress={() => this.props.setModalVisible(false)}
                                        color="#28a745"
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                )}

                {this.props.modalType === "confirm" && (
                    <>
                        <TouchableOpacity onPress={() => this.props.setModalVisible(false)} style={styles.popupContainer}>
                            <TouchableWithoutFeedback>
                                <View style={styles.popupContent}>
                                    <Text style={[styles.text, { textAlign: "center" }]}>{this.props.msg}</Text>
                                    <View style={styles.button}>
                                        <View style={{ marginBottom: 8 }}>
                                            <Button
                                                title="Si"
                                                onPress={() => {
                                                    this.props.actionConfirm();
                                                    this.props.setModalVisible(false);
                                                }}
                                                color="#28a745"
                                            />
                                        </View>
                                        <Button
                                            title="No"
                                            onPress={() => this.props.setModalVisible(false)}
                                            color="#dc3545"
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>

                    </>
                )}

                {this.props.modalType === "contactInf" && (
                    <TouchableOpacity onPress={() => this.props.setModalVisible(false)} style={styles.popupContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.popupContent}>
                                <View style={styles.contactContainer}>
                                    {this.props.contactInf.map((contact, index) => (
                                        <View key={index} style={styles.contactItem}>
                                            {/* Assuming contact.img is the image URL */}
                                            <Image source={{ uri: `${SIDEKICK_API}images/${contact.img}` }} style={styles.contactInfImg} />
                                            <Text style={styles.contactNickname}>{contact.users_contact_inf.nickname || "No nickname"}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        title="Aceptar"
                                        onPress={() => this.props.setModalVisible(false)}
                                        color="#28a745"
                                    />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                )}
            </Modal>
        )
    }
}

export default MyModal;