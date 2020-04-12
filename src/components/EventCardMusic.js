import React, { Component } from "react";
import {
  Dimensions,
  Text,
  Image,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedback
} from "react-native";
import { withNavigation } from "react-navigation";
import Fonts from "UIProps/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP
} from "react-native-responsive-screen";
const { height, width } = Dimensions.get("screen");
import LinearGradient from "react-native-linear-gradient";
import EventNotSetup from "./EventNotSetup";
import NavigationConsistor from "../Logicals/NavigationConsistor";

class EventCardMusic extends Component {

  renderItem = ({ item, index }) => {
    const {isOnHome} = this.props
    return (
      <TouchableWithoutFeedback onPress={() => !isOnHome && 
        this.props.navigation.navigate("MultipleView", {
          type: "Music",
          typeId: 1
        })
      }>

      <View
        style={{
          padding: 15,
          paddingVertical: 7,
          marginRight: 13,
          backgroundColor: "transparent",
          borderWidth: 2,
          borderRadius: 4,
          justifyContent: "center",
          borderColor: "#c8aecb",
        }}
      >
        <Text
          style={{
            color: "#781773",
            fontSize: 13,
            fontFamily: "Montserrat-Bold",
            alignSelf: "center"
          }}
        >
        {this.props.isOnHome ? item : item.sub_category_name}
        </Text>
      </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { obj, year,isOnHome } = this.props;

    let formatMonth = NavigationConsistor.formatMonth(obj.date)
    if([...Object.keys(obj)].length > 0){
      return (
        <>
        {!isOnHome && 
          <View
            style={{
              height: 50,
              width: width - 30,
              justifyContent: "center",
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                opacity: 1,
                fontSize: 16,
                fontFamily: "Montserrat-ExtraBold",
                color: "#000"
              }}
            >
              Music
            </Text>
          </View>
        }

          <TouchableWithoutFeedback
            onPress={() => !isOnHome &&
              this.props.navigation.navigate("MultipleView", {
                type: "Music",
                typeId: 1
              })
            }
            style={{
              width: "100%",
              alignSelf: "center",
              backgroundColor: "transparent"
            }}
          >

            <View
              style={{
                width: "100%",
                alignSelf: "center",
                flex:1,
              }}
            >
              <ImageBackground
                source={require("../assets/Images/@Group.png")}
                resizeMode="stretch"
                style={{
                  height: 'auto',
                  width: "100%",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
              <View>

                {!isOnHome && 
              <Image
                    source={require("../assets/Images/@3xedit-icon.png")}
                    style={{ height: 45, width: 45,right:'-3%',top:'-12%',position:'absolute' }}
                  />
                }
                  <View
                    style={{
                      width: "90%",
                      marginLeft:0,

                        borderRadius: 20,
                        marginTop:14,
                      backgroundColor: "transparent"
                    }}
                  >
                    <Text
                      style={{
                        color: "#d39dc5",
                        fontSize: 14,
                        fontWeight: "bold",
                        alignSelf: "flex-start",
                        width: "70%"
                      }}
                    >
                      Event:
                    </Text>


                    <Text
                    numberOfLines={1}
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontFamily:Fonts.heavy,
                      }}
                    >
                      {obj?.artist_or_event}
                      
                    </Text>
                </View>
                <View
                  style={{
                    height: 140,
                    width: "80%",
                    justifyContent: "space-evenly",
                    alignSelf: "center",
                    backgroundColor: "transparent",
                    borderRadius: 10
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "space-around",
                      alignSelf: "center",
                      backgroundColor: "transparent"
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        width: "85%",
                        marginTop:20,
                        alignSelf: "flex-start",
                        height: "20%"
                      }}
                    >
                      <View
                        style={{
                          width: width / 3.8,
                          backgroundColor: "transparent",
                          alignSelf: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: "#8c979e",
                            fontSize: 15,
                            fontFamily: "Montserrat-Bold",
                            alignSelf: "flex-start"
                          }}
                        >
                          Month
                        </Text>
                        <Text
                          style={{
                            color: "#343434",
                            fontSize: 12,
                            fontFamily: "Montserrat-Bold",
                            alignSelf: "flex-start"
                          }}
                        >
                          {formatMonth}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: width / 5,
                          backgroundColor: "transparent",
                          alignSelf: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: "#8c979e",
                            fontSize: 15,
                            fontFamily: "Montserrat-Bold",
                            alignSelf: "flex-start"
                          }}
                        >
                          Year
                        </Text>
                        <Text
                          style={{
                            color: "#343434",
                            fontSize: 12,
                            fontFamily: "Montserrat-Bold",
                            alignSelf: "flex-start"
                          }}
                        >
                          {NavigationConsistor._formatYear(obj.date)}
                        </Text>
                      </View>
                      <View style={{ width: width / 3.5, alignSelf: "center" }}>
                        <Text
                          style={{
                            color: "#8c979e",
                            fontSize: 15,
                            fontFamily: "Montserrat-Bold",
                            alignSelf: "flex-start"
                          }}
                        >
                          Location
                        </Text>
                        <Text
                        numberOfLines={1}
                          style={{
                            color: "#343434",
                            fontSize: 12,
                            fontFamily: "Montserrat-Bold",
                            alignSelf: "flex-start"
                          }}
                        >
                          {obj?.location}
                        </Text>
                      </View>
                    </View>
                    <View
                      onStartShouldSetResponder={() => true}
                      style={{
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        maxWidth:'100%',
                        overflow:'hidden'
                      }}
                    >
                      <FlatList

                        renderItem={this.renderItem}
                        data={obj.subCategory}
                        horizontal
                        nestedScrollEnabled
                        style={{flexDirection:'row'}}
                        keyExtractor={(item, index) => index}
                      />
                    </View>
                  </View>
                </View>
              </View>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
        </>
      );
    } else {
      return <EventNotSetup eventId='1' eventName="Music" />;
    }
  }
}

export default withNavigation(EventCardMusic);
