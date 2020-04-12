


import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
  SafeAreaView,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  Switch,
  AsyncStorage
} from 'react-native'
import {
  scaleHeight,
  scaleWidth,
  normalizeFontMenu
} from '../common/responsive'
import { connect } from 'react-redux'
import TRAVEL from '../screens/Home/TRAVEL'
import MUSIC from '../screens/Home/MUSIC'
import SPORTS from '../screens/Home/SPORTS'
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationEvents } from 'react-navigation';
const { height, width } = Dimensions.get('screen')
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: '',
      type: '',
      title: '',
      name: 'Tiffany',
      age: '26',
      profile: 'Illustrator',
      switch1Value: false,
      show: false,
      userId: ''
    }

  }
  showDetails(param) {
    this.setState({
      show: param,
    })
  }
  componentDidMount() {
    AsyncStorage.getItem('userId', (err, result) => {
      userData = JSON.parse(result)
      console.log('USER ID CONSOLE', userData)
      this.setState({
        userId: userData
      })
      console.log('USER ID CONSOLE OF MY PROFILE', JSON.stringify(this.state.userId))
    });

  }
  render() {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={payload => this.setState({ show: null })}
        // onDidFocus={payload => alert('did focus', payload)}
        // onWillBlur={payload => alert('will blur', payload)}
        // onDidBlur={payload => alert('did blur', payload)}
        />
        {/* <View style={{height:'13%',position:'relative'}}>    
 <View style={{height:'100%',width:80,left:0,top:0,position:'absolute',justifyContent:'center'}}>
     <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} style={{height:40,justifyContent:'center'}}>
     <Image source={require('../assets/Images/@profile-active.png')} style={{alignSelf:'center',height:33,width:33}}/>
     </TouchableOpacity>
 
 </View>
 <View style={{height:'100%',width:80,right:0,top:0,position:'absolute',justifyContent:'center'}}>
 <TouchableOpacity onPress={() => {this.props.navigation.navigate('chatScreen',{type:'Travel'})
        }} style={{height:40,justifyContent:'center'}}>
 <Image source={require('../assets/Images/@messages-unread.png')} style={{alignSelf:'center',height:26,width:30}}/>
 </TouchableOpacity>
 </View>
 

 


 <View style={{height:'100%',backgroundColor:'#fff',width:width/2,alignSelf:'center',justifyContent:'center'}}>
 <View style={{alignItems:'center',flexDirection:'row',height:'50%',width:width-190,backgroundColor:'#ebf0f3',alignSelf:'center',borderRadius:50,borderColor:'#DCDCDC',justifyContent:'space-between'}}>
 {this.state.show == 'MUSIC' ? 

 <TouchableOpacity style={{alignSelf:'center',height:'110%',width:width/3.8,backgroundColor:'transparent',borderRadius:50,justifyContent:'center',flexDirection:'row',alignItems:'center'}} 
             onPress={()=>this.showDetails('MUSIC')}>
                <ImageBackground source={require('../assets/Images/@tab-active.png')} resizeMode={'stretch'}
 style={{
  borderRadius: 30,
       flexDirection: 'row',
       justifyContent: 'space-evenly',
       alignItems: 'center',
       alignSelf:'center',height:'110%',width:'105%',bottom:2,right:3
 }}>
<Image source={require('../assets/Images/hdpi/music-active.png')} style={{alignSelf:'center',height:20,width:20,top:2}}/>
                     <Text style={{textAlign:'center',alignSelf:'center',fontSize:17,top:2}}>Music</Text>
 </ImageBackground>
         
                 </TouchableOpacity> 
 
           
                 :
                 <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>this.showDetails('MUSIC')}>
                         <Image source={require('../assets/Images/music.png')} style={{alignSelf:'center',marginLeft:'20%',height:20,width:20}}/>
                 </TouchableOpacity>
                
             }
               {this.state.show == 'SPORTS' ? 
          <TouchableOpacity style={{alignSelf:'center',height:'110%',width:width/3.8,backgroundColor:'transparent',borderRadius:50,justifyContent:'center',flexDirection:'row',alignItems:'center',right:2}} 
          onPress={()=>this.showDetails('SPORTS')}>
             <ImageBackground source={require('../assets/Images/@tab-active.png')} resizeMode={'stretch'}
style={{
borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf:'center',height:'110%',width:'105%',bottom:2
}}>
                  <Image source={require('../assets/Images/hdpi/sport-active.png')} style={{alignSelf:'center',height:20,width:20,top:2}}/>
                     <Text style={{textAlign:'center',alignSelf:'center',fontSize:17,top:2}}>Sport</Text>
                </ImageBackground>
                 </TouchableOpacity> 
                
                 :
                 <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>this.showDetails('SPORTS')}>
                     <Image source={require('../assets/Images/@sport-inactive.png')}  style={{height:20,width:20}}/>
                 </TouchableOpacity>
             }
 {this.state.show == 'TRAVEL' ? 
           <TouchableOpacity style={{alignSelf:'center',height:'110%',width:width/3.8,backgroundColor:'transparent',borderRadius:50,justifyContent:'center',flexDirection:'row',alignItems:'center'}} 
           onPress={()=>this.showDetails('TRAVEL')}>
              <ImageBackground source={require('../assets/Images/@tab-active.png')} resizeMode={'stretch'}
style={{
borderRadius: 30,
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     alignItems: 'center',
     alignSelf:'center',height:'110%',width:'105%',bottom:2
}}>
              <Image source={require('../assets/Images/hdpi/plane-colour.png')} style={{alignSelf:'center',height:20,width:20,justifyContent:'center',top:2}}/>
                 <Text style={{textAlign:'center',alignSelf:'center',fontSize:17,top:2}}>Travel</Text>
                 </ImageBackground>
             </TouchableOpacity> 
           
             :
             <TouchableOpacity style={{alignSelf:'center',justifyContent:'center'}} onPress={()=>this.showDetails('TRAVEL')}>
                  <Image source={require('../assets/Images/travel-active.png')} style={{alignSelf:'center',marginRight:'20%',right:5,height:20,width:20}} />
             </TouchableOpacity>
         }
             
             
              
     </View>
 </View>

 
 </View> */}

        <View style={{ height: '13%', position: 'relative' }}>
          <View style={{ height: '100%', width: 80, left: 0, top: 0, position: 'absolute', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{ height: 40, justifyContent: 'center' }}>
              <Image source={require('../assets/Images/@profile-active.png')} style={{ alignSelf: 'center', height: 33, width: 33 }} />
            </TouchableOpacity>

          </View>
          <View style={{ height: '100%', width: 80, right: 0, top: 0, position: 'absolute', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('chatScreen', { type: 'Travel' })
            }} style={{ height: 40, justifyContent: 'center' }}>
              <Image source={require('../assets/Images/@messages-unread.png')} style={{ alignSelf: 'center', height: 26, width: 30 }} />
            </TouchableOpacity>
          </View>




          <View style={{ height: '100%', backgroundColor: '#fff', width: width / 2, alignSelf: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', height: '50%', width: '100%', backgroundColor: '#ebf0f3', alignSelf: 'center', borderRadius: 50, borderColor: '#DCDCDC', justifyContent: 'space-between' }}>
              {this.state.show == 'MUSIC' ?

                <TouchableOpacity style={{ alignSelf: 'center', height: '110%', width: width / 4, backgroundColor: 'transparent', borderRadius: 50, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => this.showDetails('MUSIC')}>
                  <ImageBackground source={require('../assets/Images/@tab-active.png')} resizeMode={'stretch'}
                    style={{
                      borderRadius: 30,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      alignSelf: 'center', height: '110%', width: '110%', bottom: 2, right: 3
                    }}>
                    <Image source={require('../assets/Images/hdpi/music-active.png')} style={{ alignSelf: 'center', height: 20, width: 20, top: 2, left: 5 }} resizeMode={'contain'} />
                    <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 17, top: 2, fontFamily: 'Montserrat-SemiBold', width: 70 }}>Music</Text>
                  </ImageBackground>

                </TouchableOpacity>


                :
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.showDetails('MUSIC')} >
                  <Image source={require('../assets/Images/music.png')} style={{ alignSelf: 'center', left: 10, height: 20, width: 20 }} resizeMode={'contain'} />
                </TouchableOpacity>

              }
              {this.state.show == 'SPORTS' ?
                <TouchableOpacity style={{ alignSelf: 'center', height: '110%', width: width / 4, backgroundColor: 'transparent', borderRadius: 50, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', right: 2 }}
                  onPress={() => this.showDetails('SPORTS')}>
                  <ImageBackground source={require('../assets/Images/@tab-active.png')} resizeMode={'stretch'}
                    style={{
                      borderRadius: 30,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      alignSelf: 'center', height: '110%', width: '110%', bottom: 2
                    }}>
                    <Image source={require('../assets/Images/hdpi/sport-active.png')} style={{ alignSelf: 'center', height: 20, width: 20, top: 2, left: 5 }} resizeMode={'contain'} />
                    <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 17, top: 2, fontFamily: 'Montserrat-SemiBold', width: 60 }}>Sport</Text>
                  </ImageBackground>
                </TouchableOpacity>

                :
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => this.showDetails('SPORTS')}>
                  <Image source={require('../assets/Images/@sport-inactive.png')} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
                </TouchableOpacity>
              }
              {this.state.show == 'TRAVEL' ?
                <TouchableOpacity style={{ alignSelf: 'center', height: '110%', width: width / 4, backgroundColor: 'transparent', borderRadius: 50, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => this.showDetails('TRAVEL')}>
                  <ImageBackground source={require('../assets/Images/@tab-active.png')} resizeMode={'stretch'}
                    style={{
                      borderRadius: 30,
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      alignSelf: 'center', height: '110%', width: '110%', bottom: 2, right: 5
                    }}>
                    <Image source={require('../assets/Images/travelActive2.png')} style={{ alignSelf: 'center', height: 20, width: 20, justifyContent: 'center', top: 2, left: 4 }} resizeMethod={'scale'} resizeMode={'contain'} />
                    <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 17, top: 2, fontFamily: 'Montserrat-SemiBold', width: 60 }}>Travel</Text>
                  </ImageBackground>
                </TouchableOpacity>

                :
                <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center' }} onPress={() => this.showDetails('TRAVEL')}>
                  <Image source={require('../assets/Images/travel-active.png')} style={{ alignSelf: 'center', right: 10, height: 20, width: 20 }} resizeMode={'contain'} />
                </TouchableOpacity>
              }



            </View>
          </View>


        </View>


        {this.state.show == 'TRAVEL' ?
          <MUSIC
          />
          : this.state.show == 'SPORTS' ?
            <MUSIC


            /> :
            this.state.show == 'MUSIC' ?
              <MUSIC />
              :
              <View style={{ flex: 1 }}>

                <View style={{ position: 'absolute', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', paddingTop: '10%' }}>
                  <ImageBackground source={require('../assets/Images/@proflie-bg-light.png')} style={{ position: 'relative', justifyContent: 'center', height: 200, width: 200, borderRadius: 200 / 2 }}>

                    <Image source={require('../assets/Images/settingPhoto.png')} style={{ height: 150, width: 150, borderRadius: 150 / 2, position: 'relative', alignSelf: 'center' }} />

                  </ImageBackground>
                  <View style={{ height: 70, width: 70, borderRadius: 70 / 2, position: 'absolute', right: 10, bottom: 0, backgroundColor: 'transparent' }}>
                    <Image source={require('../assets/Images/@edit-icon.png')} />
                  </View>
                </View>


                <View style={{ width: width, height: height / 7, marginTop: height / 3.5, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 23, alignSelf: 'center', fontFamily: 'Montserrat-ExtraBold' }}>{this.state.name},  {this.state.age}</Text>
                  <Text style={{ fontSize: 15, alignSelf: 'center', color: 'purple', fontFamily: 'Montserrat-SemiBold' }}>{this.state.profile}</Text>
                </View>
                <View style={{ height: 20, width: width }}></View>
                <View style={{ flexDirection: 'row', width: width - 40, height: height / 6.5, marginTop: 20, marginBottom: 10, justifyContent: 'space-evenly', alignSelf: 'center', backgroundColor: 'transparent' }}>

                  <View style={{ width: (width - 40) / 2.1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f6f7f8', borderRadius: 6 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')} >
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/Images/@settings-work-tool.png')} />
                        <View style={{ paddingBottom: 3 }}></View>
                        <Text style={{ fontSize: 18, alignSelf: 'center', color: '#808c93', fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>SETTINGS</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{ width: (width - 40) / 2.1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f6f7f8', borderRadius: 6 }}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile', { 'image': '', 'userId': this.state.userId })} style={{ justifyContent: 'center' }}>
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/Images/@pencil-edit-button.png')} />
                        <View style={{ paddingBottom: 3 }}></View>
                        <Text style={{ fontSize: 18, alignSelf: 'center', color: '#808c93', fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>EDIT PROFILE</Text>
                      </View>
                    </TouchableOpacity>

                  </View>
                </View>


                <View style={{ width: width - 30, height: height / 7, alignSelf: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ContactUs')} style={{ width: '100%', height: '80%', justifyContent: 'center', alignSelf: 'center' }}>


                    <ImageBackground source={require('../assets/Images/WhiteButton.png')} style={{ height: '100%', width: width - 20, alignSelf: 'center', borderRadius: 48, justifyContent: 'center' }}>
                      <Text style={{ fontSize: 19, fontFamily: 'Montserrat-Bold', color: '#b81252', alignSelf: 'center', alignItems: 'center' }}>Contact Us</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>

        }
      </SafeAreaView>
    )
  }
}

export default withNavigation(Header);