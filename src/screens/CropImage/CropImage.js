import React, { Component } from "react";
import {
  Image,
  Dimensions,
  Switch,
  Platform,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import Container from "../../AppLevelComponents/UI/Container";
import { TextInput } from "react-native-gesture-handler";
import GradButton from "../../common/gradientButton";
const { height, width } = Dimensions.get("screen");
import { contactUs } from "ServiceProviders/ApiCaller";
import ImageCropper from "react-native-simple-image-cropper";
import MobxStore from "../../StorageHelpers/MobxStore";
import HelperMethods from "../../Helpers/Methods";
import { withNavigation } from "react-navigation";

const window = Dimensions.get("screen");
const w = window.width;

const IMAGE = "https://picsum.photos/id/48/900/500";

const CROP_AREA_WIDTH = w;
const CROP_AREA_HEIGHT = w;

class CropImage extends Component {
  state = {
    input: "",
    isApiCall: false,
    cropperParams: {},
    dataSource:[{'s':'s'},{'s':'s'}],
    croppedImage: "",
    switchMessageValue:false,
  };

  setCropperParams = cropperParams => {
    this.setState(prevState => ({
      ...prevState,
      cropperParams
    }));
  };

  handlePress = async () => {
    const { cropperParams } = this.state;

    const cropSize = {
      width: 200,
      height: 200
    };

    const cropAreaSize = {
      width: CROP_AREA_WIDTH,
      height: CROP_AREA_HEIGHT
    };

    try {
        const result = await ImageCropper.crop({
            ...cropperParams,
        imageUri: IMAGE,
        cropSize,
        cropAreaSize
    });
    alert(JSON.stringify( 'result'))
      this.setState(prevState => ({
        ...prevState,
        croppedImage: result
      }));

    //   this.props.navigation.state.params.croppedImageGetter();
        // this.props.navigation.goBack();
    } catch (error) {
    //   alert(JSON.stringify( error))
    }
  };

  toggleSwitchMessages = (value) => {
    this.setState({ switchMessageValue: value })
  }


  render() {
    const { type } = this.props.navigation.state.params || {};
    return (
      <Container>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: width,
            marginVertical: 40,
            justifyContent: "space-between",
            bottom: 7,

            borderColor: "#DCDCDC"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.pop()}
            style={{ justifyContent: "center", width: width / 6 }}
          >
            <View>
              <Image
                source={require("../../assets/Images/Left.png")}
                style={{
                  height: height / 40,
                  marginLeft: 20,
                  width: width / 20
                  // alignSelf: "center"
                }}
                resizeMode={"contain"}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignSelf: "center",
              width: width / 1.2
            }}
          >
            <Text
              style={{
                fontSize: 20,
                alignSelf: "center",
                fontWeight: "bold",
                marginRight: width / 6,
                width: "100%",
                textAlign: "center"
              }}
            >
              Crop
            </Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <ImageCropper
            imageUri={this.props.navigation.params?.image || IMAGE}
            cropAreaWidth={CROP_AREA_WIDTH}
            cropAreaHeight={CROP_AREA_HEIGHT}
            setCropperParams={this.setCropperParams}
          >

          </ImageCropper>

                <View style={{marginTop:30, justifyContent: 'space-between', width: w - 30, height: 50, flexDirection: 'row', alignSelf: 'center', backgroundColor: 'transparent' }}>
            <Text style={{ fontSize: 17, alignSelf: 'center', fontWeight: 'bold', width: '70%' }}>Add image as my display photo</Text>
            {Platform.OS == 'ios' ?
              <Switch
                onValueChange={this.toggleSwitchMessages}
                value={this.state.switchMessageValue}
                onTintColor={'#B52050'}
                tintColor={'#C0C0C0'}
                ios_backgroundColor={'#C0C0C0'}
                style={{ alignSelf: 'center', color: 'red' }}
                thumbTintColor={'#fff'}
              /> :
              <Switch
                onValueChange={this.toggleSwitchMessages}
                value={this.state.switchMessageValue}
                onTintColor={'#B52050'}
                tintColor={'#C0C0C0'}
                ios_backgroundColor={'#C0C0C0'}
                style={{ alignSelf: 'center', color: 'red' }}
                thumbTintColor={'#fff'}
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }} />}
          </View>
        </View>

        <View style={{ width: "100%" }}>
          <GradButton text="Add to profile" onPress={this.handlePress} />
        </View>
        
      </Container>
    );
  }
}

const styles={
    line:{
        backgroundColor:'#fff',width:'100%',height:1,position:'absolute',top:60
    }
}

export default withNavigation(CropImage)