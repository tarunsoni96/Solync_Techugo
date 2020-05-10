import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  BackHandler
} from "react-native";
const { height, width } = Dimensions.get("screen");
/* IMPORTING HEADER */
import HelperMethods from 'Helpers/Methods'
import { withNavigation } from "react-navigation";
import SocketIO from "../../components/SocketIO";

import {getBlockedUsers,blockDeleteUser} from 'ServiceProviders/ApiCaller'
import Container from "../../AppLevelComponents/UI/Container";
import NetworkAwareContent from "../../AppLevelComponents/UI/NetworkAwareContent";
import NavigationConsistor from "../../Logicals/NavigationConsistor";
import SearchInput from "../../components/SearchInput";
import ScreenHeader from "../../components/ScreenHeader";
import { widthPercentageToDP } from "react-native-responsive-screen";

dataBackup = []
class BlockedUser extends Component {
  constructor(props) {
    super(props);
    this.userId = ''
    this.state = {
      search: "",
      blockedUsers:[],
      modalVisible: false
    };
  }
  componentDidMount() {
    socketio = new SocketIO();

      this.getData()
  }

  getData(){
    this.setState({isApiCall:true})
    getBlockedUsers().then(resp => {
      dataBackup = resp.result
      this.setState({isApiCall:false,blockedUsers:resp.result})
      
    }).catch(err => {
      this.setState({isApiCall:false})
    })
  }

  unblockUser(){
    this.setState({modalVisible: false})
    NavigationConsistor.blockUser(socketio,'unblock',this.userId,resp => {
      if(resp.statusCode == 200){
          this.getData()
      }
      })
  }

  _renderItem(item, index) {
    return (
      <TouchableOpacity style={{ marginTop: 0, justifyContent: "center",width:widthPercentageToDP(87) }} onPress={() =>{ this.setState({ modalVisible: true }); this.userId = item.user_id }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            backgroundColor: "transparent",
            height: 100
          }}
        >
          <View
            style={{
              height: 80,
              marginTop: 0,
              justifyContent: "space-between",
              flexDirection: "row"
            }}
          >
            <Image
              style={{
                height: 65,
                width: 65,
                borderRadius: 65 / 2,
                alignSelf: "center"
              }}
              source={{ uri: item.profile_picture }}
            />
            <View
              style={{ height: 80, width: "75%", justifyContent: "center" }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "transparent"
                }}
              >
                <Text
                  style={{ fontSize: 17,maxWidth:widthPercentageToDP(40), fontFamily: "Montserrat-ExtraBold" }}
                >
                  {item.first_name}
                </Text>
                <TouchableOpacity onPress={()=> { this.setState({ modalVisible: true }); this.userId = item.user_id} } >

                  <Text
                    style={{
                      color: "#7b1b75",
                      alignSelf: "center",
                      fontSize: 16,
                      fontFamily: "Montserrat-Bold"
                    }}
                  >
                    UNBLOCK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            width: width - 30,
            backgroundColor: "#DCDCDC",
            alignSelf: "center"
          }}
        ></View>
      </View>
      </TouchableOpacity>

    );
  }
  _Register() {
    this.setState({
      modalVisible: false
    });
  }
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    });
  }

  search(text) {
    this.setState({ search: text });
    if (text.length == 0) {
      HelperMethods.animateLayout();
      this.setState({ blockedUsers:dataBackup });
    } else {
      let filteredArr = dataBackup.filter((item, index) => {
        return item.first_name.toLowerCase().includes(text.toLowerCase());
      });
      HelperMethods.animateLayout();
      this.setState({ blockedUsers: filteredArr });
    }
  }

  render() {
    return (
      <>
      <ScreenHeader isCenter title='Blocked Users' />
         <SearchInput style={{marginTop:-10,marginBottom:-5}} textGetter={text => this.search(text)} />

      <Container onBackPress={()=>this.props.navigation.pop()} >

        <NetworkAwareContent onPress={()=>this.getData()} isApiCall={this.state.isApiCall} data={this.state.blockedUsers} >

        <FlatList
          data={this.state.blockedUsers}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => this._renderItem(item, index)}
          backgroundColor={"#fff"}
        />
        </NetworkAwareContent>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log("Modal closed");
          }}
        >
          <View
            style={{ flex: 1, justifyContent: "center", position: "relative" }}
          >
            <View
              style={{
                height: height,
                width: width,
                backgroundColor: "#E9F8F6",
                opacity: 0.9,
                position: "relative"
              }}
            ></View>

            <View
              style={{
                height: "29%",
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
                    height: "70%",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat-Bold",
                      fontSize: 20,
                      color: "black",
                      textAlign: "center"
                    }}
                  >
                    Are you sure you want to unblock this user?
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
                      this.setModalVisible(!this.state.modalVisible);
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
                        fontSize: 18,
                        color: "grey",
                        fontFamily: "Montserrat-Bold",
                        alignSelf: "center"
                      }}
                    >
                      CANCEL
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.unblockUser()}
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
                        fontSize: 18,
                        color: "#781672",
                        alignSelf: "center",
                        fontFamily: "Montserrat-Bold"
                      }}
                    >
                      UNBLOCK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        </Container>
        </>
      
    );
  }
}
export default  withNavigation(BlockedUser)