import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  FlatList,
  AsyncStorage,
  BackHandler,
} from "react-native";
import HelperMethods from "Helpers/Methods";
const { height, width } = Dimensions.get("screen");
import Fonts from "UIProps/Fonts";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import CustomText from "AppLevelComponents/UI/CustomText";
import { getCountries, getCitites, getEventLocation ,getEventDates ,getEventDetails } from "ServiceProviders/ApiCaller";
import "Helpers/global";
import { NavigationEvents } from "react-navigation";
import Constants from "../../Helpers/Constants";
import Container from "../../AppLevelComponents/UI/Container";
import { Colors } from "UIProps/Colors";
import GradButton from "../../common/gradientButton";
import { NavigationActions, StackActions } from 'react-navigation';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MobxStore from "../../StorageHelpers/MobxStore";
import Loader from "../../AppLevelComponents/UI/Loader";
import ScreenHeader from "../../components/ScreenHeader";
import TextInputSolo from "../../common/textInput";
import { Input } from "react-native-elements";

let yrData = [
  { name: "Any year" },
  { name: "2020" },
  { name: "2021" },
  { name: "2022" },
];

let monthData = [
  { name: "Any month" },
  { name: "Jan – Mar" },
  { name: "July – Sept" },
  { name: "Oct – Dec" },
];

