/****************** ERROR COMPONENT ****************** */

import React, { Component } from 'react'
import{
StyleSheet,
Text,
View,
TextInput,
Dimensions,
TouchableOpacity,
Image
} from 'react-native'
import ErrorText from '../common/error'
import Images from '../constant/images'
import Fonts from "UIProps/Fonts";
const {height,width} = Dimensions.get('screen')
class TextInputPassSolo extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        let {value,onFocusText,onClickHide,onClickShow,onChangeText,secureTextEntry,borderColor,inputState,message,securePassEntryState} = this.props
        return (
            <View style={{ position:'relative',height: height/6,marginBottom:-20,marginTop:10, width: width - 30, alignSelf: 'center', justifyContent: 'center', flexDirection: 'column',backgroundColor:'transparent'}}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
           <Text style={{ opacity: 1, fontSize: 13, fontFamily: 'Montserrat-SemiBold', color: '#879299' }}>Password</Text>
           {inputState == '' ? null :
                                <View style={{ flexDirection: 'row',alignItems:'center', width: width / 1.5 }}>
                                    <Image source={Images.warning} style={{ marginLeft: 20,width:17,height:16 }} />
                                    <ErrorText
                                        height={20}
                                        message={message}
                                    />
                                </View>}
           </View>
           
            <View style={{ borderTopColor:'transparent',borderRightColor:'transparent',borderLeftColor:'transparent',borderLeftWidth:0,borderRightWidth:0,borderBottomColor:borderColor, width: width - 30, borderWidth: 2,  opacity: 2.0,  flexDirection: 'row',justifyContent:'space-between' }}>
            <TextInput style={{ 
                fontFamily:Fonts.medium
                ,marginLeft:2, borderColor: '#C0C0C0', width: width - 125, borderWidth: 0,  opacity: 2.0,}}
            secureTextEntry={secureTextEntry} 
            value={value}
            onChangeText={onChangeText}
            //fontWeight={'700'}
            fontSize={17}
            fontWeight={'bold'}
            onFocus={onFocusText}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            maxLength={20}/>
            {
                securePassEntryState == true ?
                <TouchableOpacity onPress={onClickShow} style={{ justifyContent: 'center',height:30, marginBottom:10, marginTop:0 }}>
                  <View style={{ height:30, width: 65, backgroundColor: '#e4e7e9', justifyContent: 'center',borderRadius:4 }}>
                    <Text style={{ alignSelf: 'center', color: '#808c93',fontSize:14 ,fontFamily: 'Montserrat-ExtraBold'}}>Show</Text>
                  </View>
                </TouchableOpacity> :
                <TouchableOpacity onPress={onClickHide} style={{ justifyContent: 'center',height:30, marginBottom:10, marginTop:0 }}>
                <View style={{ height: 30, width: 65, backgroundColor: '#e4e7e9', justifyContent: 'center',borderRadius:4 }}>
                    <Text style={{ alignSelf: 'center', color: '#808c93',fontSize:14 ,fontFamily: 'Montserrat-ExtraBold' }}>Hide</Text>
                </View>
                </TouchableOpacity>
              } 
            </View>
            
            </View>
        )
    }
}

//styles


export default TextInputPassSolo



