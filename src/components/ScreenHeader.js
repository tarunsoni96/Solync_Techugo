import React, { Component } from 'react'
import Fonts from "UIProps/Fonts";

import { Text,SafeAreaView, View,TouchableWithoutFeedback,Image, } from 'react-native'
import { withNavigation } from 'react-navigation'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Icons from 'AppLevelComponents/UI/Icons'


class ScreenHeader extends Component {
    render() {
        const {title,titleStyle,isCenter,noBold,icon,onPressBack,color,style} = this.props

        return (
          <>
           <SafeAreaView style={{ flex: 0, color:'#fff' ,}} />
          <SafeAreaView style={{width:'100%' }}>
            <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginTop:15,
            marginBottom:10,
            justifyContent:isCenter ? 'space-between' : undefined,
            ...style
          }}
        >
        <View
          style={{flex:isCenter ? 0.1 : 0,paddingLeft:isCenter ? 5 : 0,}}>

           <TouchableWithoutFeedback
            onPress={() => onPressBack  ? onPressBack() : this.props.navigation.pop()}
            >
            <View style={{justifyContent:'center',width:50,height:50,marginLeft:14,...style,marginTop:0}}>
             <Icons lib='Ionicons' name={icon || 'md-arrow-round-back'} size={28} style={{marginLeft:isCenter ? 0: 13}} color={color || '#808C94'} />
            </View>

          </TouchableWithoutFeedback>
         
        </View>
          <View style={{flex:1,alignItems:isCenter ? 'center' : 'flex-start',}}>

            <Text
            // adjustsFontSizeToFit
             style={{paddingHorizontal:isCenter ? widthPercentageToDP(5) : 0,fontSize: widthPercentageToDP(isCenter ? 4.5 : 4.9),marginLeft:isCenter ? 0 : 5,fontFamily:noBold ? Fonts.medium : Fonts.heavy,flexWrap:'wrap',color,...titleStyle,}}>
              {title}
            </Text>
          </View>

                {isCenter && 
                    <View style={{flex:isCenter? 0.1 : 1,padding:5}} />
                }
        </View>
        </SafeAreaView>
        </>
        )
    }
}
export default withNavigation(ScreenHeader)