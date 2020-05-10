import React, { Component } from 'react'
import Fonts from "UIProps/Fonts";

import { Text,SafeAreaView, View,TouchableWithoutFeedback,Image, } from 'react-native'
import { withNavigation } from 'react-navigation'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import Icons from 'AppLevelComponents/UI/Icons'


class ScreenHeader extends Component {
    render() {
        const {title,isCenter,noBold,style} = this.props

        return (
          <>
          <SafeAreaView style={{ flex: 0, color:'#fff' ,}} />
          <SafeAreaView style={{  }}>
            <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            width: '100%',
            marginTop:15,
            marginBottom:10,
            justifyContent:isCenter ? 'space-between' : undefined,
            ...style
          }}
        >
        <View
          style={{flex:isCenter ? 1 : 0,}}>

           <TouchableWithoutFeedback
            onPress={() => this.props.navigation.pop()}
            >
            <View style={{alignItems:'center',justifyContent:'center',marginLeft:10,width:50,height:50}}>

             <Icons lib='Ionicons' name='md-arrow-round-back' size={28} color='#808C94' />
            </View>

          </TouchableWithoutFeedback>
         
        </View>

            <Text style={{fontSize: widthPercentageToDP(4.5),flex:isCenter ? 0 : 1,marginLeft:isCenter ? 0 : 25,fontFamily:noBold ? Fonts.medium : Fonts.heavy,paddingRight:5,flexWrap:'wrap'}}>
              {title}
            </Text>

                {isCenter && 
                    <View style={{flex:1}} />
                }
        </View>
        </SafeAreaView>
        </>
        )
    }
}
export default withNavigation(ScreenHeader)