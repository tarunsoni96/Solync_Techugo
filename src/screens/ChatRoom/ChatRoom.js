import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  AppState,
  TouchableWithoutFeedback,
  ImageBackground,
  Keyboard
} from "react-native";
import OutsideCloser from "../../components/OutsideCloser";
import {widthPercentageToDP as wp, heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
const { height, width } = Dimensions.get("screen");
import { Colors } from "UIProps/Colors";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { uploadImages } from "ServiceProviders/ApiCaller";
import ModalOverlay from "../../components/ModelOverlay";
import { openGalleryMultiple,openCam } from "ServiceProviders/TakePhoto";

import Icons from "AppLevelComponents/UI/Icons";

import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import Fonts from "UIProps/Fonts";
/* IMPORTING HEADER */
import SocketIO from "../../components/SocketIO";
import HelperMethods from "Helpers/Methods";
import "Helpers/global";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import { observer } from "mobx-react";
/* IMPORTING SWIPEABLE FLATLIST MODULE */
import { withNavigation, FlatList } from "react-navigation";
import MobxStore from "../../StorageHelpers/MobxStore";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "../../Helpers/Constants";
import moment from "moment";
import Loader from "../../AppLevelComponents/UI/Loader";
import NavigationConsistor from "../../Logicals/NavigationConsistor";

let chatData = [
  {
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWsMN61CaBzHtAp1Fm4BwQnLJmiM4u5QRAX2-avVzstvlBvutn",
    userName: "Pearl",
    userMsg: "How about Thailand?",
    messageTime: "Thursday",
    rightLabel: "Block"
  },
  {
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs1Xlgt2ZKWjVFmxJIgRoJ3iDR-pyfMqWLXLZ8UD_tLOlsNHSE",
    userName: "Eva",
    userMsg: "How about Thailand?",
    messageTime: "12:30pm",
    rightLabel: "Block"
  },
  {
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-nzFuAX61IiBZTjapfNweSU0AcD3Eu4rXny_v_geVSV6JGo2",
    userName: "Ben",
    userMsg: "How about Thailand?",
    messageTime: "Thursday",
    rightLabel: "Block"
  },
  {
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWsMN61CaBzHtAp1Fm4BwQnLJmiM4u5QRAX2-avVzstvlBvutn",
    userName: "Josie",
    userMsg: "How about Thailand?",
    messageTime: "Monday",
    rightLabel: "Block"
  },
  {
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs1Xlgt2ZKWjVFmxJIgRoJ3iDR-pyfMqWLXLZ8UD_tLOlsNHSE",
    userName: "Eva",
    userMsg: "How about Thailand?",
    messageTime: "11:20am",
    rightLabel: "Block"
  },
  {
    userImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc-nzFuAX61IiBZTjapfNweSU0AcD3Eu4rXny_v_geVSV6JGo2",
    userName: "Stanley",
    userMsg: "How about Thailand?",
    messageTime: "yesterday",
    rightLabel: "Block"
  }
];

let myUserId;

let tintColor = "";
let categoryPic;
let clientMsgColor = "#F4F5F6";

let params = {}

var group_id = ''
@observer
class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.isLeaved = false
    this.isGroupChat = false;
    this.sendProps = undefined;
    this.giftedChatRef = null;
    this.state = {
      search: "",
      showEvent: false,
      appState: AppState.currentState,
      isModalVisible: false,
      messages: [],
      chatList: chatData,
      groupCreatedName:'',
      blocked: false,
      userStatus: "",
      showChatUsers:false,
      isOnline: null,
      images: [],
      groupUsernames:[],
      groupChatUsers:[],
      showBlockModal: false,
      typingUserName:'',
      showDeleteModal: false
    };
  }

  componentWillMount() {
     params = this.props.navigation?.state?.params;
     if(params?.userObj.chat_type == 'group'){
      this.isGroupChat = true
    }

    this.props.navigation.addListener("willFocus", this.willFocus);
    myUserId = MobxStore.userObj.user_id;
    categoryType = params?.eventType;

    switch (categoryType) {
      case "Music":
        tintColor = Colors.colorMusic;
        categoryPic = require("../../assets/Images/@3xmusic-colour.png");
        categoryBG = require("../../assets/Images/@3xmusic_Ticket_BG.png");
        break;

      case "Sports":
        tintColor = Colors.colorSports;
        categoryPic = require("../../assets/Images/@3xsport-colour.png");
        categoryBG = require("../../assets/Images/@3xsport_ticket_bg.png");
        break;

      case "Travel":
        tintColor = Colors.colorTravel;
        categoryPic = require('../../assets/Images/@3xplane-colour.png')
        categoryBG = require("../../assets/Images/travel_bg.png");
        break;

        default:
        tintColor = Colors.colorMusic;
        categoryPic = require("../../assets/Images/@3xmusic-colour.png");
        categoryBG = require("../../assets/Images/@2xdropdown-box.png");
        break;
    }
  }

  willFocus = () => {
    let newUsersAdded = MobxStore.addedUserChat.length > 0
    if (newUsersAdded && !this.isGroupChat) { //first time group creating
      this.createGroupEvent()
    } else if(newUsersAdded && this.isGroupChat){ //adding more users
      this.addUserToGroup()
    } 
    this.setState({});
  };

  createGroupEvent(){
    MobxStore.userObj = {...MobxStore.userObj,profile_picture:MobxStore.userObj.images[0].imageURL }
    this.setState({/*groupUsernames:[MobxStore?.userObj?.first_name],groupChatUsers:[MobxStore.userObj]*/},()=>{
      this.setUserIds()

      let obj = {
        "user_id":MobxStore.userObj.user_id,
        "group_name":`${params?.event} ${params?.eventYr}`,
        "add_user_ids":userIds,
        "chat_with_id":clientId,
        event:params?.event,
        category_type: params?.eventType,
        event_year:params?.eventYr,

    }

    socketio.listenEvent("createGroup", callBackData => {
      const { result } = callBackData;
      this.isGroupChat = true
      group_id = result?.group_id
      this.setState({groupCreatedName:result?.group_name})
      this.setPreviousMsgs(true,group_id)
    });

    socketio.emitToEvent("createGroup",obj);
    MobxStore.reloadConvList = true
    this.clearAddPersons()
    })
  }

  blockGroup(){
    let obj = {
      "user_id":MobxStore.userObj.user_id,
      group_id,
    }
    MobxStore.reloadConvList = true
    socketio.emitToEvent("blockGroup",obj );
    // this.leaveGroupChat()
  }

  addUserToGroup(){
    this.setUserIds()
    let obj = {
      group_id,
      "group_name":params?.userObj.first_name,
      "other_user_id":userIds,
      user_id:MobxStore.userObj.user_id,
    }
    socketio.emitToEvent("addGroupUser",obj );
    this.clearAddPersons()
  }

  

  setUserIds(){
    let usernames = [...this.state.groupUsernames]
    userIds = MobxStore.addedUserChat.map((item,index) => {
        usernames.push(item.first_name)
      return item.user_id
    }).join(',')
    this.setState({groupUsernames:usernames,groupChatUsers:[...this.state.groupChatUsers,...MobxStore.addedUserChat]})
  }

  clearAddPersons(){
    userIds = []
    MobxStore.removeAllUsers()
  }

  setBlockModalVisible(visible) {
    this.setState({
      showBlockModal: visible
    });
  }

  _Register() {
    this.setState({
      showBlockModal: false
    });
  }

  setDeleteModalVisible(visible) {
    this.setState({
      showDeleteModal: visible
    });
  }

  _deteUser() {
    this.setState({
      showDeleteModal: false
    });
  }

  componentDidMount() {
    socketio = new SocketIO();
    const { params } = this.props.navigation.state;
    clientId = params?.clientId;
    
    AppState.addEventListener("change", this._handleAppStateChange);
    this.setBlockReciever()
    this.setPreviousMsgs();
  }

  setBlockReciever(){
    socketio.listenEvent('blockedReceiver',callBackData => {
      const {result } = callBackData
      if(result == 'blocked'){
        this.setState({blocked:true,blockedBy:true})
        HelperMethods.snackbar('You have been blocked')
      } else if(result == 'deleted'){
        setTimeout(() => {
          HelperMethods.snackbar('This group has been deleted by the admin')
          this.props.navigation.pop()
        }, 600);
      } else {
        this.setState({blocked:false,blockedBy:false})
      }
   })
  }

  initChatListener() {
    const { params } = this.props.navigation.state;

    AsyncStorageHandler.get(Constants.userInfoObj, val => {
      if (val != null) {
        const { user_id } = val;
        myUserId = user_id;
        socketio.emitToEvent("initChat", {
          s_id: user_id,
          id: params?.clientId
        });
      }
    });
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.initChatListener();
    }
    this.setState({ appState: nextAppState });
  };

  attachTypingListener() {
    socketio.listenEvent("typing", callBackData => {
      const { result } = callBackData;
      if(this.isGroupChat){
        HelperMethods.animateLayout()
          this.setState({typingUserName:result != MobxStore.userObj?.first_name ? result : ''},()=>{
          })
      } else {
        this.setState({ userStatus: `${result}...` });
      }
      
    });

    socketio.listenEvent("stopTyping", callBackData => {
      const { result } = callBackData;
      if(this.isGroupChat){
        HelperMethods.animateLayout()
        this.setState({typingUserName:''})
      } else {
        this.setOnlineOffline(result);
      }
    });
  }

  setOnlineOffline(status) {
    this.setState({ userStatus: status == "online" ? "Active" : "Inactive" });
  }

  attachConvListener() {
    socketio.listenEvent("conversationList", callBackData => {
      const { result } = callBackData;
      
      this.setOnlineOffline(result[0]?.online_status);
    });
    socketio.emitToEvent("conversationList", {
      user_id: MobxStore.userObj.user_id
    });
  }

  setPreviousMsgs(getGroupChat = false,groupId) {
    this.setState({ loadingPrevMsg: true });
    const { params } = this.props.navigation.state;
    let getChatListObj = {
      s_id: MobxStore.userObj.user_id,
      id: getGroupChat ? groupId : params?.clientId,
      chat_type: getGroupChat ? 'group' : (params?.userObj.chat_type || 'normal')
    };

    socketio.emitToEvent("getChatList", getChatListObj);
    socketio.listenEvent("getChatList", callBackData => {
      const { result } = callBackData;
      if(result.my_block_status == 'blocked'){
        this.setState({ blocked: true,blockedBy:true, userStatus: "Blocked from this user" });
        return
      }
      if (result.block_status == "blocked" && !this.isGroupChat) {
        HelperMethods.animateLayout();
        this.setState({ blocked: true,blockedBy:false, userStatus: "Blocked" });
        return;
      } else if(result.block_status == 'blocked' && this.isGroupChat){
        if(!this.isLeaved){
          this.leaveGroupChat()
        }
      } else {
        this.setUpGroupChat(result)
        this.setUpChat();
        let msgs = [];

        result?.data?.map((item, index) => {
          let obj = {
            _id: item.id,
            createdAt: item.date_added,
            profile_picture:item.profile_picture,
            first_name:item.first_name,
            system:item.action.length > 0 ? true : false,
            user: {
              _id: item.s_id,
              name: item.s_id,
              avatar: item.thumb_url || "https://placeimg.com/140/140/any"
            }
          };
          if (item?.url.length > 0) {
            obj.url = item.url;
          } else {
            obj.text = item.action.length > 0 ? item.action : item.msg;
          }

          msgs.push(obj);
        });

        HelperMethods.animateLayout();
        this.setState({ messages: msgs, loadingPrevMsg: false });
      }
    });
  }

  leaveGroupChat(){
    this.isLeaved= true
    HelperMethods.snackbar('You have blocked all the users and left from the group')
        MobxStore.reloadConvList = true
        this.props.navigation.pop()
  }

  setUpGroupChat(result){

    if(result.data != undefined && result?.data[0]?.chat_type == 'group'){
      this.setState({groupChatUsers:result.connectedUser})
      group_id = result?.data[0]?.group_id
      this.isGroupChat = true
      let usernames = []
      userIds = result?.connectedUser.map((item,index) => {
        
        usernames.push(item.first_name)
        return item.user_id
      }).join(',')
      this.setState({groupUsernames:usernames})
    }
  }

  setUpChat() {
    socketio.listenEvent("receiveMessage", callBackData => {
      if (callBackData.result.s_id == myUserId) {
        //i have sent
      } else {
        //i have received
        const {
          s_id,
          id,
          msg,
          date_added,
          msg_type,
          url,
          profile_picture,
          first_name
        } = callBackData.result;

        

        let msgObj = [
          {
            _id: id,
            createdAt: new Date(),
            profile_picture,
            first_name,
            user: {
              _id: s_id,
              name: s_id,
              avatar: "https://placeimg.com/140/140/any"
            }
          }
        ];

        if (url && url.length > 0) {
          msgObj[0].url = callBackData.result.url;
        } else {
          msgObj[0].text = callBackData.result.msg;
        }

        HelperMethods.animateLayout();
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, msgObj[0])
        }));
      }
    });

    this.initChatListener();
    // this.setPreviousMsgs()
    this.attachConvListener();
    this.attachTypingListener();
  }

  sendMsg(senderId, clientId, text, imageUrl, type) {
    const { params } = this.props.navigation.state;
    let eventYr = ''
    
    let msgObj = {
      s_id: senderId,
      id : this.isGroupChat ? group_id : clientId,
      first_name:MobxStore.userObj?.first_name,
      profile_picture:MobxStore.userObj.images[0].imageURL,
      chat_type: this.isGroupChat ? 'group' : 'normal' ,
      event_year:params?.eventYr,
      event: params?.event,
      category_type: params?.eventType,
      
    };
    if (type == "image") {
      msgObj.url = imageUrl;
      msgObj.msg_type = "image";
    } else {
      msgObj.msg = text;
      msgObj.msg_type = "text";
    }

    if(this.isGroupChat){
      msgObj.group_name = params?.userObj?.first_name
    }
    socketio.emitToEvent("sendMessage", msgObj);
  }

  componentWillUnmount() {
    NavigationConsistor.turnOffChatListeners(socketio, [
      "receiveMessage",
      "sendMessage",
      "typing",
      'blockedReceiver',
      'createGroup',
    ]);
    MobxStore.removeAllUsers()
  }

  search(text) {
    this.setState({ search: text });
    const { chatList } = this.state;
    if (text.length == 0) {
      HelperMethods.animateLayout();
      this.setState({ chatList: chatData });
    } else {
      let filteredArr = chatList.filter((item, index) => {
        return item.userName.includes(text);
      });
      HelperMethods.animateLayout();
      this.setState({ chatList: filteredArr });
    }
  }

  _renderItem(item) {
    return (
      <View style={{ height: 110 }}>
        <TouchableOpacity
          style={{ height: 110, justifyContent: "center" }}
          onPress={() => alert("coming soon")}
        >
          <View
            style={{
              justifyContent: "center",
              flexDirection: "column",
              alignSelf: "center",
              height: 110
            }}
          >
            <View
              style={{
                height: 110,
                width: width - 30,
                marginTop: 0,
                justifyContent: "space-between",
                alignSelf: "center",
                flexDirection: "row"
              }}
            >
              <Image
                style={{
                  height: 65,
                  width: 65,
                  borderRadius: 65 / 2,
                  alignSelf: "center",
                  justifyContent: "center"
                }}
                source={{ uri: item.userImg }}
              />
              <View
                style={{ height: 110, width: "75%", justifyContent: "center" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      alignSelf: "center",
                      fontWeight: "bold",
                      width: "50%"
                    }}
                  >
                    {item.userName}
                  </Text>
                  <Text
                    style={{ color: "#88939b", alignSelf: "center", right: 5 }}
                  >
                    {item.messageTime}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#777777",
                    fontFamily: "Montserrat-Regular",
                    fontSize: 14
                  }}
                >
                  {item.userMsg}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "#C0C0C0",
              width: width - 30,
              alignSelf: "center"
            }}
          ></View>
        </TouchableOpacity>
      </View>
    );
  }

  onSend(messages = []) {
    this.giftedChatRef.scrollToBottom();
    HelperMethods.animateLayout();
    if(messages[0].text.trim().length == 0){
      return
    }
    
      this.setState(
        previousState => ({
          messages: GiftedChat.append(previousState.messages, messages[0])
        }),
        () => {
          const { params } = this.props.navigation.state || {};
          if (messages[0].url) {
            this.sendMsg(myUserId, clientId, "", messages[0].url, "image");
          } else  {
            this.sendMsg(myUserId, params?.clientId, messages[0].text);
          }
        }
        );
  }

  renderSystemMsg = msg => {
    return(
      <View style={{flexDirection:'row',alignItems:'center',alignSelf:'center',marginTop:5}} > 
        <Icons lib='FontAwesome' name='user' color='#9AA3A9' size={17} />
        <Text style={styles.systemMsgStyle} >{msg.currentMessage.text}</Text>
      </View>
    )
  }

  renderFooter = () => {
    if(this.state.typingUserName){

      return(
        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10,marginBottom:8 }} > 

        <View style={{flexDirection:'row',alignItems:'center',}}>

      <View style={styles.circleTyping} />
      <View style={styles.circleTyping} />
      <View style={styles.circleTyping} />
        </View>

      <Text style={[styles.systemMsgStyle,{marginLeft:5}]} >{`${this.state.typingUserName} is typing`}</Text>
      </View>
    )
  } else {
    return <View  style={{margin:8 }} />
  }
  }

  msgBubble = text => {
    bgColor = text.position == "left" ? clientMsgColor : tintColor;
    if (text.currentMessage?.url?.length > 0) {
      if(this.isGroupChat && text.position == 'left'){

        return (
          <View
          style={{flexDirection:'row',alignItems:'center', padding: 10,  }}>
            <Image style={{borderRadius:60,width:40,height:40,position:'absolute',zIndex:100}} source={{uri:text.currentMessage.profile_picture}}  />
          <View
          style={{
            padding: 3,
            marginVertical: 2,
            borderRadius: 10,
            backgroundColor: bgColor,
            marginLeft:10,
          }}
        >
         <Text style={{ color:tintColor, fontFamily: Fonts.medium,paddingLeft:5 }}>
            {text.currentMessage.first_name}
          </Text>


          <Image
            source={{ uri: text.currentMessage?.url }}
            style={{ width: 200, borderRadius: 10, height: 180 }}
            resizeMode="cover"
          />
        </View>
        </View>

      );

      } else {

        return (
          <View
          style={{
            padding: 3,
            marginVertical: 2,
            borderRadius: 10,
            backgroundColor: bgColor
          }}
        >
          <Image
            source={{ uri: text.currentMessage?.url }}
            style={{ width: 200, borderRadius: 10, height: 180 }}
            resizeMode="cover"
          />
        </View>
      );
    }
    }

    if (text.position == "left") {

      if(this.isGroupChat){

        return (
          <View
          style={{flexDirection:'row',alignItems:'center', padding: 6,  }}>

          <Image style={{borderRadius:60,width:40,height:40,position:'absolute',zIndex:100}} source={{uri:text.currentMessage.profile_picture}}  />
          <View
          style={{ padding: 13,paddingLeft:wp(5), borderRadius: 10, backgroundColor: bgColor,marginLeft:20,paddingRight:100 }}
        >

          <Text style={{ color:tintColor, fontFamily: Fonts.medium }}>
            {text.currentMessage.first_name}
          </Text>

          <Text style={{ color: "#000", fontFamily: Fonts.medium }}>
            {text.currentMessage.text}
          </Text>
        </View>
          </View>
      );

      } else {

        return (
          <View
          style={{ padding: 13, borderRadius: 10, backgroundColor: bgColor }}
        >
          <Text style={{ color: "#000", fontFamily: Fonts.medium }}>
            {text.currentMessage.text}
          </Text>
        </View>
      );
    }
    } else {
      return (
        <View
          style={{ padding: 13,marginHorizontal:13, borderRadius: 10, backgroundColor: bgColor }}
        >
          <Text style={{ color: "#fff", fontFamily: Fonts.medium }}>
            {text.currentMessage.text}
          </Text>
        </View>
      );
    }
  };

  toggleEvent() {
    HelperMethods.animateLayout();
    this.setState({ showEvent: !this.state.showEvent });
  }

  toggleBlockModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  handleBackBtn() {
    HelperMethods.animateLayout();
    if (this.state.isModalVisible) {
      this.setState({ isModalVisible: false });
    } else if (this.state.showEvent) {
      this.setState({ showEvent: false });
    } else if(this.state.showAttachPopup){
      this.setState({showAttachPopup:false})
    } else if(this.state.showChatUsers){
      this.setState({showChatUsers:false})
    } else {
      this.props.navigation.goBack();
    }
  }

  handlePressIn = event => {
    HelperMethods.animateLayout();
    this.setState({ showEvent: false });
  };

  renderLoader() {
    return <Loader color={Colors.accent} />;
  }

  renderSend = props => {
    this.sendProps = props;
    const { params } = this.props.navigation.state;
    if (params?.type == "sports") {
      sendBtnColor = Colors.colorSports;
    } else if (params?.type == "travel") {
      sendBtnColor = Colors.colorTravel;
    }

    if (this.state.blocked) {
      return null;
    }
    return (
      <TouchableOpacity
        style={{ backgroundColor: Colors.inputBGChat, flex: 1 }}
        onPress={() => this.triggerOnSend(props)}
      >
        <Text
          style={{
            color: tintColor,
            fontFamily: Fonts.medium,
            top: "27%",
            fontSize: 18,
            alignSelf: "center",
            flex: 1
          }}
        >
          SEND
        </Text>
      </TouchableOpacity>
    );
  };

  blockUnblockUser(action) {
    if(this.isGroupChat){ //block all users
      this.setState({  isModalVisible: false });
      this.blockGroup()

    } else {
      this.setState({ isApiCall: true, isModalVisible: false });
      NavigationConsistor.blockUser(socketio,action, clientId, resp => {
        if (resp.statusCode == 200) {
          MobxStore.reloadConvList = true;
          HelperMethods.animateLayout();
          this.setState({
            blocked: action == "block" ? true : false,
            isApiCall: false
          });
          if (action == "unblock") {
            this.setUpChat();
          this.setPreviousMsgs();
        } else {
          this.setState({ userStatus: "Blocked" });
          this.unSetChat();
        }
      }
    });
    }
  }

  unSetChat() {
    NavigationConsistor.turnOffChatListeners(socketio, [
      "receiveMessage",
      "sendMessage",
      "typing"
    ]);
  }

  renderInputToolbar = props => {
    if (this.state.blocked) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#eee",
            padding: 20
          }}
        >
          <View style={{ width: "70%" }}>
            <Text style={{ fontFamily: Fonts.medium, fontSize: 16 }}>
            {this.state.blockedBy ? 'You are blocked by this user' : 'This user has been blocked from seeing your profile'}
              
            </Text>
          </View>
          {!this.state.blockedBy && 
          <View>
            {this.state.isApiCall ? (
              <Loader color={Colors.accent} />
            ) : (
              <Text
                onPress={() => this.blockUnblockUser("unblock")}
                style={{
                  fontFamily: Fonts.heavy,
                  color: tintColor,
                  fontSize: 17
                }}
              >
                UNBLOCK
              </Text>
            )}
          </View>
          }
        </View>
      );
    }
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor:  Colors.inputBGChat,
          width: "82%",

        }}
      >
        <Icons
          lib="Material"
          name="paperclip"
          color="#404040"
          style={{ marginLeft: 10 }}
          onPress={() => this.toggleAttach()}
        />


        <TextInput
          {...props}
          autoFocus
          onChangeText={msg => this.onInputEdit(msg)}
          value={this.state.msg}
          onFocus={() => this.hideAttach(true)}
          style={{
            fontSize: 18,
            fontFamily: Fonts.medium,
            width: "80%",
            alignItems: "center",
            padding:15,
            backgroundColor: Colors.inputBGChat
          }}
          placeholder="Send a message"
        />
      </View>
    );
  };

  onInputEdit(msg) {
    if (this.timerHandle != null) {
      // ***
      clearTimeout(this.timerHandle); // ***
      this.timerHandle = 0; // ***
    }

    if (!this.state.isTyping) {
      this.emitTyping();
    }

    this.setState({ msg, isTyping: true }, () => {});

    this.timerHandle = setTimeout(() => {
      // ***
      this.setState({ isTyping: false });
      this.emitStopTyping(); // ***
      this.timerHandle = 0; // ***
    }, 1400);
  }

  emitTyping() {
    const { params } = this.props.navigation.state;
    let msgObj = {
      s_id: myUserId,
      group_name:params?.userObj.first_name,
      first_name:MobxStore.userObj.first_name,
      id: this.isGroupChat ? group_id : this.props.navigation.state.params?.clientId,
      chat_type: params?.userObj.chat_type || 'normal',
      msg: this.state.msg ,
      msg_type: "text",
      event: params?.event
    };
    socketio.emitToEvent("typing", msgObj);
  }

  emitStopTyping() {
    const { params } = this.props.navigation.state;
    let msgObj = {
      s_id: myUserId,
      group_name:params?.userObj.first_name,
      first_name:MobxStore.userObj.first_name,
      id: this.isGroupChat ? group_id : this.props.navigation.state.params?.clientId,
      
      chat_type: params?.userObj.chat_type || 'normal',
      msg: this.state.msg || "d",
      msg_type: "text",
      event: params?.event
    };
    socketio.emitToEvent("stopTyping", msgObj);
  }

  renderAttachPopup() {
    let imageSize = 25;
    if (this.state.showAttachPopup) {
      return (
        <ImageBackground
          source={require("../../assets/Images/@popup-bg.png")}
          style={{
            position: "absolute",
            width: "100%",
            bottom: "7%",
            left: "-7%",
            zIndex: 1
          }}
          resizeMode="stretch"
        >

          <TouchableOpacity
            onPress={() => this.openMedia("gall")}
          >
            <View style={[styles.btnContainer, { top: 6 }]}>
              <Image
                source={require("../../assets/Images/@3xphoto-library.png")}
                style={{ width: imageSize, height: imageSize }}
                resizeMode="contain"
              />

              <Text style={styles.font}>Add from photo library</Text>
            </View>
          </TouchableOpacity>

          <View style={{ height: 1, backgroundColor: "#eee", width: "96%" }} />

          <View
            style={[
              styles.triangleWhite,
              {
                left: "9.5%",
                zIndex: 100,
                bottom: "-2%",
                position: "absolute"
              }
            ]}
          />

          <TouchableOpacity onPress={() => this.openMedia("cam")}>
            <View style={[styles.btnContainer, { bottom: 6 }]}>
              <Image
                source={require("../../assets/Images/@3xphoto-camera.png")}
                style={{ width: imageSize, height: imageSize }}
                resizeMode="contain"
              />
              <Text style={styles.font}>Take a photo</Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      );
    }
  }

  openMedia(type) {
    this.setState({ images: [],showAttachPopup: false  });
    if (type == "cam") {
      openCam(resp => {
        this.setAndSendPhotos([resp],true)
      });
    } else {
      openGalleryMultiple(resp => {
        
        this.setAndSendPhotos(resp)
      });
    }
  }

  setAndSendPhotos(resp,isCam = false){
    let imagesArr = [...this.state.images];
        resp.forEach((item, index) => {
          // alert(item.path)
          if (this.state.images.length < 7)
            imagesArr.unshift({ uri:isCam ? item.uri : item.path });
        });
        HelperMethods.animateLayout();
        this.setState({ images: imagesArr });
        uploadImages(imagesArr).then(resp => {
          if (resp.statusCode == 200) {
            const { result } = resp;
            result.forEach((url, index) => {
              if (this.sendProps) {
                this.triggerOnSend(this.sendProps, true, url);
              }
            });
          }
        });
  }

  toggleAttach() {
    Keyboard.dismiss();
    HelperMethods.animateLayout();
    this.setState({ showAttachPopup: !this.state.showAttachPopup });
  }

  triggerOnSend(props, isImage, url) {
    if (this.state.loadingPrevMsg) {
      let alrt = "Please wait, loading previous messages";
      HelperMethods.isPlatformAndroid()
        ? HelperMethods.snackbar(alrt)
        : alert(alrt);
      return;
    }

    this.hideAttach(true);

    if (isImage) {
      props.onSend({ url }, true);
    } else if (this.state.msg) {
      props.onSend({ text: this.state.msg }, true);
      this.setState({ msg: "" });
    }
  }

  hideAttach(showEvent) {
    HelperMethods.animateLayout();
    this.setState({ showAttachPopup: false,showChatUsers:false,showEvent:!showEvent ? false : this.state.showEvent });
  }

  renderChatDP() {
    const { params } = this.props.navigation.state;
    if (this.isGroupChat) {
      // group
      return <Text>{`+${this.state.groupUsernames.length}`}</Text>;
    } else {
      return (
        
        <Image
          source={{
            uri:
              params?.userObj.profile_picture ||
              "https://absorbmarketing.com/wp-content/uploads/2015/01/Picture-of-person.png"
          }}
          style={{ width: 35,height:35, borderRadius: 50 }}
          resizeMode="cover"
        />
      );
    }
  }

  renderChatTitles(groupName) {
    let i = this.state.groupUsernames.findIndex(v => v == MobxStore.userObj.first_name)
    if(i > -1){
      this.state.groupUsernames[i] = 'You'
    }
    if (this.isGroupChat) {
      return (
        <>
          <ScrollView horizontal>
          <View>

          <Text style={{ color: '#000',fontFamily:Fonts.medium,fontSize:wp(4.4) }} numberOfLines={1}>{ groupName || params?.userObj.first_name}</Text>
            <Text style={{ color: tintColor }}>
              {this.state.groupUsernames.join(", ")}
            </Text>
          </View>
          </ScrollView>
        </>
      );
    } else {
      return (
        <>
          <ScrollView horizontal>
            <Text style={{ color: "#000",fontSize:17,fontFamily:Fonts.medium }}>
              {params?.userObj.first_name}
              {MobxStore.addedUserNamesChat.join("")}
            </Text>
          </ScrollView>
          <Text style={{ color: tintColor,fontSize:14,fontFamily:Fonts.medium }}>{this.state.userStatus}</Text>
        </>
      );
    }
  }

  toggleUserList(){
    if(this.isGroupChat){
      HelperMethods.animateLayout()
  this.setState({showEvent:false, showChatUsers:!this.state.showChatUsers})      
    }
  }


  renderChatUsers() {
    if (this.state.showChatUsers) {
      return (
        <>
        <ImageBackground
            source={require("../../assets/Images/@popup-bg.png")}
            style={{
              height: 'auto',
              width:  'auto',
              zIndex: 19,
              alignSelf: "flex-start",
              padding: 10,
              paddingTop:30,
              paddingBottom:20,
              marginLeft:20,
            }}
            resizeMode={"stretch"}>
            <FlatList
              data={this.state.groupChatUsers}
          renderItem={this.renderGroupChatUsers}
          keyExtractor={(item,index) => item.first_name} 
          extraData={this.state}
              style={{maxWidth:wp(60), maxHeight:200 }}
              keyboardShouldPersistTaps='always'
              showsVerticalScrollIndicator={false}
            />

<View
            style={[
              styles.triangleWhite,
              {
                zIndex: 100,
                top: "2%",
                left: "13.5%",
                position: "absolute",
                transform: [{ rotate: "0deg" }]
              }
            ]}
          /> 

          </ImageBackground>

         
          </>
      );
    }
  }

    navigateToUserProfile(userData){
      this.toggleUserList()
      if(MobxStore.userObj?.first_name != userData.first_name){
        MobxStore.navigateToTab = categoryType
        this.props.navigation.navigate('Home')
      }
  }

  renderGroupChatUsers = ({item,index}) => {
    return(
      
      <TouchableOpacity style={{}} onPress={()=> this.navigateToUserProfile(item) } >

      <View style={{padding:15,flexDirection:'row',alignItems:'center'}}> 
        <Image style={{borderRadius:50,width:30,height:30}} source={{uri:item.profile_picture}} />   
        <Text style={{fontSize:16,fontFamily:Fonts.heavy,marginLeft:20}}>{MobxStore.userObj?.first_name == item.first_name ? 'You' : item.first_name}</Text>
        
      </View>

      {Math.abs(index - this.state.groupChatUsers.length) != 1 && 
      <View style={{backgroundColor:'#E4E7EA',height:1.5,width:'100%',}} />
      }
      </TouchableOpacity>
    )
  }



  isIphoneXorAbove() {
    const dimen = Dimensions.get('window');
    return (
      Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <SafeAreaView style={{ flex: 1, }}
      >
        {(this.state.showAttachPopup || this.state.showChatUsers || this.state.showEvent) ? (
          <>
            <TouchableOpacity
              onPress={() => this.hideAttach()}
              style={{
                height: "77%",
                opacity: 1,
                position: "absolute",
                width: "100%",
                zIndex: 1,

              }}
            />
            <TouchableOpacity
              onPress={() => this.hideAttach()}
              style={{
                height: "20%",
                bottom: "7%",
                opacity: 1,
                position: "absolute",
                width: this.state.showChatUsers || this.state.showEvent ? '100%' : "26%",
                right: 0,
                zIndex: 1
              }}
            />
          </>
        ) : null}

        <View
          style={{
            position: "relative",
            alignItems: "center",
            flexDirection: "row",
            width: width,
              marginTop: 20,

            justifyContent: "space-between",
            borderColor: "#DCDCDC",
            alignSelf: "center"
          }}
        >
          <View
            style={{
              // marginTop: 20,
              // marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 20,
              flexDirection: "row"
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require("../../assets/Images/Left.png")}
                style={{ height: height / 40, width: width / 20 }}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
            
            <TouchableWithoutFeedback onPress={()=>this.toggleUserList()} >

            <View style={[styles.circle, { marginLeft: 20 }]}>
              {this.renderChatDP()}
            </View>
            </TouchableWithoutFeedback>

            <View style={styles.headerTitle}>
              {this.renderChatTitles(this.state.groupCreatedName)}
            </View>
          </View>

          {!this.state.blocked && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.toggleEvent()}>
                <Image source={categoryPic} resizeMode='contain' style={[styles.imageStyle,{marginTop:12,marginRight:12}]} />
              </TouchableOpacity>

              {this.state.showEvent && (
                <View
                  style={[
                    styles.triangle,
                    {
                      right: "75%",
                      top: "85%",
                      position: "absolute",
                      borderBottomColor: tintColor
                    }
                  ]}
                />
              )}

              <TouchableOpacity
                onPress={() => {
                  this.setState({ showEvent: false });
                  this.props.navigation.navigate("AddPersonChat", {
                    tintColor,
                    group_id,
                    chattingWith: this.isGroupChat ? '' : clientId,
                  });
                }}
              >
                <Image
                  source={require("../../assets/Images/@2xadd-person-chat.png")}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({ showEvent: false });
                  this.toggleBlockModal();
                }}
              >
                <Image
                  source={require("../../assets/Images/@2xblock.png")}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            </View>
          )}

          <BackHandlerSingleton onBackPress={() => this.handleBackBtn()} />
        </View>

        {this.renderChatUsers()}


        <OutsideCloser show={this.state.showEvent}>
          <>
            <ImageBackground
              style={{
                padding:height < MobxStore.heightToScaleSmall ? 10 : 15,
                alignSelf:'center',
                marginLeft:wp(0),
                marginBottom: 1,
                marginTop:10,
                width: wp(80)
              }}
              imageStyle={{ borderRadius:7,padding:0 }}
              source={categoryBG}
            >
              <Text style={{ color: "#eee" }}>{params?.eventType == 'Travel' ? 'Location:' :'Event:'} </Text>
              <Text style={{ color: "#fff", fontFamily: Fonts.medium }}>
                {params?.event}
              </Text>
            </ImageBackground>
          </>
        </OutsideCloser>

        {this.renderAttachPopup()}


        <GiftedChat
          renderAvatar={null}
          ref={ref => (this.giftedChatRef = ref)}
          renderBubble={this.msgBubble}
          renderComposer={this.renderInputToolbar}
          bottomOffset={this.isIphoneXorAbove() ? 23 : undefined}
          renderSend={this.renderSend}
          renderSystemMessage={this.renderSystemMsg}
          keyboardShouldPersistTaps="always"
          renderFooter={this.renderFooter}
          renderLoading={this.renderLoader}
          isAnimated
          extraData={this.state}
          style={{ zIndex: 1 ,}}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: MobxStore.userObj.user_id
          }}
        />

        <ModalOverlay
          closeModal={() => this.setState({ isModalVisible: false })}
          userObj={this.props.navigation.state.params?.userObj}
          modalVisible={this.state.isModalVisible}
          showBg
          posBtn={this.isGroupChat ? 'Block' : null}
          isGroupChat={this.isGroupChat}
          tintColor={tintColor}
          posPress={() => this.blockUnblockUser("block")}
          bgColor="#4DB196"
        />
      </SafeAreaView>
    );
  }
}

const styles = {
  circle: {
    width:  wp(9),
    height: wp(9),
    borderRadius: 100 / 2,
    backgroundColor: "#f7f7f9",
    alignItems: "center",
    justifyContent: "center"
  },

  btnContainer: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 40
  },

  imageStyle: {
    width: 22,
    height: 22,
    margin: 10
  },

  searchSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F7F8",
    paddingLeft: 20
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,

    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: tintColor
  },

  triangleWhite: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,

    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#fff",
    transform: [{ rotate: "180deg" }]
  },

  font: {
    fontFamily: Fonts.medium,
    color: "#000",
    textAlign: "left",
    fontSize: 16,
    paddingHorizontal: 10
  },

  systemMsgStyle:{
    marginLeft:5,
    fontSize:14,alignSelf:'center',textAlign:'center',color:'#9AA3A9',fontFamily:Fonts.medium,fontStyle:'italic',
    
  },

  circleTyping: {
      width:  10,
      height: 10,
      borderRadius: 100 / 2,
      backgroundColor: "#9AA3A9",
      alignItems: "center",
      justifyContent: "center",
      marginRight:4,
    },

    headerTitle:{
      width: wp('30%'),
      marginLeft: 20, 
    }
}

export default withNavigation(ChatRoom);
