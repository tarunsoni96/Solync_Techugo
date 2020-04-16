import React, { Component } from "react";
import { Text, Image } from "react-native";
import "Helpers/global";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import HelperMethods from "Helpers/Methods";


export default class CustomText extends Component {
  render() {
    let {
      size = 15,
      onPress,
      textAlign,
      type,
      color,
      font,
      bold,
      padding,
      singleLine,
      text,
      style
    } = this.props;
    switch (type) {
      case "title":
        font = Fonts.heavy;
        size = !size ? 25 : size;
        break;

      default:
          
        break;
    }

    padding = padding == undefined && 1

    let fontType
      fontType = font || Fonts.medium
    
    return (
            <Text
              numberOfLines={singleLine ? 1 : undefined}
              allowFontScaling={false}
              onPress={onPress ? () => onPress() : onPress}
              style={[
                styles.text,
                {
                  fontSize:size,
                  color: color || Colors.white,
                  textAlign: textAlign,
                  fontFamily:bold ? Fonts.heavy : fontType,
                  ...style
                }
              ]}
            >
              {text}
            </Text>
    );
  }
}

const styles = EStyleSheet.create({
  text: {
    textAlign: "center"
  }
});
