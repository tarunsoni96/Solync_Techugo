import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  BackHandler
} from "react-native";
import { validateEmail } from "../../common/validation";
import HelperMethods from 'Helpers/Methods'
import TextInputSolo from "../../common/textInput";
import GradButton from "../../common/gradientButton";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";

import ErrorText from "../../common/error";
import Images from "../../constant/images";
const { height, width } = Dimensions.get("screen");
import LinearGradient from "react-native-linear-gradient";
import Container from "../../AppLevelComponents/UI/Container";
import { heightPercentageToDP } from "react-native-responsive-screen";
import ScreenHeader from "../../components/ScreenHeader";
export default class forgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      emailAddressMessage: "",
      emailAddressBorderColor: "lightgrey",
      opacityButton: false,
      isApiCall: false
    };
  }

  checkMail() {
    if (this.state.isApiCall) {
      return;
    }
    let validateEmailAddress = validateEmail(this.state.emailAddress);
    if (this.state.emailAddress == "") {
      this.setState({
        emailAddressMessage: "Insert email address",
        emailAddressBorderColor: "#bb205a",
        opacityButton: true
      });
    } else if (validateEmailAddress.error != "") {
      this.setState({
        emailAddressMessage: "Invalid email address",
        emailAddressBorderColor: "#bb205a",
        opacityButton: true
      });
    } else {
      this._signUpFun();
    }
  }
  _signUpFun() {
    this.setState({ isApiCall: true });
    fetch("http://13.232.62.239:6565/api/user/forgotPassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.emailAddress.trim()
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ isApiCall: false });
        if (responseJson.statusCode == 200) {
          this.props.navigation.navigate("InstructionSent", {
            email: this.state.emailAddress
          });
        } else if (responseJson.statusCode == 400) {
          this.setState({
            emailAddressBorderColor: "#bb205a",
            emailAddressMessage: "Email address not found",
            opacityButton: true
          });
        } else {
          console.log(JSON.stringify(responseJson));
        }
        return responseJson;
      })
      .catch(error => {
        console.log(error);
      });
  }
  _tryFocusName() {
    this.setState({
      emailAddressMessage: "",
      emailAddressBorderColor: "lightgrey",
      emailAddress: ""
    });
  }
  render() {
    return (
      <>
      <Container>
              
            <ScreenHeader style={{marginTop:10}} isCenter title='Forgotten password' />

        <View style={{ flex: 1,justifyContent:'center'  }}>
          
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {this.state.emailAddressMessage == "" ? null : (
              <View style={{ flexDirection: "row",width:'100%',marginLeft:35 }}>
                <Image
                  source={Images.warning}
                  style={{ }}
                />
                <ErrorText
                  height={20}
                  message={this.state.emailAddressMessage}
                />
              </View>
            )}
          </View>
          <TextInputSolo
            onChangeText={emailAddress =>
              this.setState({ emailAddress, opacityButton: false })
            }
            borderColor={this.state.emailAddressBorderColor}
            inputState={""}
            autoFocus
            labelText={"Please enter your email address"}
            keyboard={"email-address"}
            fontSize={17}
            fontFamily={"Montserrat-Bold"}
            onFocusText={() => this._tryFocusName()}
            value={this.state.emailAddress}
          />
        </View>
        <View style={{ width: "100%" }}>
          {this.state.emailAddress ? (
            <GradButton
              onPress={() => this.checkMail()}
              isApiCall={this.state.isApiCall}
              text={"Send reset instructions"}
            />
          ) : (
            <GradButton
              text={"Send reset instructions"}
              style={{ opacity: 0.7 }}
            />
          )}
          <Text
            onPress={() => this.props.navigation.navigate("Login")}
            style={{
              textAlign: "center",
              opacity: 1,
              fontSize: 15,
              marginTop:15,
              marginBottom:10,
              fontFamily: "Montserrat-ExtraBold",
              color: "#7c1d76",
              alignSelf: "center"
            }}
          >
            Back to login
          </Text>
        </View>
      </Container>
      </>
    );
  }
}
