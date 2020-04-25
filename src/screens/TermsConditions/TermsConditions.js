import React, { Component } from "react";
import {
  Image,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import Container from "../../AppLevelComponents/UI/Container";
import { TextInput } from "react-native-gesture-handler";
import GradButton from "../../common/gradientButton";
const { height, width } = Dimensions.get("screen");
import { contactUs } from "ServiceProviders/ApiCaller";
import LinearGradient from "react-native-linear-gradient";

import MobxStore from "../../StorageHelpers/MobxStore";
import HelperMethods from "../../Helpers/Methods";
import EventCardMusic from "../../components/EventCardMusic";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
export default class TermsConditions extends Component {
  state = {
    input: "",
    isApiCall: false,
  };

  postQue() {
    const { contactType } = this.props.navigation.state.params || {};
    if (this.state.input.length == 0) {
      alert("Please enter your message");
      return;
    }
    this.setState({ isApiCall: true });
    contactUs(MobxStore.userObj.user_id, contactType, this.state.input)
      .then((resp) => {
        const { statusCode } = resp;
        if (statusCode == 200) {
          HelperMethods.snackbar("Sent successfully");
          this.props.navigation.pop();
        }
        this.setState({ isApiCall: false });
      })
      .catch((err) => {
        this.setState({ isApiCall: "failed" });
      });
  }

  render() {
    const { type } = this.props.navigation.state.params || {};
    return (
      <Container>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: width,
            marginVertical: 40,
            justifyContent: "space-between",
            bottom: 7,

            borderColor: "#DCDCDC",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.pop()}
            style={{ justifyContent: "center", width: width / 6 }}
          >
            <View>
              <Image
                source={require("../../assets/Images/Left.png")}
                style={{
                  height: height / 40,
                  marginLeft: 20,
                  width: width / 20,
                  // alignSelf: "center"
                }}
                resizeMode={"contain"}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              width: width / 1.2,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                alignSelf: "center",
                fontWeight: "bold",
                marginRight: width / 6,
                width: "100%",
                textAlign: "center",
              }}
            >
              {type || "Terms & Conditions"}
            </Text>
          </View>
        </View>


        <View style={{ flex: 1,backgroundColor:'red', width: "100%" }}>
          {/* <EventCardMusic obj= /> */}

         
          
        </View>

        <View style={{backgroundColor:'green',width:'100%'}}>
              <Text>jaskdj</Text>
        </View>

      </Container>
    );
  }
}

const styles = {
  circle: {
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
    backgroundColor: "#fff",
    zIndex: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  circleLine: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: "#000",
    zIndex: 100,

    alignItems: "center",
    justifyContent: "center",
  },
};
