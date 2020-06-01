import React, { Component } from 'react'
import {
    View,
    ScrollView,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Modal,
    SafeAreaView,
    ImageBackground,
    KeyboardAvoidingView,
    Image
} from 'react-native'
import HelperMethods from 'Helpers/Methods'
import ErrorText from '../../common/error'
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../common/headerCommon'
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";

import GradButton from '../../common/gradientButton'
import {
    validatePassword
} from '../../common/validation'

import Images from '../../constant/images'
import Container from '../../AppLevelComponents/UI/Container';
import ScreenHeader from '../../components/ScreenHeader';
const { height, width } = Dimensions.get('screen')
export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            securePass: true,
            passText: 'Show',
            modalVisible: false,
            secureConfirmPass: true,
            opacityButton: true,

            //password validation

            password: "",
            passwordMessage: "",
            passwordBorderColor: 'lightgrey',
            passwordErrorMessageHeight: 0,
            passwordPlaceholder: "Password",
            isApiCall:false,
            confirmpassword: "",
            confirmpasswordMessage: "",
            confirmpasswordBorderColor: 'lightgrey',
            confirmpasswordErrorMessageHeight: 0,
            confirmpasswordPlaceholder: "Confirm Password",
        }
    }
    
    checkValidation() {
        let { params } = this.props.navigation.state;
        let validatePasswordResult = validatePassword(this.state.password, false)
        if (this.state.password == '') {
            this.setState({
                passwordMessage: 'Insert password',
                passwordBorderColor: '#bb205a',
                passwordErrorMessageHeight: 20,
                opacityButton:true,
            })
        }  else if (this.state.confirmpassword == '') {
            this.setState({
                passwordMessage: 'Insert confirm password',
                confirmpasswordBorderColor: '#bb205a',
                confirmpasswordErrorMessageHeight: 20,
                opacityButton:true,

            })
        
        } else if (this.state.password != this.state.confirmpassword) {
            this.setState({
                passwordMessage: 'Password do not match.',
                confirmpasswordBorderColor: '#bb205a',
                confirmpasswordErrorMessageHeight: 20
            })
        } 


        else if (validatePasswordResult.error != '') {
            this.setState({
                passwordMessage: 'Password not secure',
                passwordBorderColor: '#bb205a',
                confirmpassword:'',
                password:'',
                passwordErrorMessageHeight: 20,
                opacityButton:true,
            })
        }  else if(!this.state.isApiCall) {
            this.setState({isApiCall:true,passwordMessage:'',passwordBorderColor:'lightgrey',confirmpasswordBorderColor:'lightgrey'})
            fetch('http://13.232.62.239:6565/api/user/changePassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": params?.email.email,
                    "password": this.state.password,
                }),
 
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({isApiCall:false})
                    if (responseJson.statusCode == 200) {
                        this.props.navigation.navigate('Login')

                    }
                    else if (responseJson.statusCode == 400) {
                    }
                    else {
                        alert(responseJson.result)
                    }
                    return responseJson;

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
    }
    
    showPass() {
        if (this.state.securePass == true) {
            this.setState({
                securePass: false
            })
        } else {
            this.setState({
                securePass: true
            })
        }
    }
    showPassConfirm() {
        if (this.state.secureConfirmPass == true) {
            this.setState({
                secureConfirmPass: false
            })
        } else {
            this.setState({
                secureConfirmPass: true
            })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flex:1,alignItems:'center',width:'100%'}} behavior={HelperMethods.isPlatformAndroid() ? '' : 'padding'}>

        <ScreenHeader style={{marginTop:10}} isCenter title='Reset password' />
              
                <View style={{flex:1,marginTop:40 }}>


                {this.state.passwordMessage == '' ? null :
                    <View style={{ flexDirection: 'row',alignItems:'center',marginBottom:20}}>
                        <Image source={Images.warning} style={{   width: 17, height: 16 }} />
                        <ErrorText
                            height={20}
                            message={this.state.passwordMessage}
                        />
                    </View>}


                        <View style={{ flexDirection: 'row',alignItems:'center' }}>
                            <Text style={{ opacity: 1, fontSize: 13, fontFamily: 'Montserrat-SemiBold', color: '#879299',  }}>Enter new password</Text>

                        </View>

                        <View style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderBottomColor: this.state.passwordBorderColor, width: width - 30, borderWidth: 2,  opacity: 2.0, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput style={{ borderColor: '#C0C0C0', width: width - 120, borderWidth: 0, height: '100%', opacity: 2.0 }}
                                secureTextEntry={this.state.securePass}
                                fontSize={17}
                                autoFocus
                                secureTextEntry={this.state.securePass}
                                value={this.state.password}
                                onFocus={()=>this.setState({password:this.state.passwordMessage ? '' : this.state.password})}
                                fontFamily={'Montserrat-Bold'}
                                onChangeText={(password) => this.setState({ password, opacityButton: false })} />


                            {this.state.securePass == true ?
                                <TouchableOpacity onPress={() => this.showPass()} style={{ justifyContent: 'flex-start', backgroundColor: 'transparent', height: 40 }}>
                                    <View style={{ height: 30, width: 65, backgroundColor: '#e4e7e9', justifyContent: 'center', borderRadius: 4 }}>
                                        <Text style={{ alignSelf: 'center', color: '#808c93', fontSize: 17, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Show</Text>
                                    </View>

                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => this.showPass()} style={{ justifyContent: 'flex-start', backgroundColor: 'transparent', height: 40 }}>
                                    <View style={{ height: 30, width: 65, backgroundColor: '#e4e7e9', justifyContent: 'center', borderRadius: 4 }}>
                                        <Text style={{ alignSelf: 'center', color: '#808c93', fontSize: 17, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Hide</Text>
                                    </View>

                                </TouchableOpacity>

                            }
                        </View>
                    <View style={{ width: width - 30,marginTop:80, alignSelf: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                        <Text style={{ opacity: 1, fontSize: 13, fontFamily: 'Montserrat-SemiBold', color: '#879299',  }}>Re-type password to confirm</Text>
                        <View style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderBottomColor: this.state.confirmpasswordBorderColor, width: width - 30, borderWidth: 2, opacity: 2.0, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput style={{ borderColor: '#C0C0C0', width: width - 120, borderWidth: 0,  opacity: 2.0 }}
                                secureTextEntry={this.state.securePass}
                                fontSize={17}
                                onFocus={()=>this.setState({confirmpassword:this.state.passwordMessage ? '' : this.state.confirmpassword})}

                                secureTextEntry={this.state.secureConfirmPass}
                                fontFamily={'Montserrat-Bold'}
                                value={this.state.confirmpassword}
                                onChangeText={(confirmpassword) => this.setState({ confirmpassword, opacityButton: false })} />
                            {this.state.secureConfirmPass == true ?
                                <TouchableOpacity onPress={() => this.showPassConfirm()} style={{ justifyContent: 'flex-start', backgroundColor: 'transparent', height: 40 }}>
                                    <View style={{ height: 30, width: 65, backgroundColor: '#e4e7e9', justifyContent: 'center', borderRadius: 4 }}>
                                        <Text style={{ alignSelf: 'center', color: '#808c93', fontSize: 17, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Show</Text>
                                    </View>

                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => this.showPassConfirm()} style={{ justifyContent: 'flex-start', backgroundColor: 'transparent', height: 40 }}>
                                    <View style={{ height: 30, width: 65, backgroundColor: '#e4e7e9', justifyContent: 'center', borderRadius: 4 }}>
                                        <Text style={{ alignSelf: 'center', color: '#808c93', fontSize: 17, fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Hide</Text>
                                    </View>

                                </TouchableOpacity>
                            }
                        </View>

                        <View style={{ height: '100%', width: width - 30, alignSelf: 'center', marginTop: 6 }}>
                            <Text style={{ fontStyle: 'italic', fontSize: 14, alignSelf: 'flex-start', color: 'grey', height: '100%' }}>Use at least 6 letters, 1 number & 1 capital letter</Text>
                        </View>
                    </View>

                </View>

                <View style={{width:'100%'}} >
                {
                    this.state.opacityButton == false ?
                            <GradButton
                            onPress={() => {
                            this.checkValidation()
                        }}
                            isApiCall={this.state.isApiCall}
                                text={'Reset password'}
                            />
                    :
                        <GradButton
                            text={'Reset password'}
                            style={{opacity:0.7}}
                        />
                }
                </View>
            </KeyboardAvoidingView>
        )
    }
}

