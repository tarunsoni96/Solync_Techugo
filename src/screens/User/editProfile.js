import React, { Component } from "react";
import {
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  TakePhoto,
  openCamMultiple,
  openGalleryMultiple,
  cropPhoto,
} from "ServiceProviders/TakePhoto";
import HelperMethods from "Helpers/Methods";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import RemoveModelConfirmation from "../../components/RemoveModelConfirmation";
import Images from "../../constant/images";
import ErrorText from "../../common/error";
import {
  validateEmail,
  validateFirstName,
  validatePassword,
  validateOccupation,
} from "../../common/validation";

import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import Constants from "Helpers/Constants";
import TextInputSolo from "../../common/textInput";
import moment from "moment";
import NetworkAwareContent from "../../AppLevelComponents/UI/NetworkAwareContent";
import EventCardMusic from "../../components/EventCardMusic";
import EventCardTravel from "../../components/EventCardTravel";
import EventCardSports from "../../components/EventCardSports";
import ModelOverlay from "../../components/ModelOverlay";
import ModelImageModeCapture from "../../components/ModelImageModeCapture";
import Loader from "../../AppLevelComponents/UI/Loader";
import { Colors } from "UIProps/Colors";
import MobxStore from "../../StorageHelpers/MobxStore";
import OutsideCloser from "../../components/OutsideCloser";
import Container from "../../AppLevelComponents/UI/Container";
import { heightPercentageToDP } from "react-native-responsive-screen";
const { height, width } = Dimensions.get("screen");

