import React, { Component } from 'react'
import Fonts from "UIProps/Fonts";
import { Text, View,TouchableWithoutFeedback,Image, } from 'react-native'
import { withNavigation } from 'react-navigation'
import { widthPercentageToDP } from 'react-native-responsive-screen'

class ScreenHeader extends Component {
    render() {
        const {title,isCenter,noBold} = this.props

        return (
            <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: '100%',
            marginVertical: 25,
            marginBottom:10,
            justifyContent:isCenter ? 'space-between' : undefined,
          }}
        >
        <View
          style={{flex:isCenter ? 1 : 0,}}>

           <TouchableWithoutFeedback
            onPress={() => this.props.navigation.pop()}
            >

              <Image
                source={require("../assets/Images/Left.png")}
                style={{
                  marginLeft:21.5,
                  width:20,
                  height:20,
                }}
                resizeMode={"contain"}
              />
          </TouchableWithoutFeedback>
         
        </View>

            <Text style={{fontSize: widthPercentageToDP(4.5),flex:isCenter ? 0 : 1,marginLeft:isCenter ? 0 : 25,fontFamily:noBold ? Fonts.medium : Fonts.heavy,paddingRight:5,flexWrap:'wrap'}}>
              {title}
            </Text>

                {isCenter && 
                    <View style={{flex:1}} />
                }
        </View>
        )
    }
}
export default withNavigation(ScreenHeader)