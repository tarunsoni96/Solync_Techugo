import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  AsyncStorage,
  BackHandler
} from "react-native";

const { width, height } = Dimensions.get("screen");

export class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      userId: ""
    };
  }
  componentDidMount() {
    AsyncStorage.getItem("userId", (err, result) => {
      userData = JSON.parse(result);
      console.log("USER ID CONSOLE", userData);
      this.setState({
        userId: userData
      });
      if (
        this.state.userId == "" ||
        this.state.userId == null ||
        this.state.userId == undefined
      ) {
        setTimeout(() => {
          this.props.navigation.navigate("LandingScreen");
        }, 3000);
      } else {
        setTimeout(() => {
          this.props.navigation.navigate("Home");
        }, 3000);
      }
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    //setTimeout(() => {this.props.navigation.navigate('LandingScreen')}, 3000)
  }

  handleBackButton() {
    return true;
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  render() {
    return (
      <ImageBackground
        source={require("../src/assets/Images/background.png")}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#7e3c85"
        }}
      >
        <View
          style={{
            justifyContent: "center",
            width: width - 30,
            alignSelf: "center",
            borderRadius: 8
          }}
        >
          <Image
            source={require("../src/assets/Images/Logo.png")}
            style={{ alignSelf: "center", width: 73, height: 114 }}
          />
        </View>
      </ImageBackground>
    );
  }
}
export default Splash;
