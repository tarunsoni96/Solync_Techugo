// // /* *****************BLOCKED USER************ */
import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  Modal,
  ImageBackground,
  BackHandler,
  AsyncStorage
} from "react-native";
import {Colors} from "UIProps/Colors";

import LinearGradient from "react-native-linear-gradient";
import Header from "../../common/headerCommon";
import CardView from "react-native-cardview";
import LoadWheel from "../../common/spinner";
import HelperMethods from "../../Helpers/Methods";
import { withNavigation } from "react-navigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';

import Container from "../../AppLevelComponents/UI/Container";
import ScreenHeader from "../../components/ScreenHeader";
import Loader from "../../AppLevelComponents/UI/Loader";
import MobxStore from "../../StorageHelpers/MobxStore";
const { height, width } = Dimensions.get("screen");
class BlockedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
      asdf: [],
      isLoading: false,
      completingProf:false,
      userId: ""
    };
  }
  componentDidMount() {
    let { params } = this.props.navigation.state;
    console.log(JSON.stringify(params?.typeId));
    AsyncStorage.getItem("userId", (err, result) => {
      userData = JSON.parse(result);
      console.log("USER ID CONSOLE EVENT LIST", userData);
      this.setState({
        userId: userData
      });
    });
    this.setState({
      isLoading: true
    });
    fetch("http://13.232.62.239:6565/api/user/getEvents", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category_id: params?.typeId,
        sub_ids: params?.dataSubName,
        location: params?.loc.trim(),
        date: params?.date == undefined ? "" : params?.date,
        artistEvent: params?.artistEvent == undefined ? "" : params?.artistEvent,
        lat: params?.lat,
        lng: params?.lng
      })
    })
      .then(response => response.json())

      .then(responseJson => {
        let arrData = [];
        this.setState({
          isLoading: false
        });
        if (responseJson.statusCode == 200) {
          for (i = 0; i <= responseJson.result.length - 1; i++) {
            var data1 = responseJson.result[i];
            arrData.push(data1);
          }
          this.setState({
            data: arrData
          });
        } else {
          HelperMethods.snackbar("No events found");
          this.props.navigation.pop();
        }
        return responseJson;
      })
      .catch(error => {
        console.log(error);
      });
  }

  _CompleteProfile(title, locationRegion, locationCountry, formatDate,cats) {
    this.setState({completingProf:true})
    if(!this.state.completingProf){

    let { params } = this.props.navigation.state;
    
    let obj ={
      category_id: params?.typeId,
      subcategories_ids: cats.subcategories_ids,
      subcategory:params?.data.toString(),
      artist_or_event: title.trim(),
      location: locationRegion + "," + locationCountry,
      date: formatDate == "" ? "" : formatDate,
      user_id: MobxStore.userObj.user_id,
      lat: params?.lat,
      lng: params?.lng
    }

    fetch("http://13.232.62.239:6565/api/user/completeProfile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())

      .then(responseJson => {
        this.setState({completingProf:false})
        if (responseJson.statusCode == 200) {
          MobxStore.isFilterChanged(params?.type)
          this.props.navigation.pop(4)
        } else if (responseJson.statusCode == 201) {
          this.props.navigation.navigate("UploadPhoto", {
            userId: params?.userId
          });
        } else {
          alert("Something went wrong.");
        }
        return responseJson;
      })
      .catch(error => {alert(error)});

    } 

  }
  _formatDate(date,startTime) {
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
      if(startTime){
       if(startTime.indexOf(monthNames[monthIndex]) > -1 && startTime.indexOf(day) > -1){
        return  `, ${year}`
      } else if(startTime.indexOf(monthNames[monthIndex]) > -1){
        return  ` - ${day}, ${year}`
      } 
      } else {
        return  `${monthNames[monthIndex]} ${day}`
      }
  }
  renderItemList(item, index) {
    let { params } = this.props.navigation.state;
    var str = item.item.start_time.split(" ")[0];
    var strEndTime = item.item.stop_time.split(" ")[0];
    var formatDate = this._formatDate(str);
    var formatDateEndTime = this._formatDate(strEndTime,formatDate);
    return (
      <TouchableOpacity
        onPress={() =>
          this._CompleteProfile(
            item.item.title,
            item.item.region_name,
            item.item.country_abbr,
            formatDate,
            item.item
          )
        }
        style={{
          width: "100%",
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "transparent"
        }}
      >
        <ImageBackground
          source={require("../../assets/Images/@Group.png")}
          resizeMode="stretch"
          style={{
            height: hp(height < 600 ? "38%" : '28%'),
            width: "97%",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            left: 6
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: "40%",
              width: "85%",
              alignSelf: "center",
              backgroundColor: "transparent",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                height: "50%",
                width: "100%",
                justifyContent: "center",
                alignSelf: "center",
                backgroundColor: "transparent"
              }}
            >
              <Text
                style={{
                  color: "#d39dc5",
                  fontSize: 13,
                  fontWeight: "bold",
                  alignSelf: "flex-start"
                }}
              >
                Event:
              </Text>
              <Text style={{ width: "auto", backgroundColor: "transparent" }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: "bold",
                    backgroundColor: "transparent",
                    width: "auto"
                  }}
                >
                  {item.item.title}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              height: "60%",
              width: "80%",
              justifyContent: "center",
              alignSelf: "flex-start",
              backgroundColor: "transparent"
            }}
          >
            <View
              style={{
                height: "80%",
                width: "75%",
                justifyContent: "space-between",
                alignSelf: "center",
                backgroundColor: "transparent"
              }}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "85%",
                  alignSelf: "flex-start",
                  backgroundColor: "transparent"
                }}
              >
                <View
                  style={{
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignSelf: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "#8c979e",
                      fontSize: 13,
                      fontFamily: "Montserrat-Bold",
                      alignSelf: "flex-start"
                    }}
                  >
                    Date/s
                  </Text>
                  <Text
                    style={{
                      color: "#343434",
                      fontSize: 13,
                      fontFamily: "Montserrat-Bold",
                      alignSelf: "flex-start"
                    }}
                  >
                    {formatDate}{formatDateEndTime}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: "85%",
                  alignSelf: "flex-start",
                  backgroundColor: "transparent"
                }}
              >
                <View
                  style={{
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignSelf: "center",
                    marginTop:height < 600 ? 10 : 0
                  }}
                >
                  <Text
                    style={{
                      color: "#8c979e",
                      fontSize: 13,
                      fontFamily: "Montserrat-Bold",
                      alignSelf: "flex-start"
                    }}
                  >
                    Location
                  </Text>
                  {item.item.venue_address == "" ||
                  item.item.venue_address == null ||
                  item.item.venue_address == undefined ? (
                    <Text
                      style={{
                        color: "#343434",
                        fontSize: 13,
                        fontFamily: "Montserrat-Bold",
                        alignSelf: "flex-start"
                      }}
                    >
                      {params?.loc}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#343434",
                        fontSize: 13,
                        fontFamily: "Montserrat-Bold",
                        alignSelf: "flex-start"
                      }}
                    >
                      {item.item.venue_address}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View style={{ height: 20, width: width }}></View>
      </TouchableOpacity>
    );
  }

  render() {
    let { params } = this.props.navigation.state;
    return (
      <Container>
      <ScreenHeader title={params?.loc} isCenter />
      {this.state.isLoading ? 
        <Loader style={{alignSelf:'center',marginTop:heightPercentageToDP(38)}} />

      :
        <FlatList
        initialNumToRender={20}
          data={this.state.data}
          renderItem={(item, index) => this.renderItemList(item, index)}
          keyExtractor={(item,index) => index}
          style={{ marginTop: 10 }}
        />
      }

      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.completingProf}
        onRequestClose={() => {
          alert('Loading..')
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:'rgba(255,255,255,0.6)' }}
        >

        <Loader color={Colors.accent} size='large' /> 

        </View>
        </Modal>
      </Container>

    );
  }
}

export default withNavigation(BlockedUser);
