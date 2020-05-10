import React, { Component } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground
} from "react-native";
import "Helpers/global";
import Fonts from "UIProps/Fonts";
import Icons from "AppLevelComponents/UI/Icons";

export default class ModelImageModeCapture extends Component {
  render() {
    const { modalVisible, closeModal, openMedia } = this.props;
    height = global.deviceHeight;
    width = global.deviceWidth;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.8)',
            justifyContent: "center",
          }}
        >
          <TouchableWithoutFeedback onPress={() => closeModal()}>
            <View
              style={{
                height: global.deviceHeight,
                width: global.deviceWidth,
              }}
            ></View>
          </TouchableWithoutFeedback>

          <View
            style={{
              alignSelf: "center",
              position: "absolute"
            }}
          >
            <TouchableOpacity
              style={[styles.circle, { zIndex: 10 }]}
              onPress={() => closeModal()}
            >
              <Icons lib="Material" name="close" color="red" size={27} />
            </TouchableOpacity>
            <ImageBackground
              source={require("../assets/Images/@popup-bg.png")}
              style={{ width: "auto" }}
              resizeMode="stretch"
            >
              <TouchableOpacity onPress={() => openMedia("gall")}>
                <View style={[styles.btnContainer, { top: 6 }]}>
                  <Text style={styles.font}>Add from photo library</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{ height: 1, backgroundColor: "#eee", width: "90%",alignSelf:'center' }}
              />

              <TouchableOpacity onPress={() => openMedia("cam")}>
                <View style={[styles.btnContainer, { bottom: 6 }]}>
                  <Text style={styles.font}>Take a photo</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  btnContainer: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40
  },

  font: {
    fontFamily: Fonts.medium,
    color: "#000",
    fontSize: 17,
    paddingHorizontal: 10
  },
  circle: {
    borderRadius: 100 / 2,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5,
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 0,
    justifyContent: "center"
  }
};