let maxImages = 6;
export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      dataSource: [
        { userImg: "../../assets/Images/@photo-cropped.png" },
        { userImg: "../../assets/Images/@photo-cropped.png" },
        { userImg: "../../assets/Images/@photo-cropped.png" },
        { userImg: "../../assets/Images/@photo-cropped.png" },
        { userImg: "../../assets/Images/@photo-cropped.png" },
        { userImg: "../../assets/Images/@photo-cropped.png" },
      ],
      userId: "",
      name: "",
      imageId: "",
      email: "",
      occupation: "",
      dob: "",
      isApiCall: true,
      firstNameMessage: "",
      firstNameBorderColor: "lightgrey",

      emailAddressMessage: "",
      emailAddressBorderColor: "lightgrey",

      occupationMessage: "",
      occupationBorderColor: "lightgrey",

      passwordMessage: "",
      passwordBorderColor: "lightgrey",

      eventMusic: {},
      eventTravels: {},
      showDate: false,
      eventSports: {},
      enableScrollViewScroll: true,
      showRemoveModel: false,
      monthMusic: "",
      yearMusic: "",
      locationMusic: "",
      showDate: false,
      valueDate: "",
      flatId: '',
      subCatMus: [],
      uri: null,
      dateErrorMessage: "",
      showModeSelectionModal: false,
      birthMonth: "",
      idMonth: "",
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
        { key: "Dec", id: "12" },
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
        { key: "31" },
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
        { key: "2019" },
      ],
      birthDay: "",
      birthYear: "",
    };
  }

  enableScroll(value) {
    this.setState({
      enableScrollViewScroll: value,
    });
  }

  componentWillMount(){
    params = this.props.navigation.state.params

  }

  componentDidMount() {
    if (params?.openMediaType) {
      this.openMedia(params?.openMediaType);
    } else if (params?.fbPic) {
      let imagesArr = [...this.state.images];
      imagesArr.unshift({ uri: params?.fbPic });

      // if(imagesArr.length < maxImages){
      //   imagesArr.push({ isImageAdder: true })
      // }
      HelperMethods.animateLayout();
      this.setState({ images: imagesArr });
    }
    var date = new Date().getDate();
    var year = new Date().getFullYear();

    this.setState({
      currentDate: date,
      currentYear: year,
    });

    this._fetchData();

    
    AsyncStorageHandler.get(Constants.userInfoObj, (val) => {
      // alert(JSON.stringify( val))
      if (val != null) {
        const { user_id, dob, first_name, email, occupation } = val;

        if (dob.charAt(0) != 0) {
          month = moment(dob).format("MMM DD YYYY").split(" ")[0];
          dd = moment(dob).format("MMM DD YYYY").split(" ")[1];
          yr = moment(dob).format("MMM DD YYYY").split(" ")[2];
          ind = this.state.monthData.findIndex((v) => v.key == month);
        } else {
          month = "Not set";
          dd = "Not set";
          yr = "Not set";
          ind = 0;
        }



        this.setState(
          {
            userId: user_id,
            valueDate: dd,
            valueYear: yr,
            valueMonth: month,
            idMonth: this.state.monthData[ind].id,
            name: first_name,
            email: !email ? "Not provided" : email,
            occupation: occupation,
          },
          () => {
          }
        );
      } else {
      }
    });
  }

  _fetchData() {
    this.setState({ isApiCall: true });
    fetch("http://13.232.62.239:6565/api/user/userProfile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: MobxStore.userObj.user_id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ isApiCall: false });
        if (responseJson.statusCode == 200) {
          const { Music, images, Sports, Travels } = responseJson.result;
          this.setState({
            eventMusic: Music,
            eventSports: Sports,
            eventTravels: Travels,
          });
          let img = [...this.state.images];
          for (let i = 0; i < images.length; i++) {
            img.unshift({
              uri: images[i].imageURL,
              id: images[i].id,
              isOldImage: true,
            });
          }

          if (img.length < 6) {
            img.push({ isImageAdder: true });
          }
          this.setState({ images: img });
        }
        return responseJson;
      });
  }

  _formatDay(date) {
    date = new Date(date);
    var day = date.getDate();
    return day;
  }

  _formatMonth(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    date = new Date(date);
    var monthIndex = date.getMonth();
    return monthNames[monthIndex];
  }

  _formatYear(date) {
    date = new Date(date);
    var year = date.getFullYear();
    return year;
  }

  checkValidation() {
    if (this.state.isApiCall) {
      return;
    }

    Keyboard.dismiss();
    HelperMethods.animateLayout();
    let firstNameCheck = false;
    let emailCheck = false;
    let dobCheck = false;
    let passwordCheck = false;
    let occupationCheck = false;

    var str = this.state.dob;
    var currYear = this.state.currentYear;
    var selYear = this.state.valueYear;
    var age = parseInt(currYear) - parseInt(selYear);

    let validateFirstNameResult = validateFirstName(this.state.name);
    let validateEmailAddressResult
    if(this.state.email != 'Not provided'){
       validateEmailAddressResult = validateEmail(this.state.email);
    } else {
       validateEmailAddressResult = {error : ''}
    }
    let validateOccupationResult = validateOccupation(this.state.occupation);

    if (this.state.name == "") {
      this.setState({
        firstNameMessage: "Insert first name",
      });
    } else if (validateFirstNameResult.error != "") {
      this.setState({
        firstNameMessage: "Invalid first name",
        firstNameBorderColor: "#bb205a",
      });
    } else {
      this.setState({ firstNameCheck: true });
      firstNameCheck = true;
    }

    if (this.state.email == "") {
      this.setState({
        emailAddressMessage: "Enter email",
        emailAddressBorderColor: "#bb205a",
        firstNameCheck: true,
      });
    } else if (validateEmailAddressResult.error != "") {
      this.setState({
        emailAddressMessage: "Invalid email",
        emailAddressBorderColor: "#bb205a",
      });
    } else {
      console.log(this.state.firstNameCheck);
      this.setState({ emailCheck: true });
      emailCheck = true;
    }

    /////////////////////DOB///////////////
    if (
      this.state.valueDate == "Not set" ||
      this.state.valueMonth == "Not set" ||
      this.state.valueYear == "Not set"
    ) {
      this.setState({
        dateErrorMessage: "Insert date",
        dobCheck: false,
      });
      dobCheck = false;
    } else if (age < 18) {
      this.setState({
        dateErrorMessage: "User must be 18 or over",
      });
      dobCheck = false;
    } else {
      this.setState({
        dateErrorMessage: "",
        dobCheck: true,
      });
      dobCheck = true;
    }

    ////////////////////occupation////////////////

    if (this.state.occupation == "") {
      this.setState({
        occupationMessage: "Insert occupation",
        occupationBorderColor: "#bb205a",
      });
    } else if (validateOccupationResult.error != "") {
      this.setState({
        occupationCheck: false,
        textColor: "#bb205a",
        occupationBorderColor: "#bb205a",
        occupationMessage: "Occupation should only contain alphabets",
      });
      occupationCheck = false;
    } else {
      this.setState({ occupationCheck: true });
      occupationCheck = true;
    }
    if (
      firstNameCheck == true &&
      emailCheck == true &&
      dobCheck == true &&
      occupationCheck == true
    ) {
      this._done();
    }
  }

  _done(navigateBack = true, showMsg = true) {
    Keyboard.dismiss();

    const { name, email, occupation } = this.state;
    if (!name || !email || !occupation) {
      alert("Please fill all fields");
      return;
    }
    let { params } = this.props.navigation.state;

    if (params?.openMediaType) {
      if (this.state.images.length == 1) {
        alert("Please add at least one profile picture to continue");
        return;
      }
    }

    this.setState({ isApiCall: true });
    const { valueYear, valueDate } = this.state;
    const { images } = this.state;

    let formdata = new FormData();
    formdata.append("user_id", this.state.userId);
    formdata.append("first_name", this.state.name.trim());
    formdata.append("email", this.state.email.trim());
    dob =
      valueYear != "Not set"
        ? `${valueYear}-${this.state.idMonth}-${valueDate}`
        : "0000-00-00";
    formdata.append("dob", dob);
    formdata.append("occupation", this.state.occupation.trim());

    for (let i = 0; i < images.length; i++) {
      if (!this.state.images[i].isOldImage && !images[i].isImageAdder) {
        formdata.append("images", {
          name: `photo${i}.png`,
          type: "image/jpg",
          uri: this.state.images[i].uri,
          filename: "imageanme" + i + ".jpg",
        });
      }
    }

    fetch("http://13.232.62.239:6565/api/user/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formdata,
    })
      .then((responser) => responser.json())
      .then((response) => {
        this.setState({ isApiCall: false });

        if (response.statusCode == 200) {
          if (this.state.images.length > 0) {
            AsyncStorageHandler.store(Constants.photoUploaded, "true");
          }

          AsyncStorageHandler.store(
            Constants.userInfoObj,
            response.result,
            () => {
              MobxStore.updateUserObj(response.result);
              if (showMsg)
                HelperMethods.snackbar("Profile updated successfully");
              if (params?.openMediaType || params?.fbPic) {
                this.props.navigation.navigate("Home", {
                  user_id: params?.userId,
                });
              } else {
                if (navigateBack) {
                  this.props.navigation.pop();
                }
              }
            }
          );
        } else {
          HelperMethods.snackbar("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  croppedImageGetter(uri) {
    alert(uri);
  }

  addImageBtn() {
    return (
      <TouchableOpacity key={0} onPress={() => this.openImageSelection()}>
        <View
          style={{
            height: (width - 30) / 3.6,
            width: (width - 30) / 3.6,
            backgroundColor: "transparent",
            margin: 10,
            borderRadius: (width - 30) / 3.6,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              width: "100%",
              height: "100%",
              alignSelf: "center",
            }}
          >
            <Image
              source={require("../../assets/Images/@addphoto.png")}
              style={{
                height: "93%",
                width: " 93%",
                borderRadius: 400 /2,
                position: "relative",
                alignSelf: "center",
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  openImageSelection() {
    this.setState({ showModeSelectionModal: true });
  }

  renderImages = ({ item, index }) => {
    if (item.isImageAdder) {
      return this.addImageBtn();
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.openRemovePhotoModel(item.uri, item.id)}
        >
          <View
            key={index}
            style={{
              height: (width - 30) / 3.6,
              width: (width - 30) / 3.6,
              margin: 10,
              paddingBottom: 10,
              borderRadius: (width - 30) / 3.6,
            }}
          >
            <ImageBackground
              source={require("../../assets/Images/@proflie-bg-light.png")}
              style={{
                justifyContent: "center",
                height: "110%",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Image
                resizeMode="cover"
                source={{ uri: item.uri }}
                style={{
                  height: "90%",
                  borderRadius: 400 / 2,
                  width: "90%",
                  alignSelf: "center",
                }}
              />
            </ImageBackground>

            <View
              style={{
                height: 25,
                width: 25,
                borderRadius: 25 / 2,
                position: "absolute",
                right: 10,
                bottom: 2,
              }}
            >
              <Image
                source={require("../../assets/Images/@3xdelete-photo.png")}
                style={{ height: 33, width: 33 }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };

  openRemovePhotoModel(uri, imageId) {
    if (!imageId) {
      this.doRemPhoto(uri,true); //remove local image captured
      return;
    }
    this.setState({ showRemoveModel: true, remUri: uri, imageId });
  }

  remPhoto() {
    this.setState({showRemoveModel:false})
    fetch("http://13.232.62.239:6565/api/user/deleteUserImage", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.state.userId,
        id:this.state.imageId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.statusCode == 200) {
          this.doRemPhoto(this.state.remUri);
          HelperMethods.snackbar("Photo removed successfully");
        }
      });
  }

  doRemPhoto(uri,isLocalImage = false ) {
    let index = this.state.images.findIndex((v) => v.uri == uri);
    let isImageAdderExist =
      this.state.images.findIndex((v) => v.isImageAdder == true) > -1;
    let arr = [...this.state.images];
    if (arr.length == maxImages && !isImageAdderExist) {
      arr.push({ isImageAdder: true });
    }
    arr.splice(index, 1);
    HelperMethods.animateLayout();
    this.setState({ images: arr }, () => {
      if(!isLocalImage){
        this._done(false, false)
      }
    })
  }

  renderEvents() {
    const getYr = (obj) => obj?.date?.split(" ")[2];
    let view = [];

    let musicEvent = (
      <EventCardMusic
      type='Music'
      style={{marginBottom:25}}
        obj={this.state.eventMusic}
        year={getYr(this.state.eventMusic)}
      />
    );
    view.push(musicEvent);

    let sportEvent = (
      <EventCardMusic
      type='Sports'
      style={{marginBottom:25}}
      obj={this.state.eventSports}
        year={getYr(this.state.eventSports)}
      />
    );
    view.push(sportEvent);

    let travelEvent = (
      
      <EventCardMusic
      type='Travel'
      style={{marginBottom:25}}
      obj={this.state.eventTravels}
        year={getYr(this.state.eventTravels)}
      />
    );
    view.push(travelEvent);

    return view;
  }

  openMedia(type) {
    this.setState({ showModeSelectionModal: false },()=>{
      setTimeout(()=>{

    if (type == "cam") {
      openCamMultiple((resp) => {
        let imagesArr = [...this.state.images];
        let isImageAdderExist =
          this.state.images.findIndex((v) => v.isImageAdder == true) > -1;

        if (imagesArr.length == maxImages && isImageAdderExist) {
          imagesArr.pop();
        } else if (imagesArr.length == maxImages && !isImageAdderExist) {
          return;
        }
        if (imagesArr.length < 6) imagesArr.unshift({ uri: resp.path });

        HelperMethods.animateLayout();
        this.setState({ images: imagesArr });
      });
    } else {
      openGalleryMultiple((resp) => {
        nxtIndex = 0;
        openCropper(nxtIndex, resp, this);
        function openCropper(nxtIndex, selectedImages, that) {
          let isImageAdderExist =
            that.state.images.findIndex((v) => v.isImageAdder == true) > -1;
          let imagesArr = [...that.state.images];
          if (imagesArr.length == maxImages && isImageAdderExist) {
            imagesArr.pop();
          } else if (imagesArr.length == maxImages && !isImageAdderExist) {
            return;
          }
          if (selectedImages[nxtIndex]) {
            cropPhoto(selectedImages[nxtIndex].path, (resp) => {
              if (imagesArr.length <= maxImages) {
                imagesArr.unshift({ uri: resp.path });
                HelperMethods.animateLayout();
                that.setState({ images: imagesArr }, () => {
                  if (that.state.images.length <= maxImages) {
                    openCropper((nxtIndex += 1), selectedImages, that);
                  }
                });
              }
            });
          }
        }
      });
    }
  },600)

  });

  }

  renderBlurChilds() {
    return (
      <View style={{ backgroundColor: "#000", padding: 50 }}>
        <Text>as</Text>
      </View>
    );
  }

  _showDate() {
    Keyboard.dismiss()
    HelperMethods.animateLayout();
    this.setState({ showMonth: this.state.flatId == '1' ? false : true, flatId: this.state.flatId == '1' ? '' : "1" });
  }

  _showYear() {
    Keyboard.dismiss()
    HelperMethods.animateLayout();
    this.setState({ showMonth: this.state.flatId == '2' ? false : true, flatId:this.state.flatId == '2' ? '' :  "2" });
  }

  _showMonth() {
    Keyboard.dismiss()
    HelperMethods.animateLayout();
    this.setState({ showMonth: this.state.flatId == '0' ? false : true, flatId: this.state.flatId == '0' ? '' : "0" });
  }

  _renderItemDate(item) {
    return (
      <View
        style={{ width: 290, alignSelf: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => {
            this.animateLayout();
            this.setState({ showMonth: false, valueDate: item.key });
          }}
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
              marginRight: 20,
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
          onPress={() => {
            this.animateLayout();
            this.setState({
              showMonth: false,
              valueMonth: item.key,
              idMonth: item.id,
            });
          }}
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
              marginRight: 20,
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
          onPress={() => {
            this.animateLayout();
            this.setState({ showMonth: false, valueYear: item.key });
          }}
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
              marginRight: 20,
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

  handlePressIn = (event) => {
    this.setState({ showMonth: !this.state.showMonth });
  };

  animateLayout() {
    HelperMethods.animateLayout();
  }

  hideDropDowns(){
    this.setState({showMonth:false,flatId:''})
  }

  render() {
    return (
      
      <Container >

      <SafeAreaView style={{ flex: 1,width:'100%', }}>
          <View
            style={{
              position: "relative",
              alignItems: "center",
              flexDirection: "row",
              width: width,
              marginVertical: 40,
            marginBottom:40,
              justifyContent: "space-between",
              borderColor: "#DCDCDC",
              alignSelf: "center",
            }}
          >
            <BackHandlerSingleton />
            <View
              style={{
                justifyContent: "center",
                marginLeft: 20,
                zIndex: 100,
              }}
            >
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require("../../assets/Images/Left.png")}
                  style={{ height: height / 40, width: width / 20 }}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: "absolute",
                width: width,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  alignSelf: "center",
                  fontFamily: "Montserrat-Bold",
                }}
              >
                Edit Profile
              </Text>
            </View>

            <View
              style={{
                justifyContent: "center",
                marginRight: 20,
              }}
            >
              {this.state.isApiCall ? (
                <Loader color={Colors.accent} size="small" />
              ) : (
                <Text
                  style={{
                    fontSize: 17,
                    color: "#B52050",
                    fontFamily: "Montserrat-Bold",
                    alignSelf: "center",
                  }}
                  onPress={() => this.checkValidation()}
                >
                  Done
                </Text>
              )}
            </View>
          </View>
        <View style={{alignItems:'center'}}>

            <NetworkAwareContent
              isApiCall={this.state.isApiCall}
              data={this.state.images}
              apiFunc={() => this._fetchData()}
            >
              <FlatList
                renderItem={this.renderImages}
                data={this.state.images}
                numColumns={3}
                extraData={this.state}
                keyExtractor={(item, index) => item.key}
              />
            </NetworkAwareContent>
            </View>


          <View
            style={{ height: 40, width: width,}}
          ></View>
          <View
            style={{ width: width, height: 40, }}
          >
            <View
              style={{
                height: "100%",
                width: width - 30,
                backgroundColor: "#f6f7f8",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  opacity: 1,
                  fontSize: 15,
                  fontFamily: "Montserrat-ExtraBold",
                  color: "#808c94",
                }}
              >
                Personal Information
              </Text>
            </View>
          </View>

          <TextInputSolo
            inputState={""}
            borderColor={this.state.firstNameBorderColor}
            inputState={this.state.firstNameMessage}
            message={this.state.firstNameMessage}
            labelText={"First name"}
            keyboard={"default"}
            fontSize={17}
            maxLength={25}
            onFocusText={()=>this.hideDropDowns()}
            onChangeText={(text) => this.setState({ name: text })}
            fontFamily={"Montserrat-Bold"}
            value={this.state.name}
          />

          <TextInputSolo
            fontSize={17}
            fontFamily={"Montserrat-Bold"}
            value={this.state.email}
            inputState={""}
            onFocusText={()=>this.hideDropDowns()}
            editable={MobxStore.userObj.facebook_id.length == 0}
            onChangeText={(email) => this.setState({ email })}
            borderColor={this.state.emailAddressBorderColor}
            inputState={this.state.emailAddressMessage}
            message={this.state.emailAddressMessage}
            labelText={"Email address"}
            keyboard={"email-address"}
          />

          <View
            style={{
              height: height / 7,
              width: width - 30,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  opacity: 1,
                  fontSize: 13,
                  fontFamily: "Montserrat-SemiBold",
                  color: "#879299",
                }}
              >
                Date of birth
              </Text>

              {this.state.dateErrorMessage == "" ? null : (
                <View style={{ flexDirection: "row", width: width / 1.5 }}>
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
                backgroundColor: "transparent",
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
                    borderWidth: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "50%",
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
                    borderWidth: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      width: "50%",
                      textAlign:'center'
                    }}
                  >
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
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "80%",
                    }}
                  >
                    {" "}
                    Month
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
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "50%",
                      textAlign:'center'
                    }}
                  >
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
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "50%",
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
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      alignSelf: "center",
                      width: "50%",
                      textAlign:'center'
                    }}
                  >
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
          </View>

          <OutsideCloser show={this.state.showMonth}>
            {this.state.showMonth == true ? (
              <ImageBackground
                source={require("../../assets/Images/@Groupdown.png")}
                style={{
                  height: 361,
                  width: 320,
                  zIndex: 19,
                  marginTop: -27,
                  alignSelf: "center",
                  paddingBottom: 50,
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
                    nestedScrollEnabled
                    onMomentumScrollEnd={() => {
                      this.enableScroll(true);
                    }}
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
                    nestedScrollEnabled
                    onMomentumScrollEnd={() => {
                      this.enableScroll(true);
                    }}
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
                    nestedScrollEnabled
                    onMomentumScrollEnd={() => {
                      this.enableScroll(true);
                    }}
                  />
                )}
              </ImageBackground>
            ) : null}
          </OutsideCloser>

          <TextInputSolo
            fontSize={17}
            fontFamily={"Montserrat-Bold"}
            value={this.state.occupation}
            onChangeText={(occupation) => this.setState({ occupation })}
            maxLength={25}
            onFocusText={()=>this.hideDropDowns()}
            borderColor={this.state.occupationBorderColor}
            inputState={this.state.occupationMessage}
            message={this.state.occupationMessage}
            labelText={"Occupation"}
            keyboard={"email-address"}
          />

          <View
            style={{ height: 20, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{ width: width, height: 40, backgroundColor: "#f6f7f8" }}
          >
            <View
              style={{
                height: "100%",
                width: width - 30,
                backgroundColor: "#f6f7f8",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  opacity: 1,
                  fontSize: 15,
                  fontFamily: "Montserrat-ExtraBold",
                  color: "#808c94",
                }}
              >
                Events
              </Text>
            </View>
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>

          <NetworkAwareContent
            data={this.state.dataSource}
            isApiCall={this.state.isApiCall}
            apiFunc={() => this._fetchData()}
          >
            <View style={{ marginBottom: 20 }}>{this.renderEvents()}</View>
          </NetworkAwareContent>

          <ModelImageModeCapture
            openMedia={(type) => this.openMedia(type)}
            closeModal={() => this.setState({ showModeSelectionModal: false })}
            modalVisible={this.state.showModeSelectionModal}
          />

          <ModelOverlay
          closeModal={() => this.setState({ showRemoveModel: false })}
            modalVisible={this.state.showRemoveModel}
            posPress={() => this.remPhoto()}
            showBg={true}
            title="Remove photo"
            posBtn="Remove"
            msg="Are you sure you want to remove this photo?"
          />

          {/* <RemoveModelConfirmation
            closeModal={() => this.setState({ showRemoveModel: false })}
            modalVisible={this.state.showRemoveModel}
            removePhoto={(uri, imageId) => this.remPhoto(uri, imageId)}
            remUri={this.state.remUri}
            imageId={this.state.imageId}
          /> */}


      </SafeAreaView>
      </Container>

    );
  }
}
