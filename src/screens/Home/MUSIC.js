import React, { Component } from "react";
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
  AsyncStorage,
  FlatList,
  BackHandler
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP
} from "react-native-responsive-screen";
import Fonts from "UIProps/Fonts";
import Carousel from "react-native-snap-carousel";
import LinearGradient from "react-native-linear-gradient";
import { getCats } from "ServiceProviders/ApiCaller";
import Constants from "Helpers/Constants";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import { withNavigation, NavigationEvents } from "react-navigation";
import NetworkAwareContent from "../../AppLevelComponents/UI/NetworkAwareContent";
import MobxStore from "../../StorageHelpers/MobxStore";
import { observer } from "mobx-react";
import GradButton from "../../common/gradientButton";
import NavigationConsistor from "../../Logicals/NavigationConsistor";
import EventCardMusic from "../../components/EventCardMusic";
import EventCardSports from "../../components/EventCardSports";
import Loader from "../../AppLevelComponents/UI/Loader";
import EventCardTravel from "../../components/EventCardTravel";
import Container from "../../AppLevelComponents/UI/Container";

const { height, width } = Dimensions.get("screen");

@observer
class MUSIC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isApiCall: false,
      catList: [],
      myText: "I'm ready to get swiped!",
      gestureName: "none",
      backgroundColor: "#fff",
      videos:[],
      noMatches: false
    };
    this.props = props;
    this._carousel = {};
  }

  componentDidMount() {
    // this.renderCategories();
    this.switchDateFetch(this.props.show)
    this.props.navigation.addListener("didFocus", this.didFocus);
  }

  componentWillReceiveProps(nextProps) {
    this.switchDateFetch(nextProps.show);
  }

  didFocus = () => {
    if (MobxStore.filterType) {
      if(this.props.show == MobxStore.filterType){
        this.switchDateFetch()
        MobxStore.resetFilterChange();
      }
    }
  };

  switchDateFetch(cat){
    let filtCat = 1;
    typeId = 1;
    type = "Music";
    switch (cat) {
      case "SPORTS":
        filtCat = 2;
        typeId = 2;
        type = "Sports";
        break;

      case "TRAVEL":
        type = "Travel";
        filtCat = 3;
        typeId = 3;
        break;
    }
    this._fetchData(filtCat)
  }

  _fetchData(filtCat) {
    
    this.setState({ isApiCall: true });
    fetch("http://13.232.62.239:6565/api/user/home", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: MobxStore.userObj.user_id,
        filterCategory: filtCat
      })
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
          this.setState({
            videos: arrData,
            noMatches: false
          });
        } else if (responseJson.statusCode == 201) {
          this.setState({
            noMatches: true
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

  _renderItemSub(item, index) {
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
  renderItem = ({ item, index }) => {
    let cardToRender = <EventCardMusic obj={item} isOnHome />;
    if (type == "Sports") {
      cardToRender = <EventCardSports obj={item} isOnHome />;
    } else if(type == 'Travel') {
      cardToRender = <EventCardTravel obj={item} isOnHome />;
    }
    return (
      <View
        style={{ flex: 1 }}
      >
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
                resizeMode={"cover"}
              >
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0.8)",
                    "rgba(255,255,255,0)",
                    "rgba(0,0,0,0.8)"
                  ]}
                  style={{ flex: 1 }}
                />
              </ImageBackground>
            ) : (
              <ImageBackground
                style={[styles.CurrentVideoImage,{borderRadius:10}]}
                source={{ uri: item.profile_picture }}
                imageStyle={{borderRadius:10}}
                resizeMode={"cover"}
              >
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0.8)",
                    "rgba(255,255,255,0)",
                    "rgba(0,0,0,0.8)"
                  ]}
                  style={{ flex: 1,borderRadius:10 }}
                />
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
                alignSelf: "center",
                alignItems:'center',
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
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: "100%",
              alignSelf: "center",
              marginTop: hp(-1.5)
            }}
          >
            {cardToRender}
          </View>
          <View
            style={{
              width: width,
              paddingBottom: 20,
              justifyContent: "center",
              alignSelf: "center",
              zIndex: 100
            }}
          >
            <GradButton
              text="Chat"
              onPress={() =>
                NavigationConsistor.navigateToChat(
                  this.props.navigation,
                  item,
                  item.user_id,
                  item.artist_or_event,
                  type == 'Travel' ? item.year  : NavigationConsistor._formatYear(item.date) ,
                  type
                )
              }
              style={{
                marginBottom: 0,
                margin: 10,
                marginTop: hp(2),
                zIndex: 1000
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  renderCategories() {
    let view = [];
    getCats(1)
      .then(resp => {
        const { result } = resp;
      })
      .catch(err => {});
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
              sliderWidth={width}
              itemWidth={width - 31}
              layoutCardOffset={20}
              nestedScrollEnabled
              layout={"default"}
            />
          </View>
        </View>
      ) : (
        <View style={{ alignSelf: "center", justifyContent: "center" }}>
          <View
            style={{
              alignContent: "center",
              alignItems: "center",
              paddingTop: height * 0.1,
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../../assets/Images/xxxhdpi/nomatches.png")}
              style={{ height: 90, width: 90 }}
            />

            <Text
              style={{
                fontSize: 25,
                paddingTop: 40,
                paddingBottom: 20,
                fontFamily: "Montserrat-ExtraBold"
              }}
            >
              No matches
            </Text>
            <Text
              style={{
                color: "#7e7e7e",
                fontSize: 15,
                fontFamily: "Montserrat-Regular",
                textAlign: "center"
              }}
            >
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
            </View>
          </View>
        </View>
      )
    )
  }
  render() {
    const cats = this.state.catList.map((item, index) => {
      return (
        <ImageBackground
          style={{
            marginVertical: 10,
            padding: 20,
            width: "100%",
            height: 100
          }}
          source={require("../../assets/Images/@pop-BG.png")}
        >
          <Text>oisjiosjd</Text>
        </ImageBackground>
      );
    });
    return (
      <Container >
          {this.state.isApiCall ? 
          <Loader style={{marginTop:heightPercentageToDP(30)}} />
          :
          this.renderView()
          }
      </Container>
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
    width: width - 40,
    alignSelf: "center"
  },
  CarouselBackgroundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default withNavigation(MUSIC);
