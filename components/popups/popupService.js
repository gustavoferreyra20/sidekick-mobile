import React, { Component } from 'react';
import { Modal, View, Text, Button, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styles from '../../assets/styles';

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
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Aceptar"
                                        onPress={() => {
                                            this.props.actionConfirm();
                                            this.props.setModalVisible(false);
                                        }}
                                        color="#0eaa61"
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
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title="Aceptar"
                                        onPress={() => this.props.setModalVisible(false)}
                                        color="#0eaa61"
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
                                    <View style={styles.buttonContainer}>
                                        <View style={{ marginBottom: 8 }}>
                                            <Button
                                                title="Si"
                                                onPress={() => {
                                                    this.props.actionConfirm();
                                                    this.props.setModalVisible(false);
                                                }}
                                                color="#0eaa61"
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
            </Modal>
        )
    }
}

export default MyModal;