import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
  FlatList,
  AsyncStorage,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import HelperMethods from 'Helpers/Methods'
import Constants from 'Helpers/Constants'
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import TextInputSolo from "../../common/textInput";
import TextInputPassSolo from "../../common/textInputPassword";
import GradButton from "../../common/gradientButton";
import {
  validateEmail,
  validateFirstName,
  validatePassword,
  validateOccupation
} from "../../common/validation";
import ErrorText from "../../common/error";
import Images from "../../constant/images";
import Container from "../../AppLevelComponents/UI/Container";
import MobxStore from "../../StorageHelpers/MobxStore";
import { SafeAreaView } from "react-navigation";
const { height, width } = Dimensions.get("screen");

let emptyDateMsg ='Insert date'
let dateMsg ='User must be 18 or over'
let errBorder = '#bb205a'

export default class registerTest extends Component {
  constructor(props) {
    super(props);

    global.userID = "23";
    this.state = {
      securePass: true,
      passText: "Show",
      modalDateVisible: false,
      modalVisible: false,
      modalAlreadyRegisterd: false,
      date: "",
      valueDate:'',
      flatId:0,
      maxErrorMessageHeight: 0,
      invalidInputs:true,
      isApiCall:false,
      errorBorderColor: "lightgrey",
      /* FIRSTNAME */
      firstName: '',
      firstNameMessage: "",
      firstNameBorderColor: "lightgrey",
      firstNamePlaceholder: "",
      statFirstName: true,
      /* EMAIL ADDRESS */
      emailAddress: "",
      emailAddressMessage: "",
      emailAddressBorderColor: "lightgrey",
      emailAddressPlaceholder: "",
      statEmailAddress: true,
      /* PASSWORD */
      password: "",
      passwordMessage: "",
      passwordBorderColor: "lightgrey",
      passwordPlaceholder: "",
      statPassword: true,
      /* OCCUPATION */
      occupation: "",
      occupationMessage: "",
      occupationBorderColor: "lightgrey",
      occupationPlaceholder: "",
      statOccupation: true,
      dob: "",
      opacityButton: false,
      textColor: "grey",
      showDate: false,
      showMonth: false,
      modalVisibleMonth: false,
      monthData: [
        { key: "Jan", id: "01" },
        { key: "Feb", id: "02" },
        { key: "Mar", id: "03" },
        { key: "Apr", id: "04" },
        { key: "May", id: "05" },
        { key: "Jun", id: "06" },
        { key: "Jul", id: "07" },
        { key: "Aug", id: "08" },
        { key: "Sep", id: "09" },
        { key: "Oct", id: "10" },
        { key: "Nov", id: "11" },
        { key: "Dec", id: "12" }
      ],
      dateData: [
        { key: "01" },
        { key: "02" },
        { key: "03" },
        { key: "04" },
        { key: "05" },
        { key: "06" },
        { key: "07" },
        { key: "08" },
        { key: "09" },
        { key: "10" },
        { key: "11" },
        { key: "12" },
        { key: "13" },
        { key: "14" },
        { key: "15" },
        { key: "16" },
        { key: "17" },
        { key: "18" },
        { key: "19" },
        { key: "20" },
        { key: "21" },
        { key: "22" },
        { key: "23" },
        { key: "24" },
        { key: "25" },
        { key: "26" },
        { key: "27" },
        { key: "28" },
        { key: "29" },
        { key: "30" },
        { key: "31" }
      ],
      yearData: [
        { key: "1950" },
        { key: "1951" },
        { key: "1952" },
        { key: "1953" },
        { key: "1954" },
        { key: "1955" },
        { key: "1956" },
        { key: "1957" },
        { key: "1958" },
        { key: "1959" },
        { key: "1960" },
        { key: "1961" },
        { key: "1962" },
        { key: "1963" },
        { key: "1964" },
        { key: "1965" },
        { key: "1966" },
        { key: "1967" },
        { key: "1968" },
        { key: "1969" },
        { key: "1970" },
        { key: "1971" },
        { key: "1972" },
        { key: "1973" },
        { key: "1974" },
        { key: "1975" },
        { key: "1976" },
        { key: "1977" },
        { key: "1978" },
        { key: "1979" },
        { key: "1980" },
        { key: "1981" },
        { key: "1982" },
        { key: "1983" },
        { key: "1984" },
        { key: "1985" },
        { key: "1986" },
        { key: "1987" },
        { key: "1988" },
        { key: "1989" },
        { key: "1990" },
        { key: "1991" },
        { key: "1992" },
        { key: "1993" },
        { key: "1994" },
        { key: "1995" },
        { key: "1996" },
        { key: "1997" },
        { key: "1998" },
        { key: "1999" },
        { key: "2000" },
        { key: "2001" },
        { key: "2002" },
        { key: "2003" },
        { key: "2004" },
        { key: "2005" },
        { key: "2006" },
        { key: "2007" },
        { key: "2008" },
        { key: "2009" },
        { key: "2010" },
        { key: "2011" },
        { key: "2012" },
        { key: "2013" },
        { key: "2014" },
        { key: "2015" },
        { key: "2016" },
        { key: "2017" },
        { key: "2018" },
        { key: "2019" }
      ],
      latitude: 0,
      longitude: "0",
      error: null,
      flatId: "",
      iskboadOpen:false,
      valueDate: "",
      valueMonth: "",
      valueYear: "",
      idMonth: "",
      location: null,
      currentDate: "",
      currentYear: "",
      dateErrorMessage: "",
      enableScrollViewScroll: true,
      scrollEnabled: false,
      firstNameCheck: false,
      emailCheck: false,
      dobCheck: false,
      passwordCheck: false,
      occupationCheck: false
    };
  }

