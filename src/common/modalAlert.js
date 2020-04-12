import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions
} from "react-native";
const { height, width } = Dimensions.get("screen");
import {
  scaleHeight,
  scaleWidth,
  normalizeFontMenu
} from "../common/responsive";
import LinearGradient from "react-native-linear-gradient";
export default class ModalAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }
  render() {
    let {
      onPressCancel,
      modalVisible,
      modalBackgroundColor,
      titleTextModal,
      contentTextModal,
      textCancelModal,
      textAgreeModal,
      onPressModal
    } = this.props;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            alert("Modal closed");
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", position: "relative" }}
          >
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: modalBackgroundColor,
                opacity: 0.95,
                position: "relative"
              }}
            ></View>
            <LinearGradient
              colors={[
                "#00FFFF",
                "#17C8FF",
                "#329BFF",
                "#4C64FF",
                "#6536FF",
                "#8000FF"
              ]}
              start={{ x: 0.0, y: 1.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={{
                height: "35%",
                width: width - 50,
                backgroundColor: "#fff",
                zIndex: 1,
                alignSelf: "center",
                opacity: 1.0,
                position: "absolute"
              }}
            >
              <View
                style={{
                  padding: 15,
                  marginLeft: 1,
                  marginRight: 100,
                  width: width - 52,
                  height: "99%",
                  marginTop: 1,
                  marginBottom: 1,
                  backgroundColor: "#fff"
                }}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat-Regular",
                    fontSize: 23,
                    color: "black",
                    textAlign: "center",
                    marginTop: "5%"
                  }}
                >
                  {titleTextModal}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                    fontFamily: "Montserrat-Regular",
                    marginTop: "5%",
                    color: "#7a7a7a"
                  }}
                >
                  {contentTextModal}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: "transparent",
                    bottom: 0,
                    position: "absolute",
                    width: width - 60,
                    height: "20%",
                    alignSelf: "center"
                  }}
                >
                  <TouchableOpacity onPress={onPressCancel}>
                    <Text style={{ fontSize: 20, color: "grey" }}>
                      {textCancelModal}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onPressModal}>
                    <Text style={{ fontSize: 20, color: "#781672" }}>
                      {textAgreeModal}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      </View>
    );
  }
}
