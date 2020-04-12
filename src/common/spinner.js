/**
 * *******************Spinner component****************
 */
import React, { Component } from 'react'
import {
    View,
    Text,
    Modal,
    ActivityIndicator
} from 'react-native'

//LoadWheel class

class LoadWheel extends Component {
    render() {
        let { visible, text, onRequestClose } = this.props;
        return (
            <Modal
                transparent={true}
                visible={visible}
                onRequestClose={onRequestClose}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: 'transparent', borderRadius: 5, padding: 10, width: 230, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#930c6d" />
                        <Text style={{ color: '#930c6d', fontSize: 18, marginLeft: 10, fontWeight: "bold" }}> {text}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}
export default LoadWheel;