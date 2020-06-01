import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { NavigationEvents, withNavigation } from "react-navigation";
import Header from "../../common/headerCommon";
import Fonts from "UIProps/Fonts";
import HelperMethods from 'Helpers/Methods'
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";

import LinearGradient from "react-native-linear-gradient";
import GradButton from "../../common/gradientButton";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Container from "../../AppLevelComponents/UI/Container";

const { height, width } = Dimensions.get("screen");
class multipleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewWidth: 100,
      viewHeight: 100,
      dataSource: [],
      selectedView: false,
      backgroundColorView: "transparent",
      selectedCats:[],
      selectedValue: [],
      count: 0,
      newArray: [],
      arrayLength: "",
      asdf: []
    };

    this.rx = []
    this.ry = []

    
  }
  componentDidMount() {
    let { params } = this.props.navigation.state;
    console.log(params);
    console.log("====================", params);
    this._handleEvent();

    
    
  }

  _handleEvent() {
    let { params } = this.props.navigation.state;
    fetch("http://13.232.62.239:6565/api/user/subCategory", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        category_id: params?.typeId || 1
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        let arrData = [];
        if (responseJson.statusCode == 200) {
          for (i = 0; i <= responseJson.result.length - 1; i++) {
            var data1 = responseJson.result[i];
            arrData.push(data1);
          }
          this.setState({
            asdf: arrData
          });
          var subCatList = this.state.asdf;
        } else {
          console.log(responseJson.result);
        }
        return responseJson;
      })
      .catch(error => {
        console.log(error);
      });
    this.fetchData();
  }


  fetchData = () => {
    this.setState({ loading: true });
    responseJson = this.state.asdf.map(item => {
      item.isSelect = false;
      item.count = 0;
      return item;
    });

    this.setState({
      loading: false,
      asdf: responseJson
    });
  };

  changeView(index) {
    this.setState({
      backgroundColorView: "red"
    });
  }

  _continue() {
    let { params } = this.props.navigation.state;
    if (this.state.arrayLength < 2) {
      console.log("dfs");
    } else {
      if (params?.type == "Travel") {
        this.props.navigation.navigate("FindPeople", {
          type:params?.type,
          typeId:params?.typeId,
          selectedCats:this.state.selectedCats,
        });
      } else {
        this.props.navigation.navigate("SearchBy", {
          type:
            params?.type == "Music"
              ? "Music"
              : params?.type == "Sports"
              ? "Sports"
              : "Travel",
          dataArr: this.state.asdf,
          selectedCats:this.state.selectedCats,

          typeId: params?.typeId
        });
      }
    }
  }

  selectItem(item) {
    let arr = [...this.state.selectedCats]
    let i = arr.indexOf(item.item.sub_id)
    if(i > -1){
      arr.splice(i,1)
    } else {
      arr.push(item.item.sub_id)
    }
    this.setState({selectedCats:arr},()=>{
    })

    item.item.isSelect = !item.item.isSelect;
    item.item.count = item.item.count + 1;
    HelperMethods.animateLayout()
    this.setState({
      asdf: this.state.asdf
    });

    let new_array = [];
    let data = this.state.asdf.filter(itemcount => {
      if (itemcount.isSelect == true) {
        new_array.push(item);
        console.log("NEW  ======", new_array);
        this.setState(
          {
            arrayLength: new_array.length,
            newArray: new_array
          },
          console.log("NEW ARRAY ======", this.state.newArray)
        );
        return true;
      }

      return false;
    });

    // })
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  renderItemList(item, index) {
    let { params } = this.props.navigation.state;

    let gradColor = params?.type == "Music"? ["#841470", "#6b1770"]: params?.type == "Sports"? ["#256860", "#205f64"]: ["#3371a6", "#2b4988"]
    let borderColor = params?.type == "Music" ? "#d6b9d4" : params?.type == "Sports" ? "#b2d1ce" : "#bdccdd"

    let boxSize = this.randomIntFromInterval(widthPercentageToDP(25),widthPercentageToDP(30))
    if(this.ry.length < this.state.asdf.length){
      this.ry[index] = this.randomIntFromInterval(Math.random(0,10),15)
      this.rx[index] = this.randomIntFromInterval(Math.random(0,5),8)
    }
    return (
      <TouchableOpacity
      onPress={index => this.selectItem(item)}
      style={{
      margin: widthPercentageToDP(2),
      height: boxSize,
      width:  boxSize,
      top:this.ry[index],
      left:this.rx[index],
      borderRadius: boxSize / 2,
    }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={item.item.isSelect ? gradColor : ['rgba(0,0,0,0)','rgba(0,0,0,0)']}
        style={{
          borderColor,
          borderRadius: boxSize / 2,
          borderWidth: item.item.isSelect ? 1 : 2,
          alignItems:'center',
          justifyContent:'center',
          flex:1,
        }}
      >
          <Text
            style={{
              fontSize: widthPercentageToDP(3.5),
              color: item.item.isSelect ? '#fff' : '#000',
              fontFamily:Fonts.medium,
              textAlign: "center",
              width: 80
            }}
          >
            {item.item.sub_category_name}
          </Text>
      </LinearGradient>
    </TouchableOpacity>

    );
  }

  render() {
    let { params } = this.props.navigation.state;
    //alert(JSON.stringify(params))
    return (
      <Container>
      <View style={{ flex: 1 }}>
        {params?.type == "Music" ? (
          <SafeAreaView style={{ height: "17%" }}>
    <BackHandlerSingleton onBackPress={()=> this.props.navigation.pop()} />

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
                width: width,
                justifyContent: "center",
                borderColor: "#DCDCDC"
              }}
            >
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  width: width / 5
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Image
                    source={require("../../assets/Images/Left.png")}
                    style={{
                      height: height / 40,
                      width: width / 20,
                      alignSelf: "center"
                    }}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignSelf: "center",
                  flexDirection: "column",
                  width: width / 1.2
                }}
              >
                <Text
                  style={{ fontSize: 22, fontFamily: "Montserrat-ExtraBold" }}
                >
                  What music do you like?
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontStyle: "italic",
                    color: "grey",
                    marginTop:4,
                    fontFamily: "Montserrat-SemiBoldItalic"
                  }}
                >
                  Please select two or more options.
                </Text>
              </View>
            </View>
          </SafeAreaView>
        ) : params?.type == "Travel" ? (
          <SafeAreaView style={{ height: "17%" }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
                width: width,
                justifyContent: "center",
                borderColor: "#DCDCDC"
              }}
            >
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  width: width / 6
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Image
                    source={require("../../assets/Images/Left.png")}
                    style={{
                      height: height / 40,
                      width: width / 20,
                      alignSelf: "center"
                    }}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignSelf: "center",
                  flexDirection: "column",
                  width: width / 1.2
                }}
              >
                <Text
                  style={{ fontSize: 21, fontFamily: "Montserrat-ExtraBold" }}
                >
                  What type of traveler are you?
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontStyle: "italic",
                    color: "grey",
                    marginTop:4,
                    fontFamily: "Montserrat-SemiBoldItalic"
                  }}
                >
                  Please select two or more options.
                </Text>
              </View>
            </View>
          </SafeAreaView>
        ) : (
          <SafeAreaView style={{ height: "17%" }}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                height: "100%",
                width: width,
                justifyContent: "center",
                borderColor: "#DCDCDC"
              }}
            >
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  width: width / 6,
                  alignSelf: "center"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Image
                    source={require("../../assets/Images/Left.png")}
                    style={{
                      height: height / 40,
                      width: width / 20,
                      alignSelf: "center"
                    }}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignSelf: "center",
                  flexDirection: "column",
                  width: width / 1.2
                }}
              >
                <Text
                  style={{ fontSize: 21, fontFamily: "Montserrat-ExtraBold" }}
                >
                  What kind of sport are you interested in?
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontStyle: "italic",
                    marginTop:4,
                    color: "grey",
                    fontFamily: "Montserrat-SemiBoldItalic"
                  }}
                >
                  Please select two or more options.
                </Text>
              </View>
            </View>
          </SafeAreaView>
        )}

          <FlatList
            data={this.state.asdf}
            renderItem={(item, index) => this.renderItemList(item, index)}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            style={{ alignSelf: "center", }}
          />

        
      </View>
      <View
          style={{
            width:'100%',
          }}
        >
          {this.state.arrayLength <= 1 ? (
            <GradButton text='Continue' onPress={()=>{}} style={{opacity:0.7}} />
            
          ) : <GradButton text='Continue' onPress={()=>this._continue()} />
          }
        </View>
      </Container>
    );
  }
}
export default withNavigation(multipleView)