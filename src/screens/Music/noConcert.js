import React,{Component} from 'react';
import { View,
    Text,
    Dimensions, 
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
FlatList,} from 'react-native';
const { height,width}=Dimensions.get('screen');
export default class NoConcert extends Component{
constructor(props){
    super(props);
    this.state={
        data:[],
        latitude :0,
            longitude :0
    }
}

_fetchData(){
    let { params } =  this.props.navigation.state;
    
    console.log(JSON.stringify(params))
    fetch('http://13.232.62.239:6565/api/user/getEvents', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "sub_ids":params.dataSubName,
        "location":params.loc == "" ? "" : params.loc,
        "date": params.date == "" ? "" : params.date,
        "artistEvent" : params.artist == "" ? "" : params.artist,
        "lat":this.state.latitude,
        "lng":this.state.longitude,
        "category_id":params.typeId
      }),
      
    }).then((response) => response.json())
    
        .then((responseJson) => {
           let arrData=[]
            console.log(JSON.stringify(responseJson))
           if(responseJson.statusCode == 200){
            console.log('SUCCESS RESPONSE',JSON.stringify(responseJson))
            for(i = 0 ; i<=responseJson.result.length-1 ; i++){
              var data1 = responseJson.result[i]
              arrData.push(data1)
            }
            this.setState({
              data:arrData
            })
            var eventList = this.state.data
            console.log('EVENT LIST ===',JSON.stringify(eventList))
           }
           else if(responseJson.statusCode == 400){
            console.log('FALIURE RESPONSE',JSON.stringify(responseJson))
              // this.setState({
              //   modalAlreadyRegisterd:true
              // })
            //alert('fsdf')
           }
           else{
            console.log('@@@@@@@@@',JSON.stringify(responseJson.events))
           }
          return responseJson;
          
        })
        .catch((error) => {
          console.log(error);
        });
}
_renderItem(item,index){
  let { params } =  this.props.navigation.state;
  //alert(JSON.stringify(params))
    console.log('FLATLIST CHECK',JSON.stringify(item.item.title))
    return(
      <View style={{height:80,width:width-40,backgroundColor:'transparent',marginTop:15,alignSelf:'center'}}>
{params.typeId == '1' ? 
<TouchableOpacity 
onPress={()=>this.props.navigation.navigate('FindPeople',{'type':params.type,'artFest':item.item.title,'data':params.sub_ids,dataSubName:params.dataSubName})}
style={{width:width-40,height:'80%',backgroundColor:'#f6f7f8',marginTop:10,alignSelf:'center',borderRadius:4,justifyContent:'center'}}>
      <Text style={{fontSize:15,fontFamily:'Montserrat-Bold',left:10}}>{item.item.title}</Text>
      </TouchableOpacity> :
    params.typeId == '2' ? 
    <TouchableOpacity 
    onPress={()=>this.props.navigation.navigate('FindPeopleSports',{'type':params.type,'artFest':item.item.title,'data':params.sub_ids,dataSubName:params.dataSubName})}
    style={{width:width-40,height:'80%',backgroundColor:'#f6f7f8',marginTop:10,alignSelf:'center',borderRadius:4,justifyContent:'center'}}>
          <Text style={{fontSize:15,fontFamily:'Montserrat-Bold',left:10}}>{item.item.title}</Text>
          </TouchableOpacity> :
         <TouchableOpacity 
         onPress={()=>this.props.navigation.navigate('FindPeopleTravel',{'type':params.type,'artFest':item.item.title,'data':params.sub_ids,dataSubName:params.dataSubName})}
         style={{width:width-40,height:'80%',backgroundColor:'#f6f7f8',marginTop:10,alignSelf:'center',borderRadius:4,justifyContent:'center'}}>
               <Text style={{fontSize:15,fontFamily:'Montserrat-Bold',left:10}}>{item.item.title}</Text>
               </TouchableOpacity>}
      </View>
    )
}
    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'transparent'}}>
                
            <View style={{height:'35%',width:width,backgroundColor:'transparent',justifyContent:'center'}}>
<View style={{height:'100%',width:'90%',backgroundColor:'#fff',alignSelf:'center',justifyContent:'center'}}>
<Text style={{fontSize:25,fontFamily:'Montserrat-Bold',alignSelf:'center',textAlign:'center'}}>No festivals or event found</Text>
<View style={{height:'10%'}}>

</View>
<Text style={{fontSize:13,fontFamily:'Montserrat-Regular',alignSelf:'center',textAlign:'center',color:'grey'}}>Sorry, we couldn't find a festival or event based on your search. Please search again or perhaps you might be interested in some of our suggestions below based on your likes.</Text>
</View>
            </View>
           <View style={{height:'50%',width:width}}>
           <FlatList 
            data={this.state.data}
            renderItem={(item,index)=>this._renderItem(item,index)}
            extraData={this.state}
            
            />
           </View>
              <TouchableOpacity 
               onPress={()=>this.props.navigation.navigate('SearchBy')}
               style={{height:height/8, width: '100%', alignSelf: 'center', borderRadius: 48, justifyContent: 'center',opacity:1 ,position:'absolute',bottom:0}}>
               <ImageBackground source={require('../../assets/Images/GradientButton.png')} style={{ height:height/8, width: '100%', alignSelf: 'center', borderRadius: 48, justifyContent: 'center',opacity:1 ,position:'absolute',bottom:0}}>
                  <Text style={{textAlign: 'center', opacity: 1, fontSize: 19, fontFamily: 'Montserrat-Bold', color: '#fff',alignSelf:'center'}}
                   >Go back to search</Text>
                </ImageBackground>
               </TouchableOpacity>
            </SafeAreaView>
        )
    }
}