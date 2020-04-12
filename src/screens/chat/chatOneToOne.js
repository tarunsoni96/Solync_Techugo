// import React,{Component} from 'react'
// import{Text,SafeAreaView,View,TouchableOpacity,TextInput,Image,Dimensions} from 'react-native'
// const{height,width} = Dimensions.get('screen')
// export default class ChatOneToOne extends Component{
//   constructor(props){
//     super(props);
//     this.state={
//       value:'abc'
//     }
//   }
//   render(){
//     return(
//       <SafeAreaView style={{height:'13%',backgroundColor:'red'}}>
//           <View style={{backgroundColor:'blue',height:'100%',flexDirection:'row'}}>
//             <View style={{height:'100%',width:'15%',backgroundColor:'yellow'}}>

//             </View>
                      
                    


//                     <View style={{height:'100%',width:'20%',backgroundColor:'green'}}>

//                     </View>

//                     <View style={{height:'100%',width:'38%',backgroundColor:'pink'}}>

//                     </View>

//                     <View style={{height:'100%',width:'25%',backgroundColor:'orange',flexDirection:'row'}}>
//                       <View style={{width:'55%',backgroundColor:'red',height:'100%'}}>

//                       </View>
//                       <View style={{width:'50%',backgroundColor:'green',height:'100%'}}>

//                       </View>
//                     </View>


//           </View>
//       </SafeAreaView>
//     )
//   }
// }



/*This is an example of Tooltip in React Native*/
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';
const{height,width} = Dimensions.get('screen')
//import Basic Component from React Native
import LinearGradient from 'react-native-linear-gradient';
import Tooltip from 'react-native-walkthrough-tooltip';
import { TouchableOpacity } from 'react-native-gesture-handler';
//Import Tooltip
 
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      toolTipVisible: false,
      name:'Ben',
      activeStatus:'Active now',
      userImg:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWsMN61CaBzHtAp1Fm4BwQnLJmiM4u5QRAX2-avVzstvlBvutn'
      //state to control the visibility of Tooltip

    };
  }
  render() {
    return (
    <SafeAreaView style={{height:'13%'}}>
                    <View style={{height:'100%',flexDirection:'row'}}>
              <TouchableHighlight style={{height:'100%',width:width/6}} >
            <View style={{height:'100%',width:'100%'}}>
    
    </View>
            </TouchableHighlight>
                        <View style={{height:'100%',width:'20%',justifyContent:'center'}}>
                        <Image style={{height:50,width:50,borderRadius:50/2}} source={{ uri: this.state.userImg }} />
                         </View>
                       <View style={{height:'100%',width:'38%',justifyContent:'center'}}>
                            <Text style={{fontSize:20}}>{this.state.name}</Text>
                            <Text style={{fontSize:17,color:'#b91453'}}>{this.state.activeStatus}</Text>
                         </View>
                        <View style={{height:'100%',width:'25%',flexDirection:'row'}}>
                         <Tooltip
          animated={false}
          //(Optional) When true, tooltip will animate in/out when showing/hiding
          arrowSize={{ width: 16, height: 8 }}
          //(Optional) Dimensions of arrow bubble pointing to the highlighted element
          backgroundColor="rgba(0,0,0,0.5)"
          //(Optional) Color of the fullscreen background beneath the tooltip.
          isVisible={this.state.toolTipVisible}
          //(Must) When true, tooltip is displayed
          content={
 <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#890d6e','#631d73']} style={{borderRadius:8,justifyContent:'center',backgroundColor:'#671971',height:70,width:width-40,alignSelf:'center'}}>
</LinearGradient>
         }
          //(Must) This is the view displayed in the tooltip
          placement="bottom"
          //(Must) top, bottom, left, right, auto.
          onClose={() => this.setState({ toolTipVisible: false })}
          //(Optional) Callback fired when the user taps the tooltip
        >
            <TouchableHighlight onPress={() => this.setState({ toolTipVisible: true })} style={{width:width/6,height:'100%'}}>
            <View style={{width:'100%',height:'100%'}}></View>
            </TouchableHighlight>
                               </Tooltip>
                                 <View style={{width:'50%',height:'100%'}}>
                                </View>
                         </View>
                       </View>
    </SafeAreaView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#307ecc',
    padding: 16,
  },
  touchable: {
    width: '100%',
    height: 40,
    padding: 10,
    backgroundColor: '#f5821f',
    marginTop: 30,
  },
  touchableText: {
    color: 'white',
    textAlign: 'center',
  },
  largeText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
  },
});  