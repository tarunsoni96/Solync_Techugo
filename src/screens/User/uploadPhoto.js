import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler
} from "react-native";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
const { height, width } = Dimensions.get("screen");
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import HelperMethods from 'Helpers/Methods'
import Constants from 'Helpers/Constants'
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-navigation";
import ScreenMemory from "../../AppLevelComponents/UI/ScreenMemory";
import GradButton from "../../common/gradientButton";
import Container from "../../AppLevelComponents/UI/Container";

let btnSize=wp(10)
export default class UploadPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  _navToNext() {
    let { params } = this.props.navigation.state;
    this.props.navigation.navigate("EditProfile", {
      image: this.state.image,
      openMediaType:'cam',
      userId: params?.userId
    });
  }

  checkFbData(){
    AsyncStorageHandler.get(Constants.fbData,val => {
      if(val != null){
        const {picture} = val
        this.navigateFBPicProfile(picture.data.url)
      } else {
        this.facebookLogin()
      }
    })
  }

  navigateFBPicProfile = (url) => {
    this.props.navigation.navigate('EditProfile',{fbPic:url,})
  }

  facebookLogin = () =>  {
    LoginManager.setLoginBehavior(HelperMethods.isPlatformAndroid() ? 'web_only' : 'browser');

      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        (result) => {
          if (result.isCancelled) {
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const responseInfoCallback = (error, result) => {
                if (error) {
                  alert("Error fetching data: " + error.toString());
                } else {
                  AsyncStorageHandler.store(Constants.fbData,result)
                  this.navigateFBPicProfile(result.picture.data.url)
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
      ).catch(err => {
        alert(JSON.stringify( err))
      });
  }


  render() {
    let { params } = this.props.navigation.state;
    return (
      
      <ScreenMemory screen='PhotoUpload'>  
      <Container>

      <SafeAreaView style={{ flex: 1,}}>
        <View style={{ }}>
          <View
            style={{
              alignItems:'center',
              marginTop:80
            }}
          >
            <Image
              source={require("../../assets/Images/AddProfile.png")}
              style={{ height: wp('25%'), width: wp('25%') }}
            />

            <Text
              style={{
                fontSize: wp('5%'),
                paddingTop: wp(7),
                paddingBottom: 20,
                textAlign:'center',
                fontFamily: "Montserrat-ExtraBold"
              }}
            >
              Please upload a{"\n"}profile photo
            </Text>
            <Text
              style={{
                color: "#7e7e7e",
                fontSize: wp('4.5%'),
                fontFamily: "Montserrat-Regular"
              }}
            >
              You need at least one profile photo to{"\n"}
              use the app, and can upload up to six{"\n"}
              in total. So why not show us that smile
            </Text>
            <Text
              style={{
                alignSelf: "center",
                paddingBottom: hp(4),
                color: "#7e7e7e",
                fontSize: 15,
                fontFamily: "Montserrat-Regular"
              }}
            >
              of yours?
            </Text>

<View style={{width:'100%',}} >

<GradButton textStyle={{fontSize:wp(4.5)}} gradStyle={{padding:wp(4),margin:wp(3),borderRadius:7}} onPress={() => this._navToNext()} text='Take a photo' />
<GradButton textStyle={{fontSize:wp(4.5)}} gradStyle={{padding:wp(4),margin:wp(3),borderRadius:7}} onPress={() =>
                this.props.navigation.navigate("EditProfile", {
                  image: "",
                  openMediaType:'gallery',
                  userId: params?.userId
                })
              } text='Choose from library' />

              <TouchableWithoutFeedback onPress={() => this.checkFbData()}>

  <View style={{padding:wp(4),borderRadius:7,backgroundColor:'#dfe2f7',margin:wp(3),flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

  <Image
                    source={require("../../assets/Images/Facebook.png")}
                    style={{ height: 20, width: 10,}}
                  />
                  <Text
                    style={{
                      opacity: 1,
                      fontSize: wp(4.5),
                      marginLeft:20,
                      fontFamily: "Montserrat-ExtraBold",
                      color: "#4e4e4e"
                    }}
                  >
                    Import from Facebook
                  </Text>
  </View>            
              </TouchableWithoutFeedback>
</View>
            {/* <TouchableOpacity
              onPress={() => this._navToNext()}
              style={{
                height: btnSize,
                width:  btnSize,
                justifyContent: "center"
              }}
            >
              <ImageBackground
                source={require("../../assets/Images/GradientButton.png")}
                style={{
                  height: btnSize,
                  width: "100%",
                  alignSelf: "center",
                  borderRadius: 48,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    opacity: 1,
                    fontSize: wp(btnSize),
                    fontFamily: "Montserrat-Bold",
                    color: "#fff",
                    alignSelf: "center"
                  }}
                >
                  Take a photo
                </Text>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("EditProfile", {
                  image: "",
                  openMediaType:'gallery',
                  userId: params?.userId
                })
              }
              style={{
                height: height / 8,
                width: width - 30,
                alignSelf: "center",
                justifyContent: "center"
              }}
            >
              <ImageBackground
                source={require("../../assets/Images/GradientButton.png")}
                style={{
                  height: height / 8,
                  width: "100%",
                  alignSelf: "center",
                  borderRadius: 48,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    opacity: 1,
                    fontSize: 19,
                    fontFamily: "Montserrat-Bold",
                    color: "#fff",
                    alignSelf: "center"
                  }}
                >
                  Choose from library
                </Text>
              </ImageBackground>
            </TouchableOpacity> */}


            {/* <TouchableOpacity
                style={{
                  backgroundColor: "#dfe2f7",
                  borderRadius: 8,
                  padding:19,
                  marginTop:10,
                  width: '85%',
                  alignSelf: "center",
                justifyContent: "center"
                }}
                onPress={() => this.checkFbData()}
              >
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems:'center',
                  }}
                >
                  <Image
                    source={require("../../assets/Images/Facebook.png")}
                    style={{ height: 20, width: 10,}}
                  />
                  <Text
                    style={{
                      opacity: 1,
                      fontSize: 18,
                      marginLeft:20,
                      fontFamily: "Montserrat-ExtraBold",
                      color: "#4e4e4e"
                    }}
                  >
                    Import from Facebook
                  </Text>
                </View>
              </TouchableOpacity> */}



          </View>
        </View>
      </SafeAreaView>
      </Container>

      </ScreenMemory>

    );
  }
}
