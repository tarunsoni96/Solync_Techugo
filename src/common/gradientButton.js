/****************** ERROR COMPONENT ****************** */

import React, { Component } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ImageBackground,
  Dimensions
} from "react-native";
import Loader from "AppLevelComponents/UI/Loader";
import LinearGradient from "react-native-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import MobxStore from "../StorageHelpers/MobxStore";

const { height, width } = Dimensions.get("screen");
class GradButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress() {
    let { onPress,isApiCall } = this.props;
    if (!onPress) {
      return;
    } else if(!isApiCall){
      Keyboard.dismiss();
      onPress();
    }
  }

  render() {
    let { text, style, onPress,gradStyle,textStyle, isApiCall } = this.props;
    return (
      <View style={style ? style : {}} >

      <TouchableWithoutFeedback onPress={()=>this.onPress()} >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          locations={[0.2,0.5,0.7]}
          colors={["#8863BB", "#61ACE2", "#55C7C9"]}
          style={[styles.btn,{padding:wp(5),margin:wp(3),...gradStyle,opacity:style?.opacity ? style?.opacity  - 0.2 : 1}]}
        >
          {isApiCall ? (
            <Loader color={'#fff'} />
          ) : (
            <Text
              onPress={()=>this.onPress()}
              style={{
                textAlign: "center",
                opacity: 1,
                fontSize: 19,
                fontFamily: "Montserrat-Bold",
                color: "#fff",
                alignSelf: "center",
                ...textStyle
              }}
            >
              {text}
            </Text>
          )}
        </LinearGradient>
      </TouchableWithoutFeedback>
      </View>

    );
  }
}

const styles = {
  btn: {
    borderRadius: 10,
    padding: 20,
    margin: 15,
    elevation: 10,
    
    shadowColor: "#000",
    shadowOffset: { height: 5, width: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 4
  }
};

export default GradButton;