let dateText = ''
let params ={}
let firstInputTitle = "";
let content = ''
let inpStyle ={}
export default class SearchByUnique extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showViewLocation: true,
      showViewArtist: true,
      disableButton: true,
      artist: "",
      location: "",
      showView: true,
      isApiCall:false,
      visible: false,
      onFocus: true,
      showLocation: false,
      showDate: false,
      monthData: [],
      date: "",
      datesData: [],
      formattedDate: "",
      userId: "",
      countryId: "",
      selectedMonth: "",
      selectedYear: "",
      subIds:'',
      exp_date:'',
      showMonths: false,
      showYears: false,
      latitude: 0,
      longitude: 0,
      opacityButton: false,
    };
  }

  _findPeople() {
    let { params } = this.props.navigation.state;
      let obj = {
      category_id: params?.typeId,
      subcategory: params?.selectedCats.join(",").toString(),
      artist_or_event:
        params?.type == "Travel" ? this.state.country : params?.artFest?.trim(), //country
      location:
        params?.type == "Travel" ? this.state.city : this.state.location.trim(), //city
      date: params?.type == "Travel" ? "" : this.state.date.trim(),
      months: this.state.selectedMonth,
      year: this.state.selectedYear,
      user_id: MobxStore.userObj.user_id || 2,
      lat: this.state.latitude,
      lng: this.state.longitude,
      subcategories_ids:this.state.subIds,
      exp_date:this.state.exp_date
    };
    this.setState({isApiCall:true})

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });

    fetch("http://13.232.62.239:6565/api/user/completeProfile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        MobxStore.specificCat = ''
        this.setState({isApiCall:false})
        AsyncStorageHandler.store(Constants.isInterestSelected, "true");
        if (responseJson.statusCode == 200) {
          MobxStore.isFilterChanged(params?.type);
          this.props.navigation.dispatch(resetAction)
        } else if (responseJson.statusCode == 201) {
          this.props.navigation.navigate("UploadPhoto", {
            userId: MobxStore.userObj.user_id,
          });
        } else {
          alert("Something went wrong");
        }
        return responseJson;
      })
      .catch((error) => {
        console.log(error);
        this.setState({isApiCall:false})

      });
  }

  componentWillMount() {
    params = this.props.navigation.state.params;
    this.renderContent();
  }

  componentDidMount() {
    // if(params?.type != 'Travel')
    this.getLocations()

    this.setState(
      { latitude: global.latitude, longitude: global.longitude },
      () => {
        // this._dataCheck();
      }
    );
  }

  getLocations(){
     this.setState({isLoadingLocations:true,datesData:[]})
        getEventLocation(params?.artFest).then(resp => {
          this.setState({isLoadingLocations:false})
          
          this.setState({monthData:resp.result.locations})
        }).catch(err => {
          this.setState({isLoadingLocations:false})
        })
  }

  getDates(location){
    this.setState({isLoadingDates:true})
       getEventDates(params?.artFest,location).then(resp => {
         this.setState({isLoadingDates:false,datesData:resp.result.dates})
       }).catch(err => {
         this.setState({isLoadingDates:false})
       })
 }

 getEveDetails(rawDate){
  this.setState({isGettingEveDetails:true})
    getEventDetails(params?.artFest,this.state.location,rawDate).then(resp => {
    this.setState({isGettingEveDetails:false,opacityButton:true,subIds:resp.result.subcategories_ids,exp_date:resp.result.stop_time})
  }).catch(err => {
    this.setState({isGettingEveDetails:false,opacityButton:false})
  })
 }

  _dataCheck = () => {
    AsyncStorageHandler.get(Constants.userInfoObj, (val) => {
      if (val != null) {
        const { user_id, images } = val;

        this.setState(
          {
            userId: user_id,
          },
          () => {}
        );
      }
    });

    fetch("http://13.232.62.239:6565/api/user/getEventsByArtist", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sub_ids: params?.dataSubName,
        artist: params?.artFest?.trim(),
        category_id: parseInt(params?.typeId),
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let arrData = [];
        let arrDates = [];
        if (responseJson.statusCode == 200) {
          for (i = 0; i <= responseJson.result.locations.length - 1; i++) {
            var data1 = responseJson.result.locations[i];
            arrData.push(data1);
          }

          for (j = 0; j <= responseJson.result.dates.length - 1; j++) {
            var data2 = responseJson.result.dates[j];
            arrDates.push(data2);
          }

          HelperMethods.animateLayout();

          this.setState({
            monthData: arrData,
            datesData: arrDates,
            showView: true,
          });
        } else if (responseJson.statusCode == 201) {
          this.props.navigation.navigate("NoConcert", {
            sub_ids: params?.data,
            artist: params?.artFest,
            loc: "",
            type: params?.type,
          });
        }
        return responseJson;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _showLocation() {
    if(this.state.isLoadingLocations){
      HelperMethods.snackbar('Loading, please wait')
      return
    }
    HelperMethods.animateLayout();
    if (this.state.showLocation == true) {
      this.setState({
        showLocation: false,
      });
    } else {
      this.setState({
        showLocation: true,
        showDate: false,
      });
    }
  }

  _showDate() {
    if(!this.state.location){
      HelperMethods.snackbar(dateText)
      return
    }
    HelperMethods.animateLayout();

    if (this.state.showDate == true) {
      this.setState({
        showDate: false,
      });
    } else {
      this.setState({
        showDate: true,
        showLocation: false,
      });
    }
  }

  _renderItem(item, index) {
    return (
      <View
        style={{ width: 310, alignSelf: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => this._onSelectionLocation(item.city_name)}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#000",
              fontSize: 16,
              fontFamily: "Montserrat-SemiBold",
              height: "auto",
              paddingTop: 10,
              textAlign: "center",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {item.city_name}
          </Text>
          <View
            style={{
              height: 1,
              width: "90%",
              marginHorizontal: 10,
              alignSelf: "center",
              backgroundColor: "#DCDCDC",
              marginTop: 10,
            }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  }

  _onSelectionLocation(city) {
    this.getDates(city)
    HelperMethods.animateLayout();

    if (this.state.date == "") {
      this.setState({
        showLocation: false,
        location: city,
        opacityButton: false,
      });
    } else {
      this.setState({
        showLocation: false,
        location: city,
        opacityButton: true,
      });
    }
  }

  _formatDate(date) {
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
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + " " + monthNames[monthIndex] + " " + year;
  }

  _renderItemdate(item, index) {
    var str = item.start_time.split(" ")[0];
    var formatDate = this._formatDate(str);
    return (
      <View
        style={{ width: 310, alignSelf: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => this._onSelectionDate(formatDate,item.start_time)}
        >
          {/* <Text style={{alignSelf:'center',color:'#000',fontSize:16,fontFamily:'Montserrat-SemiBold',height:50,paddingTop:10,textAlign:'center'}}>{item}</Text> */}
          <Text
            style={{
              alignSelf: "center",
              color: "#000",
              fontSize: 16,
              fontFamily: "Montserrat-SemiBold",
              height: "auto",
              paddingTop: 10,
              textAlign: "center",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {formatDate}
          </Text>
          <View
            style={{
              height: 1,
              width: "90%",
              alignSelf: "center",
              backgroundColor: "#DCDCDC",
              marginTop: 10,
            }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  }
  _onSelectionDate(date,rawDate) {
    this.getEveDetails(rawDate)
    HelperMethods.animateLayout();
    if (this.state.location == "") {
      this.setState({ showDate: false, date: date,  });
    } else {
      this.setState({ showDate: false, date: date,  });
    }
  }

  renderContent() {
    let title = "";
    firstInputTitle = "";
    title = "Where would you like to visit?";
    switch (params?.type) {
      case "Music":
        firstInputTitle = "Artist or Festival";
        title = "What concert/festivals would you like to attend?";
        break;

      case "Sports":
        firstInputTitle = "Sporting Event";
        title = "What kind of sport are you interested in?";
        break;

      case "Travel":
        firstInputTitle = "Artist or Festival";
        title = "Where would you like to visit?";
        break;
    }

    content = <ScreenHeader title={params?.title || title} isCenter={false} />;
  }

  fetchCountry(country) {
    this.setState({ isApiCall: true });
    getCountries(country)
      .then((resp) => {
        const { result } = resp;
        let arr = [{ name: "Any country", id: "0" }, ...result];
        this.setState({ countries: arr, isApiCall: false });
      })
      .catch((err) => {
        this.setState({ isApiCall: false });
      });
    HelperMethods.animateLayout();
    this.setState({
      showYears: false,
      showMonths: false,
      country,
      cities: [],
      showCitites: false,
      countryId: "",
      city: "",
      showCountries: country ? true : false,
    });
  }

  fetchCity(city) {
    this.setState({ isApiCall: true });
    getCitites(this.state.countryId, city)
      .then((resp) => {
        const { result } = resp;
        let arr = [{ name: "Any city", id: "0" }, ...result];
        this.setState({ cities: arr, isApiCall: false });
      })
      .catch((err) => {
        this.setState({ isApiCall: false });
      });
    HelperMethods.animateLayout();
    this.setState({
      showYears: false,
      showMonths: false,
      city,
      showCountries: false,
      showCitites: city ? true : false,
    });
  }

  renderDropDownInput(title, value, onPress, placeholder = "Please select") {
    return (
      <View
        style={{
          width: "95%",
          alignSelf: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            opacity: 1,
            fontSize: 14,
            fontFamily: "Montserrat-SemiBold",
            color: "#879299",
          }}
        >
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            HelperMethods.animateLayout();
            onPress();
          }}
          style={{
            backgroundColor: "transparent",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
            borderTopColor: "transparent",
            borderRightColor: "transparent",
            borderLeftColor: "transparent",
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomColor: "lightgrey",
            borderWidth: 2,
            zIndex: 100000,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat-Bold",
              alignSelf: "center",
              marginVertical: 10,
            }}
          >
            {value || placeholder}
          </Text>
          <View style={{ alignSelf: "center" }}>
            <Image
              source={require("../../assets/Images/DropDown.png")}
              style={{
                alignSelf: "center",
                width: 17,
                height: 10,
                marginVertical: 10,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  noSuggestionsView = () => {
    if (this.state.isApiCall) {
      return <Loader style={{ alignSelf: "center" }} />;
    } else {
      return (
        <CustomText
          text="No data"
          style={{ marginTop: 0, alignSelf: "center" }}
          color="#000"
        />
      );
    }
  };

  onSelectGeoItem(item) {
    const { id } = item;
    HelperMethods.animateLayout();
    if (this.state.showCountries) {
      let city = item.name == "Any country" ? "Any city" : "";
      if (city) Keyboard.dismiss();

      this.setState(
        { country: item.name, city, countryId: id, showCountries: false },
        () => {
          this.secondTextInput.focus();
        }
      );
    } else if (this.state.showMonths) {
      this.setState({ selectedMonth: item.name, showMonths: false });
    } else if (this.state.showYears) {
      this.setState({ selectedYear: item.name, showYears: false });
    } else {
      this.setState({ city: item.name, showCitites: false });
      Keyboard.dismiss();
    }
  }

  renderGeoListData = ({ item, index }) => {
    return (
      <View style={{ width: "100%", justifyContent: "center" }}>
        <TouchableOpacity
          style={{ justifyContent: "center", width: "100%" }}
          onPress={() => this.onSelectGeoItem(item)}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#000",
              fontSize: 16,
              fontFamily: "Montserrat-SemiBold",
              height: "auto",
              paddingTop: 10,
              textAlign: "center",
              width: "100%",
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#DCDCDC",
              marginTop: 10,
            }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  };

  renderFlatList() {
    const { countries, cities } = this.state;
    let data;
    if (this.state.showCountries) {
      data = countries;
    } else if (this.state.showCitites) {
      data = cities;
    } else if (this.state.showMonths) {
      data = monthData;
    } else {
      data = yrData;
    }
    return (
      <FlatList
        data={data}
        renderItem={this.renderGeoListData}
        ListEmptyComponent={this.noSuggestionsView}
        extraData={this.state}
        nestedScrollEnabled
        style={{ maxHeight: 250 }}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={Keyboard.dismiss}
      />
    );
  }

  renderListContainer() {
    return (
      <ImageBackground
        source={require("../../assets/Images/@Groupdown.png")}
        style={{
          zIndex: 19,
          padding: 20,
        }}
        imageStyle={{ alignItems: "center" }}
        resizeMode={"stretch"}
      >
        {this.renderFlatList()}
      </ImageBackground>
    );
  }
  renderInputs() {
    inpStyle = {
      marginBottom: 50,
    };

    if (params?.type == "Travel") {
      return (
        <View style={{ marginTop: 25, padding: 10 }}>
          <View style={inpStyle}>
            <Input
              label="Country"
              autoFocus
              value={this.state.country}
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
              onChangeText={(country) => this.fetchCountry(country)}
              fontFamily={Fonts.heavy}
            />

            {this.state.showCountries && this.renderListContainer()}
          </View>

          <View style={inpStyle}>
            <Input
              label="City"
              onFocus={() => this.setState({ city: "" })}
              ref={(input) => {
                this.secondTextInput = input;
              }}
              value={this.state.city}
              onChangeText={(city) => this.fetchCity(city)}
              fontFamily={Fonts.heavy}
              placeholder={
                this.state.countryId
                  ? "Please select city"
                  : "Please select country first"
              }
              editable={
                this.state.countryId && this.state.country != "Any country"
                  ? true
                  : false
              }
            />

            {this.state.showCitites && this.renderListContainer()}
          </View>

          <View style={inpStyle}>
            {this.renderDropDownInput("Month", this.state.selectedMonth, () => {
              this.setState({
                showMonths: !this.state.showMonths,
                showYears: false,
                showCitites: false,
                showCountries: false,
              });
            })}

            {this.state.showMonths && this.renderListContainer()}
          </View>

          {this.renderDropDownInput("Year", this.state.selectedYear, () => {
            this.setState({
              showMonths: false,
              showYears: !this.state.showYears,
              showCitites: false,
              showCountries: false,
            });
          })}

          {this.state.showYears && this.renderListContainer()}
        </View>
      );
    } else {
      dateText = ''
      if(!this.state.location && this.state.datesData.length == 0){
        dateText ='Please select location first'
      } else if(this.state.location && this.state.datesData.length == 0) {
        dateText ='Loading..'
      } else {
        dateText ='Please select'
      }

      return (
        <View style={{ marginTop: 25, padding: 10 }}>
          <View
            style={{
              position: "relative",
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
                  fontSize: 14,
                  fontFamily: "Montserrat-SemiBold",
                  color: "#879299",
                }}
              >
                {firstInputTitle}
              </Text>
            </View>

            <View
              style={{
                width: width,
                height: "50%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: width - 30,
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
                  alignSelf: "center",
                }}
              >
                <ScrollView nestedScrollEnabled>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    {params?.artFest}
                  </Text>
                </ScrollView>
              </View>
            </View>
          </View>
          <View
            style={{
              alignSelf: "center",
              marginTop: hp(3.7),
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                opacity: 1,
                fontSize: 14,
                fontFamily: "Montserrat-SemiBold",
                color: "#879299",
              }}
            >
              Location
            </Text>
            <TouchableOpacity
              onPress={() => this._showLocation()}
              style={{
                width: width - 30,
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
                zIndex: 100000,
                alignSelf: "center",
              }}
            >
              {this.state.location == "" ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-Bold",
                    alignSelf: "center",
                  }}
                >
                  {this.state.isLoadingLocations ? 'Loading..' : 'Please select'}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-Bold",
                    alignSelf: "center",
                  }}
                >
                  {this.state.location}
                </Text>
              )}
              <View style={{ alignSelf: "center" }}>
                <Image
                  source={require("../../assets/Images/DropDown.png")}
                  style={{ alignSelf: "center", width: 17, height: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {this.state.showLocation == true ? (
            <ImageBackground
              source={require("../../assets/Images/@Groupdown.png")}
              style={{
                height: "auto",
                width: "auto",
                zIndex: 19,
                alignSelf: "center",
                paddingBottom: 30,
              }}
              resizeMode={"stretch"}
            >
              <FlatList
                data={this.state.monthData}
                renderItem={({ item, index }) => this._renderItem(item, index)}
                style={{ top: 25, maxHeight: 200 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              />
            </ImageBackground>
          ) : null}

          <View
            style={{
              width: width - 30,
              marginTop: hp(9),
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                opacity: 1,
                fontSize: 14,
                fontFamily: "Montserrat-SemiBold",
                color: "#879299",
              }}
            >
              Date
            </Text>
            <TouchableOpacity
              onPress={() => this._showDate()}
              style={{
                width: width - 30,
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
                alignSelf: "center",
                zIndex: 100000,
              }}
            >
              {this.state.date == "" ? (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-Bold",
                    alignSelf: "center",
                  }}
                >
                  {" "}
                  {dateText}
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Montserrat-Bold",
                    alignSelf: "center",
                  }}
                >
                  {this.state.date}
                </Text>
              )}
              <View style={{ alignSelf: "center" }}>
                <Image
                  source={require("../../assets/Images/DropDown.png")}
                  style={{ alignSelf: "center", width: 17, height: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {this.state.showDate == true ? (
            <ImageBackground
              source={require("../../assets/Images/@Groupdown.png")}
              style={{
                height: "auto",
                width: "auto",
                zIndex: 19,
                alignSelf: "center",
                paddingBottom: 32,
              }}
              resizeMode={"stretch"}
            >
              <FlatList
                data={this.state.datesData}
                renderItem={({ item, index }) =>
                  this._renderItemdate(item, index)
                }
                style={{ top: 20, maxHeight: 200 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              />
            </ImageBackground>
          ) : null}
        </View>
      );
    }
  }

  validateTravelInputs() {
    const { country, city, selectedMonth, selectedYear } = this.state;

    if (country && city && selectedMonth && selectedYear) {
      if (!this.state.opacityButton) this.setState({ opacityButton: true });
    } else {
      if (this.state.opacityButton) this.setState({ opacityButton: false });
    }
  }

  render() {
    let { params } = this.props.navigation.state;
    let bgImage;
    if (params?.type == "Music") {
      bgImage = require("../../assets/Images/@2xmusic-note-black-symbol.png");
    } else if (params?.type == "Sports") {
      // bgImage = require("../../assets/Images/sport-light.png");
    } else {
      // bgImage = require("../../assets/Images/travelBG.png");
    }
    return (
      <>
        {this.state.showView ? (
          <View style={{ flex: 1 }}>
            <Container
              nestedScrollEnabled
              onBackPress={() => this.props.navigation.pop()}
            >
              <View style={{width: "100%" }}>
                {content && content}

                {this.renderInputs()}
              </View>
              <View style={{ flex: 1 }} />

              <View style={{ width: "100%", zIndex: 99, marginBottom: 0 }}>
                {params?.type == "Travel" && this.validateTravelInputs()}
                  <GradButton
                    text={`${this.state.isGettingEveDetails ? 'Please wait' : 'Find me my people'}`}
                    onPress={() => this.state.opacityButton ? this._findPeople() : {}}
                    isApiCall={this.state.isApiCall}
                    style={{ opacity: !this.state.opacityButton ? 0.7 : 1 }}
                  />
              </View>

            </Container>
            
            <View
              style={{
                position: "absolute",
                width: 450,
                height: 450,
                bottom: "0%",
                right: "-10%",
              }}
              pointerEvents="none"
            >
            {/* {bgImage && 
              <Image
                pointerEvents="none"
                source={bgImage}
                resizeMode="contain"
                style={{
                  width: 450,
                  height: 450,
                  bottom: "0%",
                  right: "-10%",
                }}
              />
            } */}
            </View>
          </View>
        ) : (
          <Loader style={{ marginTop: 80 }} color={Colors.accent} />
        )}
      </>
    );
  }
}
