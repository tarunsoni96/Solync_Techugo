/****************** ERROR COMPONENT ****************** */

import React, { Component } from 'react'
import{
StyleSheet,
Text,
View,
Image,
Dimensions
} from 'react-native'
import{
scaleHeight,
scaleWidth,
normalizeFontMenu
} from '../common/responsive'
const{height,width} = Dimensions.get('screen')
import Images from '../constant/images'
import images from '../constant/images';
class ErrorText extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        let{height,message,left,warn}  = this.props
        return (
           <View style={{flex:1}}>
            
            <Text  style={[styles.errorMessage,]}>{message}</Text>
           </View>
        )
    }
}

//styles

const styles = StyleSheet.create({
    errorMessage:{
        color:'#bb205a',
        flexWrap:'wrap',
        width:'100%',
        alignSelf:'flex-start',
        fontSize:normalizeFontMenu(15),
        //margin:5
        marginLeft:10,
        fontWeight:'bold',
    }
})

export default ErrorText