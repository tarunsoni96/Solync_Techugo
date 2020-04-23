import {
  Alert,
  AsyncStorage,
  Vibration,
  BackHandler,
  Platform,
  Linking,
  LayoutAnimation,
  PermissionsAndroid,
  ToastAndroid
} from "react-native";
import Snackbar from 'react-native-snackbar'
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk";
import NotificationSounds, { playSampleSound } from 'react-native-notification-sounds';
import axiosCancel from 'axios-cancel';
import NavigationService from "ServiceProviders/NavigationService";
import moment from "moment";
import "Helpers/global";
import { Colors } from "UIProps/Colors";
import Constants from 'Helpers/Constants'
import { storeToken, getToken } from 'DataManagers/UserDataManager'
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import SocketIO from "../components/SocketIO";
import MobxStore from "../StorageHelpers/MobxStore";
import { withNavigation } from "react-navigation";
const queryString = require('query-string');

let timer;
let baseUrl = 'http://13.232.62.239:6565/api/'
let counter = 2;
let notificationSounds= []
var CancelToken = axios.CancelToken;
var cancel;
const reqTimeout = 15000

const HelperMethods = {
  showAlert: function(
    message,
    btnPositive,
    btnNegative,
    onPress_btnNegative,
    onPress_btnPositive,
  ) {
    Alert.alert(
      "Alert",
      message,
      [
                {
          text: btnNegative,
          onPress:
            onPress_btnNegative == "" ? () => {} : () => onPress_btnNegative(),
          style: "cancel"
        },
        { text: btnPositive, onPress: () => onPress_btnPositive() }
      ],
      { cancelable: false }
    );
  },

  animateLayout: function(type) {
    let anim = LayoutAnimation.Presets.easeInEaseOut
    if(type && type == 'spring'){
      anim = LayoutAnimation.Presets.spring
    } 
    LayoutAnimation.configureNext(anim);
  },

  isPlatformAndroid: function() {
    return Platform.OS == "android";
  },

  isPlatformIos: function() {
    return Platform.OS == "ios";
  },

  isConnected:function(){
    return new Promise((resolve,reject) => {
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        resolve(state.isConnected)
      });
    })
    
  },

  makeNetworkCall: function(apiName, formData, callBack,method = 'GET',skipToken = false) {
    this.isConnected().then(connected => {
      if(!connected){
        callBack(false,true)
        this.snackbar('No internet connection')
      } else {
        if(skipToken){
          this.makeApiCall(apiName,formData,formData,callBack,method)
        } else {
          getToken().then((val) => {
            console.log(val)
          
          this.makeApiCall(apiName,Headers,formData,callBack,method)
        })
        }
      }
    })
  },

  promiseTimeout : function (msec,callBack) {
    if(timer){
      clearTimeout(timer)
    }

    return promise => {
      const timeout = new Promise((yea, nah) => {
       timer = setTimeout(() => {
        callBack(false,true)
        cancel();
      },msec)
    })
      return Promise.race([promise, timeout])
    }
  },

  makeApiCall:function(apiName,headers,formData,callBack,method){
    axios.interceptors.request.use(request => {
      console.log('Starting Request', request)
      return request
    })
  // axios.interceptors.response.use(response => console.log('reponse', response))
    this.promiseTimeout(reqTimeout,callBack)(axios({
      url: baseUrl+apiName,
      
      data:method == 'POST' ? queryString.stringify(formData) : null ,
      cancelToken: new CancelToken(
        function executor(c) {
            cancel = c;
         }),
      method,
    })
    .then((response) => {
      console.log(response)
      clearTimeout(timer)
      callBack(response.data, false);
    })
    .catch(error => {
      
      if(axios.isCancel(error)){
        this.snackbar(`Request timeout, please retry`,'OK',()=>{})
      } else {
        callBack(false, true);
        this.snackbar(`Api ${error}`,'OK',()=>{})
      }
    }))
  },

  logout: function(navigation) {
    if(!navigation){
      alert('Provide navigation prop to logout function')
      return
    
    }
    

    AsyncStorageHandler.delete(Constants.isSocialLoginComplete)
    AsyncStorageHandler.delete(Constants.photoUploaded)
    AsyncStorageHandler.delete(Constants.fbData)
    AsyncStorageHandler.delete(Constants.isInterestSelected)
    AsyncStorageHandler.delete(Constants.userInfoObj,() => {
      navigation.navigate('loginStack')
    })
  },

  snackbar: function(message, actionFuncTitle = 'OK', actionFunc = ()=>{}, length) {
    let snackLen = length == "short" ? Snackbar.LENGTH_SHORT : Snackbar.LENGTH_LONG;
    Snackbar.show({
      backgroundColor: Colors.colorMusic,
      title: message,
      duration: snackLen,
      action: {
        title: actionFuncTitle,
        color: '#fff',
        onPress: () => {
          actionFunc();
        }
      }
    });
  },

  capitailizeFirst: (String.prototype = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }),

  openGMaps: function(lat, lng, label) {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q="
    });
    const latLng = `${lat},${lng}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  },

  formatAMPM: function(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  },

  makeCall: function(mob) {
    Linking.openURL(`tel:${mob}`);
  },

  openAppinPS: function(packageName) {
    Linking.openURL("market://details?id=" + packageName + "&hl=en");
  },

  appExitPrompter: function() {
    if (counter == 2) {
      setTimeout(() => {
        counter = 2;
      }, 2000);
      ToastAndroid.show("Press again to Quit", 1000);
    }
    counter -= 1;
    if (counter == 0) BackHandler.exitApp();
  },

  switchToLangSelector: function() {
    NavigationService.navigate("langSelectorStack", {
      isForLanguageChange: true
    });
  },

  formatDate_DMY: function(date) { //requires date in format 2-2-2 or 2/2/2 with time or without time
    return moment(date).format("DD/MM/YYYY");
  },


  reqPermission : function(permission,title,message) {
    return new Promise(function(resolve, reject) {
      const granted =  PermissionsAndroid.request(
        permission,
        {
          title: title,
          message:
            message, 
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ).then((granted)=>{
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve(true)
      } else {
        reject(false)
      }
      })
    })
  },

  formatDate_Month_Date: function(date) { //requires date in format 2-2-2 or 2/2/2 with time or without time
    let month =  moment(date).format("mmmm");
    let dateNumber =  moment(date).format("d");
    return `${month} ${dateNumber}`
  },

  triggerChatMsgFeedback:function(navigation,incomingMsgData,showSnackBar = true){
    
    if(MobxStore.userObj.in_app_sound == 1){
      if(notificationSounds.length == 0){
        NotificationSounds.getNotifications().then(soundsList => {
          playSampleSound(soundsList[0]); 
        });
      } else {
        playSampleSound(notificationSounds[0]); 
      }
    }

    if(MobxStore.userObj.message_status == 1){
      if(showSnackBar){
        if(incomingMsgData.addedInGroup){
          this.snackbar(`You are added in group ${incomingMsgData.event}`,'See',()=>{
            navigation.navigate('chatScreen')
            Vibration.cancel()
          })
        } else {
          let msg 
          if(incomingMsgData.msg_type == 'text'){
            msg = `${incomingMsgData.msg} - ${incomingMsgData.first_name}`
          } else {
            msg =`${incomingMsgData.first_name} sent an image`
          }
          this.snackbar(msg,'See',()=>{
            navigation.navigate('chatScreen')
            Vibration.cancel()
          })
        }
      }
    }
      this.vibrateDevice()

      MobxStore.isAnyUnreadMsg = true
  },


  vibrateDevice:function(){
    if(MobxStore.userObj.in_app_vibration == 1){
      Vibration.vibrate()
    }
  },


  logoutFB :function (callBack){
    var current_access_token = '';
    AccessToken.getCurrentAccessToken().then((data) => {
      current_access_token = data.accessToken.toString();
    }).then(() => {
      let logout = new GraphRequest("me/permissions/",
        {
            accessToken: current_access_token,
            httpMethod: 'DELETE'
        },
        (error, result) => {
            if (error) {
                console.log('Error fetching data: ' + error.toString());
            } else {
                LoginManager.logOut();
                callBack({success:true})
            }
        });
      new GraphRequestManager().addRequest(logout).start();
    })
    .catch(error => {
      console.log(error)
    });    


    // AccessToken.getCurrentAccessToken().then(data => {
    //   const query = queryString.stringify({
    //     access_token: data.accessToken.toString(),
    //   })
      
    //   fetch(`https://graph.facebook.com/v3.2/me/permissions?${query}`, {
    //     method: 'post',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       method: 'delete',
    //       format: 'json',
    //     }),
    //   })
    //   .then(response => response.json()).then(jso => {})
    //   .catch(err => console.log(err))
    // })

     


  },

  getAge :function(birthDate){
    return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
  } 


};

export default withNavigation(HelperMethods);