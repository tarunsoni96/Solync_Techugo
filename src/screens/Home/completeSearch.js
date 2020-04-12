import React,{Component} from 'react';
import { View,Text,Dimensions,Picker, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
const { height,width}=Dimensions.get('screen');
import LinearGradient from 'react-native-linear-gradient';
export default class Sc4 extends Component{
    state={
        language:'',
        date:''
    }

    render(){
        return(
          <View style={{flex:1}}>
            <ScrollView>
         <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'center',marginBottom:50,marginTop:20}}>What concert/festival{"\n"}would you like to{"\n"}attend?</Text>
        
         <View style={{borderColor:'grey',borderBottomWidth:1,marginLeft:20,marginRight:20}}>
            <Text style={{marginLeft:7,fontWeight:'bold',fontSize:15}}>Artist or Festival</Text>
            <Text>Mumford & Sons</Text>
            </View>

        <View style={{borderColor:'grey',borderBottomWidth:1,marginLeft:20,marginRight:20}}>
            <Text style={{marginLeft:7,fontWeight:'bold',fontSize:15}}>Location</Text>
            <Picker
            
  selectedValue={this.state.language}
  style={{width:width-50}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue})
  }>
  <Picker.Item  label='Please Select' fontSize={20} />  
  <Picker.Item label="Java" value="java"/>
  <Picker.Item label="JavaScript" value="js" />
  <Picker.Item label="c" value="c" />
  <Picker.Item label="python" value="python" />
  <Picker.Item label="react" value="react" />
  

</Picker></View>

        <View style={{borderColor:'grey',borderBottomWidth:1,marginLeft:20,marginRight:20,marginTop:20}}>
            <Text style={{marginLeft:7,fontWeight:'bold',fontSize:15}}>Date</Text>
            <Picker
  selectedValue={this.state.date}
  style={{width:width-50}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({date: itemValue})
  }>
  <Picker.Item  label='Select date' />  
  <Picker.Item label="01May2019" value="1" />
  <Picker.Item label="05june2019" value="2" />
  <Picker.Item label="10sept2019" value="3" />
  <Picker.Item label="23Oct2019" value="4" />
  <Picker.Item label="29Dec019" value="5" />

</Picker></View>
            </ScrollView>
             <TouchableOpacity>
             <View style={{alignSelf:'center',
         marginTop: height * 0.02,
         height:60,
         width:width-20,
         borderRadius:6
         }}>
<LinearGradient
colors={['#00FFFF', '#17C8FF', '#329BFF', '#4C64FF', '#6536FF', '#8000FF']}
start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
style={{ height: 60, width:width-20,borderRadius:6, alignItems: 'center', justifyContent: 'center', width:width-20,borderRadius:6}}
>
<Text style={{color:'white',fontSize:18}}>Find me my people</Text>
</LinearGradient>

</View>
<View style={{paddingBottom:40}}></View></TouchableOpacity>
</View>
        )
    }
}