import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  Switch,
  SafeAreaView,
  Image,
  Modal,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ModalAlert from "../../common/modalAlert";
import HelperMethods from "Helpers/Methods";
import NetworkAwareContent from "AppLevelComponents/UI/NetworkAwareContent";

import { getSettings, updateSettings } from "ServiceProviders/ApiCaller";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import RangeSlider from "rn-range-slider";
import { withNavigation } from "react-navigation";
import Loader from "../../AppLevelComponents/UI/Loader";
import { Colors } from "UIProps/Colors";
import MobxStore from "../../StorageHelpers/MobxStore";
import ModelOverlay from "../../components/ModelOverlay";

const { height, width } = Dimensions.get("screen");
class homeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibleLogOut: false,
      textColor: "",
      viewColor: "",
      isApiCall: false,
      genMale: false,
      genFemale: false,
      genBoth: false,
      isLoadingData: false,
      ageSet: false,
      modalVisible: false,
      hideProfileValue: false,
      switch1Value: false,
      switchMessageValue: false,
      switchVibrationValue: false,
      rangeLow: 22,
      rangeHigh: 35,
      switchSoundValue: false,
      sliderOneChanging: false,
      sliderOneValue: [5],
      multiSliderValue: [3, 7],
      nonCollidingMultiSliderValue: [0, 100],
    };
  }

  componentDidMount() {
    this.fetchSettings();
    if (this.state.param == null) {
      this.showDetails("TRAVEL");
    }
  }

  fetchSettings() {
    this.setState({ isLoadingData: true });
    getSettings(MobxStore.userObj?.user_id)
      .then((resp) => {
        const {
          message_status,
          age_range_from,
          age_range_to,
          gender,
          profile_status,
          in_app_vibration,
          in_app_sound,
        } = resp.result;
        HelperMethods.animateLayout();

        this.setState({
          isLoadingData: false,
          rangeLow: !age_range_from ? this.state.rangeLow : age_range_from,
          rangeHigh: !age_range_to ? this.state.rangeHigh : age_range_to,
          genMale: gender == "Male" && true,
          genFemale: gender == "Female" && true,
          genBoth: gender == "Both" && true,
          hideProfileValue: profile_status == "0" ? false : true,
          switchMessageValue: message_status == "0" ? false : true,
          switchVibrationValue: in_app_vibration == "0" ? false : true,
          switchSoundValue: in_app_sound == "0" ? false : true,
          ageSet: true,
        });
      })
      .catch((err) => {
        this.setState({isLoadingData:false });
      });
  }

  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true,
    });
  };

  sliderOneValuesChange = (values) => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues,
    });
  };

  sliderOneValuesChangeFinish = () => {
    this.setState({
      sliderOneChanging: false,
    });
  };

  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
  };

  nonCollidingMultiSliderValuesChange = (values) => {
    this.setState({
      nonCollidingMultiSliderValue: values,
    });
  };
  showDetails(param) {
    this.setState({
      show: param,
    });
  }
  _Register() {
    this.setState({
      modalVisibleLogOut: false,
    });
    this.props.navigation.navigate("Login");
  }
  toggleSwitchHideProfile = () => {
    // console.log('Switch 1 is: ' + value)
    if (this.state.hideProfileValue == false) {
      this.setState({
        modalVisible: true,
      });
    } else {
      this.setState({
        hideProfileValue: false,
      });
    }
  };
  toggleSwitchMessages = (value) => {
    this.setState({ switchMessageValue: value });
    console.log("Switch Messages is: " + value);
  };
  toggleSwitchVibrations = (value) => {
    this.setState({ switchVibrationValue: value });
    console.log("Switch vibration is: " + value);
  };
  toggleSwitchSound = (value) => {
    this.setState({ switchSoundValue: value });
    console.log("Switch Sound is: " + value);
  };
  hideProfile(visible) {
    this.setState({ modalVisible: visible });
  }
  changeGenMale() {
    HelperMethods.animateLayout();
    this.setState({
      genMale: true,
      genFemale: false,
      genBoth: false,
    });
  }
  changeGenFemale() {
    HelperMethods.animateLayout();
    this.setState({
      genMale: false,
      genFemale: true,
      genBoth: false,
    });
  }
  changeGenBoth() {
    HelperMethods.animateLayout();
    this.setState({
      genMale: false,
      genFemale: false,
      genBoth: true,
    });
  }
  setModalVisible(visible) {
    this.setState({
      modalVisibleLogOut: visible,
    });
  }

  _onLogOut() {
    if (!this.state.modalVisibleLogOut) {
      this.setModalVisible(true);
      return;
    } else {
      this.setModalVisible(false);
      HelperMethods.logout(this.props.navigation);
      return
      
      if(MobxStore.userObj.facebook_id){
        HelperMethods.logoutFB(loggedout => {
          if(loggedout.success){
            HelperMethods.logout(this.props.navigation);
          }
        })
      } else {
        HelperMethods.logout(this.props.navigation);
      }
      
    }
  }

  done() {
    let gender = "";
    let {
      switchMessageValue,
      rangeLow,
      rangeHigh,
      genFemale,
      genMale,
      genBoth,
      hideProfileValue,
      switchVibrationValue,
      switchSoundValue,
    } = this.state;
    msgVal = switchMessageValue ? 1 : 0;
    if (genFemale) {
      gender = "Female";
    } else if (genMale) {
      gender = "Male";
    } else if (genBoth) {
      gender = "Both";
    }
    hideProfileValue = hideProfileValue ? 1 : 0;
    switchVibrationValue = switchVibrationValue ? 1 : 0;
    switchSoundValue = switchSoundValue ? 1 : 0;
    if(!gender){
      alert('Please select gender')
      return
    }
    this.setState({ isApiCall: true });

    updateSettings(
      MobxStore.userObj?.user_id,
      msgVal,
      rangeLow,
      rangeHigh,
      gender,
      hideProfileValue,
      switchVibrationValue,
      switchSoundValue
    )
      .then((resp) => {
        this.setState({ isApiCall: false, data: resp });
        MobxStore.updateUserSettings(resp);
        // const { params } = this.props.navigation.state;
        // MobxStore.isFilterChanged(params?.filterType);
        this.props.navigation.pop();
      })
      .catch((err) => {
        alert(JSON.stringify( err))
        this.setState({ isApiCall:false });
      });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <SafeAreaView style={{ height: "13%" }}>
          <View
            style={{
              position: "relative",
              alignItems: "center",
              flexDirection: "row",
              height: "100%",
              width: width,
              justifyContent: "space-between",
              borderColor: "#DCDCDC",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                zIndex: 100,
                height: "90%",
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Image
                  source={require("../../assets/Images/Left.png")}
                  style={{ height: height / 40, width: width / 20 }}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                position: "absolute",
                width: width,
                height: "100%",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  alignSelf: "center",
                  fontFamily: "Montserrat-Bold",
                }}
              >
                Settings
              </Text>
            </View>

            <View
              style={{
                height: "100%",
                justifyContent: "center",
                marginRight: 20,
              }}
            >
              {this.state.isApiCall ? (
                <Loader size="small" color={Colors.accent} />
              ) : (
                <Text
                  style={{
                    fontSize: 17,
                    color: "#B52050",
                    fontFamily: "Montserrat-Bold",
                    alignSelf: "center",
                  }}
                  onPress={() => this.done()}
                >
                  Done
                </Text>
              )}
            </View>
          </View>
        </SafeAreaView>

        <ScrollView style={{ height: "100%" }}>
          <View
            style={{ width: width, height: 40, backgroundColor: "#f6f7f8" }}
          >
            <View
              style={{
                height: "100%",
                width: width - 30,
                backgroundColor: "#f6f7f8",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  opacity: 1,
                  fontSize: 16,
                  fontFamily: "Montserrat-Bold",
                  color: "#808c94",
                }}
              >
                Filters
              </Text>
            </View>
          </View>
          <BackHandlerSingleton />
          <View
            style={{ height: 25, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              height: 60,
              width: width - 30,
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: "#000",
                fontWeight: "bold",
                top: 10,
              }}
            >
              Age Range {this.state.rangeLow} - {this.state.rangeHigh}
            </Text>

            <NetworkAwareContent
              apiFunc={() => this.fetchSettings()}
              isApiCall={this.state.isLoadingData}
            >
              {this.state.ageSet && (
                <RangeSlider
                  style={{
                    width: width - 30,
                    marginBottom: 20,
                    height: 80,
                    backgroundColor: "transparent",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                  gravity={"center"}
                  min={18}
                  initialLowValue={this.state.rangeLow}
                  initialHighValue={this.state.rangeHigh}
                  max={80}
                  step={1}
                  selectionColor="#B52050"
                  blankColor="#DCDCDC"
                  thumbColor="#DCDCDC"
                  labelStyle="none"
                  onValueChanged={(low, high, fromUser) => {
                    this.setState({ rangeLow: low, rangeHigh: high });
                  }}
                />
              )}
            </NetworkAwareContent>
          </View>

          <View
            style={{
              width: width - 30,
              height: height / 6,
              flexDirection: "column",
              alignSelf: "center",
              backgroundColor: "transparent",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 17, color: "#000", fontWeight: "bold" }}>
              Gender
            </Text>
            <View
              style={{ height: 10, width: width, backgroundColor: "#fff" }}
            ></View>
            <View
              style={{
                justifyContent: "space-between",
                borderRadius: 8,
                height: "50%",
                width: width - 30,
                backgroundColor: "transparent",
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              {this.state.genMale == false ? (
                <TouchableWithoutFeedback onPress={() => this.changeGenMale()}>
                  <View
                    style={{
                      width: width / 3.3,
                      backgroundColor: "#f6f7f8",
                      justifyContent: "center",
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 14,
                        alignSelf: "center",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      MEN
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback onPress={() => this.changeGenMale()}>
                  <View
                    style={{
                      width: width / 3.4,
                      backgroundColor: "#B52050",
                      justifyContent: "center",
                      borderBottomLeftRadius: 8,
                      borderTopLeftRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        alignSelf: "center",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      MEN
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
              {this.state.genFemale == false ? (
                <TouchableWithoutFeedback
                  onPress={() => this.changeGenFemale()}
                >
                  <View
                    style={{
                      width: width / 3.3,
                      backgroundColor: "#f6f7f8",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 14,
                        alignSelf: "center",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      WOMEN
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback
                  onPress={() => this.changeGenFemale()}
                >
                  <View
                    style={{
                      width: width / 3.4,
                      backgroundColor: "#B52050",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        alignSelf: "center",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      WOMEN
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
              {this.state.genBoth == false ? (
                <TouchableWithoutFeedback onPress={() => this.changeGenBoth()}>
                  <View
                    style={{
                      width: width / 3.3,
                      backgroundColor: "#f6f7f8",
                      justifyContent: "center",
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "grey",
                        fontSize: 14,
                        alignSelf: "center",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      BOTH
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback onPress={() => this.changeGenBoth()}>
                  <View
                    style={{
                      width: width / 3.4,
                      backgroundColor: "#B52050",
                      justifyContent: "center",
                      borderBottomRightRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        alignSelf: "center",
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      BOTH
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{ width: width, height: 40, backgroundColor: "#f6f7f8" }}
          >
            <View
              style={{
                height: "100%",
                width: width - 30,
                backgroundColor: "#f6f7f8",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  opacity: 1,
                  fontSize: 16,
                  fontFamily: "Montserrat-Bold",
                  color: "#808c94",
                }}
              >
                Access
              </Text>
            </View>
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              justifyContent: "space-between",
              width: width - 30,
              height: 50,
              flexDirection: "row",
              backgroundColor: "transparent",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                fontWeight: "bold",
                width: "70%",
              }}
            >
              Hide my profile
            </Text>
            {Platform.OS == "ios" ? (
              <Switch
                onValueChange={this.toggleSwitchHideProfile}
                value={this.state.hideProfileValue}
                onTintColor={"#B52050"}
                tintColor={"#C0C0C0"}
                ios_backgroundColor={"#C0C0C0"}
                trackColor={{ true: "pink", false: "grey" }}
                thumbTintColor={"#fff"}
              />
            ) : (
              <Switch
                onValueChange={this.toggleSwitchHideProfile}
                value={this.state.hideProfileValue}
                onTintColor={"#B52050"}
                tintColor={"#C0C0C0"}
                ios_backgroundColor={"#C0C0C0"}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                trackColor={{ true: "pink", false: "grey" }}
                thumbTintColor={"#fff"}
              />
            )}
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              height: 1,
              width: 500,
              backgroundColor: "#DCDCDC",
              justifyContent: "center",
            }}
          ></View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("BlockedUser")}
            style={{
              justifyContent: "space-between",
              width: width - 30,
              height: 50,
              alignSelf: "center",
              backgroundColor: "transparent",
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                width: width - 30,
                height: "100%",
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  alignSelf: "center",
                  fontWeight: "bold",
                  width: "70%",
                }}
              >
                Blocked users
              </Text>
              <Image
                style={{ alignSelf: "center" }}
                source={require("../../assets/Images/@arrow-right.png")}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{ width: width, height: 40, backgroundColor: "#f6f7f8" }}
          >
            <View
              style={{
                height: "100%",
                width: width - 30,
                backgroundColor: "#f6f7f8",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  opacity: 1,
                  fontSize: 16,
                  fontFamily: "Montserrat-Bold",
                  color: "#808c94",
                }}
              >
                Notifications
              </Text>
            </View>
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              justifyContent: "space-between",
              width: width - 30,
              height: 50,
              flexDirection: "row",
              alignSelf: "center",
              backgroundColor: "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                fontWeight: "bold",
                width: "70%",
              }}
            >
              Messages
            </Text>
            {Platform.OS == "ios" ? (
              <Switch
                onValueChange={this.toggleSwitchMessages}
                value={this.state.switchMessageValue}
                onTintColor={"#B52050"}
                tintColor={"#C0C0C0"}
                ios_backgroundColor={"#C0C0C0"}
                style={{ alignSelf: "center", color: "red" }}
                thumbTintColor={"#fff"}
              />
            ) : (
              <Switch
                onValueChange={this.toggleSwitchMessages}
                value={this.state.switchMessageValue}
                onTintColor={"#B52050"}
                tintColor={"#C0C0C0"}
                ios_backgroundColor={"#C0C0C0"}
                style={{ alignSelf: "center", color: "red" }}
                thumbTintColor={"#fff"}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              />
            )}
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              height: 1,
              width: 500,
              backgroundColor: "#DCDCDC",
              justifyContent: "center",
            }}
          ></View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              justifyContent: "space-between",
              width: width - 30,
              height: 50,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                fontWeight: "bold",
                width: "70%",
              }}
            >
              In-app vibrations
            </Text>
            {Platform.OS == "ios" ? (
              <Switch
                onValueChange={this.toggleSwitchVibrations}
                value={this.state.switchVibrationValue}
                onTintColor={"#B52050"}
                tintColor={"#C0C0C0"}
                ios_backgroundColor={"#C0C0C0"}
                style={{ alignSelf: "center", color: "red" }}
                thumbTintColor={"#fff"}
              />
            ) : (
              <Switch
                onValueChange={this.toggleSwitchVibrations}
                value={this.state.switchVibrationValue}
                onTintColor={"#B52050"}
                tintColor={"#C0C0C0"}
                ios_backgroundColor={"#C0C0C0"}
                style={{ alignSelf: "center", color: "red" }}
                thumbTintColor={"#fff"}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              />
            )}
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              height: 1,
              width: 500,
              backgroundColor: "#DCDCDC",
              justifyContent: "center",
            }}
          ></View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              justifyContent: "space-between",
              width: width - 30,
              height: 50,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                fontWeight: "bold",
                width: "70%",
              }}
            >
              In-app sounds
            </Text>
            {Platform.OS == "ios" ? (
              <Switch
                onValueChange={this.toggleSwitchSound}
                value={this.state.switchSoundValue}
                onTintColor={"#B52050"}
                tintColor={"#C0C0C0"}
                ios_backgroundColor={"#C0C0C0"}
                style={{ alignSelf: "center", color: "red" }}
                thumbTintColor={"#fff"}
              />
            ) : (
              <Switch
                onValueChange={this.toggleSwitchSound}
                value={this.state.switchSoundValue}
                onTintColor={"#B52050"}
                tintColor={"#C0C0C0"}
                ios_backgroundColor={"#C0C0C0"}
                style={{ alignSelf: "center", color: "red" }}
                thumbTintColor={"#fff"}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
              />
            )}
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{ width: width, height: 40, backgroundColor: "#f6f7f8" }}
          >
            <View
              style={{
                height: "100%",
                width: width - 30,
                backgroundColor: "#f6f7f8",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  opacity: 1,
                  fontSize: 16,
                  fontFamily: "Montserrat-Bold",
                  color: "#808c94",
                }}
              >
                Legal
              </Text>
            </View>
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              justifyContent: "space-between",
              width: width - 30,
              height: 50,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                fontWeight: "bold",
                width: "70%",
              }}
            >
              Privacy policy
            </Text>
            <Image
              style={{ alignSelf: "center" }}
              source={require("../../assets/Images/@arrow-right.png")}
            />
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              height: 1,
              width: 500,
              backgroundColor: "#DCDCDC",
              justifyContent: "center",
            }}
          ></View>
          {/* <View style={{ justifyContent: 'space-between', width: width, height: 50, flexDirection: 'row' }}>
            <Text style={{ marginLeft: 20,  fontSize: 20, alignSelf: 'center' }}>Terms of Service</Text>
          </View> */}

          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              justifyContent: "space-between",
              width: width - 30,
              height: 50,
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                alignSelf: "center",
                fontWeight: "bold",
                width: "70%",
              }}
            >
              Terms of service
            </Text>
            <Image
              style={{ alignSelf: "center" }}
              source={require("../../assets/Images/@arrow-right.png")}
            />
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              height: 1,
              width: 500,
              backgroundColor: "#DCDCDC",
              justifyContent: "center",
            }}
          ></View>
          <View
            style={{ width: width, height: 40, backgroundColor: "#f6f7f8" }}
          >
            <View
              style={{
                height: "100%",
                width: width - 30,
                backgroundColor: "#f6f7f8",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  opacity: 1,
                  fontSize: 16,
                  fontFamily: "Montserrat-Bold",
                  color: "#808c94",
                }}
              >
                Account
              </Text>
            </View>
          </View>
          <View
            style={{ height: 10, width: width, backgroundColor: "#fff" }}
          ></View>
          <View
            style={{
              justifyContent: "space-between",
              width: width - 30,
              height: 50,
              flexDirection: "row",
              backgroundColor: "#fff",
              alignSelf: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this._onLogOut()}
              style={{ width: "100%" }}
            >
              <Text
                style={{
                  fontSize: 17,
                  alignSelf: "center",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>

      
          <ModelOverlay
            showBg={true}
            closeModal={() => this.setState({ modalVisible: false })}
            posPress={() => this.setState({
                          modalVisible: false,
                          hideProfileValue: true,
                          })}
            modalVisible={this.state.modalVisible}
            title="Hide Profile"
            posBtn="hide profile"
            tintColor='grey'
            cancelColor={Colors.colorMusic}
            msg="This will prevent other users from seeing your profile. Do you want to continue?"
          />

          <ModelOverlay
            showBg={true}
            closeModal={() => this.setState({ modalVisibleLogOut: false })}
            posPress={() => this._onLogOut()}
            modalVisible={this.state.modalVisibleLogOut}
            title="Logout"
            tintColor='grey'
            cancelColor={Colors.colorMusic}
            posBtn="Logout"
            msg="Are you sure want to log out?"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default withNavigation(homeScreen);
