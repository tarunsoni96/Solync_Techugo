import React, { Component } from 'react'
import{
Text,
View,
SafeAreaView,
ScrollView,
TouchableOpacity,
TextInput,
Dimensions,
Image,
ImageBackground

} from 'react-native'
const{height,width} = Dimensions.get('screen')
import Header from '../../common/headerCommon'
import LinearGradient from 'react-native-linear-gradient';
export default class SearchBy extends Component {
    constructor(props){
        super(props);
        this.state={
            showViewLocation:true,
            showViewArtist:true,
            disableButton:true,
            artist:'',
            location:'',
           
        }
    }
    componentDidMount(){
       
      //  let { params } =  this.props.navigation.state;
        // alert(JSON.stringify(params))
    }
    tryFunc(){
        let { params } =  this.props.navigation.state
        var abc = params.type
       this.props.navigation.navigate('SearchByUnique',{search:'Artist',type:abc})
    }
    _locationFunc(){
        let { params } =  this.props.navigation.state
        this.props.navigation.navigate('SearchByUnique',{search:'Location',type:abc})
     }
    _searchByArtist(text){
this.setState({
    artist:text
})

    }
    _changeViewLocation(text){
        this.setState({
            location:text
        })
    }
    changeViewLocation(){
        this.setState({
            showViewLocation:false
        })
    }
    render() {
        let { params } =  this.props.navigation.state;
       // alert(params.type)
        let abc = params.type
        return (
            <SafeAreaView style={{height:'17%'}}>
                        <View style={{alignItems:'center',flexDirection:'row',height:'100%',width:width,justifyContent:'center',borderColor:'#DCDCDC'}}>
                        
                        <View style={{height:'100%',justifyContent:'center',width:width/6}}>
                         <TouchableOpacity onPress={()=>this.props.navigation.navigate('MultipleView')}>
                         <Image source={require('../../assets/Images/Left.png')} style={{height:height/40,width:width/18,alignSelf:'center'}}/>
                         </TouchableOpacity>
                         </View>
                         <View style={{height:'100%',justifyContent:'flex-end',alignSelf:'center',width:width/1.2}}> 
                         <Text style={{fontSize:24,alignSelf:'center',marginRight:width/6,fontFamily: 'Montserrat-ExtraBold'}}>What concert/festival would you like to attend?</Text>
                        
                         </View>
                        
                       
                     
                      </View>
                       
                        
            
                        
                          
                   </SafeAreaView>
//             <SafeAreaView style={{flex:1}}>
                
//                 {params.type == 'Music' ?
//             <SafeAreaView style={{height:'17%'}}>
//             <View style={{alignItems:'center',flexDirection:'row',height:'100%',width:width,justifyContent:'center',borderColor:'#DCDCDC'}}>
            
//             <View style={{height:'100%',justifyContent:'center',width:width/6}}>
//             <TouchableOpacity onPress={()=>this.props.navigation.navigate('MultipleView')}>
//             <Image source={require('../../assets/Images/Left.png')} style={{height:height/40,width:width/18,alignSelf:'center'}}/>
//             </TouchableOpacity>
//             </View>
//             <View style={{height:'100%',justifyContent:'flex-end',alignSelf:'center',width:width/1.2}}> 
//             <Text style={{fontSize:24,alignSelf:'center',marginRight:width/6,fontFamily: 'Montserrat-ExtraBold'}}>What concert/festival would you like to attend?</Text>
            
//             </View>
            
           
         
//          </View>
           
            

            
              
//        </SafeAreaView>
//               :
//              params.type == 'Travel' ?
//              <SafeAreaView style={{height:'17%'}}>
//              <View style={{alignItems:'center',flexDirection:'row',height:'100%',width:width,justifyContent:'center',borderColor:'#DCDCDC'}}>
             
//              <View style={{height:'100%',justifyContent:'center',width:width/6}}>
//              <TouchableOpacity onPress={()=>this.props.navigation.navigate('MultipleView')}>
//              <Image source={require('../../assets/Images/Left.png')} style={{height:height/40,width:width/18,alignSelf:'center'}}/>
//              </TouchableOpacity>
//              </View>
//              <View style={{height:'100%',justifyContent:'flex-end',alignSelf:'center',width:width/1.2}}> 
//              <Text style={{fontSize:24,alignSelf:'center',marginRight:width/6,fontFamily: 'Montserrat-Bold'}}>What type of traveller are you?</Text>
             
//              </View>
             
            
          
//           </View>
            
             
 
             
               
//         </SafeAreaView>
//          :
            
//              <SafeAreaView style={{height:'17%'}}>
//              <View style={{alignItems:'center',flexDirection:'row',height:'100%',width:width,justifyContent:'center',borderColor:'#DCDCDC'}}>
             
//              <View style={{height:'100%',justifyContent:'center',width:width/6}}>
//              <TouchableOpacity onPress={()=>this.props.navigation.navigate('MultipleView')}>
//              <Image source={require('../../assets/Images/Left.png')} style={{height:height/40,width:width/18,alignSelf:'center'}}/>
//              </TouchableOpacity>
//              </View>
//              <View style={{height:'100%',justifyContent:'flex-end',alignSelf:'center',width:width/1.2}}> 
//              <Text style={{fontSize:24,alignSelf:'center',marginRight:width/6,fontFamily: 'Montserrat-Bold'}}>Which sporting would you like to attend?</Text>
             
//              </View>
             
            
          
//           </View>
            
             
 
             
               
//         </SafeAreaView>
             
//             }

//            {params.type == 'Music' ?
//             <View style={{height:height/4,width:width-30,alignSelf:'center',justifyContent:'center'}}>
//             <View style={{height:height/5,width:width-30,backgroundColor:'#f6f7f8',justifyContent:'center',alignSelf:'center',borderRadius:8}}>
 
//              <Text style={{color:'#000',fontSize:20,alignSelf:'center',fontFamily: 'Montserrat-Bold'}}>Search by Artist or festival</Text>
 
//             <TouchableOpacity style={{height:'50%'}} onPress={()=>this.props.navigation.navigate('SearchByUnique',{type:abc})}>
//             <View style={{textAlign:'center',borderTopColor:'transparent',borderRightColor:'transparent',borderLeftColor:'transparent',borderBottomColor:'#edeff0',borderWidth:2,width: width - 50,  height: '100%', opacity: 2.0,alignSelf:'center',justifyContent:'center' }}
//       >
//           <Text style={{fontSize:18,fontFamily:'Montserrat-Bold',alignSelf:'center',color:'#a7a8a8'}}
//      >Enter Artist or festival</Text>
//           </View>
//             </TouchableOpacity>
 
//   </View>
//             </View>:
//          <View style={{height:height/4,width:width-30,alignSelf:'center',justifyContent:'center'}}>
//          <View style={{height:height/5,width:width-30,backgroundColor:'#f6f7f8',justifyContent:'center',alignSelf:'center',borderRadius:8}}>

//           <Text style={{color:'#000',fontSize:20,alignSelf:'center',fontFamily: 'Montserrat-Bold'}}>Search by Event</Text>

//          <TouchableOpacity style={{height:'50%'}} onPress={()=>this.props.navigation.navigate('SearchByUnique',{type:abc})}>
//          <View style={{textAlign:'center',borderTopColor:'transparent',borderRightColor:'transparent',borderLeftColor:'transparent',borderBottomColor:'#edeff0',borderWidth:2,width: width - 50,  height: '100%', opacity: 2.0,alignSelf:'center',justifyContent:'center' }}
//    >
//        <Text style={{fontSize:18,fontFamily:'Montserrat-Bold',alignSelf:'center',color:'#a7a8a8'}}
//   >Enter Event</Text>
//        </View>
//          </TouchableOpacity>

// </View>
//          </View>}
//             <Text style={{fontSize:20,color:'#7f7f7f',textAlign:'center',fontWeight:'bold'}}>OR</Text>

//             <View style={{height:height/4,width:width-30,alignSelf:'center',justifyContent:'center'}}>
//             <View style={{height:height/5,width:width-30,backgroundColor:'#f6f7f8',justifyContent:'center',alignSelf:'center',borderRadius:8}}>
 
//              <Text style={{color:'#000',fontSize:20,alignSelf:'center',fontFamily: 'Montserrat-Bold'}}>Search by Location</Text>
 
//              <TouchableOpacity style={{height:'50%'}} onPress={()=>this.props.navigation.navigate('SearchByUnique',{type:abc,loc:'location'})}>
//          <View style={{textAlign:'center',borderTopColor:'transparent',borderRightColor:'transparent',borderLeftColor:'transparent',borderBottomColor:'#edeff0',borderWidth:2,width: width - 50,  height: '100%', opacity: 2.0,alignSelf:'center',justifyContent:'center' }}
//    >
//        <Text style={{fontSize:18,fontFamily:'Montserrat-Bold',alignSelf:'center',color:'#a7a8a8'}}
//   >Enter Location</Text>
//        </View>
//          </TouchableOpacity>
//   </View>
//             </View>
//                 </SafeAreaView>

                
            
        )
    }
}
