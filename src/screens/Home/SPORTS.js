import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  AsyncStorage, BackHandler
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Carousel from 'react-native-snap-carousel';
import Fonts from "UIProps/Fonts";
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation, NavigationEvents } from 'react-navigation'
import Constants from 'Helpers/Constants'
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import NetworkAwareContent from '../../AppLevelComponents/UI/NetworkAwareContent';
import MobxStore from '../../StorageHelpers/MobxStore';
import GradButton from '../../common/gradientButton';
import NavigationConsistor from '../../Logicals/NavigationConsistor';
const { height, width } = Dimensions.get('screen')
class SPORTS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isApiCall: false,

      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      isApiCall:true,
      backgroundColor: '#fff',
      videos: [
        {
          id: "WpIAc9by5iU",
          thumbnail: "data:image/jpeg;base64,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",
          title: "Sally"
        }, {
          id: "sNPnbI1arSE",
          thumbnail: "data:image/jpeg;base64,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",
          title: "Sally"
        }, {
          id: "VOgFZfRVaww",
          thumbnail: "data:image/jpeg;base64,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",
          title: "Sally"
        }
      ],
      showViewTop: true,
      userId: '',
      noMatches: false


    }
    this.props = props;
    this._carousel = {};

  }
  onSwipeUp(gestureState) {
    this.setState({ myText: 'You swiped up!' });
    this.props.navigation.navigate('MusicGenre')
  }
  onSwipeDown(gestureState) {
    alert('ddf')
  }
  
  componentDidMount() {

    this.initDataFetch()
    this.props.navigation.addListener('didFocus',this.didFocus)
  }

  initDataFetch(){
        const {user_id,images} = MobxStore.userObj
        this.setState({
          userId:user_id
        },()=>{
          this._fetchData();
        });
  }

  didFocus = () => {
    if(MobxStore.filterType == "Sports"){
      this.initDataFetch()
      MobxStore.resetFilterChange()
    }
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: '#fff' });
        break;
      case SWIPE_DOWN:
        this.setState({ backgroundColor: '#fff' });
        break;

    }
  }
  _fetchData() {
  this.setState({isApiCall:true,})
    fetch('http://13.232.62.239:6565/api/user/home', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user_id": this.state.userId,
        "filterCategory": 2


      }),

    }).then((response) => response.json())

      .then((responseJson) => {
        let arrData = []
        this.setState({isApiCall:false})
        console.log('HOME RESPONSE', JSON.stringify(responseJson))
        if (responseJson.statusCode == 200) {
          var category = responseJson.result.userInfo.categoryName
          var CatArr = this.catStrToArray(category)
          var data = CatArr;

          var found = data.find(function (element) {
            if (element == 'Music') {
              console.log('Found')
              return
            }
            else {
              console.log('Not Found')
              return
            }
          });
          for (i = 0; i <= responseJson.result.home.length - 1; i++) {
            var data1 = responseJson.result.home[i]
            arrData.push(data1)
          }
          this.setState({
            videos: arrData,

          })
        }
        else if (responseJson.statusCode == 201) {
          this.setState({
            noMatches: true
          })
        }
        return responseJson;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  _formatMonth(date) {

    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sept", "Oct",
      "Nov", "Dec"
    ];
    date = new Date(date)
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return monthNames[monthIndex];
  }

  _formatYear(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    date = new Date(date)
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year;
  }

  catStrToArray(cat) {
    if (cat == undefined) {
      return
    }
    else {
      var arraySub = cat.split(",");

      return arraySub;
    }
  }
  _strToArr(subCat) {
    let newArr = []
    if (subCat == undefined) {
      return
    }
    else {
      var arraySub = subCat.split(",");
      for (i = 0; i < arraySub.length; i++) {
        newArr.push(arraySub[i])
        if (i == 1)
          break;

      }
      return newArr;
    }
  }
  
  _renderItemSub(item, index) {
    return (
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
          {item.item}
        </Text>
      </View>
    );
  }

  _closeView() {
    this.setState({
      showViewTop: false
    })
  }


  _renderItem = ({ item, index }) => {
    var str = item.date;
    var formatYear = this._formatYear(str);
    var formatMonth = this._formatMonth(str);
    var subCat = item.subCategory;
    var subCatArr = this._strToArr(subCat);
    return (
     
        <ScrollView stle={{ flex: 1, }} showsVerticalScrollIndicator={false}>
          <View style={styles.ThumbnailBackgroundView}>
            <TouchableOpacity
              onPress={() => {
                console.log("clicked to index", index);
                this._carousel.snapToItem(index);
              }}
            >
              {item.profile_picture == "" ? (
                <ImageBackground
                  style={styles.CurrentVideoImage}
                  source={require("../../assets/Images/@photo-cropped.png")}
                  resizeMode={"contain"}
                >
                  <Image
                    source={require("../../assets/Images/@BG-gradient.png")}
                    style={{
                      height: width-200,
                      bottom:20,
                      marginTop:130,
                      borderRadius: 20,
                      width: width - 50
                    }}
                    resizeMode='cover'
                  />
                </ImageBackground>
              ) : (
                <ImageBackground
                  style={styles.CurrentVideoImage}
                  source={{ uri: item.profile_picture }}
                  resizeMode={"cover"}>
                  <LinearGradient colors={['rgba(0,0,0,0.8)', 'rgba(255,255,255,0)', 'rgba(0,0,0,0.8)']} style={{flex:1}}  />
                </ImageBackground>
              )}

              <View
                style={{
                  width: width - 85,
                  
                  position: "absolute",
                  bottom: hp(3.5),
                  backgroundColor: "transparent",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignSelf: "center"
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 22,
                    fontFamily: "Montserrat-ExtraBold",
                    left: "5%",
                    backgroundColor: "transparent"
                  }}
                >
                  {item.first_name}, {item.age} 
                </Text>
                <View
                  style={{
                    height: "100%",
                    width: width / 2,
                    backgroundColor: "transparent",
                    alignSelf: "center"
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      fontSize: 16,
                      alignSelf: "flex-start",
                      backgroundColor: "transparent",
                      top: "5%",
                      left:4
                    }}
                  >
                    {"  "}
                    {item.occupation}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{
                width: "100%",
                alignSelf: "center",
                marginTop:hp(-1.5)
              }}
            >
              <ImageBackground
                source={require("../../assets/Images/@Group.png")}
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
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        fontFamily:Fonts.heavy,
                      }}
                    >
                      {item.artist_or_event}
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
                          {formatYear}
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
                          style={{
                            color: "#343434",
                            fontSize: 12,
                            fontFamily: "Montserrat-Bold",
                            alignSelf: "flex-start"
                          }}
                        >
                          {item.location}
                        </Text>
                      </View>
                    </View>
                    <View style={{ width: "100%",  }}>
                      <FlatList
                        data={subCatArr}
                        renderItem={(item, index) =>
                          this._renderItemSub(item, index)
                        }
                        extraData={this.state}
                        numColumns={2}
                      />
                    </View>
                  </View>
                </View>
              </View>

              </ImageBackground>

             
            </View>

            <View
                style={{
                  width: width ,
                  paddingBottom:20,
                  justifyContent: "center",
                  alignSelf: "center",
                  zIndex:100,
                }}
              >

              <GradButton text='Chat' onPress={()=>NavigationConsistor.navigateToChat(this.props.navigation,item,item.user_id,item.artist_or_event,formatYear,'Music')}  style={{marginBottom:0,marginTop:30,zIndex:1000}} />
              </View>
          </View>
        </ScrollView>
    );
  };




  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    console.log("videos: updating")
    return (
      <SafeAreaView style={{ flex: 1,  }}>

        {this.state.noMatches == false ?
          <ScrollView style={{ backgroundColor: 'transparent' }} showsVerticalScrollIndicator={false}>


            <View style={[styles.CarouselBackgroundView,{backgroundColor:'#000'}]}>



              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.videos}
                renderItem={this._renderItem.bind(this)}
                sliderWidth={width - 0}
                itemWidth={width - 30}

                layout={'default'}


              />


            </View>

          </ScrollView> :



          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            <View style={{ alignContent: 'center', alignItems: 'center', paddingTop: height * 0.1, justifyContent: 'center' }}>


              <Image source={require('../../assets/Images/xxxhdpi/nomatches.png')} style={{ height: 90, width: 90 }} />

              <Text style={{ fontSize: 25, paddingTop: 40, paddingBottom: 20, fontFamily: 'Montserrat-ExtraBold' }}>No matches</Text>
              <Text style={{ color: '#7e7e7e', fontSize: 15, fontFamily: 'Montserrat-Regular', textAlign: 'center' }}>Solync is unable to find any matches.{'\n'}
                Please change your search and filter{'\n'}
                preferences or try again later</Text>
              <Text style={{ alignSelf: 'center', paddingBottom: 20, color: '#7e7e7e', fontSize: 15, fontFamily: 'Montserrat-Regular' }}></Text>


              <View style={{width:'100%'}} >
              <GradButton 
                onPress={() => this.props.navigation.navigate('Settings',{filterType:'Sports'})} 

                   text='Change filter settings' />


                <GradButton onPress={() => this.props.navigation.navigate('MultipleView', { type: 'Sports', typeId: '2' })} 
                   text='Change sports preferences' />
              </View>
              
            </View>
          </View>


        }


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
    position: 'relative'
  },
  text: {
    textAlign: 'center',
    margin: 10,
    height: 75
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  VideoTitleText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 25,

    justifyContent: 'flex-start',
    position: 'absolute',
    //bottom:35,
    left: 20

  },
  VideoTitleProf: {
    color: "#000",

    fontSize: 15,
    right: 0,
    justifyContent: 'flex-end',
    position: 'absolute',
    //bottom:30,


  },
  CurrentVideoImage: {

    width: width - 50,
    height: width - 50,
    borderRadius: 20,
    position: 'relative',

    alignSelf: 'center',
    justifyContent: 'center',


  },
  ThumbnailBackgroundView: {

    alignItems: 'center',
    width: width - 40,
    height: height,
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'transparent'
  },
  CarouselBackgroundView: {

    backgroundColor: 'transparent',
    height: height - 90,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'relative',
    backgroundColor: 'transparent'


  }
});

export default withNavigation(SPORTS);