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
import ScreenHeader from "../../components/ScreenHeader";
export default class AskQues extends Component {
  state = {
    input: "",
    isApiCall: false,
    selection: { start: 0, end: 0 },
  };


  postQue(){
    const {contactType} = this.props.navigation.state.params || {}
      if(this.state.input.length == 0){
        alert('Please enter your message')
        return
      }
     this.setState({isApiCall:true})
        contactUs(MobxStore.userObj.user_id,contactType,this.state.input?.trim()).then(resp => {
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

  onSelectionChange = ({ nativeEvent: { selection, text } }) => {
    this.setState({ selection: { start: selection.end, end: selection.end } });
  };


  render() {

    const {type} = this.props.navigation.state.params || {}
    return (
      <>
      <Container style={{flex:1}}>
       
       <ScreenHeader  title={type} isCenter />

        <View style={{ flex: 1, width: "100%" }}>
          <TextInput
          autoFocus
            placeholder={type}
            value={this.state.input}
            editable={!this.state.isApiCall}
            onChangeText={text => this.setState({ input:text })}
            style={{ padding: 20 }}
            multiline
            onSelectionChange={this.onSelectionChange}
        selection={this.state.selection}
            fontSize={17}
            fontFamily={"Montserrat-Bold"}
          />
        </View>

       
      </Container>
      <KeyboardAvoidingView behavior={HelperMethods.isPlatformAndroid() ? '' : 'padding'}>

      <View style={{width:'100%'}} >
            
            <GradButton
            style={{opacity:this.state.input.trim().length == 0 ? 0.7 : 1}}
              onPress={() => this.postQue()}
              isApiCall={this.state.isApiCall}
              text="Send message"
            />
            </View>
      </KeyboardAvoidingView>
            </>
    );
  }
}
