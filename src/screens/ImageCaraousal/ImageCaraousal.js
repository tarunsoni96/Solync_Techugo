import React, { Component } from "react";
import {
  Image,
  Dimensions,
  Text,
  View,
  Modal,
  StatusBar,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { fetchUserImages } from "ServiceProviders/ApiCaller";
import MobxStore from "../../StorageHelpers/MobxStore";
import HelperMethods from "../../Helpers/Methods";
import ScreenHeader from "../../components/ScreenHeader";
import NetworkAwareContent from "../../AppLevelComponents/UI/NetworkAwareContent";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import Loader from "../../AppLevelComponents/UI/Loader";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
import Container from "../../AppLevelComponents/UI/Container";
export default class ImageCaraousal extends Component {
  state = {
    input: "",
    isApiCall: false,
    images:[],
    activeSlide:0
  };

  componentDidMount() {
    this.getImages();
  }
  postQue() {
    const { contactType } = this.props.navigation.state.params || {};
    if (this.state.input.length == 0) {
      alert("Please enter your message");
      return;
    }
    this.setState({ isApiCall: true });
    contactUs(MobxStore.userObj.user_id, contactType, this.state.input)
      .then((resp) => {
        const { statusCode } = resp;
        if (statusCode == 200) {
          HelperMethods.snackbar("Sent successfully");
          this.props.navigation.pop();
        }
        this.setState({ isApiCall: false });
      })
      .catch((err) => {
        this.setState({ isApiCall: "failed" });
      });
  }

  getImages() {
    const { userObj } = this.props;
    this.setState({ isApiCall: true });
    fetchUserImages(userObj.user_id)
      .then((resp) => {
        // HelperMethods.animateLayout()
        this.setState({ isApiCall: false, images: resp.result });
      })
      .catch((err) => {
        this.setState({ isApiCall: "failed" });
      });
  }

  renderItem = ({ item, index }) => {
    return (
        <ImageBackground
          source={{ uri: item.imageURL }}
          style={{flex:1}}
          imageStyle={{height:heightPercentageToDP(80)}}
          resizeMode='contain'
          onLoadEnd={()=>this.setState({['loadingImage'+index]:false})}
          onLoadStart={() => this.setState({ ["loadingImage" + index]: true })}
        >

          {this.state['loadingImage'+index] && 
          <Loader  />
          }
        </ImageBackground>
    );
  };

  get pagination () {
    const { images, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={{  }}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotStyle={{
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
}



  render() {
    const { visible, userObj, closeModal } = this.props;
    return (

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        
        onRequestClose={() => {
          closeModal();
        }}
      >
      <StatusBar translucent={true} barStyle="light-content" />

        <View
          style={{
            flex: 1,
            // backgroundColor: "rgba(0,0,0,0.8)",
            alignItems: "center",
          }}
        >

         
<TouchableWithoutFeedback onPress={()=>closeModal()} >
        <View style={{backgroundColor:'rgba(0,0,0,1)',position:'absolute',height:'100%',width:'100%'}} />
      </TouchableWithoutFeedback>

      <ScreenHeader
      titleStyle={{maxWidth:'70%'}}
      icon='md-close'
            style={{ marginLeft:0 }}
            title={`${userObj?.first_name}'s profile picture${this.state.images.length > 1 ? 's' : ''}`}
            onPressBack={() => closeModal()}
            isCenter
            color="#fff"
          />
          <View style={{ justifyContent: "center" }}>
            <NetworkAwareContent
              apiFunc={() => this.getImages()}
              loaderColor="#fff"
              isApiCall={this.state.isApiCall}
            >



            <View style={{flex:HelperMethods.isIphoneXorAbove() ? 0.8 : 0.87}}>

              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                // layout='stack'
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                data={this.state.images}
                renderItem={this.renderItem}
                sliderWidth={widthPercentageToDP(100)}
                itemWidth={widthPercentageToDP(96)}
              />
              { this.pagination }
              </View>

            </NetworkAwareContent>
          </View>
        </View>


      </Modal>

    );
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
};
