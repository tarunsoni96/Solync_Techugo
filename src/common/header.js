import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import HelperMethods from 'Helpers/Methods'

import TRAVEL from "../screens/Home/TRAVEL";
import MUSIC from "../screens/Home/MUSIC";
// import MUSIC from '../screens/Home/MUSICtest'
import SPORTS from "../screens/Home/SPORTS";
import PROFILE from "../screens/User/myProfile";
import { withNavigation } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import { NavigationEvents } from "react-navigation";
import MobxStore from "../StorageHelpers/MobxStore";
import { observer } from "mobx-react";
const { height, width } = Dimensions.get("screen");

@observer
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "MUSIC",
      type: "",
      title: "",
      name: "Tiffany",
      age: "26",
      profile: "Illustrator",
      profileToggled:false,
      switch1Value: false,
    };

    this.previousShow = 'MUSIC'

  }
  showDetails(param) {
    this.previousShow = param
    HelperMethods.animateLayout()
      this.setState({
        show: this.state.profileToggled ? this.previousShow : param,profileToggled:false
      },()=>{
      //  alert(this.state.show)
      });
  }

  componentDidMount() {
    HelperMethods.animateLayout()
    this.setState({ show: "MUSIC" });
  }

  onBack(){
    if(this.state.show == 'MUSIC'){
      HelperMethods.appExitPrompter()
      return
    }
    if(this.state.profileToggled){
      HelperMethods.animateLayout()
      this.setState({show:this.previousShow,profileToggled:false})
    } else {
      this.previousShow = 'MUSIC'
      this.setState({show:'MUSIC'})
    }
  }

  showProfile(){
    HelperMethods.animateLayout()
    if(this.state.profileToggled){ //toggled
      this.setState({show:this.previousShow,profileToggled:false})
    } else {
      this.setState({profileToggled:true,show:''})

    }
  }

  render() {
    
    
    return (

      <SafeAreaView style={{ flex: 1, }}>

<StatusBar backgroundColor="#eee" barStyle={'dark-content'} />
      
        <View style={{ height: "11%",marginBottom:10, position: "relative" }}>

          <View style={{
              height: "100%",
              width: 80,
              left: 0,
              top: 0,
              position: "absolute",
              justifyContent: "center"}}>

            {this.state.profileToggled ? (
              <TouchableOpacity
                onPress={() => this.showProfile("PROFILE")}
                style={{ height: 40, justifyContent: "center" }}>

                <Image source={require("../assets/Images/@3xprofile-active.png")} style={{ alignSelf: "center", height: 33, width: 33 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.showProfile("PROFILE")}
                style={{ height: 40, justifyContent: "center" }}
              >
                <Image
                  source={require("../assets/Images/@3xprofile.png")}
                  style={{ alignSelf: "center", height: 30, width: 30 }}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            )}
          </View>


          <View style={{
              height: "100%",
              width: 80,
              right: 0,
              top: 0,
              position: "absolute",
              justifyContent: "center"
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("chatScreen", {
                  
                });
              }}
              style={{ height: 40, justifyContent: "center" }}
            >
              <Image
                source={MobxStore.isAnyUnreadMsg ? require("../assets/Images/@3xmessages-unread.png") : require("../assets/Images/@3xmessages.png")}
                style={{ alignSelf: "center", height: 26, width: 30 }}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              height: "100%",
              backgroundColor: "#fff",
              
              width: width / 1.9,
              alignSelf: "center",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                height: "50%",
                width: this.state.profileToggled ? "80%" : '100%',
                paddingHorizontal:this.state.profileToggled ? 15 : 0,
                backgroundColor: "#ebf0f3",
                alignSelf: "center",
                borderRadius: 50,
                borderColor: "#DCDCDC",
                justifyContent: "space-between"
              }}
            >
              {this.state.show == "MUSIC" ? (
                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    height: "110%",
                    width: width / 3.8,
                    backgroundColor: "transparent",
                    borderRadius: 50,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                  onPress={() => this.showDetails("MUSIC")}
                >
                  <ImageBackground
                    source={require("../assets/Images/@tab-active.png")}
                    resizeMode={"stretch"}
                    style={{
                      borderRadius: 30,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      alignSelf: "center",
                      height: "110%",
                      width: "110%",
                      bottom: 2,
                      right: 3
                    }}
                  >
                    <Image
                      source={require("../assets/Images/@3xmusic-active.png")}
                      style={{
                        alignSelf: "center",
                        height: 18,
                        width: 18,
                        top: 3,
                        left: 15
                      }}
                      resizeMode={"contain"}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        alignSelf: "center",
                        fontSize: 16,
                        top: 2,
                        left: 5,
                        fontFamily: "Montserrat-SemiBold",
                        width: 70
                      }}
                    >
                      Music
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ alignSelf: "center", padding: 10 }}
                  onPress={() => this.showDetails("MUSIC")}
                >
                  <Image
                    source={require("../assets/Images/music.png")}
                    style={{ alignSelf: "center", height: 18, width: 18 }}
                    resizeMode={"center"}
                  />
                </TouchableOpacity>
              )}

              {this.state.show == "SPORTS" ? (
                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    height: "110%",
                    width: width / 3.8,
                    backgroundColor: "transparent",
                    borderRadius: 50,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    right: 8
                  }}
                  onPress={() => this.showDetails("SPORTS")}
                >
                  <ImageBackground
                    source={require("../assets/Images/@tab-active.png")}
                    resizeMode={"stretch"}
                    style={{
                      borderRadius: 30,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      alignSelf: "center",
                      height: "110%",
                      width: "110%",
                      bottom: 2
                    }}
                  >
                    <Image
                      source={require("../assets/Images/@3xsport-active.png")}
                      style={{
                        alignSelf: "center",
                        height: 18,
                        width: 18,
                        top: 2,
                        left: 15
                      }}
                      resizeMode={"contain"}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        alignSelf: "center",
                        fontSize: 16,
                        top: 2,
                        left: 5,
                        fontFamily: "Montserrat-SemiBold",
                        width: 60
                      }}
                    >
                      Sport
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ alignSelf: "center", padding: 10 }}
                  onPress={() => this.showDetails("SPORTS")}
                >
                  <Image
                    source={require("../assets/Images/@3xsport-inactive.png")}
                    style={{ height: 18, width: 18, right: 1 }}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              )}

              {this.state.show == "TRAVEL" ? (
                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    height: "110%",
                    width: width / 3.8,
                    backgroundColor: "transparent",
                    borderRadius: 50,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                  onPress={() => this.showDetails("TRAVEL")}
                >
                  <ImageBackground
                    source={require("../assets/Images/@tab-active.png")}
                    resizeMode={"stretch"}
                    style={{
                      borderRadius: 30,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      alignSelf: "center",
                      height: "110%",
                      width: "110%",
                      bottom: 2,
                      right: 5
                    }}
                  >
                    <Image
                      source={require("../assets/Images/travelActive3.png")}
                      style={{
                        alignSelf: "center",
                        height: 18,
                        width: 18,
                        justifyContent: "center",
                        top: 2,
                        left: 12
                      }}
                      resizeMethod={"scale"}
                      resizeMode={"contain"}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        alignSelf: "center",
                        fontSize: 16,
                        top: 2,
                        left: 6,
                        fontFamily: "Montserrat-SemiBold",
                        width: 60
                      }}
                    >
                      Travel
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    alignSelf: "center",
                    padding: 10,
                    justifyContent: "center"
                  }}
                  onPress={() => this.showDetails("TRAVEL")}
                >
                  <Image
                    source={require("../assets/Images/travel-active.png")}
                    style={{
                      alignSelf: "center",
                      right: 5,
                      height: 18,
                      width: 18
                    }}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

          {this.state.profileToggled ? 
          <PROFILE />
          :

        <MUSIC show={this.state.show} />
          }


        {/* {this.state.show == "TRAVEL" ? (
          <TRAVEL />
        ) : this.state.show == "SPORTS" ? (
          <SPORTS />
        ) : this.state.show == "MUSIC" ? (
          <MUSIC show={this.state.show} />
        ) : this.state.profileToggled ? (
          <PROFILE />
        ) : null} */}

        <BackHandlerSingleton  onBackPress={()=>this.onBack()} />              
      </SafeAreaView>
    );
  }
}

export default withNavigation(Header);
