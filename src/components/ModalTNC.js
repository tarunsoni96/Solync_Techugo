import React, { Component } from 'react'
import { Text,Modal, View,TouchableOpacity } from 'react-native'
import CustomText from 'AppLevelComponents/UI/CustomText'
import {Colors} from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default class ModalTNC extends Component {

    render() {
        const {
            modalVisible,
            closeModal,
            posPress,
          } = this.props;
        return (
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          closeModal();
        }}
      >
            <View
              style={{
                flex: 1,
                width:'100%',
                justifyContent: "center",
              }}
            >
            <View
              style={{
                height: height,
                width: width,
                position: "absolute",
                backgroundColor: "rgba(77, 177, 150,0.8)",

              }}
            />

              <View style={{backgroundColor: "#fff",
                  zIndex: 1,
                  width:'76%',
                  alignSelf:'center',
                  alignItems:'center',borderRadius:10,paddingTop:15}}>

                <CustomText text='Accept terms & privacy' size={20} color={'#000'} />

                <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily:Fonts.regular,
                        textAlign: "center",
                        marginTop: "4%",
                        color: "#7a7a7a",
                      }}
                    >
                      By creating an account, you
                    </Text>
                  </View>
                  <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                      marginVertical:6
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        color: "#7a7a7a",
                        fontFamily:Fonts.regular,

                      }}
                    >
                      agree to the{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily:Fonts.regular,
                        textAlign: "center",
                        color: "#781672",
                        fontFamily:Fonts.regular,

                      }}
                    >
                      Terms of service{" "}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        color: "#7a7a7a",
                        fontFamily:Fonts.regular,
                      }}
                    >
                      &
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: "center",
                        color: "#781672",
                        fontFamily:Fonts.regular,
                      }}
                    >
                      {" "}
                      Privacy policy.
                    </Text>
                  </View>


                  <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop:20,
                height: heightPercentageToDP(6.5),
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  closeModal()
                }}
                style={{
                  backgroundColor: "#f6f7f8",
                  borderBottomLeftRadius: 10,
                  justifyContent: "center",
                  width: "49.5%",
                  // padding: heightPercentageToDP(4),
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color:  "grey",
                    fontFamily: "Montserrat-ExtraBold",
                    alignSelf: "center",
                  }}
                >

                CANCEL
                </Text>
              </TouchableOpacity>

              <View style={{ width: 2 }} />

              <TouchableOpacity
              onPress={()=>posPress()}
                style={{
                  backgroundColor: "#f6f7f8",
                  width: "49.5%",
                  justifyContent: "center",
                  borderBottomRightRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color:  "#781672",
                    alignSelf: "center",
                    fontFamily: "Montserrat-ExtraBold",
                  }}
                >

                I AGREE
                </Text>
              </TouchableOpacity>
            </View>
              </View>
            </View>
          </Modal>
        )
    }
}
