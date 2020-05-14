import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
const { height, width } = Dimensions.get("screen");
import HelperMethods from "Helpers/Methods";
import moment from "moment";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Fonts from "UIProps/Fonts";
import { SwipeableFlatList } from "react-native-swipeable-flat-list";
import { withNavigation } from "react-navigation";
import Icons from "AppLevelComponents/UI/Icons";
import ModelOverlay from "../../components/ModelOverlay";

import Container from "../../AppLevelComponents/UI/Container";
import SocketIO from "../../components/SocketIO";
import MobxStore from "../../StorageHelpers/MobxStore";
import NetworkAwareContent from "../../AppLevelComponents/UI/NetworkAwareContent";
import NavigationConsistor from "../../Logicals/NavigationConsistor";
import { observer } from "mobx-react";
import SearchInput from "../../components/SearchInput";
import ScreenHeader from "../../components/ScreenHeader";

let dataBackup = [];
let listItemHeight = 110;
let fullWidth = wp("95%");
let group_id = ''
@observer
class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      chatList: [],
      showBlockModal: false,
      closeItem:false,
      isApiCall: true,
      maxWidthItem: fullWidth,
      showDeleteModal: false,
      itemIndex: [],
      isSwiping: undefined,
    };
    this.blockingUser = "";
    this.chatType = "";
    this.userId = "";
    this.userIndex = 0;
    this.openIndexs= []
    this.convData = "";
  }

  setBlockModalVisible(visible) {
    this.setState({
      showBlockModal: visible,
    });
  }

  _Register() {
    this.setState({
      showBlockModal: false,
    });
  }

  setDeleteModalVisible(visible) {
    this.setState({
      showDeleteModal: visible,
    });
  }

  _deteUser() {
    this.setState({
      showDeleteModal: false,
    });
  }

  componentDidMount() {
    group_id= ''
    socketio = new SocketIO();
    MobxStore.isAnyUnreadMsg = false;
    this.props.navigation.addListener("willFocus", this.willFocus);
    this.props.navigation.addListener("willBlur", this.willBlur);
    this.setBlockReciever();
    this.setGroupCreatedReciever();
  }

  setGroupCreatedReciever() {
    socketio.listenEvent("newGroupInfo", (callBackData) => {
      HelperMethods.snackbar(callBackData.result);
    });
  }

  setBlockReciever() {
    socketio.listenEvent("blockedReceiver", (callBackData) => {
      const { result } = callBackData;
      setTimeout(()=>{
        this.fetchList();
      },1000)
      let msg = ''
      if(result.type == 'block'){
        msg = `You have been blocked and group ${result.group_name} has been deleted by the admin`
      } else {
        msg = `Group ${result.group_name} has been deleted by the admin`
      }
        HelperMethods.snackbar(`${msg}`)
    });
  }

  componentWillUnmount() {
    NavigationConsistor.turnOffChatListeners(socketio, [
      "conversationList",
      "blockedReceiver",
      "receiveHomeMessage",
      "newGroupInfo",
    ]);
  }

  willFocus = () => {
      // socketio.emitToEvent("conversationList", {
      //   user_id: MobxStore.userObj.user_id
      // });
      // this.setState({ isApiCall: true });
      socketio.emitToEvent("conversationList", {
        user_id: MobxStore.userObj.user_id,
      });
    socketio.listenEvent("receiveHomeMessage", (callBackData) => {
      const { result } = callBackData;
      this.fetchList(false);
      HelperMethods.triggerChatMsgFeedback(
        this.props.navigation,
        callBackData.result,
        false
      );
    });

    socketio.listenEvent("conversationList", (callBackData) => {
      this.setState({ isApiCall: false });
      if (callBackData.result.length == 0) {
        HelperMethods.animateLayout();
        this.setState({ noChats: true, chatList: [], isApiCall: false });
        return;
      }
      for (let i = 0; i < callBackData.result.length; i++) {
        callBackData.result[i].date_time = moment(
          callBackData.result[i].date_time
        ).format("dddd");
      }
      dataBackup = callBackData.result;
      HelperMethods.animateLayout();
      this.setState({
        chatList:callBackData.result,
        noChats: false,
        isApiCall: false,
      });
    });

    // if (MobxStore.reloadConvList) {
    // }
  };

  willBlur = () => {
    NavigationConsistor.turnOffChatListeners(socketio, [
      "receiveHomeMessage",
      "conversationList",
      "blockedReceiver",
      
    ]);
  };

  fetchList(showLoader = true) {
    HelperMethods.animateLayout();
    this.setState({
      isApiCall: showLoader,
      maxWidthItem: fullWidth,
      itemIndex: [],
    });
    MobxStore.reloadConvList = false;

    socketio.emitToEvent("conversationList", {
      user_id: MobxStore.userObj.user_id,
    });
  }

  search(text) {
    this.setState({ search: text });
    const { chatList } = this.state;
    if (text.length == 0) {
      this.setState({ chatList: dataBackup });
    } else {
      let filteredArr = dataBackup.filter((item, index) => {
        return item.first_name.toLowerCase().includes(text.toLowerCase());
      });
      this.setState({ chatList: filteredArr });
    }
  }

  setUserData(item, index, type) {
    this.convData = item;
    this.blockingUser = item.chat_type == 'group' ? 'all users in this event' : item.first_name;
    this.userId = item.id;
    this.chatType = item.chat_type;
    switch (type) {
      case "delete":
        this.chatType = item.chat_type;
        this.setState({ showDeleteModal: true });

        break;

      case "block":
        this.setState({ showBlockModal: true });

        break;

      case "unblock":
        this.blockUnblockUser("unblock");
        break;
    }
  }

  renderRight = ({ item, index }) => {
    return (
      <View
        style={{
          height: listItemHeight,
          flexDirection: "row",
          justifyContent: "center",
          width: 160,
        }}
      >
        <View
          style={{
            backgroundColor:
              item.block_status == "blocked" ? "#2EB968" : "#b8204f",
            flex: 1,
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              this.setUserData(
                item,
                index,
                item.block_status == "blocked" ? "unblock" : "block"
              )
            }
            style={{ justifyContent: "space-evenly", alignItems: "center" }}
          >
            <Icons lib="Material" name="block-helper" color={item.block_status == 'blocked' ? '#E4E4E4' : '#E2A0BA' } />
            <Text
              style={{
                alignSelf: "center",
                color: "#fff",
                fontSize: 14,
                marginTop: 5,
                fontFamily: Fonts.medium,
              }}
            >
              {item.block_status == "blocked" ? "Unblock" : "Block"}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "#2d2d2d",
            justifyContent: "space-evenly",
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => this.setUserData(item, index, "delete")}
            style={{ justifyContent: "space-evenly" }}
          >
            <Image
              source={require("../../assets/Images/@delete.png")}
              style={{ alignSelf: "center" }}
              resizeMode="contain"
            />
            <Text
              style={{
                alignSelf: "center",
                color: "#fff",
                fontSize: 14,
                marginTop: 5,
                fontFamily: Fonts.medium,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  onSwipeOpen (index) {
    this.openIndexs.push(index)
  }
  
  onSwipeClose(index){
    let i = this.openIndexs.findIndex(v => v == index)
    if(i > -1){
      this.openIndexs.splice(i,1)
    }
  }


  goToChat(item){
    this.setState({closeItem:this.openIndexs.length > 0},()=>{
      setTimeout(()=>{
        NavigationConsistor.navigateToChat(this.props.navigation,item,item.id,item.event,item.event_year,item.category_type)
      },this.state.closeItem ? 500 : 0)
      this.setState({closeItem:false})
    })
  }

  _renderItem = ({ item, index }) => {
    return (
          
          <TouchableOpacity style={{height: listItemHeight,}}  onPress={() =>
            this.goToChat(item)
          }>

      <View
        style={{
          borderBottomColor: "lightgrey",
          width: "86.5%",
          alignSelf: "center",
          borderBottomWidth: 1,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <ImageBackground
              imageStyle={{ borderRadius: 65 / 2 }}
              style={{
                alignSelf: "center",
                height: 60,
                width: 60,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#E4E7EA",
                borderRadius: 65 / 2,
              }}
              source={{ uri: item.profile_picture || "" }}
            >
              {item.chat_type == "group" && (
                <Icons lib="Entypo" name="users" color="#808C94" />
              )}
              {item.chat_type == "normal" && (
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor:
                        item.online_status == "offline" ? "#B92E53" : "#2EB968",
                    },
                  ]}
                />
              )}
            </ImageBackground>

            <View style={{ marginHorizontal: 10,marginTop:hp(1), marginLeft: 20, flex: 1 }}>
              <Text
                numberOfLines={3}
                style={{
                  fontSize: wp(4),
                  overflow: "hidden",
                  fontFamily: Fonts.medium,
                }}
              >
                {item.first_name}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  color: "#777777",
                  fontFamily: Fonts.regular,
                  fontSize: wp(3.5),
                }}
              >
                {item.msg}
              </Text>
            </View>

            <View style={{ alignItems: "flex-end",marginTop:hp(1) }}>
              <Text
                style={{
                  fontSize: wp(3.5),

                  color: "#808C94",
                  fontFamily: Fonts.regular,
                }}
              >
                {item.date_time}
              </Text>
            </View>
          </View>
        </View>
      </View>
      </TouchableOpacity>

    );
  };

  blockGroup(action,name) {
    let obj = {
      user_id: MobxStore.userObj.user_id,
      group_id,
      group_name:this.blockingUser,
      type:action,
      user_name:MobxStore.userObj.user_name
    };

    socketio.emitToEvent(action == "block" ? "blockGroup" : "deleteGroup", obj);
    setTimeout(() => {
      this.fetchList();
    }, 600);
  }

  blockUnblockUser(action) {
    this.setState({ showBlockModal: false });
    const { chat_type,first_name, id } = this.convData;
    if (chat_type == "group") {
      group_id = id;
      HelperMethods.snackbar(
        "You have blocked all the users and left from the group"
      );
      this.blockGroup("block",first_name);
    } else {
      NavigationConsistor.blockUser(socketio, action, this.userId, (resp) => {
        if (resp.statusCode == 200) {
          this.fetchList();
        }
      },chat_type);
    }
  }

  deleteUser() {
    this.setState({ showDeleteModal: false });
    const { chat_type, id } = this.convData;
    if (chat_type == "group") {
      group_id = id;
      HelperMethods.snackbar("You have deleted and left from the group");
      this.blockGroup("delete");
    } else {
      NavigationConsistor.deleteUser(this.userId, (resp) => {
        if (resp.statusCode == 200) {
          this.fetchList();
        }
      });
    }
  }

  QuickActions = ({ item }) => {
    return (
      <View style={styles.qaContainer}>
        <View style={{}}>
          <Text>Block</Text>
        </View>
        <View style={{}}>
          <Text>Delete</Text>
        </View>
      </View>
    );
  };

  setScroll(isSwiping) {
    if (this.state.isSwiping != isSwiping) {
      this.setState({ isSwiping });
    }
  }
  render() {
   
    return (
      <>
        <ScreenHeader isCenter={true} title={"Chat"} noBold />
        <View style={{marginTop:-10}}>
          <SearchInput textGetter={(text) => this.search(text)} />
        </View>
      <Container turnOffScroll={!this.state.isSwiping}>

        <View style={{ width: "100%", flex: 1,marginTop:-15 }}>
          <NetworkAwareContent
            data={this.state.chatList}
            isApiCall={this.state.isApiCall}
          >

            <SwipeableFlatList
              data={this.state.chatList}
              renderItem={this._renderItem}
              renderRight={this.renderRight}
              backgroundColor={"white"}
              isSwiping={isSwiping => this.setScroll(isSwiping)}
              scrollEnabled={!this.state.isSwiping}
              onopen={(index)=>this.onSwipeOpen(index)}
              onclose={(index)=>this.onSwipeClose(index)}
              closeItem={this.state.closeItem}
            />
          </NetworkAwareContent>
        </View>

        <ModelOverlay
          closeModal={() => this.setState({ showBlockModal: false })}
          modalVisible={this.state.showBlockModal}
          posPress={() => this.blockUnblockUser("block")}
          showBg={true}
          title={`Do you want to block ${this.blockingUser}?`}
          posBtn={`Block user${this.chatType == 'group' ? 's' : ''}`}
          msg="They will not be able to see your profile or message you."
        />

        <ModelOverlay
          closeModal={() => this.setState({ showDeleteModal: false })}
          modalVisible={this.state.showDeleteModal}
          posPress={() => this.deleteUser()}
          showBg={true}
          title="Delete chat"
          posBtn="Delete"
          msg={`Are you sure you want to delete this ${
            this.chatType == "group" ? "group" : "chat"
          }?`}
        />
      </Container>
      </>
    );
  }
}

const styles = {
  circle: {
    width: 13,
    height: 13,
    bottom: 7,
    right: 0,
    position: "absolute",
    borderRadius: 100 / 2,

    alignItems: "center",
    justifyContent: "center",
  },

  qaContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 5,
  },
};
export default withNavigation(ChatScreen);
