import React, { Component } from 'react'
import {
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native'

import { withNavigation, ScrollView } from 'react-navigation';
import Constants from 'Helpers/Constants'
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import {widthPercentageToDP as wp, heightPercentageToDP as hp, widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';

import Container from '../../AppLevelComponents/UI/Container';
import { observer } from 'mobx-react';
import MobxStore from '../../StorageHelpers/MobxStore';

const { height, width } = Dimensions.get('screen')
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

@observer
class MyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: '',
      type: '',
      profilePic:'',
      title: '',
      name: 'Tiffany',
      age: '',
      profile: '',
      switch1Value: false,
      show: false,
      userId: ''
    }
  }

  willFocus = () => {
   
    this.setState({})
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus',this.willFocus)
    AsyncStorageHandler.get(Constants.userInfoObj,val => {
      if(val != null){
        const {user_id,images} = val
       
        this.setState({
          userId:user_id
        },()=>{
        });
      }
    })

    AsyncStorageHandler.get(Constants.userInfoObj,val => {
      if(val != null){
        const {first_name,occupation,age,dob,user_id,images} = val
        
        this.setState({name:first_name,profile:occupation,age:getAge(dob)})
      }
    })
  }

  toggleSwitch1 = (value) => {
    this.setState({ switch1Value: value })
  }

  render() {
    let profileImg = (MobxStore.userObj.images != undefined && MobxStore.userObj.images.length > 0) ? {uri:MobxStore.userObj.images[0]?.imageURL } : require('../../assets/Images/@3xprofile-active.png')
    return (
      <ScrollView >
        <View>
          <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('EditProfile')} >
            <View style={{ justifyContent: 'center', alignSelf: 'center', alignItems: 'center', paddingTop:wp('7%') }}>
              <ImageBackground source={require('../../assets/Images/@proflie-bg-light.png')} style={{ position: 'relative', justifyContent: 'center', height: wp('45%'), width: wp('45%'), borderRadius: 200 / 2 }}>
                <Image resizeMode='cover' source={profileImg} style={{ height: wp('34%'), width: wp('34%'), borderRadius: 150 / 2,  alignSelf: 'center' }} />
              
                <View style={{ position: 'absolute', right: widthPercentageToDP(5), bottom: heightPercentageToDP(2), }}>
                <Image source={require('../../assets/Images/@3xedit-icon.png')} style={{ height: widthPercentageToDP(10), width: widthPercentageToDP(10) }} />
              </View>

              </ImageBackground>
              
            </View>
          </TouchableWithoutFeedback>

          <View style={{ width: width,  justifyContent: 'center' }}>
            <Text style={{ fontSize: 23,textAlign:'center', alignSelf: 'center', fontFamily: 'Montserrat-ExtraBold' }}>{MobxStore.userObj.first_name}, {getAge(MobxStore.userObj.dob) || 'Age set not'}</Text>
            <Text style={{ fontSize: 15, alignSelf: 'center', color: 'purple', fontFamily: 'Montserrat-SemiBold',textAlign:'center' }}>{MobxStore.userObj.occupation}</Text>
          </View>
          <View style={{ height: 20, width: width }}></View>
          <View style={{ flexDirection: 'row', width: width - 40, height: height / 6.5, marginTop: 20, marginBottom: 10, justifyContent: 'space-evenly', alignSelf: 'center', backgroundColor: 'transparent' }}>
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Settings')} >
            <View style={{ width: (width - 40) / 2.1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f6f7f8', borderRadius: 6 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../../assets/Images/@3xsettings-work-tool.png')} style={{ height: 35, width: 35 }} />
                  <View style={{ paddingBottom: 3 }}></View>
                  <Text style={{ fontSize: 18, alignSelf: 'center', color: '#808c93', fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>SETTINGS</Text>
                </View>
            </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('EditProfile', { 'image': '', 'userId': this.state.userId })} style={{ justifyContent: 'center' }}>
            <View style={{ width: (width - 40) / 2.1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f6f7f8', borderRadius: 6 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../../assets/Images/@3xpencil-edit-button.png')} style={{ height: 35, width: 35 }} />
                  <View style={{ paddingBottom: 3 }}></View>
                  <Text style={{ fontSize: 18, alignSelf: 'center', color: '#808c93', fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>EDIT PROFILE</Text>
                </View>
            </View>
              </TouchableWithoutFeedback>
          </View>

          <View style={{  height: height / 5.6,width: (width - 40), alignSelf: 'center',padding:15, justifyContent: 'center' }}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ContactUs')} style={{ width: '100%', height: '100%', justifyContent: 'center', alignSelf: 'center' }}>
              <ImageBackground source={require('../../assets/Images/WhiteButton.png')} style={{ height: '90%', width: (width - 15), alignSelf: 'center', borderRadius: 48, justifyContent: 'center' }}>
                <Text onPress={() => this.props.navigation.navigate('ContactUs')} style={{ fontSize: 19, fontFamily: 'Montserrat-Bold', color: '#b81252', alignSelf: 'center', alignItems: 'center', marginBottom:10 }}>Contact Us</Text>
              </ImageBackground>
            </TouchableWithoutFeedback>
          </View>
        </View>
        </ScrollView>
    )
  }
}
export default withNavigation(MyProfile);
