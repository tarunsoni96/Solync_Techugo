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
  TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HelperMethods from 'Helpers/Methods'
import { withNavigation, ScrollView } from "react-navigation";
import Fonts from "UIProps/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { Colors } from "UIProps/Colors";
const { height, width } = Dimensions.get("screen");
import LinearGradient from "react-native-linear-gradient";
import CustomText from 'AppLevelComponents/UI/CustomText'
import EventNotSetup from "./EventNotSetup";
import NavigationConsistor from "../Logicals/NavigationConsistor";
import MobxStore from "../StorageHelpers/MobxStore";

class EventCardMusic extends Component {
  state = {
    eventLinesLength: 0,
  };

  constructor(props){
    super(props)
    this.tintColor = ''
  }

  componentWillMount(){
    this.tintColor = ''
    const { type, obj, year, isOnHome,style } = this.props;
    switch (type) {
      case "Music":
        this.tintColor = Colors.colorMusic
        break;

        case 'Sports':
        this.tintColor = Colors.colorSports
          break

          case 'Travel':
        this.tintColor = Colors.colorTravel
            break
    }
      
  }
  hexToRgbA(hex) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return (
        "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.4)"
      );
    }
    throw new Error("Bad Hex");
  }

  renderItem = ({ item, index }) => {
    const { isOnHome } = this.props;
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          !isOnHome &&
          this.props.navigation.navigate("MultipleView", {
            type: "Music",
            typeId: 1,
          })
        }
      >
            
      <View style={{}}>

        <View
          style={{
            padding: 15,
            marginBottom:10,
            paddingVertical: 7,
            marginRight: 13,
            backgroundColor: "transparent",
            borderWidth: 2,
            borderRadius: 4,
            justifyContent: "center",
            borderColor: this.hexToRgbA(this.tintColor),
          }}
        >
          <Text
            style={{
              color: this.tintColor,
              fontSize: 13,
              fontFamily: "Montserrat-Bold",
              alignSelf: "center",
            }}
          >
            {this.props.isOnHome ? item : item.sub_category_name}
          </Text>
        </View>
      </View>

      </TouchableWithoutFeedback>
    );
  };

  toggleLines(){
    HelperMethods.animateLayout()
    this.setState({showFullLength:!this.state.showFullLength})
  }
  render() {
    const { type, obj,onPress, location,dates, isEventList,isOnHome,style } = this.props;
    let title = "";
    let subTitle = obj?.artist_or_event || obj?.title;
    let bgImage = require("../assets/Images/@2xmusic_Ticket_BG.png");
    let dateText='Month'
    let typeId = 1
    switch (type) {
      case "Music":
        title = "Event:";
        break;

      case "Sports":
        subTitle = obj?.location || obj?.title;
        typeId = 2
        dateText = 'Date'
        title = "Location:";
        bgImage = require("../assets/Images/@2xsport_ticket_bg.png");
        break;

      case "Travel":
        typeId = 3
        subTitle =  `${obj?.location}, ${obj?.artist_or_event}`
        title = "Location:";
        bgImage = require("../assets/Images/@2xsport_ticket_bg.png");
        
        break;
    }

    let formatMonth = type =='Travel' ? obj.months :  NavigationConsistor.formatMonth(obj.date)

    if([...Object.keys(obj)].length > 0){
      
    return (
      
      <TouchableWithoutFeedback
            onPress={() => onPress ? onPress() : !isOnHome &&
              this.props.navigation.navigate("MultipleView", {
                type,
                typeId
              })
            }
            style={{
              width: "100%",
              alignSelf: "center",
              backgroundColor: "transparent"
            }}
          >
      <View style={{ width: "100%", alignItems: "center",...style }}>
      <TouchableWithoutFeedback
            onPress={() => onPress ? onPress() : !isOnHome &&
              this.props.navigation.navigate("MultipleView", {
                type,
                typeId
              })
            }
            style={{
              width: "100%",
              alignSelf: "center",
              backgroundColor: "transparent"
            }}
          >
        <LinearGradient
        onStartShouldSetResponder={()=>true}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#3880b1", "#2a4686"]}
          style={{
            width: "90%",
            borderRadius: 10,
          }}
        >
               

          <ImageBackground
          onStartShouldSetResponder={()=>true}
            source={type =='Travel' ? null  :bgImage}
            imageStyle={{ borderRadius: 10 }}
            style={{
              zIndex: 0,
              padding:height < MobxStore.heightToScaleSmall ? 10 : 15,
              
            }}
          >
            <ScrollView   nestedScrollEnabled>
              <Text
                style={{
                  color: "#fff",
                  opacity:0.8,
                  fontSize: 14,
                  fontWeight: "bold",
                  
                }}
              >
                {title}
              </Text>


              <Text
              onPress={()=>this.toggleLines()}
              numberOfLines={this.state.showFullLength  ? undefined : 2}
              onTextLayout={({ nativeEvent: { lines } }) => {
                      this.setState({eventLinesLength:lines.length})
                      }}
                style={{
                  color: "#fff",
                  // fontSize:  wp(this.state.eventLinesLength > 2 ? 3 : 4),
                  fontFamily: "Montserrat-Bold",
                }}
              >
                {subTitle}
              </Text>
              {this.state.eventLinesLength > 2 && 
                <CustomText text={this.state.showFullLength ? 'Hide' : 'See more'} onPress={()=>this.toggleLines()} />
              }

            </ScrollView>

            <View
              style={{
                width: "100%",
                alignSelf: "center",
                position: "absolute",
                borderStyle: "dotted",
                borderWidth: 3.5,
                borderRadius:0.1,
                borderColor: "#fff",
                zIndex: 100,
                bottom: -5,
                flexDirection: "row",
                alignItems: "center",
              }}
            />
          </ImageBackground>
           

        </LinearGradient>
        </TouchableWithoutFeedback>

        {!isOnHome && 
          <Image
                    source={require("../assets/Images/@3xedit-icon.png")}
                    style={{ height: 45, width: 45,right:'2%',top:'-10%',zIndex:1000,position:'absolute' }}
                  />
            }

        <View
          style={{
            // flex:1,
            backgroundColor: "#EBF0F3",
            zIndex: 0,
            borderRadius: 15,
            padding: 10,
            paddingHorizontal:20,
            width: "90%",
            maxWidth:'90%',
            alignSelf: "center",
            justifyContent:'space-between'
          }}
        >

        <View style={{overflow:'hidden',}}>

          {isEventList ?
          <>
            <View>
            <CustomText style={{fontSize:wp(4)}} text={'Date/s'} color='#859198' />
          <CustomText style={{fontSize:wp(4)}} text={dates} color='#000' />

            </View>

            <View style={{marginTop:20}}>
            <CustomText style={{fontSize:wp(4)}} text={'Location'} color='#859198' />
          <CustomText style={{fontSize:wp(4)}} text={location} color='#000' />


            </View>
</>

          :

          <View style={[styles.rowContainer,]}>
        <View>
          <CustomText style={{fontSize:wp(4)}} text={dateText} color='#859198' />
          <CustomText style={{fontSize:wp(3.5)}} text={formatMonth} color='#000' />
        </View>

        <View>
          <CustomText style={{fontSize:wp(4)}} text='Year' color='#859198' />
          <CustomText style={{fontSize:wp(3.5)}} text={type == 'Travel' ? obj.year  : NavigationConsistor._formatYear(obj?.date)} color='#000' />
        </View>

        {type != 'Travel'  ?

        
        <View style={{maxWidth:height < MobxStore.heightToScaleSmall ? 100 : 150}}>
          <CustomText style={{fontSize:wp(4)}} text='Location' color='#859198' />
          <CustomText style={{fontSize:wp(3.5)}} text={obj?.location}   color='#000' />
        </View>
        :

        <View style={{flex:0.5}} />

        }

        </View>

          }

                    
         
        </View>

          <View style={{maxHeight:100}}>

        <FlatList
            renderItem={this.renderItem}
            data={obj.subCategory}
            nestedScrollEnabled
            contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}} 
            keyExtractor={(item, index) => index}
          />
          </View>

          <View
            style={[
              styles.circle,
              {
                top: heightPercentageToDP(-1.5),
                left: widthPercentageToDP(-2.5),
                zIndex: 100,
              },
            ]}
          />
          <View
            style={[
              styles.circle,
              {
                top: heightPercentageToDP(-1.5),
                right: widthPercentageToDP(-2.5),
                zIndex: 100,
              },
            ]}
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
          } else {
            return (
              <EventNotSetup eventId={typeId} eventName={type} />
            )
          }
    // let formatMonth = NavigationConsistor.formatMonth(obj.date)
    // if([...Object.keys(obj)].length > 0){
    //   return (
    //     <>
    //     {!isOnHome &&
    //       <View
    //         style={{
    //           height: 50,
    //           width: width - 30,
    //           justifyContent: "center",
    //           alignSelf: "center"
    //         }}
    //       >
    //         <Text
    //           style={{
    //             opacity: 1,
    //             fontSize: 16,
    //             fontFamily: "Montserrat-ExtraBold",
    //             color: "#000"
    //           }}
    //         >
    //           Music
    //         </Text>
    //       </View>
    //     }

    //       <TouchableWithoutFeedback
    //         onPress={() => !isOnHome &&
    //           this.props.navigation.navigate("MultipleView", {
    //             type: "Music",
    //             typeId: 1
    //           })
    //         }
    //         style={{
    //           width: "100%",
    //           alignSelf: "center",
    //           backgroundColor: "transparent"
    //         }}
    //       >

    //         <View
    //           style={{
    //             width: "100%",
    //             alignSelf: "center",
    //             // flex:1,
    //           }}
    //         >
    //           <ImageBackground
    //             source={require("../assets/Images/@Group.png")}
    //             resizeMode="stretch"
    //             style={{
    //               // flex:0.9,
    //               width:'100%',
    //               alignSelf: "center",
    //               justifyContent: "center",
    //               alignItems: "center"
    //             }}

    //           >

    //           <View style={{paddingBottom:height < 600 ? 0 : 0,}}>

    //             {!isOnHome &&
    //           <Image
    //                 source={require("../assets/Images/@3xedit-icon.png")}
    //                 style={{ height: 45, width: 45,right:'-3%',top:'-12%',position:'absolute' }}
    //               />
    //             }

    //               <View
    //                 style={{
    //                   width: "90%",
    //                   marginLeft:0,
    //                   marginTop:height < 600 ? 24 - (this.state.eventLinesLength*1.4 + 5) : 15,
    //                   paddingHorizontal:5,
    //                   borderRadius: 20,
    //                   backgroundColor: "transparent"
    //                 }}
    //               >
    //                 <Text
    //                   style={{
    //                     color: "#d39dc5",
    //                     fontSize: 14,
    //                     fontWeight: "bold",
    //                     width: "70%"
    //                   }}
    //                 >
    //                   Event:
    //                 </Text>

    //                 <Text
    //                 numberOfLines={2}
    //                 onTextLayout={({ nativeEvent: { lines } }) =>
    //                   this.setState({eventLinesLength:lines.length})
    //                   }
    //                   style={{
    //                     color: "#fff",
    //                     fontSize: wp(4),
    //                     paddingBottom:10,
    //                     fontFamily:Fonts.heavy,
    //                   }}
    //                 >
    //                   {obj?.artist_or_event}

    //                 </Text>
    //             </View>
    //             <View
    //               style={{
    //                 height: 140,
    //                 width: "80%",
    //                 justifyContent: "space-evenly",
    //                 alignSelf: "center",
    //                 backgroundColor: "transparent",
    //                 borderRadius: 10
    //               }}
    //             >
    //               <View
    //                 style={{
    //                   height: "100%",
    //                   width: "100%",
    //                   justifyContent: "space-around",
    //                   alignSelf: "center",
    //                   backgroundColor: "transparent"
    //                 }}
    //               >
    //                 <View
    //                   style={{
    //                     justifyContent: "space-between",
    //                     flexDirection: "row",
    //                     width: "85%",
    //                     // marginTop:20,
    //                     alignSelf: "flex-start",
    //                     height: "20%"
    //                   }}
    //                 >
    //                   <View
    //                     style={{
    //                       width: width / 3.8,
    //                       backgroundColor: "transparent",
    //                     }}
    //                   >
    //                     <Text
    //                       style={{
    //                         color: "#8c979e",
    //                         fontSize: 15,
    //                         fontFamily: "Montserrat-Bold",
    //                         alignSelf: "flex-start"
    //                       }}
    //                     >
    //                       Month
    //                     </Text>
    //                     <Text
    //                       style={{
    //                         color: "#343434",
    //                         fontSize: 12,
    //                         fontFamily: "Montserrat-Bold",
    //                         alignSelf: "flex-start"
    //                       }}
    //                     >
    //                       {formatMonth}
    //                     </Text>
    //                   </View>
    //                   <View
    //                     style={{
    //                       width: width / 5,
    //                       backgroundColor: "transparent",
    //                     }}
    //                   >
    //                     <Text
    //                       style={{
    //                         color: "#8c979e",
    //                         fontSize: 15,
    //                         fontFamily: "Montserrat-Bold",
    //                         alignSelf: "flex-start"
    //                       }}
    //                     >
    //                       Year
    //                     </Text>
    //                     <Text
    //                       style={{
    //                         color: "#343434",
    //                         fontSize: 12,
    //                         fontFamily: "Montserrat-Bold",
    //                         alignSelf: "flex-start"
    //                       }}
    //                     >
    //                       {NavigationConsistor._formatYear(obj.date)}
    //                     </Text>
    //                   </View>
    //                   <View style={{ width: width / 3.5,  }}>
    //                     <Text
    //                       style={{
    //                         color: "#8c979e",
    //                         fontSize: 15,
    //                         fontFamily: "Montserrat-Bold",
    //                         // alignSelf: "flex-start"
    //                       }}
    //                     >
    //                       Location
    //                     </Text>
    //                     <Text
    //                     // numberOfLines={1}
    //                       style={{
    //                         color: "#343434",
    //                         fontSize: 12,
    //                         fontFamily: "Montserrat-Bold",
    //                         // alignSelf: "flex-start"
    //                       }}
    //                     >
    //                       {obj?.location}
    //                     </Text>
    //                   </View>
    //                 </View>

    //                 <View
    //                   onStartShouldSetResponder={() => true}
    //                   style={{
    //                     justifyContent: "flex-start",
    //                     flexDirection: "row",
    //                     maxWidth:'100%',
    //                     zIndex:1000,
    //                     overflow:'hidden'
    //                   }}
    //                 >
    //                   <FlatList
    //                   onStartShouldSetResponder={() => true}

    //                     renderItem={this.renderItem}
    //                     data={obj.subCategory}
    //                     horizontal
    //                     nestedScrollEnabled
    //                     style={{flexDirection:'row'}}
    //                     keyExtractor={(item, index) => index}
    //                   />
    //                 </View>

    //               </View>
    //             </View>
    //           </View>
    //           </ImageBackground>
    //         </View>
    //       </TouchableWithoutFeedback>
    //     </>
    //   );
    // } else {
    //   return <EventNotSetup eventId='1' eventName="Music" />;
    // }
  }
}

const styles = {
  circle: {
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
    backgroundColor: "#fff",
    zIndex: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  circleLine: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: "#000",
    zIndex: 100,

    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer:{
    flexDirection:'row',
    // alignItems:'center',
    marginBottom:height < MobxStore.heightToScaleSmall ? 15 : 20,
    justifyContent:'space-between',
  }
};

export default withNavigation(EventCardMusic);
