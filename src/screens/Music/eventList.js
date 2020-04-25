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
import EventCardMusic from "../../components/EventCardMusic";
import { NavigationActions, StackActions } from 'react-navigation';
 
const { height, width } = Dimensions.get("screen");

let params = {}
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
     params = this.props.navigation.state.params
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
        location: params?.loc?.trim(),
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
          if(resp.statusCode == 201){
            this.props.navigation.navigate("NoConcert", {
              type:params?.type,
              loc:params?.loc,
              data:params?.data,
              selectedCats: params?.selectedCats,
              lat:params?.lat,
              lng:params?.lng,
              userId:params?.userId,
              date:params?.date,
              dataSubName:params?.dataSubName,
              typeId:params?.typeId,
      
              });
              return
          }
          // HelperMethods.snackbar("No events found");
          // this.props.navigation.pop();
        }
        return responseJson;
      })
      .catch(error => {
        console.log(error);
      });
  }

  
  _CompleteProfile(title, locationRegion, locationCountry, formatDate,cats) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });

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
          MobxStore.specificCat = ''
          MobxStore.isFilterChanged(params?.type)
          this.props.navigation.dispatch(resetAction)
               
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
        
        style={{
          width: "100%",
          marginBottom:20,
          
        }}
      >

        <EventCardMusic
        onPress={() =>
          this._CompleteProfile(
            item.item.title,
            item.item.region_name,
            item.item.country_abbr,
            formatDate,
            item.item
          )
        }
        
         obj={item.item} location={params?.loc} dates={`${formatDate}${formatDateEndTime || ''}`} isEventList={true} isOnHome={true} type={params?.type} />
      </TouchableOpacity>
    );
  }

  render() {
    let { params } = this.props.navigation.state;
    return (
      <Container turnOffScroll={true}>
      <ScreenHeader title={params?.loc} isCenter />
      {this.state.isLoading ? 
        <Loader style={{alignSelf:'center',marginTop:heightPercentageToDP(38)}} />

      :
        <FlatList
        initialNumToRender={20}
          data={this.state.data}
          nestedScrollEnabled
          style={{width:'100%',marginTop:30}}
          renderItem={(item, index) => this.renderItemList(item, index)}
          keyExtractor={(item,index) => index}
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
