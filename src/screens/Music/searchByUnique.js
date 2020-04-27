import React, { Component } from "react";

import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  PermissionsAndroid,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  AsyncStorage,
  BackHandler,
} from "react-native";
import { Colors } from "UIProps/Colors";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import CustomText from "AppLevelComponents/UI/CustomText";

const { height, width } = Dimensions.get("screen");
import HelperMethods from "../../Helpers/Methods";
import Constants from "../../Helpers/Constants";
import Loader from "../../AppLevelComponents/UI/Loader";
import Container from "../../AppLevelComponents/UI/Container";
import GradButton from "../../common/gradientButton";
import { withNavigation } from "react-navigation";
import { widthPercentageToDP } from "react-native-responsive-screen";
import ScreenHeader from "../../components/ScreenHeader";
import BackHandlerSingleton from "../../ServiceProviders/BackHandlerSingleton";
import Fonts from "../../UIProps/Fonts";

class SearchByUnique extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showViewLocation: true,
      showViewArtist: true,
      disableButton: true,
      artist: "",
      loadingSuggestions: false,
      location: "",
      event: "",
      visible: false,
      onFocus: true,
      showLocation: false,
      eventData: [],
      artistData: [],
      locationData: [],
      showArtist: false,
      latitude: 0,
      showEvent: false,
      longitude: 0,
      userId: "",
      KeyboardHeight: Dimensions.get("screen").height,
    };
  }

  componentWillMount() {
    this.renderContent();
  }
  componentDidMount() {
    let { params } = this.props.navigation.state;
    AsyncStorage.getItem("userId", (err, result) => {
      userData = JSON.parse(result);
      console.log("USER ID CONSOLE SEARCH BY UNIQUE", userData);
      this.setState({
        userId: userData,
      });
    });
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow.bind(this)
    );
    AsyncStorageHandler.get(Constants.currentLocation, (val) => {
      if (val != null) {
        const { latitude, longitude } = val;
        this.setState({ latitude, longitude });
      }
    });
  }

  keyboardWillShow(e) {
    this.setState({
      KeyboardHeight:
        Dimensions.get("screen").KeyboardHeight * 0.9 -
        e.endCoordinates.KeyboardHeight,
    });
  }

  tryFunc() {
    this.setState({
      visible: true,
    });
  }

  _showDate() {
    if (this.state.showLocation == true) {
      this.setState({
        showLocation: false,
      });
    } else {
      this.setState({
        showLocation: true,
      });
    }
  }

  _changeViewLocation(text) {
    this.setState({
      location: text,
    });
  }

  _renderItem(item, index) {
    return (
      <View
        style={{ width: 290, alignSelf: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => this.setState({ showMonth: false })}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#000",
              fontSize: 19,
              fontFamily: "Montserrat-SemiBold",
              height: 50,
              paddingTop: 10,
            }}
          >
            {item.key}
          </Text>
          <View style={{ height: 1, backgroundColor: "#DCDCDC" }}></View>
        </TouchableOpacity>
      </View>
    );
  }

  changeViewLocation() {
    this.setState({
      showViewLocation: false,
    });
  }

  _continue() {
    let { params } = this.props.navigation.state;

    if (params.searchType == "location") {
      this.props.navigation.navigate("EventList", {
        type: params.type,
        loc: this.state.location,
        data: params.data,
        lat: global.latitude,
        lng: global.longitude,
        selectedCats: params?.selectedCats,
        userId: this.state.userId,
        date: "",
        dataSubName: params.dataSubName,
        typeId: params.typeId,
      });
    } else {
      this.props.navigation.navigate("FindPeople", {
        type: params.type,
        artFest: this.state.artist,
        data: params.data,
        typeId: params.typeId,
        title,
        dataSubName: params.dataSubName,
        selectedCats: params?.selectedCats,
      });
    }
  }

  _buttonCheck(location) {
    this.setState({ location }, () => {
      if (this.state.location.length > 0) {
        this._fetchLocationData();
      } else {
        this.setState({ showLocation: false, showSuggestions: false });
      }
    });
  }

  _fetchLocationData() {
    let { params } = this.props.navigation.state;
    this.setState({ loadingSuggestions: true, showSuggestions: true });
    fetch("http://13.232.62.239:6565/api/user/getLocation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_id: params?.typeId,
        sub_ids: params?.dataSubName || ["sports_softball"],
        location: this.state.location || "Delhi",
      }),
    })
      .then((response) => response.json())

      .then((responseJson) => {
        let arrData = [];
        if (responseJson.statusCode == 200) {
          for (i = 0; i <= responseJson.result.locations.length - 1; i++) {
            var data1 = responseJson.result.locations[i];
            arrData.push({ loc: data1 });
          }
          this.setState(
            {
              locationData: arrData,
              showSuggestions: true,
              loadingSuggestions: false,
              showLocation: true,
              showEvent: false,
            },
            () => {}
          );
        } else if (responseJson.statusCode == 201) {
          console.log("SUCCESS RESPONSE", JSON.stringify(responseJson.result));
          //this.props.navigation.navigate('UploadPhoto',{'userId':params.userId})
        } else {
          alert("Something went wrong");
        }
        return responseJson;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  artistDropDown(artist) {
    HelperMethods.animateLayout();
    this.setState(
      {
        artist,
      },
      () => {
        if (this.state.artist) {
          this._fetchEventData();
        } else {
          this.setState({ showSuggestions: false, showEvent: false });
        }
      }
    );
  }

  _fetchEventData() {
    let { params } = this.props.navigation.state;
    this.setState({ loadingSuggestions: true, showSuggestions: true });
    fetch("http://13.232.62.239:6565/api/user/getFestival", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category_id: params.typeId,
        sub_ids: params.dataSubName,
        festival: this.state.artist,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ loadingSuggestions: false });
        let arrData = [];
        if (responseJson.statusCode == 200) {
          for (i = 0; i <= responseJson.result.festival.length - 1; i++) {
            var data1 = responseJson.result.festival[i];
            arrData.push({ name: data1 });
          }
          this.setState({
            eventData: arrData,
            loadingSuggestions: false,
            showLocation: false,
          });
        } else {
        }
        return responseJson;
      })
      .catch((error) => {});
  }

  _showArtist() {
    if (this.state.showArtist == false) {
      this.setState({ showArtist: true });
    } else {
      this.setState({ showArtist: false });
    }
  }
  _showLocation() {
    if (this.state.showLocation == false) {
      this.setState({ showLocation: true });
    } else {
      this.setState({ showLocation: false });
    }
  }
  _showEvent() {
    this.setState({ showEvent: !this.state.showEvent });
  }

  _onSelectionEvent() {
    this.setState({ visible: true });
  }

  _renderItemEvent(item, index) {
    //this is under music section
    return (
      <View
        style={{ width: 300, alignSelf: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => this._onSelectionEvent(item.name)}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#000",
              fontSize: 16,
              fontFamily: "Montserrat-SemiBold",
              height: "auto",
              paddingTop: 10,
              textAlign: "center",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#DCDCDC",
              marginTop: 10,
            }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  }
  _renderItemArtist(item, index) {
    //its under sports selection
    return (
      <View
        style={{ width: 300, alignSelf: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center", width: "100%" }}
          onPress={() => this._onSelectionArtist(item)}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#000",
              fontSize: 16,
              fontFamily: "Montserrat-SemiBold",
              height: "auto",
              paddingTop: 10,
              textAlign: "center",
              width: "100%",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#DCDCDC",
              marginTop: 10,
            }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  }

  noSuggestionsView = () => {
    return <CustomText text={this.state.loadingSuggestions ? 'Loading..' : 'No data'} style={{ marginTop: 20 }} color="#000" />;
  };

  _renderItemLocation = ({ item, index }) => {
    return (
      <View
        style={{ width: 300, alignSelf: "center", justifyContent: "center" }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center", width: "100%" }}
          onPress={() => this._onSelectionLocation(item.loc)}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#000",
              fontSize: 16,
              fontFamily: "Montserrat-SemiBold",
              height: "auto",
              paddingTop: 10,
              textAlign: "center",
              width: "100%",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {item.loc}
          </Text>
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#DCDCDC",
              marginTop: 10,
            }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  };

  _onSelectionArtist(item) {
    Keyboard.dismiss();
    HelperMethods.animateLayout();
    this.setState({
      artist: item.name,
      showArtist: false,
      showSuggestions: false,
      visible: true,
    });
  }

  _onSelectionLocation(item) {
    Keyboard.dismiss();
    HelperMethods.animateLayout();
    this.setState({
      location: item,
      showLocation: false,
      showSuggestions: false,
      visible: true,
    });
  }

  renderContent() {
    title = "";
    const { params } = this.props.navigation.state;
    switch (params?.type) {
      case "Music":
        title = "What concert/festival would you like to attend?";
        break;

      case "Sports":
        title = "Which sporting event would you like to attend?";
        break;

      case "Travel":
        title = "Travel";
        break;
    }
  }

  renderFlatList() {
    if (this.state.showLocation) {
      return (
        <FlatList
          data={this.state.locationData}
          renderItem={this._renderItemLocation}
          ListEmptyComponent={this.noSuggestionsView}
          extraData={this.state}
          style={{ maxHeight: 250 }}
          nestedScrollEnabled
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={Keyboard.dismiss}
        />
      );
    } else {
      return (
        <FlatList
        nestedScrollEnabled
          data={this.state.eventData}
          keyboardShouldPersistTaps="always"
          renderItem={({ item, index }) => this._renderItemArtist(item, index)}
          ListEmptyComponent={this.noSuggestionsView}
          style={{ maxHeight: 250 }}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={Keyboard.dismiss}
        />
      );
    }
  }

  render() {
    let { params } = this.props.navigation.state;
    return (
      <Container>
        <BackHandlerSingleton onBackPress={() => this.props.navigation.pop()} />

        <ScreenHeader isCenter={false} title={title} />
        <View
          style={{
            marginTop: 60,
          }}
        >
          <View
            style={{
              height: 200,
              backgroundColor: "#f6f7f8",
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 17,
                alignSelf: "center",
                fontFamily: "Montserrat-Bold",
              }}
            >
              {params?.inputTitle}
            </Text>

            {params?.searchType == "event" ? (
              <TextInput
                style={{
                  marginTop: 10,
                  textAlign: "center",
                  borderTopColor: "transparent",
                  borderRightColor: "transparent",
                  borderLeftColor: "transparent",
                  borderBottomColor: "#cacaca",
                  borderWidth: 2,
                  width: width - 50,
                  height: "30%",
                  opacity: 2.0,
                  fontFamily:Fonts.medium,
                  alignSelf: "center",
                }}
                placeholder={params?.inputPlaceHolder}
                fontSize={15}
                autoFocus={true}
                value={this.state.artist}
                // fontWeight={'bold'}
                placeholderTextColor={"#a5a6a6"}
                onChangeText={(artist) => this.artistDropDown(artist)}
                onFocus={() =>
                  this.setState({
                    artist: "",
                    showSuggestions: false,
                    artistData: [],
                    visible: false,
                  })
                }
              />
            ) : (
              <TextInput
                style={{
                  textAlign: "center",
                  borderTopColor: "transparent",
                  borderRightColor: "transparent",
                  borderLeftColor: "transparent",
                  borderBottomColor: "#edeff0",
                  borderWidth: 2,
                  width: width - 50,
                  height: "40%",
                  opacity: 2.0,
                  alignSelf: "center",
                }}
                onFocus={() =>
                  this.setState({
                    location: "",
                    showSuggestions: false,
                    locationData: [],
                    visible: false,
                  })
                }
                placeholder={"Enter location"}
                fontSize={15}
                value={this.state.location}
                placeholderTextColor={"#a5a6a6"}
                onChangeText={(location) => this._buttonCheck(location)}
                autoFocus={true}
                fontFamily={"Montserrat-Bold"}
              />
            )}
          </View>
        </View>

        {this.state.showSuggestions && (
          <ImageBackground
            source={require("../../assets/Images/@Groupdown.png")}
            style={{
              zIndex: 19,
              marginTop: -60,
              alignSelf: "center",

              padding: 20,
            }}
            imageStyle={{ alignItems: "center" }}
            resizeMode={"stretch"}
          >
            {this.renderFlatList()}
          </ImageBackground>
        )}
        {HelperMethods.isPlatformAndroid() && 
<View style={{flex:1}} />
        }
        <KeyboardAvoidingView
        style={HelperMethods.isPlatformIos() ? {flex:1,justifyContent:'flex-end',width:'100%'} : {width:'100%'} }
          behavior={HelperMethods.isPlatformIos() ? "padding" : undefined}
        >
            {this.state.visible && (
              <GradButton text="Continue" onPress={() => this._continue()} />
            )}
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
export default withNavigation(SearchByUnique);
