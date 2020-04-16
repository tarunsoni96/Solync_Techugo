/****************** ERROR COMPONENT ****************** */

import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    Image,
    Platform
} from 'react-native'
const { height, width } = Dimensions.get('screen')
import ErrorText from '../common/error'
import Images from '../constant/images'
class TextInputSolo extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let { onFocusText, onChangeText,autoFocus,ref,editable,dontValidate, borderColor, inputState, message, labelText, keyboard, value, fontSize, fontFamily, maxLength } = this.props
        return (
            <View style={{ margin: 5, height: height / 8.5, width: width - 30, alignSelf: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row',flexWrap:'wrap',alignItems:'center' }}>
                    <Text style={{ opacity: 1, fontSize: 13,marginBottom:-10, fontFamily: 'Montserrat-SemiBold', color: '#879299' }}> {labelText}</Text>
                    {inputState == '' || dontValidate ? null :
                        <View style={{ flexDirection: 'row',flexWrap:'wrap',flex:1,alignItems:'center' }}>
                            <Image source={Images.warning} style={{ marginLeft: 20, width: 17, height: 16 }} />
                            <ErrorText
                                height={20}
                                message={message}
                            />
                        </View>}
                </View>

                {Platform.OS == 'ios' ?
                    <TextInput style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderLeftWidth: 0, borderRightWidth: 0, borderBottomColor: borderColor || 'lightgrey', borderWidth: 2, width: width - 35, height: '60%' }}
                        onChangeText={onChangeText}
                        fontSize={17}
                        fontFamily={'Montserrat-Bold'}
                        keyboardType={keyboard}
                        alignSelf={'center'}
                        ref={ref}
                        value={value}
                        fontSize={fontSize}
                        fontFamily={fontFamily}
                        onFocus={onFocusText}
                        autoFocus={autoFocus}
                        underlineColorAndroid="transparent"
                        maxLength={maxLength}
                        editable={editable}
                    /> :
                    <TextInput style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderLeftWidth: 0, borderRightWidth: 0, borderBottomColor: borderColor || 'lightgrey', borderWidth: 2, width: width - 35 }}
                        onChangeText={onChangeText}
                        fontSize={17}
                        //fontWeight={'700'}
                        fontFamily={'Montserrat-Bold'}
                        //clearTextOnFocus={true}
                        keyboardType={keyboard}
                        ref={ref}
                        autoFocus={autoFocus}
                        onFocus={onFocusText}
                        alignSelf={'center'}
                        value={value}
                        fontSize={fontSize}
                        fontFamily={fontFamily}
                        underlineColorAndroid="transparent"
                        maxLength={maxLength}

                    />}
            </View>
        )
    }
}

//styles


export default TextInputSolo