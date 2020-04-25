import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import Container from "../../AppLevelComponents/UI/Container";
import Fonts from "UIProps/Fonts";
import CustomText from 'AppLevelComponents/UI/CustomText'
import {Colors} from "UIProps/Colors";
import 'Helpers/global'
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";
import GradButton from "../../common/gradientButton";
import { withNavigation } from "react-navigation";
import NetworkAwareContent from "../../AppLevelComponents/UI/NetworkAwareContent";
const { height, width } = Dimensions.get("screen");

let params = {}
class NoConcert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      latitude: 0,
      longitude: 0,
      loading:false
    };
  }

  componentWillMount(){

    params = this.props.navigation.state.params
  }

  componentDidMount(){
    this._fetchData()

  }

  _fetchData() {
    this.setState({loading:true})
    let { params } = this.props.navigation.state;
    fetch("http://13.232.62.239:6565/api/user/getEvents", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sub_ids: params.dataSubName,
        location: params.loc == "" ? "" : params.loc,
        date: params.date == "" ? "" : params.date,
        artistEvent: params.artist == "" ? "" : params.artist,
        lat: global.latitude,
        lng: global.longitude,
        category_id: params.typeId,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({loading:false})
        if (responseJson.statusCode == 200) {
          this.setState({
            data: responseJson.result,
          });
        }
      })
      .catch((error) => {
        this.setState({loading:false})
      });
  }
  _renderItem(item, index) {
    let { params } = this.props.navigation.state;

    return (
      <TouchableWithoutFeedback onPress={() =>
                  this.props.navigation.navigate("FindPeople", {
                    // type: params.type,
                    // artFest: item.item.title,
                    // data: params.sub_ids,
                    // dataSubName: params.dataSubName,

        type: params.type,
        artFest: item.item.title,
        data: params.sub_ids,
        typeId: params.typeId,
        title:params?.title,



        dataSubName: params.dataSubName,
        selectedCats: params?.selectedCats,

                  })
                }
            >

      <View style={{marginBottom:20,flex:1,backgroundColor:'#F6F7F8',width:'100%',borderRadius:10,padding:23,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <CustomText text={item.item.title} style={{fontFamily:Fonts.heavy,maxWidth:params.type == 'Music' ? widthPercentageToDP(40) : widthPercentageToDP(80)}} color='#000' />
        {params.type == 'Music' && 
        <CustomText color={Colors.colorMusic}  text={item.item.performers ?  'Artist/Band' : 'Festival'} />
        }
      </View>
      </TouchableWithoutFeedback>
    )
    //       <TouchableOpacity
    //         onPress={() =>
    //           this.props.navigation.navigate("FindPeopleSports", {
    //             type: params.type,
    //             artFest: item.item.title,
    //             data: params.sub_ids,
    //             dataSubName: params.dataSubName,
    //           })
    //         }
    //     )}
    //   </View>
    // );
  }
  render() {
    
    let title = ''
    switch(params.type){
      case 'Music':
        title = 'No festivals or event found'
        break

        case 'Sports':
          title = 'No sporting event found'
          break;
    }
    return (
      <>
      <Container>
        <View style={{flex:1,justifyContent:'center',paddingHorizontal:widthPercentageToDP(10),alignItems:'center'}}>

            <Text
              style={{
                fontSize: widthPercentageToDP(5),
                fontFamily: "Montserrat-Bold",
                textAlign: "center",
                marginTop:heightPercentageToDP(10),
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Montserrat-medium",
                textAlign: "center",
                marginTop:heightPercentageToDP(2),

                color: "grey",
              }}
            >
              Sorry, we couldn't find a festival or event based on your search.
              Please search again or perhaps you might be interested in some of
              our suggestions below based on your likes.
            </Text>

            <NetworkAwareContent isApiCall={this.state.loading} >

              <View style={{marginTop:30,flex:1,width:widthPercentageToDP(85)}} >

          <FlatList
            data={this.state.data}
            renderItem={(item, index) => this._renderItem(item, index)}
            extraData={this.state}
          />
              </View>
            </NetworkAwareContent>
        </View>

             
      </Container>
              <GradButton style={{width:'100%'}} text='Go back to search' onPress={()=>this.props.navigation.pop(2)} />
</>
    );
  }
}
export default  withNavigation(NoConcert)