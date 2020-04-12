import React, { Component } from 'react';
import TopLevelNavigator from './src/routes';
import HelperMethods from 'Helpers/Methods'
import {UIManager} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import PushNotification from './src/ServiceProviders/PushNotfication';
export default class App extends Component{
  
  componentDidMount(){
   SplashScreen.hide();
  HelperMethods.isPlatformAndroid() &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  render(){
    return(
      <>
        <TopLevelNavigator />
        <PushNotification />
      </>
    );
  }
}