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
import ScreenHeader from "../../components/ScreenHeader";
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
       
        

          <ScreenHeader isCenter title= {type || "Terms & Conditions"} />
        



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
