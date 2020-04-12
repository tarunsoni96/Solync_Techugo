import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  BackHandler,
  AsyncStorage
} from "react-native";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import HelperMethods from 'Helpers/Methods'
import 'Helpers/global'
import Constants from "Helpers/Constants";
import { NavigationEvents } from "react-navigation";
const { height, width } = Dimensions.get("screen");
import GradButton from "../../common/gradientButton";
import Container from "../../AppLevelComponents/UI/Container";
import MobxStore from "../../StorageHelpers/MobxStore";
export default class FindPeopleSports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showViewLocation: true,
      showViewArtist: true,
      disableButton: true,
      artist: "",
      location: "",
      visible: false,
      onFocus: true,
      showLocation: false,
      showDate: false,
      monthData: [],
      date: "",
      datesData: [],
      formattedDate: "",
      userId: "",
      latitude: 0,
      longitude: 0,
      opacityButton: false
    };
  }
  _findPeople() {
    let { params } = this.props.navigation.state;
    let arrdata = [];
    params?.data.forEach(function(item) {
      if (item.isSelect == true) {
        arrdata.push(item);
      }
      // arrdata.push(item.item.sub_id)
    });
    console.log("++++++++++", JSON.stringify(params?.data.toString()));
    console.log(JSON.stringify(params?.data.toString()));
    console.log(JSON.stringify(params?.artFest.trim()));
    console.log(JSON.stringify(this.state.location.trim()));
    console.log(JSON.stringify(this.state.date.trim()));
    console.log(JSON.stringify(this.state.userId));
    console.log(JSON.stringify(this.state.latitude));
    console.log(JSON.stringify(this.state.longitude));
    fetch("http://13.232.62.239:6565/api/user/completeProfile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category_id: "2",
        subcategory: params?.data.toString(),
        artist_or_event: params?.artFest.trim(),
        location: this.state.location.trim(),
        date: this.state.date.trim(),
        user_id: this.state.userId,
        lat: this.state.latitude,
        lng: this.state.longitude
      })
    })
      .then(response => response.json())

      .then(responseJson => {
        AsyncStorageHandler.store(Constants.isInterestSelected,'true')
        if (responseJson.statusCode == 200) {
          MobxStore.isFilterChanged('Sports')
          this.props.navigation.navigate("Home", {
            user_id: this.state.userId
          });
        } else if (responseJson.statusCode == 201) {
          this.props.navigation.navigate("UploadPhoto", {
            userId: params?.userId
          });
        } else {
          alert("Something went wrong");
        }
        return responseJson;
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.setState(
      { latitude: global.latitude, longitude: global.longitude },
      () => {
        this._dataCheck();
        }
      );
  }
  _dataCheck() {
    let { params } = this.props.navigation.state;

    AsyncStorageHandler.get(Constants.userInfoObj,val => {
      if(val != null){
        const {user_id,images} = val
       
        this.setState({
          userId:user_id
        },()=>{
        });
      }
    })


    fetch("http://13.232.62.239:6565/api/user/getEventsByArtist", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sub_ids: params?.dataSubName,
        artist: params?.artFest.trim(),
        category_id: parseInt(params?.typeId)
      })
    })
      .then(response => response.json())

      .then(responseJson => {
        let arrData = [];
        let arrDates = [];
        console.log(JSON.stringify(responseJson));
        if (responseJson.statusCode == 200) {
          console.log("SUCCESS RESPONSE", JSON.stringify(responseJson.result));
          for (i = 0; i <= responseJson.result.locations.length - 1; i++) {
            var data1 = responseJson.result.locations[i];
            arrData.push(data1);
          }

          console.log("ARR DATA===", JSON.stringify(arrData));
          for (j = 0; j <= responseJson.result.dates.length - 1; j++) {
            var data2 = responseJson.result.dates[j];

            arrDates.push(data2);
          }
          this.setState({
            monthData: arrData,
            datesData: arrDates
          });
          var eventList = this.state.monthData;
          var dateList = this.state.datesData;
          //eventList.sort(function(a,b) {return a-b});
          console.log("EVENT LIST ==============", JSON.stringify(eventList));
        } else if (responseJson.statusCode == 400) {
          console.log("FALIURE RESPONSE", JSON.stringify(responseJson));
          // this.setState({
          //   modalAlreadyRegisterd:true
          // })
          //alert('fsdf')
        } else {
          this.props.navigation.navigate("NoConcert", {
            sub_ids: params?.data,
            artist: params?.artFest,
            loc: "",
            type: params?.type,
            dataSubName: params?.dataSubName,
            typeId: params?.typeId
          });
        }
        return responseJson;
      })
      .catch(error => {
        console.log(error);
      });
  }

  _showLocation() {
    HelperMethods.animateLayout()
    
    if (this.state.showLocation == true) {
      this.setState({
        showLocation: false
      });
    } else {
      this.setState({
        showLocation: true
      });
    }
  }
  _showDate() {
    HelperMethods.animateLayout()

    if (this.state.showDate == true) {
      this.setState({
        showDate: false
      });
    } else {
      this.setState({
        showDate: true
      });
    }
  }
  _renderItem(item, index) {
    console.log("========", item);
    return (
      <View
        style={{ width: 290, alignSelf: "center", justifyContent: "center" }}
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
              marginRight: 20
            }}
          >
            {item.city_name}
          </Text>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: "#DCDCDC",
              marginTop: 10,
              alignSelf:'center'
            }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  }
  _onSelectionLocation(city) {
    HelperMethods.animateLayout()
    if (this.state.date == "") {
      this.setState({
        showLocation: false,
        location: city,
        opacityButton: false
      });
    } else {
      this.setState({
        showLocation: false,
        location: city,
        opacityButton: true
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
      "December"
    ];
    date = new Date(date);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    console.log(
      "======",
      JSON.stringify(day + " " + monthNames[monthIndex] + " " + year)
    );

    return day + " " + monthNames[monthIndex] + " " + year;
  }
  _renderItemdate(item, index) {
    var str = item.start_time.split(" ")[0];
    console.log(str);
    var formatDate = this._formatDate(str);
    return (
      <View
        style={{ width: 260, alignSelf: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => this._onSelectionDate(formatDate)}
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
              marginRight: 20
            }}
          >
            {formatDate}
          </Text>
          <View
            style={{ height: 1,alignSelf:'center',width:'80%', backgroundColor: "#DCDCDC", marginTop: 10 }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  }
  _onSelectionDate(date) {
    if (this.state.location == "") {
      this.setState({ showDate: false, date: date, opacityButton: false });
    } else {
      this.setState({ showDate: false, date: date, opacityButton: true });
    }
  }

  render() {
    let { params } = this.props.navigation.state;

    return (
      <Container >
        <NavigationEvents
          onWillFocus={payload => this._dataCheck()}
        />
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
                width: width,
                justifyContent: "center",
                borderColor: "#DCDCDC"
              }}
            >
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  width: width / 6,
                  alignSelf: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("SearchBy")}
                >
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
                  flexDirection: "column",
                  width: width / 1.2
                }}
              >
                <Text
                  style={{ fontSize: 21, fontFamily: "Montserrat-ExtraBold" }}
                >
                </Text>
              </View>
            </View>

        <View style={{ backgroundColor:'#000',width:'100%'}}>
          <View style={{ height: 40, width: width }}></View>
          <View
            style={{
              position: "relative",
              height: height / 7,
              width: width - 30,
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  opacity: 1,
                  fontSize: 14,
                  fontFamily: "Montserrat-SemiBold",
                  color: "#879299"
                }}
              >
                {" "}
                Sporting Event
              </Text>
            </View>
            <View
              style={{ width: width - 30, height: "50%", flexDirection: "row" }}
            >
              <View
                style={{
                  width: width - 30,
                  backgroundColor: "transparent",
                  flex: 1,
                  flexDirection: "row",
                  borderTopColor: "transparent",
                  borderRightColor: "transparent",
                  borderLeftColor: "transparent",
                  borderLeftWidth: 2,
                  borderRightWidth: 0,
                  borderBottomColor: "lightgrey",
                  borderWidth: 2
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: "Montserrat-Bold" }}>
                  {" "}
                  {params?.artFest}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              position: "relative",
              height: height / 7,
              width: width - 30,
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  opacity: 1,
                  fontSize: 14,
                  fontFamily: "Montserrat-SemiBold",
                  color: "#879299"
                }}
              >
                {" "}
                Location
              </Text>
            </View>
            <View
              style={{
                width: width,
                height: "50%",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
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
                  alignSelf: "center"
                }}
              >
                {this.state.location == "" ? (
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Montserrat-Bold",
                      alignSelf: "center"
                    }}
                  >
                    {" "}
                    Please select
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Montserrat-Bold",
                      alignSelf: "center"
                    }}
                  >
                    {" "}
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
          </View>
          {this.state.showLocation == true ? (
            <ImageBackground
              source={require("../../assets/Images/@Groupdown.png")}
              style={{
                height: "auto",
                width: "auto",
                zIndex: 19,
                marginTop:-20,
                alignSelf: "center",
                padding: 20
              }}
              resizeMode={'stretch'}
            >
              <FlatList
                data={this.state.monthData}
                renderItem={({ item, index }) => this._renderItem(item, index)}
                style={{ maxHeight: 200 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              />
            </ImageBackground>
          ) : null}
          <View
            style={{
              position: "relative",
              height: height / 7,
              width: width - 30,
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  opacity: 1,
                  fontSize: 14,
                  fontFamily: "Montserrat-SemiBold",
                  color: "#879299"
                }}
              >
                {" "}
                Date
              </Text>
            </View>
            <View
              style={{
                width: width,
                height: "50%",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
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
                  alignSelf: "center"
                }}
              >
                {this.state.date == "" ? (
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Montserrat-Bold",
                      alignSelf: "center"
                    }}
                  >
                    {" "}
                    Please select
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Montserrat-Bold",
                      alignSelf: "center"
                    }}
                  >
                    {" "}
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
          </View>
          {this.state.showDate == true ? (
            <ImageBackground
              source={require("../../assets/Images/@Groupdown.png")}
              style={{
                height: 'auto',
                width:  'auto',
                zIndex: 19,
                marginTop:-20,
                alignSelf: "center",
                padding:20
              }}
              resizeMode={"stretch"}
            >
              <FlatList
                data={this.state.datesData}
                renderItem={({ item, index }) =>
                  this._renderItemdate(item, index)
                }
                style={{ maxHeight: 200 }}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              />
            </ImageBackground>
          ) : null}
          <View
            style={{
              height: height > 700 ? height / 4.3 : height / 5.5,
              width: width
            }}
          ></View>
          {/* -------------------------------------Sporting Event----Location------------Date------Please select--------- */}
        </View>

        <View style={{width:'100%'}} >

          {this.state.opacityButton == false ? (
            <GradButton text='Find me my people' onPress={()=>{}} style={{opacity:0.7}} />
            
            ) : <GradButton text='Find me my people' onPress={()=>this._findPeople()} />
          }
        </View>

          </Container>
    );
  }
}
