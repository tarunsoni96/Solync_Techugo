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

export class landingScreen extends Component {
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
      this.setState({
        userId: userData
      });
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    // setTimeout(this.props.navigation.navigate('LandingScreen'), 4000);
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
        source={require("../assets/Images/@BG.png")}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#7e3c85"
        }}
      >
        <View
          style={{
            flex: 4,
            width: width - 30,
            alignSelf: "center",
            borderRadius: 8
          }}
        >
          <Image
            source={require("../assets/Images/Logo.png")}
            style={{
              alignSelf: "center",
              marginTop: "30%",
              width: 73,
              height: 114
            }}
          />
          <Text
            style={{
              textAlign: "center",
              opacity: 1,
              fontSize: 22,
              fontFamily: "Montserrat-Bold",
              justifyContent: "flex-end",
              alignSelf: "center",
              color: "#fff",
              marginTop: "10%"
            }}
          >
            Discover new friends and great adventures
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
export default landingScreen;
