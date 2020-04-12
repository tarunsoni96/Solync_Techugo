// /* *****************BLOCKED USER************ */
// import React, { Component } from 'react'
// import{
// Text,
// TouchableOpacity,
// View,
// FlatList,
// Dimensions,
// SafeAreaView,
// ScrollView,
// Image,
// Modal
// } from 'react-native'
// import Header from '../../common/headerCommon'
// import CardView from 'react-native-cardview'
// const{height,width} = Dimensions.get('screen')
// export default class BlockedUser extends Component {
//   constructor(props){
//     super(props);
//     this.state={
//       data:[
//         {event:'AFROBEATS',
//         date:'Yinka Davis, Sonny Okosun, Fela Kuti',

//       },
//       {event:'AFROBEATS',
//       date:'Yinka Davis, Sonny Okosun, Fela Kuti',
//     },
//     {event:'AFROBEATS',
//     date:'Yinka Davis, Sonny Okosun, Fela Kuti',
//   },
//   {event:'AFROBEATS',
//   date:'Yinka Davis, Sonny Okosun, Fela Kuti',
// },
// {event:'AFROBEATS',
// date:'Yinka Davis, Sonny Okosun, Fela Kuti',
// },
// {event:'AFROBEATS',
// date:'Yinka Davis, Sonny Okosun, Fela Kuti',
// },
// {event:'AFROBEATS',
// date:'Yinka Davis, Sonny Okosun, Fela Kuti',
// },
// {event:'AFROBEATS',
// date:'Yinka Davis, Sonny Okosun, Fela Kuti',
// },
//      ],
//       modalVisible:false
//     }
//   }
//   renderItemList(item,index){
//     console.log('dfsdf',item.item.key)
//     return(
//       <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
//  <View style={{flexDirection:'row',height:160,width:width-30,alignSelf:'center',backgroundColor:'#950c6f',borderRadius:20}}>
//   <View style={{justifyContent:'center',width:width-150}}>

//  <Text style={{color:'#fff',fontSize:23,left:40,fontWeight:'bold',fontFamily:'Montserrat-Bold'}}>{item.item.event}</Text> 
//  <Text style={{color:'#fff',fontSize:15,left:40,fontStyle:'italic'}}>{item.item.date}</Text> 
//   </View>



//       </View>

//        <View style={{height:10,width:width,backgroundColor:'transparent'}}></View>
//      </TouchableOpacity>
//     )
//   }



//   render() {
//     return (
//       <SafeAreaView style={{flex:1}}>



//       <FlatList 
//       data={this.state.data}

//       renderItem={(item,index) => this.renderItemList(item,index)}
//       extraData={this.state}
//       style={{marginTop:10}}
//       />

//       </SafeAreaView>

//     )
//   }
// }/* *****************BLOCKED USER************ */



import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  Modal
} from 'react-native'
import Header from '../../common/headerCommon'
import CardView from 'react-native-cardview'
const { height, width } = Dimensions.get('screen')
export default class BlockedUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          event: 'AFROBEATS',
          date: 'Yinka Davis, Sonny Okosun, Fela Kuti',
          img: require('../../assets/Images/@2xafro-bg.png'),
        },
        {
          event: 'BLUES',
          date: 'Muddy water, B.B.King,Robert Johnson',
          img: require('../../assets/Images/@2xblues-BG.png'),
        },
        {
          event: 'CLASSICAL',
          date: 'Mozart, Beethoven, Claude Debussy',
          img: require('../../assets/Images/@2xclassical-BG.png'),
        },
        {
          event: 'ELECTRONIC',
          date: 'Clavin Harris, Daft Punk, David Guetta',
          img: require('../../assets/Images/@2xelectric-BG.png'),
        },
        {
          event: 'HIP HOP',
          date: 'Drake, Kendrik Lamar, Nicki Minaj',
          img: require('../../assets/Images/@2xhiBphop-G.png'),
        },
        {
          event: 'METAL',
          date: 'Metalica, AC/DC, Black Sabbath',
          img: require('../../assets/Images/@2xmetal-BG.png'),
        },
        {
          event: 'POP',
          date: 'Adela, Ed Sheeran, Ariana Grande',
          img: require('../../assets/Images/@2xpop-BG.png'),
        },
        {
          event: 'R&B / SOUL',
          date: 'Usher, R. Kelly, Erykah Badu',
          img: require('../../assets/Images/@2xRock-BG.png'),
        },

        {
          event: 'REGGAE',
          date: 'Bob Marley, The Clash, Shaggy',
          img: require('../../assets/Images/@2xreggae-BG.png'),
        },
        {
          event: 'ROCK',
          date: 'Queen, Jon Bon Jovi,The Rolling Stones',
          img: require('../../assets/Images/@2xRock-BG.png'),
        },
      ],
      modalVisible: false
    }
  }
  renderItemList(item, index) {
    console.log('dfsdf', item.item.key)
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>

        <ImageBackground
          source={item.item.img}
          imageStyle={{ borderRadius: 8 }}
          style={{ resizeMode: 'stretch', height: height * 0.17, width: width - 32, left: 17, right: 17 }}>

          <View style={{ marginLeft: 30, marginTop: height * 0.05 }}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>{item.item.event}</Text>
            <Text style={{ color: '#fff', fontSize: 17, fontStyle: 'italic' }}>{item.item.date}</Text>
          </View>
        </ImageBackground>

        {/* <Image source={item.item.img} style={{width:width-30}}/>  */}

        <View style={{ height: 10, width: width, backgroundColor: '#fff' }}></View>
      </TouchableOpacity>
    )
  }



  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <FlatList
          data={this.state.data}

          renderItem={(item, index) => this.renderItemList(item, index)}
          extraData={this.state}
          style={{ marginTop: 10 }}
        />

      </SafeAreaView>

    )
  }
}