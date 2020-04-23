import React, { Component } from "react";
import {
  Dimensions,
  Text,
  Image,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { withNavigation } from "react-navigation";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {Colors} from "UIProps/Colors";
const { height, width } = Dimensions.get("screen");
import Fonts from "UIProps/Fonts";
import LinearGradient from "react-native-linear-gradient";
import EventNotSetup from "./EventNotSetup";
import NavigationConsistor from "../Logicals/NavigationConsistor";

class EventCardTravel extends Component {
  renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          !this.props.isOnHome &&
          this.props.navigation.navigate("MultipleView", {
            type: "Travel",
            typeId: 3,
          })
        }
      >
        <View
          style={{
            padding: 15,
            paddingVertical: 7,
            marginRight: 13,
            backgroundColor: "transparent",
            borderWidth: 2,
            borderRadius: 4,
            justifyContent: "center",
            borderColor:'#AFC2D5' ,
          }}
        >
          <Text
            style={{
              color: Colors.colorTravel,
              fontSize: 13,
              fontFamily: "Montserrat-Bold",
              alignSelf: "center",
            }}
          >
            {this.props.isOnHome ? item : item.sub_category_name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const { obj, year, isOnHome } = this.props;

    if ([...Object.keys(obj)].length > 0) {
      return (
        <>
          {!isOnHome && (
            <View
              style={{
                height: 50,
                width: width - 30,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  opacity: 1,
                  fontSize: 16,
                  fontFamily: "Montserrat-ExtraBold",
                  color: "#000",
                }}
              >
                Travel
              </Text>
            </View>
          )}
          <TouchableWithoutFeedback
            onPress={() =>
              !isOnHome &&
              this.props.navigation.navigate("MultipleView", {
                type: "Travel",
                typeId: 3,
              })
            }
          >
            <View style={{ flex: 1 }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#3880b1", "#2a4686"]}
                style={{
                  flexDirection: "row",
                  height: 80,
                  width: width - 30,
                  alignSelf: "center",
                  backgroundColor: "#950c6f",
                  borderRadius: 10,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: width - 55,
                    justifyContent: "center",
                    alignSelf: "center",
                    borderRadius: 20,
                    backgroundColor: "transparent",
                  }}
                >
                  <Text
                    style={{
                      color: "#ACC6DB",
                      fontSize: 14,
                      fontWeight: "bold",
                      alignSelf: "flex-start",
                      width: "70%",
                    }}
                  >
                    Location:
                  </Text>
                  <Text
                  numberOfLines={1}
            
                    style={{ color: "#fff", fontSize: 18,fontFamily: "Montserrat-Bold", }}
                  >
                    {obj?.location}, {obj?.artist_or_event}
                  </Text>
                </View>
              </LinearGradient>
              <View
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45 / 2,
                  position: "absolute",
                  right: 30,
                  top: -20,
                }}
                onPress={() => alert("dds")}
              >
                {!isOnHome && (
                  <Image
                    source={require("../assets/Images/@3xedit-icon.png")}
                    style={{ height: 45, width: 45 }}
                  />
                )}
              </View>
              <View
                style={{
                  height: 140,
                  width: width - 30,
                  justifyContent: "space-evenly",
                  alignSelf: "center",
                  backgroundColor: "#ebf0f3",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: width - 55,
                    justifyContent: "space-evenly",
                    alignSelf: "center",
                    borderRadius: 20,
                    backgroundColor: "transparent",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      width: width - 55,
                      alignSelf: "center",
                      backgroundColor: "transparent",
                    }}
                  >
                    <View
                      style={{
                        width: width / 3.3,
                        backgroundColor: "transparent",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#8c979e",
                          fontSize: 13,
                          fontFamily: "Montserrat-Bold",
                          alignSelf: "flex-start",
                        }}
                      >
                        Month
                      </Text>
                      <Text
                        style={{
                          color: "#343434",
                          fontSize: 13,
                          fontFamily: "Montserrat-Bold",
                          alignSelf: "flex-start",
                        }}
                      >
                        {obj.months}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: width / 3.5,
                        backgroundColor: "transparent",
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#8c979e",
                          fontSize: 13,
                          fontFamily: "Montserrat-Bold",
                          alignSelf: "flex-start",
                        }}
                      >
                        Year
                      </Text>
                      <Text
                        style={{
                          color: "#343434",
                          fontSize: 13,
                          fontFamily: "Montserrat-Bold",
                          alignSelf: "flex-start",
                        }}>
                        {obj.year}
                      </Text>
                    </View>
                  </View>

                  <View
                    onStartShouldSetResponder={() => true}
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      maxWidth: "100%",
                      overflow: "hidden",
                      bottom: 10}}>
                      
                    <FlatList
                      renderItem={this.renderItem}
                      data={obj.subCategory}
                      horizontal
                      style={{ flexDirection: "row" }}
                      nestedScrollEnabled
                      keyExtractor={(item, index) => index}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </>

        //   <>
        //   <View style={{ height: 10, width: width, backgroundColor: '#fff' }}></View>
        //   <View style={{ height: 50, width: width - 30, justifyContent: 'center', alignSelf: 'center' }}>
        //     <Text style={{ opacity: 1, fontSize: 16, fontFamily: 'Montserrat-ExtraBold', color: '#000' }}>Travel</Text>
        //   </View>
        //   <TouchableOpacity onPress={() => this.props.navigation.navigate('MultipleView', { type: 'Travel',typeId:3 })}>
        //   <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#3880b1', '#2a4686']} style={{ flexDirection: 'row', height: 80, width: width - 30, alignSelf: 'center', backgroundColor: '#950c6f', borderRadius: 10, justifyContent: 'center' }}>
        //     <View style={{ height: '100%', width: width - 55, justifyContent: 'center', alignSelf: 'center', borderRadius: 20, backgroundColor: 'transparent' }}>
        //       <Text style={{ color: '#5c92bc', fontSize: 14, fontWeight: 'bold', alignSelf: 'flex-start', width: '70%' }}>Location:</Text>
        //       <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{obj?.location}</Text>
        //     </View>
        //   </LinearGradient>
        //   <View style={{ height: 45, width: 45, borderRadius: 45 / 2, position: 'absolute', right: 30, top: -20 }}
        //     onPress={() => alert('dds')}>
        //       <Image source={require('../assets/Images/@3xedit-icon.png')} style={{ height: 45, width: 45}} />
        //   </View>
        //   <View style={{ height: 140, width: width - 30, justifyContent: 'space-evenly', alignSelf: 'center', backgroundColor: '#ebf0f3', borderRadius: 10 }}>
        //     <View style={{ height: '100%', width: width - 55, justifyContent: 'space-evenly', alignSelf: 'center', borderRadius: 20, backgroundColor: 'transparent' }}>
        //       <View style={{ justifyContent: 'flex-start', flexDirection: 'row', width: width - 55, alignSelf: 'center', backgroundColor: 'transparent' }}>

        //         <View style={{ width: width / 3.3, backgroundColor: 'transparent', justifyContent: 'center', alignSelf: 'center' }}>
        //           <Text style={{ color: '#8c979e', fontSize: 13, fontFamily: 'Montserrat-Bold', alignSelf: 'flex-start' }}>Month</Text>
        //           <Text style={{ color: '#343434', fontSize: 13, fontFamily: 'Montserrat-Bold', alignSelf: 'flex-start' }}>Jan-Mar</Text>
        //         </View>
        //         <View style={{ width: width / 3.5, backgroundColor: 'transparent', alignSelf: 'center' }}>
        //           <Text style={{ color: '#8c979e', fontSize: 13, fontFamily: 'Montserrat-Bold', alignSelf: 'flex-start' }}>Year</Text>
        //           <Text style={{ color: '#343434', fontSize: 13, fontFamily: 'Montserrat-Bold', alignSelf: 'flex-start' }}>{year}</Text>
        //         </View>

        //       </View>
        //       <View style={{ justifyContent: 'flex-start', flexDirection: 'row', width: width - 55, alignSelf: 'center', backgroundColor: 'transparent' }}>

        //         <View style={{ width: width / 4, height: 25, backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center' }}>
        //           <View style={{ height: '100%', width: '70%', backgroundColor: 'transparent', borderColor: '#3980b2', borderWidth: 2, borderRadius: 4 }}>
        //             <Text style={{ color: '#283c7e', fontSize: 13, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}>Beach</Text>
        //           </View>
        //         </View>

        //         <View style={{ width: width / 4, height: 25, backgroundColor: 'transparent', alignSelf: 'center' }}>
        //           <View style={{ height: '100%', width: '70%', backgroundColor: 'transparent', borderColor: '#3980b2', borderWidth: 2, borderRadius: 4 }}>
        //             <Text style={{ color: '#283c7e', fontSize: 13, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}>Hills</Text>
        //           </View>
        //         </View>

        //       </View>
        //     </View>
        //   </View>
        //   <View style={{ height: 10, width: width, backgroundColor: 'transparent' }}></View>
        // </TouchableOpacity>
        // </>
      );
    } else {
      return <EventNotSetup eventId="3" eventName="Travel" />;
    }
  }
}

export default withNavigation(EventCardTravel);
