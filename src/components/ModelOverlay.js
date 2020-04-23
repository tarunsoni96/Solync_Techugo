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
      cancelColor,
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
              paddingVertical: heightPercentageToDP(3),
              paddingTop:heightPercentageToDP(7.5),
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
                maxWidth:widthPercentageToDP(80),
                fontFamily: Fonts.heavy,
              }}>

              {title ||
                `Do you want to block ${
                  !isGroupChat ? userObj?.first_name : "all users"
                }?`}{" "}
            </Text>

            <Text
              style={{
                fontSize: widthPercentageToDP(4),

                textAlign: "center",
                marginVertical: heightPercentageToDP(4),
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
                height: heightPercentageToDP(9.5),
                // marginTop: heightPercentageToDP(5),
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
                  // padding: heightPercentageToDP(4),
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: cancelColor || "grey",
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
