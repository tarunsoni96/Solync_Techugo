import React, { Component } from "react";
import {
  Image,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import Container from "../../AppLevelComponents/UI/Container";
import { TextInput } from "react-native-gesture-handler";
import GradButton from "../../common/gradientButton";
const { height, width } = Dimensions.get("screen");
import {contactUs} from 'ServiceProviders/ApiCaller'
import MobxStore from "../../StorageHelpers/MobxStore";
import HelperMethods from "../../Helpers/Methods";
export default class AskQues extends Component {
  state = {
    input: "",
    isApiCall: false
  };


  postQue(){
    const {contactType} = this.props.navigation.state.params || {}
      if(this.state.input.length == 0){
        alert('Please enter your message')
        return
      }
     this.setState({isApiCall:true})
        contactUs(MobxStore.userObj.user_id,contactType,this.state.input).then(resp => {
          const {statusCode } = resp
          if(statusCode == 200){
            HelperMethods.snackbar('Sent successfully')
            this.props.navigation.pop()
          }
          this.setState({isApiCall:false})
          
        }).catch(err => {
          this.setState({isApiCall:'failed'})
        })
  }

  render() {

    const {type} = this.props.navigation.state.params || {}
    return (
      <Container style={{flex:1}}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: width,
            marginVertical: 40,
            justifyContent: "space-between",
            bottom:7,

            borderColor: "#DCDCDC"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.pop()}
            style={{justifyContent: "center",width: width / 6}}>
            <View>
              <Image
                source={require("../../assets/Images/Left.png")}
                style={{
                  height: height / 40,
                  marginLeft:12,
                  width: width / 20,
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
            <Text style={{fontSize: 20,alignSelf: "center",fontWeight: "bold",marginRight: width / 6,width: "100%",textAlign: "center"}}>
              {type}
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, width: "100%" }}>
          <TextInput
          autoFocus
            placeholder={type}
            value={this.state.input}
            editable={!this.state.isApiCall}
            onChangeText={text => this.setState({ input:text })}
            style={{ padding: 20 }}
            multiline
            fontSize={17}
            fontFamily={"Montserrat-Bold"}
          />
        </View>

        <View style={{width:'100%'}} >
            
        <GradButton
        style={{opacity:this.state.input.length == 0 ? 0.7 : 1}}
          onPress={() => this.postQue()}
          isApiCall={this.state.isApiCall}
          text="Send message"
        />
        </View>
      </Container>
    );
  }
}
