/****************** ERROR COMPONENT ****************** */

import React, { Component } from 'react'
import{
StyleSheet,
Text,
View,
Image
} from 'react-native'
import{
scaleHeight,
scaleWidth,
normalizeFontMenu,
Dimensions
} from './responsive'
import Images from '../constant/images'
import images from '../constant/images';
 
class CustomComponent extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        let{height,message,left,warn}  = this.props
        return (
          <View style={{height:100,width:100,backgroundColor:'red',margin:20}}></View>
        )
    }
}

//styles

const styles = StyleSheet.create({
    errorMessage:{
       marginTop:scaleHeight(6),
        //fontFamily:'Montserrat-Bold',
        color:'#bb205a',
        height:0,
        alignSelf:'flex-start',
        fontSize:normalizeFontMenu(15),
        //margin:5
        marginLeft:10,
        fontWeight:'bold'
    }
})

export default CustomComponent