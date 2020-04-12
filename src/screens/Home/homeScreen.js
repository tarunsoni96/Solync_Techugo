import React, { Component } from "react";
import {
  View,
  Dimensions,
  BackHandler,
AppState,
} from "react-native";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import Constants from 'Helpers/Constants'
import HelperMethods from 'Helpers/Methods'
import Header from "../../common/header";
import Container from 'AppLevelComponents/UI/Container'
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import SocketIO from '../../components/SocketIO'
import MobxStore from "../../StorageHelpers/MobxStore";
import NavigationConsistor from "../../Logicals/NavigationConsistor";
import { withNavigation } from "react-navigation";
import Icons from "../../AppLevelComponents/UI/Icons";

const { height, width } = Dimensions.get("screen");
class homeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: "",
      userId: "",
      appState: AppState.currentState
    };
  }

  showDetails(param) {
    this.setState({
      show: param
    });
  }

  componentDidMount() {
    socketio = new SocketIO()
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.navigation.addListener('willFocus',this.willFocus)
    this.props.navigation.addListener('willBlur',this.willBlur)
    this.updateReadStatus()
    if (this.state.param == null) {
      this.showDetails("MUSIC");
    }
  }

  willFocus = () => {
    this.initChatListener()
    this.updateReadStatus()
  }

  willBlur = () => {
    NavigationConsistor.turnOffChatListeners(socketio,['receiveHomeMessage',])
  }

  _handleAppStateChange = (nextAppState) => {
    if(nextAppState.match(/inactive|background/)){
      socketio.emitToEvent('disconnectUser',{"user_id":MobxStore.userObj.user_id})
    }

    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.initChatListener()
    }
    this.setState({appState: nextAppState});
  }

  componentWillUnmount(){
    socketio.emitToEvent('disconnectUser',{"user_id":MobxStore.userObj.user_id})
    NavigationConsistor.turnOffChatListeners(socketio,['conversationList',])
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  initChatListener(){

    AsyncStorageHandler.get(Constants.userInfoObj,val => {
      if(val != null){
        const {user_id,images} = val
       MobxStore.updateUserObj(val)
       socketio.listenEvent('receiveHomeMessage',callBackData => {
           HelperMethods.triggerChatMsgFeedback(this.props.navigation,callBackData.result)
        })
      }
    })
  }

  updateReadStatus(){
    socketio.emitToEvent('conversationList',{"user_id":MobxStore.userObj.user_id})
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />
      </View>
    );
  }
}

export default withNavigation(homeScreen)