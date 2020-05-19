import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Animated,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";

import Fonts from "UIProps/Fonts";
import Icons from 'AppLevelComponents/UI/Icons'

import Carousel from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";
import HelperMethods from 'Helpers/Methods'
import { getCats } from "ServiceProviders/ApiCaller";
import Interactable from 'react-native-interactable';
import { withNavigation, NavigationEvents } from "react-navigation";
import NetworkAwareContent from "../../AppLevelComponents/UI/NetworkAwareContent";
import MobxStore from "../../StorageHelpers/MobxStore";
import { observer } from "mobx-react";
import CustomText from 'AppLevelComponents/UI/CustomText'

import GradButton from "../../common/gradientButton";
import NavigationConsistor from "../../Logicals/NavigationConsistor";
import EventCardMusic from "../../components/EventCardMusic";
import Loader from "../../AppLevelComponents/UI/Loader";
import {Colors} from "UIProps/Colors";
import ImageCaraousal from "../ImageCaraousal/ImageCaraousal";


padding = 7
paddingAnd = 0.6

const { height, width } = Dimensions.get("screen");

var currentItem = {}
@observer
class MUSIC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isApiCall: false,
      catList: [],
      myText: "I'm ready to get swiped!",
      imageCaraousalVisible:false,
      gestureName: "none",
      carScrollEnabled:true,
      backgroundColor: "#fff",
      videos:[],
      isSpecificCat:'',
      turnOffScroll:false,
      catListPosType:'absolute',
      noMatches: false
    };
    this.props = props;
    this._carousel = {};
    this.cat = ''
    this.specificCat = ''
    this.nextProps = {}
      this._deltaY = new Animated.Value(0);
      this.clippingPoint = hp(76)

  }

  

  componentDidMount() {
    this.switchDateFetch(this.props.show,MobxStore.specificCat)
    this.props.navigation.addListener('didFocus',this.willFocus)
  }

  willFocus = () => {
    if(MobxStore.navigateToTabUserId && this.cat == MobxStore.catType){
        this.switchDateFetch(this.cat,this.specificCat)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.switchDateFetch(nextProps.show,nextProps.specificCat,);
  }


  switchDateFetch(cat,specificCat){
    this.cat = cat
    this.specificCat = specificCat

    filtCat = 1;
    typeId = 1;
    tintColor = Colors.colorMusic
    type = "Music";
    switch (cat) {
      case "SPORTS":
        filtCat = 2;
        tintColor = Colors.colorSports
        typeId = 2;
        type = "Sports";
        break;

      case "TRAVEL":
        type = "Travel";
        tintColor = Colors.colorTravel

        filtCat = 3;
        typeId = 3;
        break;
    }
    this.renderCategories(filtCat)
    this.fetchData(filtCat,specificCat)
  }

  fetchData(filtCat,specificCat = '') {
    MobxStore.navigateToTab = ''
    this.resetCaraousalPos()

    HelperMethods.animateLayout()
    if(specificCat){
      MobxStore.specificCat = specificCat
    } else {
      MobxStore.specificCat = ''
    }
    this.setState({ isApiCall: true,isSpecificCat:MobxStore.navigateToTabUserId ? `${MobxStore.navigateToTabUsername}'s profile` : specificCat,videos:[] });

    let obj = {
      user_id: MobxStore.userObj.user_id,
      filterCategory: filtCat,
      dataOfId:MobxStore.navigateToTabUserId
    }

    if(specificCat && !MobxStore.navigateToTabUserId){
      obj.filter_category = specificCat
    }
    MobxStore.navigateToTabUserId = ''

    fetch("http://13.232.62.239:6565/api/user/home", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(responseJson => {
        
        let arrData = [];
        this.setState({ isApiCall: false });
        if (responseJson.statusCode == 200) {
          for (i = 0; i <= responseJson.result.home.length - 1; i++) {
            let subCats = responseJson.result.home[i].subCategory;
            let subCatsArr = subCats.split(",");
            responseJson.result.home[i].subCategory = subCatsArr;
            var data1 = responseJson.result.home[i];
            arrData.push(data1);
          }

          currentItem = arrData[0]


          this.setState({
            videos: arrData,
            noMatches: false,
          });
        } else if (responseJson.statusCode == 201) {
          this.setState({
            noMatches: true,
            
          });
        } else {
        }
        return responseJson;
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSwipeUp(gestureState) {
    this.setState({ myText: "You swiped up!" });
    this.props.navigation.navigate("MusicGenre");
  }
  onSwipeDown(gestureState) {
    alert("ddf");
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: "#fff" });
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: "#fff" });
        break;
    }
  }

  _closeView() {
    this.setState({
      showViewTop: false
    });
  }

  renderItemSub(item, index) {
    return (
      <View
        style={{
          padding: 15,
          paddingVertical: 7,
          marginRight: 13,
          borderWidth: 2,
          borderRadius: 4,
          justifyContent: "center",
          borderColor: "#c8aecb"
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
          {item.item}
        </Text>
      </View>
    );
  }

  onCaraousalImgPress(){
    if(this._deltaY._value > 0){
      this.resetCaraousalPos()
    }
  }

  resetCaraousalPos(){
    this.caraousalInteractable?.snapTo({index:0});
    setTimeout(()=>{
      this._deltaY.setValue(0)
    })
  }

  toggleCarScroll(val){
    this.setState({carScroll:val})
  }

  navigateCaraousal(userObj){
    this.setState({imageCaraousalVisible:!this.state.imageCaraousalVisible,cUserObj:userObj})
    // this.props.navigation.navigate('ImageCaraousal',{userObj})
  }

  renderItem = ({ item, index }) => {
    let cardToRender = <EventCardMusic toggleCarScroll={(val)=>this.toggleCarScroll(val)} type={type}  obj={item} isOnHome />;
    if (type == "Sports") {
      cardToRender = <EventCardMusic toggleCarScroll={(val)=>this.toggleCarScroll(val)} type={type}  obj={item} isOnHome />;
    } else if(type == 'Travel') {
      cardToRender =<EventCardMusic toggleCarScroll={(val)=>this.toggleCarScroll(val)} type={type}  obj={item} isOnHome />;
    }
    let imageDim = {
      height:hp(40),
      width:wp(86)
    }

    let info = <View
    style={{
      // width: width - 85,
      position: "absolute",
      bottom: hp(5),
      paddingHorizontal:20,
      flex:1,
    }}
  >
    <Text
      style={{
        color: "#fff",
        fontSize: 22,
        fontFamily: "Montserrat-ExtraBold",
      }}
    >
      {item.first_name}, {item.age}{'  '}

      <Text
        style={{
          color: '#E2E2E2',
          fontSize: 16,
        fontFamily: Fonts.regular,
          
        }}
      >
        {item.occupation}
      </Text>

    </Text>



    
    </View>

    return (
      <>
        <View style={styles.ThumbnailBackgroundView}>
        {!item.filter_category && 
        null
        }
          <TouchableWithoutFeedback
            onPress={() => {
              this.onCaraousalImgPress()
            }}
          >
          <View>
            {item.profile_picture == "" ? (
              <ImageBackground
                style={[styles.CurrentVideoImage,{borderRadius:40,height:hp(height < MobxStore.heightToScaleSmall ? 45 : 38),}]}
                source={require("../../assets/Images/@photo-cropped.png")}
                resizeMode={"cover"}
                imageStyle={{borderRadius:20}}

              >
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0.8)",
                    "rgba(255,255,255,0)",
                    "rgba(0,0,0,0.8)"
                  ]}
                  style={{ flex: 1,borderRadius:10 }}
                  
                />

                {info}
              </ImageBackground>
            ) : (

              <ImageBackground
                style={[styles.CurrentVideoImage,{borderRadius:20,height:hp(height < MobxStore.heightToScaleSmall ? 45 : 38),}]}
                source={{ uri: item.profile_picture }}
                imageStyle={{borderRadius:20}}
                resizeMode={"cover"}
              >
              <TouchableWithoutFeedback onPress={()=>this.navigateCaraousal(item)}>
              <View style={{flex:1}}>
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0.8)",
                    "rgba(255,255,255,0)",
                    "rgba(0,0,0,0.8)"
                  ]}
                  style={{ flex: 1,borderRadius:20 }}
                />

              {info}
             </View>
              </TouchableWithoutFeedback>

              </ImageBackground>

            )}

            <View style={{marginTop:-20,}}>
            {cardToRender}
            </View>


            {/* <View
              style={{
                width: width - 85,
                position: "absolute",
                bottom: hp(3.3),
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignSelf: "center",
                alignItems:'center',
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontFamily: "Montserrat-ExtraBold",
                  marginLeft:wp(1.2),
                }}
              >
                {item.first_name}, {item.age}
              </Text>
              <View
                style={{
                  width: width / 2,
                  backgroundColor: "transparent",
                }}
              >
                <Text
                  style={{
                    color: "grey",
                    fontSize: 16,
                    backgroundColor: "transparent",
                    left: 4
                  }}
                >
                  {"  "}
                  {item.occupation}
                </Text>
              </View>
            </View> */}
            </View>
          </TouchableWithoutFeedback>

          <ScrollView
          style={{marginTop: hp(-1.5),
            alignSelf: "center",

              }}
  nestedScrollEnabled
          contentContainerStyle={{
              width: wp(90),
              // height:hp(30),
              backgroundColor:'#000',
              justifyContent:'flex-end',
              
            }}>
          </ScrollView>
           
        </View>
      </>
    );
  };


  

  renderCategories(filtCat) {
    this.setState({isLoadingCategories:true})
    getCats(filtCat,filtCat == 3 ? 'location' : '','homesubCategory')
      .then(resp => {
        const { result } = resp;
        HelperMethods.animateLayout()
        this.setState({categories:result,isLoadingCategories:false})
      })
      .catch(err => {});
  }

  onScroll = (event) =>{
    var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
      this.setState({carScrollEnabled:currentOffset == 0 ? false  :true})
  }

  renderView(){
     
    return(
      this.state.noMatches == false ? (
        <View
          style={{ backgroundColor: "transparent", flex: 1 }}
        >
          <View style={[styles.CarouselBackgroundView]}>
          

            <Carousel
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.videos}
              renderItem={this.renderItem.bind(this)}
              sliderWidth={wp(100)}
              itemWidth={width - 50}
              onSnapToItem={index=> currentItem = this.state.videos[index]}
              layoutCardOffset={20}
              nestedScrollEnabled
              layout={"default"}
            />
            <GradButton
              text="Chat"
              onPress={() =>
                NavigationConsistor.navigateToChat(
                  this.props.navigation,
                  currentItem,
                  currentItem.user_id,
                  type == 'Travel' ? `${currentItem?.artist_or_event}, ${currentItem?.location}` : currentItem.artist_or_event,
                  type == 'Travel' ? currentItem.year  : NavigationConsistor._formatYear(currentItem.date) ,
                  type
                )
              }
              style={{
                marginBottom: 0,
                width:'93%'
              }}
            />

          </View>

          


        </View>
      ) : (
        <ScrollView contentContainerStyle={{ alignSelf: "center",flexGrow:1,  }}>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              marginTop:hp(10)}}>

            <Image
              source={require("../../assets/Images/xxxhdpi/nomatches.png")}
              style={{ height: 90, width: 90 }}/>
            <Text
              style={{
                fontSize: 25,
                paddingTop: 40,
                paddingBottom: 20,
                fontFamily: "Montserrat-ExtraBold"
              }}>
              No matches
            </Text>
            <Text
              style={{
                color: "#7e7e7e",
                fontSize: 15,
                fontFamily: "Montserrat-Regular",
                textAlign: "center"}}>
              Solync is unable to find any matches.{"\n"}
              Please change your search and filter{"\n"}
              preferences or try again later
            </Text>
            <Text
              style={{
                alignSelf: "center",
                paddingBottom: 20,
                color: "#7e7e7e",
                fontSize: 15,
                fontFamily: "Montserrat-Regular"
              }}
            ></Text>

            <View style={{ width: "100%" }}>
              <GradButton
                onPress={() =>
                  this.props.navigation.navigate("Settings", {
                    filterType: type
                  })
                }
                text="Change filter settings"
              />

              <GradButton
                onPress={() =>
                  this.props.navigation.navigate("MultipleView", {
                    type,
                    typeId
                  })
                }
                text={`Change ${type.toLowerCase()} preferences`}
              />

              {this.state.isSpecificCat ?

            <GradButton
                onPress={() =>
                 this.fetchData(filtCat)
                }
                text={`Showing ${this.state.isSpecificCat}, Show all instead?`}
              />
              :null
            
              }
            </View>
          </View>
        </ScrollView>
      )
    )
  }


  onDownSwipeSnap(e){
     if(e.nativeEvent.index == 0){
       this.setState({carScrollEnabled:true})
     }
    this.setState({catListPosType:'relative',turnOffScroll:true})
  }

  drawCats = ({item,index}) => {
    const {sub_id,category_id,sub_category_name,description} = item
    return(
      
      <ImageBackground
      source={{uri:item.image}}
      imageStyle={{borderRadius:10}}
      resizeMode='cover'
      style={{padding:30,marginBottom:10,borderRadius:10,height:110,justifyContent:'center'}}
      >
      <TouchableWithoutFeedback onPress={()=>this.fetchData(filtCat,sub_category_name)} >
        <View style={{justifyContent:'center'}}>
          <CustomText bold style={{marginTop:type != 'Music' ? 15 : 0}} text={sub_category_name.toUpperCase()} size={17}  />
          <CustomText style={{fontStyle:'italic',fontSize:14}} text={description} size={15}  />
        </View>
      </TouchableWithoutFeedback>
      </ImageBackground>
    )
  }

  renderCurrentCatTitle(){
    return <View style={[styles.browsingCatContainer,{}]} >
    <View style={{flexDirection:'row',alignItems:'center'}} > 

      <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',}}>   
        <CustomText text='showing: ' color={Colors.lighter} />
        <CustomText text={this.state.isSpecificCat} style={{marginLeft:5}} color={tintColor} />
      </View>
  <Icons lib='Material' onPress={()=>this.fetchData(filtCat)} style={{marginLeft:10}} name='close' color={Colors.lighter} />
</View>
</View>
  }

  onBackPress(){
    if(this._deltaY._value > 0) {
      this.resetCaraousalPos() 
    } else {
      return false
    }
  }
  
  render() {
    return (
      <View style={{flex:1}}>
      <BackHandlerSingleton onBackPress={()=>this.onBackPress()} />
      {this.state.imageCaraousalVisible && 
      <ImageCaraousal closeModal={()=>this.setState({imageCaraousalVisible:false})} visible={this.state.imageCaraousalVisible} userObj={this.state.cUserObj} />
      }
          {this.state.isApiCall ? 
          <Loader style={{marginTop:heightPercentageToDP(30)}} />
          :
          <>
          {!this.state.noMatches &&
           <Animated.View style={{
             opacity:this._deltaY.interpolate({
              inputRange: [0, this.clippingPoint],
              outputRange: [0, 1]
            }),
             position:'absolute',width:wp(86),alignSelf:'center'}}>
                <View style={{height: this.clippingPoint,}}>
                <NetworkAwareContent isApiCall={this.state.isLoadingCategories} apiFunc={()=>this.renderCategories()} >

               <FlatList
               nestedScrollEnabled
               showsVerticalScrollIndicator={false}
                  data={this.state.categories}
                  renderItem={this.drawCats}
                  keyExtractor={(item,index) => index}
                 />
                </NetworkAwareContent>
               </View>
             </Animated.View>
          }
          <Interactable.View
          verticalOnly
          // boundaries={{top:0, }}
          dragEnabled={!this.state.noMatches}
          ref={caraousalInteractable => this.caraousalInteractable = caraousalInteractable}
          style={{flex:1}}
          dragWithSpring={{tension: 2000, damping: 0.5}}
          onSnap={(e)=>this.onDownSwipeSnap(e)}
          animatedValueY={this._deltaY}
          snapPoints={[{y: 0}, {y: this.clippingPoint}]}
           >
          {this.renderView()}
          </Interactable.View>
          </>
          }
          
          {this.state.isSpecificCat && this.state.videos.length > 0 ? 
            this.renderCurrentCatTitle()
            :null
          }



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    position: "relative"
  },
  text: {
    textAlign: "center",
    margin: 10,
    height: 75
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  VideoTitleText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,

    justifyContent: "flex-start",
    position: "absolute",
    //bottom:35,
    left: 20
  },
  VideoTitleProf: {
    color: "#000",

    fontSize: 15,
    right: 0,
    justifyContent: "flex-end",
    position: "absolute"
    //bottom:30,
  },
  CurrentVideoImage: {
    width: width - 50,
    height: width - 50,
    borderRadius: 30,
    position: "relative",

    alignSelf: "center",
    justifyContent: "center"
  },
  ThumbnailBackgroundView: {
    alignItems: "center",
    
    flex:1,
    alignSelf: "center"
  },
  CarouselBackgroundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  browsingCatContainer:{
    justifyContent:'center',position:'absolute',
    left:wp(7),elevation:0,backgroundColor:'#fff',zIndex:10000000,
    borderBottomRightRadius:10,
    top:hp(HelperMethods.isPlatformAndroid() ? -2.7: -3.5),paddingTop:HelperMethods.isPlatformAndroid() ? hp(paddingAnd) : padding,paddingBottom:HelperMethods.isPlatformAndroid() ? hp(paddingAnd) : padding
  }
});
export default withNavigation(MUSIC);
