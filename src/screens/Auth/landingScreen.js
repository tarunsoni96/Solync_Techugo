import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  PermissionsAndroid,
  ImageBackground,
  Image,
  BackHandler
} from "react-native";

import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import Geolocation from "@react-native-community/geolocation";

import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import Constants from 'Helpers/Constants'
import HelperMethods from 'Helpers/Methods'
import {socialLoginFB} from 'ServiceProviders/ApiCaller'
import ScreenMemory from 'AppLevelComponents/UI/ScreenMemory'
import { withNavigation } from "react-navigation";

import 'Helpers/global'
import MobxStore from "../../StorageHelpers/MobxStore";
import { widthPercentageToDP } from "react-native-responsive-screen";
import ModalTNC from "../../components/ModalTNC";
class landingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTncModal:false,
      emailFb: "",
      idFb: "",
      firstName: "",
      profilePicture: "",
      latitude: "213",
      longitude: "213"
    };
  }

  componentWillMount(){
     width = Dimensions.get("screen").width
     height = Dimensions.get("screen").height
  }
  componentDidMount() {
    HelperMethods.isPlatformAndroid() && this.requestLocationPermission()
    
  }
  
  getPos(info) {
    var lat = info.coords.latitude;
    var long = info.coords.longitude;
    this.setState({
      latitude: lat,
      longitude: long
    });
    global.latitude = lat
    global.longitude = long
  }

  _onSignInWithSocial = (fbData) => {
    const {latitude,longitude} = this.state
    const {id,email,first_name,picture} = fbData
    socialLoginFB(email,id,first_name,picture.data.url,latitude,longitude).then((resp) => {
        HelperMethods.snackbar('Logged in successfully')
        AsyncStorageHandler.store('tncAgreed','true')
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

  requestLocationPermission = async() => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location permission is required',
          message:
            'Requires location permission ' +
            'so you can see nearby events',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(info => this.getPos(info),(err)=>{},{ timeout: 10000, enableHighAccuracy: true, maximumAge: 0 });
      } else {
        this.requestLocationPermission()
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getPos(info) {
    AsyncStorageHandler.store(Constants.currentLocation,info.coords)
  }

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

  facebookLogin(self, socialType,check = false) {
    if(check){
      AsyncStorageHandler.get('tncAgreed',val => {
        if(val){
          this.facebookLogin(this,'facebook',false)
        } else {
          this.setState({showTncModal:true})
      }
    })
  } else {
    this.setState({showTncModal:false})

    if (socialType == "facebook") {
      LoginManager.setLoginBehavior(HelperMethods.isPlatformAndroid() ? 'web_only' : 'browser');
      LoginManager.logInWithPermissions(["public_profile", "email"]).then(
        function(result) {
          if (result.isCancelled) {
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              const responseInfoCallback = (error, result) => {
                if (error) {
                  alert("Error fetching data: " + error.toString());
                } else {
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
      ).catch(err => {
        alert(JSON.stringify( err))
      });
    } 
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


  render() {
    return (
      <ScreenMemory screen='landing'>
      <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
      <ImageBackground
        source={require("../../assets/Images/LoginBG.png")}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#7e3c85"
        }}>

        <View
          style={{
            flex: 4,
            width: width - 30,
            alignSelf: "center",
            borderRadius: 8
          }}>

          <Image
            source={require("../../assets/Images/Logo.png")}
            style={{
              alignSelf: "center",
              marginTop: "30%",
              width: 73,
              height: 114
            }}/>

          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontFamily: "Montserrat-ExtraBold",
              color: "#fff",
              marginTop: "10%"
            }}
          >
            Discover new friends and great adventures
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flex: 0.6,
            width: width - 40,
            alignSelf: "center",
            borderRadius: 8,
            backgroundColor: "#fff",
            justifyContent: "center"
          }}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems:'center',
              justifyContent:'center'
            }}>
            <Image
            resizeMode='contain'
              source={require("../../assets/Images/@email.png")}
              style={{ height:14}}
            />

            <Text
              style={{
                fontSize: 16,
                fontFamily: "Montserrat-ExtraBold",
                color: "#4e4e4e",
                marginLeft:10,
              }}
            >
              Register with Email
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ height: "2%", width: width, backgroundColor: "transparent" }}></View>

        <TouchableOpacity
          style={{
            flex: 0.6,
            width: width - 40,
            alignSelf: "center",
            borderRadius: 8,
            backgroundColor: "#dfe2f7",
            justifyContent: "center"
          }}
          onPress={() => this.facebookLogin(this, "facebook",true)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <Image
              source={require("../../assets/Images/Facebook.png")}
              resizeMode='contain'
              style={{ height: 18, width: 10, }}/>


            <Text style={{
                fontSize: 16,
                marginLeft:5,
                fontFamily: "Montserrat-ExtraBold",
                color: "#4e4e4e",
                }}>
              Continue with Facebook
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{height:"2%", backgroundColor: "transparent" }} />
        <View
          style={{
            margin:10,
            width:'100%',
            paddingHorizontal:10,
            alignItems:'center',
            alignSelf:'center'
          }}>

          <Text style={{
              textAlign: "center",
              
              fontSize: widthPercentageToDP(4),
              fontFamily: "Montserrat-SemiBold",
              color: "#fff"}}>
            Already have an account with email?

            <Text
            onPress={()=>this.props.navigation.navigate('Login')}
             style={{
              fontSize: widthPercentageToDP(4),
                fontFamily: "Montserrat-Bold",
                color: "#fff"}}>
              {" "}
              Log in
            </Text>

          </Text>
          
        </View>

        <ModalTNC modalVisible={this.state.showTncModal} closeModal={()=>this.setState({showTncModal:false})} posPress={()=>this.facebookLogin(this, "facebook",false)} />


        <View
          style={{
            height: 40,
            width: "100%",
            justifyContent: "center",
            flexDirection: "row"
          }}
        >
          <Text style={{ fontSize: 14, color: "#fff" }}> Accept</Text>
          <Text style={{ fontSize: 14, color: "#fff" }}> </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              textDecorationLine: "underline"
            }}
          >
            Terms & Condition
          </Text>
          <Text style={{ fontSize: 14, color: "#fff" }}> and</Text>
          <Text style={{ fontSize: 14, color: "#fff" }}> </Text>
          <Text style={{
              fontSize: 14,
              color: "#fff",
              textDecorationLine: "underline"}} >
            Privacy Policy
          </Text>
        </View>
      </ImageBackground>
      </ScreenMemory>
    );
  }
}

export default withNavigation(landingScreen);

