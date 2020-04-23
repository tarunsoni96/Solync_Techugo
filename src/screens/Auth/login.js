'use strict';
import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import queryString from 'query-string'
import Images from "../../constant/images";
import HelperMethods from "Helpers/Methods";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import ScreenMemory from "AppLevelComponents/UI/ScreenMemory";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import 'Helpers/global'
import {socialLoginFB} from 'ServiceProviders/ApiCaller'
import Constants from "Helpers/Constants";

import { validateEmail, validatePassword } from "../../common/validation";
import ErrorText from "../../common/error";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import TextInputSolo from "../../common/textInput";
import TextInputPassSolo from "../../common/textInputPassword";
import GradButton from "../../common/gradientButton";
import { withNavigation } from "react-navigation";
import MobxStore from "../../StorageHelpers/MobxStore";
import Container from "../../AppLevelComponents/UI/Container";
const { width, height } = Dimensions.get("screen");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      securePass: true,
      passText: "Show",
      usernameMessage: "",
      passwordMessage: "*Please enter username",
      maxErrorMessageHeight: 0,
      isApiCall: false,
      passwordErrorMessageHeight: 0,
      username: "",
      usernameBorderColor: "transparent",
      usernamePlaceholder: "Email/Phone number",
      passwordPlaceholder: "Password",
      passwordBorderColor: "lightgrey",
      password: "",
      showBackBtn: false,
      userInfo: "",
      errorBorderColor: "lightgrey",
      img: "",
      stat: true,
      emailFb: "",
      idFb: "",
      firstName: "",
      profilePicture: "",
      latitude: "",
      longitude: "",
      avatar_show: false,
      opacityButton: false,
      passwordMessage: "Insert email or password"
    };
  }

  componentDidMount() {
    if (this.props.navigation.dangerouslyGetParent().state.index > 0) {
      this.setState({ showBackBtn: true });
    } else {
      this.setState({ showBackBtn: false });
    }
  }

  

  facebookLogin(self, socialType) {
    if (socialType == "facebook") {
      LoginManager.setLoginBehavior(HelperMethods.isPlatformAndroid() ? 'web_only' : 'browser');
    LoginManager.logInWithPermissions(["public_profile","user_birthday","user_work_history","user_about_me", "email"]).then(
        function(result) {
          if (result.isCancelled) {
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const responseInfoCallback = (error, result) => {
                if (error) {
                  alert("Error fetching data: " + error.toString());
                } else {
                  // alert(JSON.stringify( result))
                  AsyncStorageHandler.store(Constants.fbData,result)
                  self._onSignInWithSocial(result)
                }
              };
              const infoRequest = new GraphRequest(
                "/me?fields=name,picture.type(large),first_name,last_name,email,cover,birthday,location,friends",
                null,
                responseInfoCallback
              );
              new GraphRequestManager().addRequest(infoRequest).start();
            });
          }
        },
      );
    } 
  }

  _setData(result) {
    this.setState({
      emailFb: result.id,
      idFb: "vaishnavi@techugo.com",
      firstName: result.first_name,
      profilePicture: result.picture.data.url
    });
  }

  _onSignInWithSocial = (fbData) => {
    const {id,email,first_name,picture} = fbData

    socialLoginFB(email,id,first_name,picture.data.url,global.latitude,global.longitude).then((resp) => {
        HelperMethods.snackbar('Logged in successfully')
        AsyncStorageHandler.store(Constants.userInfoObj,resp.result,()=>{
          MobxStore.updateUserObj(resp.result)

          const {statusCode} = resp
          if(statusCode == 200){
            this.props.navigation.navigate('Home')
          } else {
            this.props.navigation.navigate('SelectionScreen')
            AsyncStorageHandler.store(Constants.isInterestSelected,'false')
          }
        })
    })
  };


  loginFun() {
    this.setState({ isApiCall: true });
    fetch("http://13.232.62.239:6565/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ isApiCall: false });
        if (responseJson.statusCode == 200) {
          MobxStore.updateUserObj(responseJson.result[0])
          AsyncStorageHandler.store(Constants.isInterestSelected,'true')
          AsyncStorageHandler.store(Constants.photoUploaded,'true')
          AsyncStorageHandler.store(Constants.userInfoObj,responseJson.result[0],val => {
            HelperMethods.snackbar("Logged in successfully");
            this.props.navigation.navigate("Home");
          });
          
        } else if(responseJson.statusCode == 201){
          AsyncStorageHandler.store(Constants.isInterestSelected,'false')
          AsyncStorageHandler.store(Constants.photoUploaded,'false')
            MobxStore.updateUserObj(responseJson.result[0])
            AsyncStorageHandler.store(Constants.userInfoObj,responseJson.result[0],val => {
            // HelperMethods.snackbar(responseJson.statusMessage)
          this.props.navigation.navigate('SelectionScreen')
          });
          
        } else if (responseJson.statusCode == 400) {
          HelperMethods.snackbar(responseJson.statusMessage)

          this.setState({
            usernameBorderColor: "#bb205a",
            passwordBorderColor: "#bb205a",
            usernameMessage: "Invalid password or email",
            maxErrorMessageHeight: 20,
            errorBorderColor: "#bb205a",
            opacityButton: true
          });
        }
        return responseJson;
      }).catch(error => {
        console.log(error);
      });
  }

  onLogout = () => {
    this.setState({
      user_name: null,
      avatar_url: null,
      avatar_show: null
    });
  };

  showPass() {
    if (this.state.securePass == true) {
      this.setState({
        securePass: false
      });
    } else {
      this.setState({
        securePass: true
      });
    }
  }
  checkValidation() {
    let value = this.state.username;
    let validateUSerNameResult = validateEmail(this.state.username, false);
    let validatePasswordResult = validatePassword(this.state.password, false);
HelperMethods.animateLayout()
    if (this.state.username != "" && this.state.password == "") {
      if (validateUSerNameResult.error != "") {
        this.setState({
          usernameBorderColor: "#bb205a",
          passwordBorderColor: "#bb205a",
          usernameMessage: validateUSerNameResult.error,
          maxErrorMessageHeight: validateUSerNameResult.height,
          errorBorderColor: "#bb205a",
          opacityButton: true
        });
      } else {
        this.setState({
          usernameBorderColor: "#bb205a",
          passwordBorderColor: "#bb205a",
          usernameMessage: "Insert email or password",
          maxErrorMessageHeight: 20,
          errorBorderColor: "#bb205a",
          opacityButton: true
        });
      }
    } else if (this.state.username == "" && this.state.password != "") {
      this.setState({
        usernameBorderColor: "#bb205a",
        passwordBorderColor: "#bb205a",
        usernameMessage: validateUSerNameResult.errorBlank,
        maxErrorMessageHeight: validateUSerNameResult.height,
        errorBorderColor: "#bb205a",
        opacityButton: true
      });
    } else if (this.state.username == "" && this.state.password == "") {

      this.setState({
        usernameBorderColor: "#bb205a",
        passwordBorderColor: "#bb205a",
        usernameMessage: validateUSerNameResult.errorBlank,
        maxErrorMessageHeight: validateUSerNameResult.height,
        errorBorderColor: "#bb205a",
        opacityButton: true
      });

    } else if (this.state.username != "" && this.state.password != "") {
      if (validateUSerNameResult.error != "") {
        this.setState({
          usernameBorderColor: "#bb205a",
          passwordBorderColor: "#bb205a",
          usernameMessage: validateUSerNameResult.error,
          maxErrorMessageHeight: validateUSerNameResult.height,
          errorBorderColor: "#bb205a",
          opacityButton: true
        });
      } else {
        this.setState({
          usernameBorderColor: "lightgrey",
          passwordBorderColor: "lightgrey",
          usernameMessage: "",
          maxErrorMessageHeight: 0,
          errorBorderColor: "lightgrey",
          opacityButton: false
        });
        this.loginFun();
      }
    }
  }

  _tryFocusName() {
    this.setState({
      username: "",
      usernameMessage: "",
      errorBorderColor: "lightgrey",
      passwordBorderColor: "lightgrey"
    });
  }

  _tryFocusPassword() {
    this.setState(
      {
        password: "",
        usernameMessage: "",
        errorBorderColor: "lightgrey",
        passwordBorderColor: "lightgrey"
      },
      console.log(this.state.firstName)
    );
  }

  navigateBack() {
    if (this.state.showBackBtn) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate("LandingScreen");
    }
  }

  render() {
    return (
      <Container>

      <ScreenMemory screen="login">
        <BackHandlerSingleton />
        <StatusBar translucent={true} barStyle="dark-content" />

          <SafeAreaView style={{ height: "13%" }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
                width: width,
                marginTop:10,
                justifyContent: "center",
                borderColor: "#DCDCDC"
              }}
            >
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  width: width / 6
                }}
              >
                <TouchableOpacity onPress={() => this.navigateBack()}>
                  <Image
                    source={require("../../assets/Images/Left.png")}
                    style={{
                      height: height / 40,
                      width: width / 20,
                      alignSelf: "center"
                    }}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignSelf: "center",
                  width: width / 1.2
                }}
              >
                <Text
                  style={{
                    fontSize: 17,
                    alignSelf: "center",
                    marginRight: width / 6,
                    fontFamily: "Montserrat-Bold"
                  }}
                >
                  Login with email
                </Text>
              </View>
            </View>
          </SafeAreaView>
            <View
              style={{
                height: height / 36,
                width: width - 30,
                alignSelf: "center",
                justifyContent: "flex-end",
                flexDirection: "column",
                backgroundColor: "transparent"
              }}
            ></View>
            <View
              style={{
                width: width - 30,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignSelf: "center",
                backgroundColor: "transparent"
              }}
            >
              {this.state.usernameMessage == "" ? null : (
                <Image
                  source={Images.warning}
                  style={{ alignSelf: "flex-end" }}
                />
              )}
              <ErrorText
                height={this.state.maxErrorMessageHeight}
                message={this.state.usernameMessage}
              />
            </View>
            <TextInputSolo
              onChangeText={username => this.setState({ username, })}
              borderColor={this.state.errorBorderColor}
              inputState={""}
              autoFocus
              labelText={"Email address"}
              keyboard={"email-address"}
              fontSize={17}
              fontFamily={"Montserrat-Bold"}
              onFocusText={() => this._tryFocusName()}
              value={this.state.username}
            />
            
            <TextInputPassSolo
              onChangeText={password => this.setState({ password, })}
              borderColor={this.state.passwordBorderColor}
              secureTextEntry={this.state.securePass}
              onClickHide={() => this.showPass()}
              onClickShow={() => this.showPass()}
              inputState={""}
              securePassEntryState={this.state.securePass}
              onFocusText={() => this._tryFocusPassword()}
              value={this.state.password}
            />

            <View
              style={{
                
                margin:10,
                alignSelf: "center",
                justifyContent: "flex-end",
                flexDirection: "column",
              }}
            ></View>
                <GradButton style={{width:'100%',opacity:(this.state.username && this.state.password) ? 1 : 0.6}} onPress={()=> (this.state.username && this.state.password) ? this.checkValidation() : {}} isApiCall={this.state.isApiCall} text={"Login"} />

            <View
              style={{
                marginTop:-20,
                height: height / 10,
                width: width - 30,
                alignSelf: "center",
                justifyContent: "flex-end",
                flexDirection: "column",
                backgroundColor: "transparent"
              }}
            ></View>
            <Text
              style={{
                textAlign: "center",
                marginBottom: 10,
                opacity: 1,
                fontSize: 22,
                fontFamily: "Montserrat-ExtraBold",
                color: "#2d2d2d"
              }}
            >
              Signed up with Facebook?
            </Text>

            <View
              style={{
                height: height / 8,
                width: width - 30,
                alignSelf: "center",
                backgroundColor: "transparent",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#dfe2f7",
                  borderRadius: 8,
                  height: "70%",
                  justifyContent: "center"
                }}
                onPress={() => this.facebookLogin(this, "facebook")}
              >
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    width: "85%",
                    alignSelf: "center"
                  }}
                >
                  <Image
                    source={require("../../assets/Images/Facebook.png")}
                    style={{ height: 20, width: 10, alignSelf: "center" }}
                  />
                  <Text
                    style={{
                      opacity: 1,
                      fontSize: 18,
                      marginLeft: 20,
                      fontFamily: "Montserrat-ExtraBold",
                      color: "#4e4e4e"
                    }}
                  >
                    Continue with Facebook
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: height / 8,
                width: width - 30,
                alignSelf: "center",
                marginTop:-5,
                justifyContent: "center",
                backgroundColor: "transparent"
              }}
            >
              <Text
                onPress={() => this.props.navigation.navigate("ForgotPassword")}
                style={{
                  textAlign: "center",
                  opacity: 1,
                  fontSize: 15,
                  fontFamily: "Montserrat-ExtraBold",
                  color: "#7c1d76",
                  alignSelf: "center"
                }}
              >
                Forgot your password?
              </Text>
            </View>
      </ScreenMemory>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },

  text: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    padding: 20
  },

  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: "contain"
  }
});
export default withNavigation(Login)