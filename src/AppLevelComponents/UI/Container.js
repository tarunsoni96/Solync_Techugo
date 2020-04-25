import React, { Component } from "react";
import { SafeAreaView,View, ScrollView, StatusBar, KeyboardAvoidingView} from "react-native";
import "Helpers/global";
import HelperMethods from "Helpers/Methods";
import EStyleSheet from "react-native-extended-stylesheet";
import {Colors} from "UIProps/Colors";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

 export default class Container extends Component {
  renderForIOS() {
    let {padding,style,turnOffScroll} = this.props
    return (
      <>
      <SafeAreaView style={{ flex: 0, color:'#fff' ,}} />
      <SafeAreaView style={{ flex: 1, }}>
      <StatusBar translucent={true} barStyle="dark-content" />
      <KeyboardAwareScrollView scrollEnabled={turnOffScroll == undefined ? true : turnOffScroll} keyboardShouldPersistTaps="always" contentContainerStyle={{flexGrow:1,alignItems:'center'}}  behavior='padding'>
          {this.props.children}
      </KeyboardAwareScrollView>
      </SafeAreaView>
      </>
    );
  }

  renderForAndroid() {
    const {style,turnOffScroll} = this.props
    return (
      <>
      <StatusBar backgroundColor="#eee" barStyle={'dark-content'} />
        <ScrollView
        scrollEnabled={turnOffScroll == undefined ? true : turnOffScroll}
        style={styles.container}
        contentContainerStyle={{alignItems: "center",...styles.contentContainerStyle,...style}}
        nestedScrollEnabled
        keyboardShouldPersistTaps="always">
          {this.props.children}
        </ScrollView>
      </>
    );
  }

  render() {
    
    return (
      <>
      {<BackHandlerSingleton  onBackPress={this.props.onBackPress} />}
        {HelperMethods.isPlatformAndroid()
          ? this.renderForAndroid()
          : this.renderForIOS()}
      </>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  container: {
    width:'100%',
  },

  contentContainerStyle:{
    flexGrow:1, paddingBottom:'0rem',
    width:'100%',
  }

});