  enableScroll(value) {
    this.setState({
      enableScrollViewScroll: value
    });
  }

  componentDidMount() {

    const {isSocialLogin,userObj} = this.props.navigation.state.params || {}
    if(isSocialLogin){
      AsyncStorageHandler.get(Constants.userInfoObj,resp => {
        const {first_name,email,dob} = Object.values(resp)[0]
        this.setState({firstName:first_name,emailAddress:email})
        
      })
    }

    var date = new Date().getDate();
    var year = new Date().getFullYear();
    
    this.setState({
      currentDate: date,
      currentYear: year
    });

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardDidShow.bind(this)
    );

    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this._keyboardDidHide.bind(this)
    );
  }

  _keyboardDidShow = () => {
    this.setState({iskboadOpen:true})
  };

  _keyboardDidHide() {
    this.setState({iskboadOpen:false})
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  getPos(info) {
    var lat = info.coords.latitude;
    var long = info.coords.longitude;
    this.setState({
      latitude: lat,
      longitude: long
    });
    console.log(this.state.latitude);
    console.log(this.state.longitude);
  }
  setModalDateVisible(visible) {
    this.setState({
      modalDateVisible: visible
    });
  }
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }
  setModalMonthVisible(visible) {
    this.setState({
      modalVisibleMonth: visible
    });
  }

  validateDate(inputText) {
    re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if (!this.state.date.match(re)) {
      console.log("lid", inputText);
      return false;
    }
    // alert('valid')
    return true;
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
 
  judgeDateValidity(){
    const {valueDate,valueMonth,valueYear} = this.state
    let currYear = this.state.currentYear;
    let selYear = valueYear;
    var age = currYear - selYear;
    if(!valueDate || !valueMonth || !valueYear){
      this.setState({invalidInputs:true})
    } else if(age < 18){
      this.setState({invalidInputs:true,dateErrorMessage: "User must be 18 or over"})
    } else {
        this.setState({invalidInputs:false,dateErrorMessage: ""})
      }
      
  }

_renderItemDate(item, index) {
  return (
    <View
      style={{ width: 290, alignSelf: "center", justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{ justifyContent: "center" }}
        onPress={() =>
          {this.animateLayout();
          this.setState({ showMonth: false, valueDate: item.key },()=>{
            this.judgeDateValidity()
          })}
        }
      >
        <Text
          style={{
            alignSelf: "center",
            color: "#000",
            fontSize: 18,
            fontFamily: "Montserrat-SemiBold",
            height: "auto",
            paddingTop: 10,
            textAlign: "center",
            marginLeft: 20,
            marginRight: 20
          }}
        >
          {item.key}
        </Text>
        <View
          style={{ height: 1, backgroundColor: "#DCDCDC", marginTop: 10 }}
        ></View>
      </TouchableOpacity>
    </View>
  );
}
_renderItemMonth(item, index) {
  return (
    <View
      style={{ width: 290, alignSelf: "center", justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{ justifyContent: "center" }}
        onPress={() =>
        {this.animateLayout();
          this.setState({
            showMonth: false,
            valueMonth: item.key,
            idMonth: item.id,

          },()=>this.judgeDateValidity())
        }
        }
      >
        <Text
          style={{
            alignSelf: "center",
            color: "#000",
            fontSize: 18,
            fontFamily: "Montserrat-SemiBold",
            height: "auto",
            paddingTop: 10,
            textAlign: "center",
            marginLeft: 20,
            marginRight: 20
          }}
        >
          {item.key}
        </Text>
        <View
          style={{ height: 1, backgroundColor: "#DCDCDC", marginTop: 10 }}
        ></View>
      </TouchableOpacity>
    </View>
  );
}

_renderItemYear(item, index) {
  return (
    <View
      style={{ width: 290, alignSelf: "center", justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{ justifyContent: "center" }}
        onPress={() =>
          {
          this.setState({ showMonth: false, valueYear: item.key },()=>{
            this.judgeDateValidity()
          })}
        }
      >
        <Text
          style={{
            alignSelf: "center",
            color: "#000",
            fontSize: 18,
            fontFamily: "Montserrat-SemiBold",
            height: "auto",
            paddingTop: 10,
            textAlign: "center",
            marginLeft: 20,
            marginRight: 20
          }}
        >
          {item.key}
        </Text>
        <View
          style={{ height: 1, backgroundColor: "#DCDCDC", marginTop: 10 }}
        ></View>
      </TouchableOpacity>
    </View>
  );
}

handlePressIn = (event) =>  {
  this.setState({showMonth:!this.state.showMonth})
}


animateLayout(){
  HelperMethods.animateLayout()
  }

  
  checkValidation() {
    if(this.state.isApiCall){
      return
    }
  Keyboard.dismiss()
HelperMethods.animateLayout()
  let firstNameCheck = false
  let emailCheck = false
  let dobCheck = false
  let passwordCheck = false
  let occupationCheck = false

    var str = this.state.dob;
    var formatYear = this._formatYear(str);
    var currYear = this.state.currentYear;
    var selYear = this.state.valueYear;
    var age = currYear - selYear;

    let validateFirstNameResult = validateFirstName(this.state.firstName);
    let validatePasswordResult = validatePassword(this.state.password);
    let validateEmailAddressResult = validateEmail(this.state.emailAddress);
    let validateOccupationResult = validateOccupation(this.state.occupation);

    if (this.state.firstName == "") {
      this.setState({
        firstNameMessage: "Insert first name"
      });
    } else if (validateFirstNameResult.error != "") {
      this.setState({
        firstNameMessage: "Invalid first name",
        firstNameBorderColor: "#bb205a"
      });
    } else {
      this.setState({ firstNameCheck: true });
      firstNameCheck=true
    }


    if (this.state.emailAddress == "") {
      this.setState({
        emailAddressMessage: "Enter email",
        emailAddressBorderColor: "#bb205a",
        firstNameCheck: true
      });
      
    } else if (validateEmailAddressResult.error != "") {
      this.setState({
        emailAddressMessage: "Invalid email",
        emailAddressBorderColor: "#bb205a"
      });
    } else {
      console.log(this.state.firstNameCheck);
      this.setState({ emailCheck: true });
      emailCheck=true
    }

    /////////////////////DOB///////////////

    if (
      this.state.valueDate == "" ||
      this.state.valueDate == "" ||
      this.state.valueDate == ""
    ) {
      this.setState({
        dateErrorMessage: "Insert date"
      });
    } else if (age < 18) {
      this.setState({
        dateErrorMessage: "User must be 18 or over"
      });
    } else {
      this.setState({
        dateErrorMessage: "",
        dobCheck: true
      });
      dobCheck=true
    }

    ///////////////password////////////////

    if (this.state.password == "") {
      this.setState({
        passwordMessage: "Enter password",
        passwordBorderColor: "#bb205a",
        textColor: "#bb205a"
      });
    } else if (validatePasswordResult.error != "") {
      this.setState({
        passwordMessage: "Password not secure",
        passwordBorderColor: "#bb205a",
        textColor: "#bb205a"
      });
    } else {
      this.setState({ passwordCheck: true });
      passwordCheck=true
    }

    ////////////////////occupation////////////////

    if (this.state.occupation == "") {
      this.setState({
        occupationMessage: "Insert occupation",
        occupationBorderColor: "#bb205a"
      });
    } else if(validateOccupationResult.error != '') {
      this.setState({ occupationCheck: false,textColor: "#bb205a",occupationBorderColor:'#bb205a',occupationMessage:'Occupation should only contain alphabets' });
      occupationCheck=false
    } else {
        this.setState({ occupationCheck: true });
        occupationCheck=true
      }
    if (
      firstNameCheck == true &&
      emailCheck == true &&
      dobCheck == true &&
      passwordCheck == true &&
      occupationCheck == true
    ) {
      this.setState({ modalVisible: true });
    }
  }

  _setFirstName(firstName) {
    let {error,borderColor} = validateFirstName(firstName)
    HelperMethods.animateLayout()
    this.setState({
      firstName,
      firstNameMessage:error,
      firstNameBorderColor:borderColor,
      invalidInputs:error ? true : false
    },()=>{
      this.judgeValidity()
    });
  }

  setEmail(emailAddress){
    let {error,borderColor} = validateEmail(emailAddress)
    HelperMethods.animateLayout()
    this.setState({ emailAddress,emailAddressMessage:error,emailAddressBorderColor:borderColor ,},()=>{
      this.judgeValidity()
    })
  }

  setPassword(password ){
    let {error,borderColor} = validatePassword(password)
    HelperMethods.animateLayout()

    this.setState({ password,passwordBorderColor:borderColor,passwordMessage:error,},()=>{
      this.judgeValidity()
    })
  }

  setOccupation(occupation){
    let {error,borderColor} = validateOccupation(occupation)
    HelperMethods.animateLayout()

    this.setState({ occupation,occupationMessage:error,occupationBorderColor:borderColor,},()=>{
      this.judgeValidity()
    })
  }

  judgeValidity(){
    const {firstNameMessage,firstName,emailAddress,valueDate,valueMonth,valueYear,password,occupation,emailAddressMessage,passwordMessage,occupationMessage} = this.state
    if(!firstName || !emailAddress || !password || !occupation){
        this.setState({invalidInputs:true})
      } else if(!firstNameMessage && !emailAddressMessage && !passwordMessage && !occupationMessage && valueDate && valueMonth && valueYear) {
        this.setState({invalidInputs:false},()=>{
          return true
        })
      } else {
        this.setState({invalidInputs:true})
      }  
  }

  _formatYear(date) {
    date = new Date(date);
    var year = date.getFullYear();
    return year;
  }

  _Register() {
    this.setState({
      modalVisible: false
    });
    this._signUpFun();
  }

_showDate() {
  Keyboard.dismiss()
  HelperMethods.animateLayout()
  this.setState({showMonth:true,flatId:'1'})  
}

_showYear() {
  Keyboard.dismiss()
  HelperMethods.animateLayout()
  this.setState({showMonth:true,flatId:'2'})  
}

_showMonth() {
  Keyboard.dismiss()

  HelperMethods.animateLayout()
  this.setState({showMonth:true,flatId:'0'})  
}

  _signUpFun() {
    var date = this.state.valueDate.trim();
    var month = this.state.idMonth;
    var year = this.state.valueYear.trim()
    var dateOfBirth = year + '-' + month + '-' + date

    this.setState({isApiCall:true})
    fetch('http://13.232.62.239:6565/api/user/signup', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": this.state.emailAddress.trim(),
            "first_name": this.state.firstName.trim(),
            "dob": dateOfBirth.trim(),
            "password": this.state.password.trim(),
            "occupation": this.state.occupation.trim(),
            "lat": this.state.latitude,
            "lng": this.state.longitude
        }),

    }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({isApiCall:false})
            if(responseJson.statusCode == 200) {
            MobxStore.updateUserObj(responseJson.result)
            this.props.navigation.navigate('SelectionScreen')
            AsyncStorageHandler.store(Constants.userInfoObj,responseJson.result)
            AsyncStorageHandler.store(Constants.isInterestSelected,'false')
            AsyncStorageHandler.store(Constants.photoUploaded,'false')
            HelperMethods.snackbar('Registered Successfully!')
            AsyncStorage.setItem('userId', JSON.stringify(responseJson.result.user_id));
            }

            else if (responseJson.statusCode == 400) {
                this.setState({
                    modalAlreadyRegisterd: true
                })
            }
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

  _tryFocusName() {
    this.setState(
      {
        firstName: "",
        firstNameMessage: "",
        firstNameBorderColor: "lightgrey",
        invalidInputs:true
      },
      
    );
  }
  _tryFocusEmail() {
    this.setState(
      {
        emailAddress: "",
        emailAddressMessage: "",
        emailAddressBorderColor: "lightgrey",
        invalidInputs:true
      },
      
    );
  }
  _tryFocusPassword() {
    this.setState(
      {
        password: "",
        passwordMessage: "",
        passwordBorderColor: "lightgrey",
        textColor: "grey",
        invalidInputs:true
      },
      
    );
  }
  _tryFocusOccupation() {
    this.setState(
      {
        occupation: "",
        occupationMessage: "",
        occupationBorderColor: "lightgrey",
        invalidInputs:true
      },
    );
  }
  _Login() {
    this.setState({
      modalAlreadyRegisterd: false
    },()=>{
      this.props.navigation.navigate("Login");
    });
  }
  _alreadyRegistered() {
    this.setState({
      modalAlreadyRegisterd: false
    });
  }
  render() {
    return (
      <>
     <Container style={{flex:HelperMethods.isPlatformAndroid()?undefined:1,}}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              width: width,
              marginVertical:20,
              marginTop:HelperMethods.isPlatformAndroid() ? 50 :20,
              justifyContent: "center",
              borderColor: "#DCDCDC"
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("LandingScreen")}
              style={{
                justifyContent: "center",
                width: width / 6
              }}
            >
              <View>
                <Image
                  source={require("../../assets/Images/Left.png")}
                  style={{
                    width: width / 20,
                    alignSelf: "center"
                  }}
                  resizeMode={"contain"}
                />
              </View>
            </TouchableOpacity>
            <View style={{
                justifyContent: "center",
                alignSelf: "center",
                width: width / 1.2}}>
              <Text
                style={{
                  fontSize: 20,
                  alignSelf: "center",
                  fontWeight: "bold",
                  marginRight: width / 6,
                  width: "100%",
                  textAlign: "center"
                }}
              >
                Register
              </Text>
            </View>
          </View>


                  <View>

          <TextInputSolo
          autoFocus
            onChangeText={firstName => this._setFirstName(firstName)}
            borderColor={this.state.firstNameBorderColor}
            inputState={this.state.firstNameMessage}
            message={this.state.firstNameMessage}
            labelText={"First name"}
            keyboard={"default"}
            fontSize={17}
            fontFamily={"Montserrat-Bold"}
            ref={component=> this.fnInput=component}
            onFocusText={() => this._tryFocusName()}
            value={this.state.firstName}
            maxLength={30}
          />

          <TextInputSolo
            onChangeText={emailAddress => this.setEmail(emailAddress)}
            borderColor={this.state.emailAddressBorderColor}
            inputState={this.state.emailAddressMessage}
            message={this.state.emailAddressMessage}
            labelText={"Email address"}
            keyboard={"email-address"}
            fontSize={17}
            fontFamily={"Montserrat-Bold"}
            onFocusText={() => this._tryFocusEmail()}
            value={this.state.emailAddress}
            maxLength={45}
          />
          <View
            style={{
              position: "relative",
              width: width - 30,
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ flexDirection: "row",marginVertical:20,marginTop:25, }}>
              <Text
                style={{
                  opacity: 1,
                  fontSize: 13,
                  fontFamily: "Montserrat-SemiBold",
                  color: "#879299"
                }}
              >
                {" "}
                Date of birth
              </Text>
              {this.state.dateErrorMessage == "" ? null : (
                <View style={{ flexDirection: "row",flex:1,alignItems:'center'  }}>
                  <Image
                    source={Images.warning}
                    style={{ marginLeft: 20, width: 17, height: 16 }}
                  />
                  <ErrorText
                    height={20}
                    message={this.state.dateErrorMessage}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                width: width - 30,
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: "transparent"
              }}
            >
              {this.state.valueDate == "" ? (
                <TouchableOpacity
                  onPress={() => this._showDate()}
                  style={{
                    width: "28%",
                    backgroundColor: "transparent",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    borderTopColor: "transparent",
                    borderRightColor: "transparent",
                    borderLeftColor: "transparent",
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomColor: "lightgrey",
                    borderWidth: 2
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "50%"
                    }}
                  >
                    {" "}
                    Day
                  </Text>
                  <View style={{ alignSelf: "center" }}>
                    <Image
                      source={require("../../assets/Images/DropDown.png")}
                      style={{ alignSelf: "center", width: 14, height: 10 }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this._showDate()}
                  style={{
                    width: "28%",
                    backgroundColor: "transparent",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    borderTopColor: "transparent",
                    borderRightColor: "transparent",
                    borderLeftColor: "transparent",
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomColor: "lightgrey",
                    borderWidth: 2
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "50%"
                    }}
                  >
                    {" "}
                    {this.state.valueDate}
                  </Text>
                  <View style={{ alignSelf: "center" }}>
                    <Image
                      source={require("../../assets/Images/DropDown.png")}
                      style={{ alignSelf: "center", width: 14, height: 10 }}
                    />
                  </View>
                </TouchableOpacity>
              )}
              {this.state.valueMonth == "" ? (
                <TouchableOpacity
                  onPress={() => this._showMonth()}
                  style={{
                    borderTopColor: "transparent",
                    borderRightColor: "transparent",
                    position: "relative",
                    borderLeftColor: "transparent",
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomColor: "lightgrey",
                    borderWidth: 2,
                    width: "28%",
                    justifyContent: "space-between",
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "80%"
                    }}
                  >
                    {" "}
                    Month
                  </Text>
                  <View style={{ alignSelf: "center" }} style={{ width: 35, justifyContent: "center" }}>
                    <Image
                      source={require("../../assets/Images/DropDown.png")}
                      style={{ alignSelf: "center", width: 14, height: 10 }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                
                <TouchableOpacity
                  onPress={() => this._showMonth()}
                  style={{
                    borderTopColor: "transparent",
                    borderRightColor: "transparent",
                    position: "relative",
                    borderLeftColor: "transparent",
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomColor: "lightgrey",
                    borderWidth: 2,
                    width: "28%",
                    justifyContent: "space-between",
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "50%"
                    }}
                  >
                    {" "}
                    {this.state.valueMonth}
                  </Text>
                  <View
                    style={{ alignSelf: "center" }}
                    style={{ width: 35, justifyContent: "center" }}
                  >
                    <Image
                      source={require("../../assets/Images/DropDown.png")}
                      style={{ alignSelf: "center", width: 14, height: 10 }}
                    />
                  </View>
                </TouchableOpacity>
              )}

              {this.state.valueYear == "" ? (
                <TouchableOpacity
                  onPress={() => this._showYear()}
                  style={{
                    borderTopColor: "transparent",
                    borderRightColor: "transparent",
                    borderLeftColor: "transparent",
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomColor: "lightgrey",
                    borderWidth: 2,
                    width: "28%",
                    backgroundColor: "transparent",
                    justifyContent: "space-between",
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "50%"
                    }}
                  >
                    {" "}
                    Year
                  </Text>
                  <View style={{ alignSelf: "center" }}>
                    <Image
                      source={require("../../assets/Images/DropDown.png")}
                      style={{ alignSelf: "center", width: 14, height: 10 }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this._showYear()}
                  style={{
                    borderTopColor: "transparent",
                    borderRightColor: "transparent",
                    borderLeftColor: "transparent",
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderBottomColor: "lightgrey",
                    borderWidth: 2,
                    width: "28%",
                    backgroundColor: "transparent",
                    justifyContent: "space-between",
                    flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "50%"
                    }}
                  >
                    {" "}
                    {this.state.valueYear}
                  </Text>
                  <View style={{ alignSelf: "center" }}>
                    <Image
                      source={require("../../assets/Images/DropDown.png")}
                      style={{ alignSelf: "center", width: 14, height: 10 }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>


            {this.state.showMonth == true ? (
            <ImageBackground
              source={require("../../assets/Images/@Groupdown.png")}
              style={{
                height: 361,
                width: 320,
                zIndex: 19,
                alignSelf: "center",
                paddingBottom: 50
              }}
              resizeMode={"contain"}
            >
              {this.state.flatId == 0 ? (
                <FlatList
                  data={this.state.monthData}
                  renderItem={({ item, index }) =>
                    this._renderItemMonth(item, index)
                  }
                  style={{ top: 25, height: 200 }}
                  showsVerticalScrollIndicator={false}
                  onTouchStart={() => {
                    this.enableScroll(false);
                  }}
                  onMomentumScrollEnd={() => {
                    this.enableScroll(true);
                  }}
                  nestedScrollEnabled={true}
                />
              ) : this.state.flatId == 1 ? (
                <FlatList
                  data={this.state.dateData}
                  renderItem={({ item, index }) =>
                    this._renderItemDate(item, index)
                  }
                  style={{ top: 25, height: 200 }}
                  showsVerticalScrollIndicator={false}
                  onTouchStart={() => {
                    this.enableScroll(false);
                  }}
                  onMomentumScrollEnd={() => {
                    this.enableScroll(true);
                  }}
                  nestedScrollEnabled={true}
                />
              ) : (
                <FlatList
                  data={this.state.yearData}
                  renderItem={({ item, index }) =>
                    this._renderItemYear(item, index)
                  }
                  style={{ top: 25, height: 200 }}
                  showsVerticalScrollIndicator={false}
                  onTouchStart={() => {
                    this.enableScroll(false);
                  }}
                  onMomentumScrollEnd={() => {
                    this.enableScroll(true);
                  }}
                  nestedScrollEnabled={true}
                />
              )}
            </ImageBackground>
          ) : null}

          </View>

          <TextInputPassSolo
            onChangeText={password => this.setPassword(password)}
            borderColor={this.state.passwordBorderColor}
            secureTextEntry={this.state.securePass}
            onClickHide={() => this.showPass()}
            onClickShow={() => this.showPass()}
            inputState={this.state.passwordMessage}
            message={this.state.passwordMessage}
            securePassEntryState={this.state.securePass}
            onFocusText={() => this._tryFocusPassword()}
            value={this.state.password}
          />

          <View style={{ width: width - 30,marginBottom:13, alignSelf: "center" }}>
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 15,
                alignSelf: "flex-start",
                color: this.state.textColor}}>
              Use at least 6 letters, 1 number & 1 capital letter
            </Text>
          </View>
          <TextInputSolo
            onChangeText={occupation => this.setOccupation(occupation) }
            borderColor={this.state.occupationBorderColor}
            inputState={this.state.occupationMessage}
            message={this.state.occupationMessage}
            labelText={"Occupation"}
            keyboard={"default"}
            fontSize={17}
            fontFamily={"Montserrat-Bold"}
            onFocusText={() => this._tryFocusOccupation()}
            value={this.state.occupation}
            maxLength={40}
          />
          
          </View>

          <View
            style={{
              width: '100%' ,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent:'center'
            }}
          >
            <Text style={{ fontSize: 14, color: "#7a7a7a" }}>Accept</Text>
            <Text style={{ fontSize: 14, color: "#781672" }}>
              {" "}
              Terms & Condition
            </Text>
            <Text style={{ fontSize: 14, color: "#7a7a7a" }}> and</Text>
            <Text style={{ fontSize: 14, color: "#781672" }}>
              {" "}
              Privacy Policy
            </Text>
          </View>





<Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log("Modal closed");
            }}
          >
            <View style={{
                flex: 1,
                justifyContent: "center",
                position: "relative"}}>

              <View
                style={{
                  height: height,
                  width: width,
                  backgroundColor: "#4DB196",
                  opacity: 1,
                  position: "relative"
                }}
              ></View>

              <View
                style={{
                  height: "33%",
                  width: width - 55,
                  backgroundColor: "#fff",
                  zIndex: 1,
                  alignSelf: "center",
                  opacity: 1.0,
                  position: "absolute",
                  borderRadius: 10
                }}
              >
                <View
                  style={{ width: "100%", height: "100%", borderRadius: 10 }}
                >
                  <View
                    style={{
                      width: "80%",
                      alignSelf: "center",
                      height: "20%",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 21,
                        color: "black",
                        textAlign: "center"
                      }}
                    >
                      Accept terms & privacy
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "80%",
                      alignSelf: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        marginTop: "4%",
                        color: "#7a7a7a"
                      }}
                    >
                      By creating an account, you
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "80%",
                      alignSelf: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        marginTop: "4%",
                        color: "#7a7a7a",
                        bottom: 5
                      }}
                    >
                      agree to the{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        marginTop: "4%",
                        color: "#781672",
                        bottom: 5
                      }}
                    >
                      Terms of service{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "80%",
                      alignSelf: "center",
                      justifyContent: "center",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        marginTop: "4%",
                        color: "#7a7a7a",
                        bottom: 10
                      }}
                    >
                      &
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        textAlign: "center",
                        marginTop: "4%",
                        color: "#781672",
                        bottom: 10
                      }}
                    >
                      {" "}
                      Privacy policy.
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      bottom: 0,
                      position: "absolute",
                      width: "100%",
                      height: "30%",
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10
                    }}
                  >
                   
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                      style={{
                        backgroundColor: "#f6f7f8",
                        height: "100%",
                        width: "49.5%",
                        justifyContent: "center",
                        borderBottomLeftRadius: 10
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "grey",
                          fontFamily: "Montserrat-ExtraBold",
                          alignSelf: "center"
                        }}
                      >
                        CANCEL
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this._Register()}
                      style={{
                        backgroundColor: "#f6f7f8",
                        height: "100%",
                        width: "49.5%",
                        justifyContent: "center",
                        borderBottomRightRadius: 10
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#781672",
                          alignSelf: "center",
                          fontFamily: "Montserrat-ExtraBold"
                        }}
                      >
                        I AGREE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalAlreadyRegisterd}
            onRequestClose={() => {
              alert("Modal closed");
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                position: "relative"
              }}
            >
              <View
                style={{
                  height: height,
                  width: width,
                  backgroundColor: "#fff",
                  opacity: 0.95,
                  position: "relative",
                  justifyContent: "center"
                }}
              ></View>

              <ImageBackground
                source={require("../../assets/Images/@popup-bg.png")}
                style={{
                  height: "61%",
                  width: "100%",
                  marginTop:40,
                  zIndex: 1,
                  top:160,
                  opacity: 1,
                  alignSelf:'center',
                  borderRadius: 4,
                  // paddingBottom:50,
                  position: "absolute",
                }}
                resizeMode={"stretch"}
              >
                <View
                  style={{
                    marginTop:10,
                    width: "90%",
                    borderRadius: 10,
                    alignSelf: "center"
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      alignSelf: "center",
                      height: "25%",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Montserrat-ExtraBold",
                        fontSize: 19,
                        color: "black",
                        textAlign: "center"
                      }}
                    >
                      Already Registered
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "80%",
                      alignSelf: "center",
                      justifyContent: "flex-end"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 17,
                        textAlign: "center",
                        marginTop: "4%",
                        color: "#7a7a7a",
                        fontFamily: "Montserrat-Regular"
                      }}
                    >
                      The email address is already registered.Please signup with
                      a different email address.
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignSelf:'flex-end',
                      width: "100%",
                      height: "20%",
                      marginTop:22,
                      borderBottomRightRadius: 10,
                      borderBottomLeftRadius: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this._Login();
                      }}
                      style={{
                        backgroundColor: "#f6f7f8",
                        height: "100%",
                        width: "49.5%",
                        justifyContent: "center",
                        borderBottomLeftRadius: 10
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 19,
                          color: "grey",
                          fontFamily: "Montserrat-ExtraBold",
                          alignSelf: "center"
                        }}
                      >
                        LOGIN
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this._alreadyRegistered()}
                      style={{
                        backgroundColor: "#f6f7f8",
                        height: "100%",
                        width: "49.5%",
                        justifyContent: "center",
                        borderBottomRightRadius: 10
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#781672",
                          alignSelf: "center",
                          fontFamily: "Montserrat-ExtraBold"
                        }}
                      >
                        TRY AGAIN
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </Modal>

{(this.state.iskboadOpen && HelperMethods.isPlatformIos() ) && 
      <GradButton style={{opacity:this.state.invalidInputs ? 0.7 : 1,width:'100%'}}  onPress={() =>this.checkValidation()} isApiCall={this.state.isApiCall} text={"Register"} />
}
     </Container>

{!this.state.iskboadOpen && 

     <GradButton style={{opacity:this.state.invalidInputs ? 0.7 : 1,width:'100%'}}  onPress={() =>this.checkValidation()} isApiCall={this.state.isApiCall} text={"Register"} />
}

</>
    );
  }
}
