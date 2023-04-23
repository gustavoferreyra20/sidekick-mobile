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
            </Modal>
        )
    }
}

export default MyModal;