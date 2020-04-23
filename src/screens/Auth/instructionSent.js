import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  BackHandler,
  Platform
} from 'react-native'
const { height, width } = Dimensions.get('screen')
import Images from '../../constant/images'
import CodeInput from 'react-native-confirmation-code-input';
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import GradButton from '../../common/gradientButton';
import Container from '../../AppLevelComponents/UI/Container';

export default class instructionSent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inactiveColorCode: 'grey',
      messsage: '',
      opacity: false,
      code:''
    }
  }

  _onFinishCheckingCode1(code) {
    this.setState({opacity:true,code})
    
  }

  verify(){
    let { params } = this.props.navigation.state;
    
    this.setState({isApiCall:true})

    fetch('http://13.232.62.239:6565/api/user/otpVerification', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": params?.email,
        "otp": this.state.code

      }),

    }).then((response) => response.json())

      .then((responseJson) => {

        this.setState({isApiCall:false})
        if (responseJson.statusCode == 200) {
          console.log(JSON.stringify(responseJson))
          if(this.state.messsage != ''){
            this.setState({
              messsage: ''
            })
          }
          this.props.navigation.navigate('ResetPassword', { 'email': params })
        }
        else if (responseJson.statusCode == 400) {
          this.setState({
            inactiveColorCode: '#bb205a',
            messsage: 'Invalid Code entered.',
            opacity: false
          })
        }
        else {
        }
        return responseJson;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    let { params } = this.props.navigation.state;
    let email = params?.email
    return (
      <>
        <Container>

          <View style={{ alignItems: 'center',marginTop:40, flexDirection: 'row',  width: width, justifyContent: 'center', borderColor: '#DCDCDC' }}>
            
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <View style={{ justifyContent: 'center', width: width / 6 }}>
                <Image source={require('../../assets/Images/Left.png')} style={{ height: height / 40, width: width / 20, alignSelf: 'center' }} resizeMode={'contain'} />
              </View>
            </TouchableOpacity>

            <View style={{  justifyContent: 'center', alignSelf: 'center', width: width / 1.2 }}>
              <Text style={{ fontSize: 17, alignSelf: 'center', marginRight: width / 6, fontFamily: 'Montserrat-Bold' }}>Reset instructions sent</Text>
            </View>
          </View>


          <View style={{ width: width - 40, alignSelf: 'center', justifyContent: 'center', }}>
            <Image source={require('../../assets/Images/Tick.png')} style={{ alignSelf: 'center',marginVertical:20, height: 80, width: 80 }} />
            <Text style={{ color: '#696969', textAlign: 'center', fontSize: 20, marginTop: 10 }}>If this email address is registered. you will receive an email containing your One Time Password</Text>
          </View>
          {
            this.state.messsage == '' ? null
              :
              <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignSelf: 'center',marginTop:10 }}>
                <Image source={Images.warning} style={{ alignSelf: 'center', marginLeft: '58%' }} />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  <Text style={{
                    color: '#bb205a',
                    height: 20,
                    alignSelf: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                    width: width,
                    justifyContent: 'center'
                  }}>  {this.state.messsage}</Text>
                </View>

              </View>
          }


          <View style={{ marginTop: 60, width: width - 40, alignSelf: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Bold', fontSize: 22, fontWeight: 'bold' }}>Please enter the OTP</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, color: '#696969', fontFamily: 'Montserrat-Regular' }}>Sent to {email}</Text>
          </View>


          <CodeInput
            ref="codeInputRef1"
            secureTextEntry={false}
            activeColor='#bb205a'
            isInComplete={isInComplete => this.setState({opacity:!isInComplete})}
            inactiveColor={this.state.inactiveColorCode}
            className={'border-b'}
            space={4}
            isError={this.state.message}
            codeLength={4}
            autoFocus
            onCodeChange={code => alert(code)}
            size={80}
            inputPosition='left'
            onFulfill={(code) => this._onFinishCheckingCode1(code)}
            containerStyle={{ justifyContent: 'center' }}
            codeInputStyle={{fontSize:20, fontFamily: 'Montserrat-Bold',marginTop:0}}
            keyboardType="numeric"
          />

          <View style={{width:'100%',marginTop:90}}>

            <GradButton style={{opacity: this.state.opacity ? 1 :0.7,}} onPress={() => this.state.opacity ? this.verify() : ()=>{}   } isApiCall={this.state.isApiCall} text='Verify' />

          </View>

          <View style={{  width: width, backgroundColor: 'transparent',marginTop:60 }}>
              <Text style={{ fontSize: 16, alignSelf: 'center', color: '#2d2d2d', fontFamily: 'Montserrat-SemiBold' }}>Didn't receive the OTP?</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                <Text style={{ fontSize: 15, alignSelf: 'center', color: '#7e2179', fontFamily: 'Montserrat-ExtraBold' }}>Re-enter email address</Text>
              </TouchableOpacity>
            </View>
</Container>   

        </>
    )
  }
}


const styles = {
  content: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0
  },
}