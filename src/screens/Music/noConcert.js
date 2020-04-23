import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  FlatList,
} from "react-native";
import Container from "../../AppLevelComponents/UI/Container";
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
    };
  }

  componentWillMount(){
    params = this.props.navigation.state.params
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
      <View
        style={{
          height: 80,
          width: width - 40,
          backgroundColor: "transparent",
          marginTop: 15,
          alignSelf: "center",
        }}
      >
        {params.typeId == "1" ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FindPeople", {
                type: params.type,
                artFest: item.item.title,
                data: params.sub_ids,
                dataSubName: params.dataSubName,
              })
            }
            style={{
              width: width - 40,
              height: "80%",
              backgroundColor: "#f6f7f8",
              marginTop: 10,
              alignSelf: "center",
              borderRadius: 4,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 15, fontFamily: "Montserrat-Bold", left: 10 }}
            >
              {item.item.title}
            </Text>
          </TouchableOpacity>
        ) : params.typeId == "2" ? (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FindPeopleSports", {
                type: params.type,
                artFest: item.item.title,
                data: params.sub_ids,
                dataSubName: params.dataSubName,
              })
            }
            style={{
              width: width - 40,
              height: "80%",
              backgroundColor: "#f6f7f8",
              marginTop: 10,
              alignSelf: "center",
              borderRadius: 4,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 15, fontFamily: "Montserrat-Bold", left: 10 }}
            >
              {item.item.title}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FindPeopleTravel", {
                type: params.type,
                artFest: item.item.title,
                data: params.sub_ids,
                dataSubName: params.dataSubName,
              })
            }
            style={{
              width: width - 40,
              height: "80%",
              backgroundColor: "#f6f7f8",
              marginTop: 10,
              alignSelf: "center",
              borderRadius: 4,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 15, fontFamily: "Montserrat-Bold", left: 10 }}
            >
              {item.item.title}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
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

          <FlatList
            data={this.state.data}
            renderItem={(item, index) => this._renderItem(item, index)}
            extraData={this.state}
          />
            </NetworkAwareContent>
        </View>

              <GradButton style={{width:'100%'}} text='Go back to search' onPress={()=>this.props.navigation.pop(3)} />
             
      </Container>

    );
  }
}
export default  withNavigation(NoConcert)