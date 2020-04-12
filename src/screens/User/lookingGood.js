import React,{Component} from 'react';
import { View,Text,Dimensions,Image, TouchableOpacity,ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { height,width}=Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-navigation';
export default class LookingGood extends Component{

    render(){
        return(
        
            <SafeAreaView style={{flex:1}}>
                <ScrollView>
                    <View style={{justifyContent:'center',alignItems:'center',paddingTop:height*0.235}}>
                    {/* <LinearGradient
                    colors={['#dac7e5', '#d2e5f6', '#c6eeee']}
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}} style={{ height: 170, width: 170, borderRadius: 170 / 2, backgroundColor: 'transparent', position: 'relative', borderColor: 'transparent', borderWidth: 1,justifyContent:'center' }}>
                    <View style={{ height: 160, width: 160, borderRadius: 160 / 2, backgroundColor: '#fff', position: 'relative', borderColor: 'transparent', borderWidth: 1 ,alignSelf:'center'}}>

                    </View>
                    </LinearGradient> */}
<Image source={require('../../assets/Images/AddProfile.png')} style={{height:160,width:160}}/>
                        {/* <Image source={require('./image/icons8-male-user-96.png')}/> */}
                        <Text style={{fontWeight:'bold',fontSize:30,paddingTop:40,paddingBottom:20,fontFamily:'Montserrat-Bold'}}>Looking good!</Text>
                        <Text style={{color:'#7e7e7e'}}>You can change, add or remove photos{'\n'}
                       from your profile at anytime by visiting</Text>
                                    <Text style={{alignSelf:'center',paddingBottom:20,color:'#7e7e7e'}}>your profile</Text>
                        {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                    <View style={{alignSelf:'center',
                marginTop: height * 0.02,
                height:60,
                width:width-20,
                borderRadius:6
                }}>
<LinearGradient
     colors={['#7d2c96', '#67a7e0', '#48b8ab']}
    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
    style={{ height: 70, width:width-20,borderRadius:6, alignItems: 'center', justifyContent: 'center', width:width-20,borderRadius:6}}
>
    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Continue to profiles</Text>
</LinearGradient>

</View>
<View style={{padding:10}}></View></TouchableOpacity> */}

<TouchableOpacity  onPress={()=>this.props.navigation.navigate('Home')} >
                <ImageBackground source={require('../../assets/Images/GradientButton.png')} style={{ height:height/7, width: width, alignSelf: 'center', borderRadius: 48, justifyContent: 'center' }}>
          <Text style={{textAlign: 'center', opacity: 1, fontSize: 20, fontFamily: 'Montserrat-Bold', color: '#fff',alignSelf:'center'}}>Continue to profiles</Text>
        </ImageBackground>
                </TouchableOpacity>


                    </View>
                </ScrollView>

            </SafeAreaView>
        )
    }
}