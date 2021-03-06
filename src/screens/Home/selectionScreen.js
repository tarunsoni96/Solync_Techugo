import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  BackHandler
} from "react-native";
import Loader from 'AppLevelComponents/UI/Loader'
import {Colors} from "UIProps/Colors";
import {cancelSignup as cancelSignupApi} from 'ServiceProviders/ApiCaller'
import HelperMethods from 'Helpers/Methods'
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import Constants from 'Helpers/Constants'
import ScreenMemory from "../../AppLevelComponents/UI/ScreenMemory";
import MobxStore from "../../StorageHelpers/MobxStore";
const { height, width } = Dimensions.get("screen");
export default class BlockedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "MUSIC",
          img: require("../../assets/Images/@music_bg.png"),
          type: "Music",
          id: "1"
        },
        {
          key: "SPORT",
          img: require("../../assets/Images/@sport_bg.png"),
          type: "Sports",
          id: "2"
        },
        {
          key: "TRAVEL",
          img: require("../../assets/Images/@travel_bg.png"),
          type: "Travel",
          id: "3"
        }
      ],
      modalVisible: false
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

  renderItemList(item, index) {
    return (
      <View>
          <TouchableOpacity
            onPress={() =>
              {!this.state.isApiCall ? this.props.navigation.navigate("MultipleView", {
                type: item.item.type,
                typeId: item.item.id
              }): alert("Cannot perform that action while signup is being canceled")}
            }
          >
            <ImageBackground
              source={item.item.img}
              imageStyle={{ borderRadius: 10 }}
              style={{
                flexDirection: "row",
                height: height * 0.2,
                width: width - 30,
                justifyContent: "center",
                alignSelf: "center",
                marginBottom: 20
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  textAlign: "left",
                  alignSelf: "center",
                  color: "#fff",
                  fontFamily: "Montserrat-ExtraBold"
                }}
              >
                {item.item.key}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
      </View>
    );
  }


  cancelSignup(){
    HelperMethods.animateLayout()
     this.setState({isApiCall:true})
     cancelSignupApi(MobxStore.userObj.email).then(resp => {
       if(resp.statusCode == 200){
         HelperMethods.snackbar('Signup canceled, You may register again with your email id')
         HelperMethods.logout(this.props.navigation)
        }
      }).catch(err => {
        HelperMethods.snackbar('Some problem occured while canceling, Please retry')
          this.setState({isApiCall:false})
        })
  }

  render() {
    return (
      <ScreenMemory screen='SelectionScreen' >

      <SafeAreaView style={{ flex: 1 }}>

        {this.state.isApiCall ? 
          <Loader size='small' style={{alignSelf:'flex-start',margin:20,marginLeft:30,}} />
        :
        <Text
            style={{
              fontSize: 16,
              fontFamily: "Montserrat-ExtraBold",
              margin:20,
              color:'red',
              marginBottom:0,
            }}
            onPress={()=>this.cancelSignup()}
          >
            Cancel Signup
          </Text>
        }

        <View
          style={{
            marginBottom:40,
            width: width - 70,
            alignSelf: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 23,
              textAlign: "left",
              fontFamily: "Montserrat-ExtraBold",
              marginTop:20,
            }}
          >
            What would you like to discover first?
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "left",
              color: "#a6afb4",
              marginTop: "3%",
              fontStyle: "italic"
            }}
          >
            You can also search for other interests at any time, you aren't
            restricted to one category.
          </Text>
        </View>

        <FlatList
          data={this.state.data}
          renderItem={(item, index) => this.renderItemList(item, index)}
          extraData={this.state}
        />
      </SafeAreaView>
      </ScreenMemory>

    );
  }
}
