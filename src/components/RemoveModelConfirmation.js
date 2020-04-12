import React, { Component } from 'react'
import { Text,View,Modal,TouchableOpacity,TouchableWithoutFeedback, ImageBackground} from 'react-native'
import 'Helpers/global'
import Fonts from "UIProps/Fonts";
export default class RemoveModelConfirmation extends Component {
    render() {
        const {modalVisible,closeModal,remUri,removePhoto,imageId} = this.props
        height = global.deviceHeight
        width = global.deviceWidth
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {closeModal()}}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                position: "relative"
              }}>

              <TouchableWithoutFeedback onPress={()=>closeModal()} >

              <View
                style={{
                  height: global.deviceHeight,
                  width: global.deviceWidth,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  opacity: 0.9,
                  position: "relative"
                }}
              ></View>
              </TouchableWithoutFeedback>

                <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                }}
              >

                <ImageBackground source={require('../assets/Images/@popup-bg.png')} style={{width:'auto',height:'auto'}} resizeMode='stretch'>

                <View style={{alignItems:'center',justifyContent:'center',paddingHorizontal:24,paddingTop:24,paddingBottom:15}} >
                <Text style={styles.font} >Remove photo</Text>
                <Text style={[styles.font,{color:'#9D9D9D',marginTop:10}]} >Are you sure you want to remove this photo?</Text>
                  <View style={{flexDirection:'row',alignSelf:'flex-end',alignItems:'center',marginTop:30}}>


                    <TouchableOpacity
                      onPress={() => {
                        closeModal()
                      }}
                      style={{
                        backgroundColor: "#f6f7f8",
                        flex:0.8,
                        height:65,
                        justifyContent: "center",
                        borderBottomLeftRadius: 10
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "grey",
                          fontFamily: "Montserrat-ExtraBold",
                          alignSelf: "center"
                        }}
                      >
                        CANCEL
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => { removePhoto(remUri,imageId); closeModal() }}
                      style={{
                        backgroundColor: "#f6f7f8",
                        flex:0.8,
                        height:65,

                        justifyContent: "center",
                        borderBottomRightRadius: 10
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#781672",
                          alignSelf: "center",
                          fontFamily: "Montserrat-ExtraBold"
                        }}
                      >
                        REMOVE
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                </View>


                </ImageBackground>

                </View>
            </View>
          </Modal>
        )
    }
}

const styles = {
  btnContainer:{
    width:'100%',
    padding:20,
    alignItems: 'center',
    justifyContent:'center',
    paddingHorizontal: 40,
  },

  font:{
    fontFamily:Fonts.medium,
    textAlign:'center',
    color:'#000',
    fontSize:18,
    paddingHorizontal: 10,
  }
}
