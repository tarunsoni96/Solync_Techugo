import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground
} from "react-native";
const { height, width } = Dimensions.get("screen");
import HelperMethods from "Helpers/Methods";
import moment from "moment";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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

let fullWidth = wp('95%')
@observer
class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      chatList: [],
      showBlockModal: false,
      isApiCall: false,
      maxWidthItem:fullWidth,
      showDeleteModal: false,
      itemIndex:[],
      isSwiping:undefined,
    };
    this.blockingUser = "";
    this.userId = "";
    this.userIndex = 0;
    this.convData = "";
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
    MobxStore.isAnyUnreadMsg = false
    this.props.navigation.addListener("willFocus", this.willFocus);
    this.props.navigation.addListener("willBlur", this.willBlur);
      this.setBlockReciever()

     

  }

  setBlockReciever(){

   

    socketio.listenEvent('blockedReceiver',callBackData => {
      const {result } = callBackData
      if(result == 'blocked'){
        this.fetchList()
      }
   })
  }


  componentWillUnmount() {
    NavigationConsistor.turnOffChatListeners(socketio, [
      'conversationList',
      'blockedReceiver',
      'receiveHomeMessage'
    ]);
    
  }


  willFocus = () => {
    if(!this.state.isApiCall){
      // socketio.emitToEvent("conversationList", {
      //   user_id: MobxStore.userObj.user_id
      // });
      this.fetchList()
    }
    socketio.listenEvent('receiveHomeMessage',callBackData => {
      const {result} = callBackData
      this.fetchList(false)
      HelperMethods.triggerChatMsgFeedback(this.props.navigation,callBackData.result,false)
    })


    socketio.listenEvent("conversationList", callBackData => {
      this.setState({isApiCall:false})
      if (callBackData.result.length == 0) {
        HelperMethods.animateLayout()
        this.setState({ noChats: true, chatList: [], isApiCall: false });
        return;
      }
      for (let i = 0; i < callBackData.result.length; i++) {
        callBackData.result[i].date_time = moment(
          callBackData.result[i].date_time
          ).format("dddd");
        }
        dataBackup = callBackData.result;
        HelperMethods.animateLayout()
      this.setState({
        chatList: callBackData.result,
        noChats: false,
        isApiCall: false
      });
    });


    // if (MobxStore.reloadConvList) {
    // }
  };



  willBlur = () => {
    NavigationConsistor.turnOffChatListeners(socketio, [
      'receiveHomeMessage',
      'conversationList',
      'blockedReceiver',
    ]);
  };

  fetchList(showLoader = true) {
    HelperMethods.animateLayout()
    this.setState({ isApiCall:showLoader,maxWidthItem:fullWidth,itemIndex:[] });
    MobxStore.reloadConvList = false;
    
    socketio.emitToEvent("conversationList", {
      user_id: MobxStore.userObj.user_id
    });
  }

  search(text) {
    this.setState({ search: text });
    const { chatList } = this.state;
    if (text.length == 0) {
      HelperMethods.animateLayout();
      this.setState({ chatList: dataBackup });
    } else {
      let filteredArr = dataBackup.filter((item, index) => {
        return item.first_name.toLowerCase().includes(text.toLowerCase());
      });
      HelperMethods.animateLayout();
      this.setState({ chatList: filteredArr });
    }
  }

  

  setUserData(item, index, type) {
    this.convData = item;
    this.blockingUser = item.first_name;
    this.userId = item.id;
    switch (type) {
      case "delete":
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

  _renderSwipeableContent(item, index) {
    return (
      <View
        style={{
          width:wp('50%'),
          height: 110,
          // zIndex:1000,
          flexDirection: "row",
          justifyContent:'flex-end'
        }}
      >

        <View
          style={{
            backgroundColor:
              item.block_status == "blocked" ? "#2EB968" : "#b8204f",
            width: wp('25%'),
            justifyContent: "space-evenly"
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
            style={{ justifyContent: "space-evenly" }}
          >
            <Image
              source={require("../../assets/Images/@3xblock.png")}
              style={{ alignSelf: "center", height: 30, width: 30 }}
            />
            <Text
              style={{
                alignSelf: "center",
                color: "#fff",
                fontSize: 16,
                fontFamily: "Montserrat-Regular"
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
            width: wp('25%'),

          }}
        >
          <TouchableOpacity
            onPress={() => this.setUserData(item, index, "delete")}
            style={{ justifyContent: "space-evenly" }}
          >
            <Image
              source={require("../../assets/Images/@delete.png")}
              style={{ alignSelf: "center" }}
            />
            <Text
              style={{
                alignSelf: "center",
                color: "#fff",
                fontSize: 16,
                fontFamily: "Montserrat-Regular"
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }



  _renderItem =({item, index}) =>  {
    return (
      <View style={{ height: 110,width:'100%',}}>
        <TouchableOpacity
          style={{ height: 110 }}
          onPress={() =>
            NavigationConsistor.navigateToChat(
              this.props.navigation,
              item,
              item.id,
              item.event,
              item.event_year,
              item.category_type
            )
          }
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
                alignSelf: "center",
                flexDirection: "row"
              }}
            >
              <ImageBackground
                imageStyle={{ borderRadius: 65 / 2 }}
                style={{
                  alignSelf: "center",
                  height: 65,
                  width: 65,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#E4E7EA",
                  borderRadius: 65 / 2
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
                          item.online_status == "offline"
                            ? "#B92E53"
                            : "#2EB968"
                      }
                    ]}
                  />
                )}
              </ImageBackground>
              <View
                    
                style={{ height: 110,paddingLeft:wp('4%'), width: this.state.itemIndex.includes(index)  ? wp(52) : wp(70), justifyContent: "center" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <Text
                  numberOfLines={3}
                    style={{
                      fontSize: 18,
                      alignSelf: "center",
                      fontWeight: "bold",
                      width: "50%"
                    }}
                  >
                    {item.first_name}
                  </Text>
                  <Text
                    style={{ color: "#88939b", alignSelf: "center", right: 5 }}
                  >
                    {item.date_time}
                  </Text>
                </View>
                <Text
                numberOfLines={1}
                  style={{
                    color: "#777777",
                    fontFamily: Fonts.regular,
                    fontSize: 14,
                  
                  }}
                >
                  {item.msg}
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

  blockGroup(action) {
    let obj = {
      user_id: MobxStore.userObj.user_id,
      group_id
    };

    socketio.emitToEvent(action == "block" ? "blockGroup" : "deleteGroup", obj);
    setTimeout(()=>{
      this.fetchList()
    },600)
  }

  blockUnblockUser(action) {
    this.setState({ showBlockModal: false });
    const { chat_type, id } = this.convData;
    if (chat_type == "group") {
      group_id = id;
      HelperMethods.snackbar(
        "You have blocked all the users and left from the group"
      );
      this.blockGroup("block");
    } else {
      NavigationConsistor.blockUser(socketio,action, this.userId, resp => {
        if (resp.statusCode == 200) {
          this.fetchList();
        }
      });
    }
  }


  deleteUser() {
    this.setState({ showDeleteModal: false });
    const { chat_type, id } = this.convData;
    if (chat_type == "group") {
        group_id = id;
      HelperMethods.snackbar(
        "You have deleted and left from the group"
      );
      this.blockGroup("delete");
    } else {
        NavigationConsistor.deleteUser(this.userId, resp => {
            if (resp.statusCode == 200) {
              this.fetchList()
                // let arr = [...this.state.chatList];
                // arr.splice(this.userIndex, 1);
                // HelperMethods.animateLayout();
                // this.setState({ chatList: arr });
            }
        });
    }
  }

  QuickActions = ({item}) =>  {
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
  }


  onSwipeOpen (index) {
    let arr = [...this.state.itemIndex]
    arr.push(index)
    // HelperMethods.animateLayout()
    this.setState({itemIndex:arr},()=>{
    })
  }
  
  onSwipeClose(index){
    let arr = [...this.state.itemIndex]
    let i = arr.findIndex(v => v == index)
    if(i > -1){
      arr.splice(i,1)
    }
    HelperMethods.animateLayout()
    this.setState({maxWidthItem: fullWidth,itemIndex:arr })
  }

  setScroll(isSwiping){
    if(this.state.isSwiping != isSwiping){
      this.setState({isSwiping})
    }
  }
  render() {
    return (
      <Container turnOffScroll={false}>

        <ScreenHeader isCenter={true} title={'Chat'} noBold />
        <View style={{padding:13,width:'100%'}}>
       
        <SearchInput style={{}} textGetter={text => this.search(text)} />
        </View>
       

        <View style={{ width: "100%", flex: 1 }}>
          <NetworkAwareContent
            data={this.state.chatList}
            isApiCall={this.state.isApiCall}
          >
            <SwipeableFlatList
            isSwiping={isSwiping => this.setScroll(isSwiping)}
              data={this.state.chatList}
              scrollEnabled={!this.state.isSwiping}
              extraData={this.state}
              keyboardShouldPersistTaps="always"
              // maxSwipeDistance={440}
              onopen={(index)=>this.onSwipeOpen(index)}
              onclose={(index)=>this.onSwipeClose(index)}
              renderItem={this._renderItem}
              backgroundColor={"#fff"}
              renderRight={({ item, index }) =>
                this._renderSwipeableContent(item, index)
              }

            />
          </NetworkAwareContent>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showBlockModal}
          onRequestClose={() => {}}
        >
          <View
            style={{ flex: 1, justifyContent: "center", position: "relative" }}
          >
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: "#5bcbbb",
                opacity: 0.9,
                position: "relative"
              }}
            />
            <View
              style={{
                height: "30%",
                width: width - 55,
                backgroundColor: "#fff",
                zIndex: 1,
                alignSelf: "center",
                opacity: 1.0,
                position: "absolute",
                borderRadius: 10
              }}
            >
              <View style={{ width: "100%", height: "100%", borderRadius: 10 }}>
                <View
                  style={{
                    width: "80%",
                    alignSelf: "center",
                    height: "30%",
                    justifyContent: "flex-end"
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 21,
                      color: "black",
                      textAlign: "center"
                    }}
                  >
                    Do you want to block {this.blockingUser}?
                  </Text>
                </View>
                <View
                  style={{
                    width: "80%",
                    alignSelf: "center",
                    justifyContent: "center",
                    height: "35%"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      marginTop: "4%",
                      color: "#7a7a7a",
                      fontFamily: "Montserrat-Regular"
                    }}
                  >
                    They will not be able to see your profile or message you.
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    bottom: 0,
                    position: "absolute",
                    width: "100%",
                    height: "30%",
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setBlockModalVisible(!this.state.showBlockModal);
                    }}
                    style={{
                      backgroundColor: "#f6f7f8",
                      height: "100%",
                      width: "49.5%",
                      justifyContent: "center",
                      borderBottomLeftRadius: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "grey",
                        fontFamily: "Montserrat-ExtraBold",
                        alignSelf: "center"
                      }}
                    >
                      CANCEL
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.blockUnblockUser("block")}
                    style={{
                      backgroundColor: "#f6f7f8",
                      height: "100%",
                      width: "49.5%",
                      justifyContent: "center",
                      borderBottomRightRadius: 10
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#781672",
                        alignSelf: "center",
                        fontFamily: "Montserrat-ExtraBold"
                      }}
                    >
                      BLOCK USER
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>


        <ModelOverlay
          closeModal={() => this.setState({ showDeleteModal: false })}
            modalVisible={this.state.showDeleteModal}
            posPress={() => this.deleteUser()}
            showBg={true}
            title="Delete chat"
            posBtn="Delete"
            msg="Are you sure you want to delete this chat?"
          />

      </Container>
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
    justifyContent: "center"
  },

  qaContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5
  },


};
export default withNavigation(ChatScreen);
