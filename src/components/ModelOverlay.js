import React, { Component } from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import "Helpers/global";
import Fonts from "UIProps/Fonts";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
export default class ModelOverlay extends Component {
  render() {
    const {
      modalVisible,
      closeModal,
      userObj,
      posPress,
      tintColor,
      title,
      isGroupChat,
      msg,
      bgColor,
      posBtn,
      ngBtn,
    } = this.props;
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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableWithoutFeedback onPress={() => closeModal()}>
            <View
              style={{
                height: height,
                width: width,
                position: "absolute",
                backgroundColor: bgColor || "#FFF",
                opacity: 0.8,
              }}
            />
          </TouchableWithoutFeedback>

          <ImageBackground
            source={require("../assets/Images/@popup-bg.png")}
            style={{
              width: "100%",
              height: "auto",
              paddingBottom: heightPercentageToDP(2.8),
              alignItems: "center",
            }}
            resizeMode={"stretch"}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: widthPercentageToDP(5),
                color: "black",
                textAlign: "center",
                paddingHorizontal:10,
                fontFamily: Fonts.heavy,
                marginTop: 50,
              }}>

              {title ||
                `Do you want to block ${
                  !isGroupChat ? userObj?.first_name : "all users"
                }?`}{" "}
            </Text>

            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                marginTop: 20,
                maxWidth: "70%",

                color: "#7a7a7a",
                fontFamily: "Montserrat-Regular",
              }}
            >
              {msg ||
                "They will not be able to see your profile or message you."}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                height: 60,
                marginTop: 50,
                alignSelf: "center",
                // borderBottomRightRadius: 10,
                // borderBottomLeftRadius: 10
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                }}
                style={{
                  backgroundColor: "#f6f7f8",
                  borderBottomLeftRadius: 10,
                  justifyContent: "center",
                  width: "49.5%",
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "grey",
                    fontFamily: "Montserrat-ExtraBold",
                    alignSelf: "center",
                  }}
                >
                  {ngBtn?.toUpperCase() || "CANCEL"}
                </Text>
              </TouchableOpacity>

              <View style={{ width: 2 }} />

              <TouchableOpacity
                onPress={() => (posPress ? posPress() : closeModal())}
                style={{
                  backgroundColor: "#f6f7f8",
                  width: "49.5%",
                  justifyContent: "center",
                  borderBottomRightRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: tintColor || "#781672",
                    alignSelf: "center",
                    fontFamily: "Montserrat-ExtraBold",
                  }}
                >
                  {posBtn?.toUpperCase() || "BLOCK USER"}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal>
    );
  }
}
