import React, { Component } from "react";
import Constants from "Helpers/Constants";
import "Helpers/global";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import NavigationService from "ServiceProviders/NavigationService";
import { withNavigation } from "react-navigation";

import HelperMethods from 'Helpers/Methods'
import MobxStore from "../../StorageHelpers/MobxStore";

class ScreenMemory extends Component {
  state = {
    renderContent: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.judgeScreenMemory();
  }

  judgeScreenMemory() {
    let { screen, screenParams } = this.props; //optional screenParams for influenced custom  behaviour
    switch (
      screen //need to always provide screen prop to this class or else nothing would render.
    ) {
      case 'login':
        case 'landing':
        this.checkIsLoggedIn();
        break;

        case 'PhotoUpload':
          this.judgePhotoSelected()
          break

          case 'SelectionScreen':
            this.judgeInterestSelected()
            break

    }
  }

  judgeInterestSelected(){
    AsyncStorageHandler.get(Constants.isInterestSelected,val => {
      if(val != null){
        if(val == 'true'){
          this.props.navigation.navigate('UploadPhoto')
        } else {
          this.drawContent()
        }
      } else {
        this.drawContent()
      }
    })
  }


  judgePhotoSelected(){
    AsyncStorageHandler.get(Constants.photoUploaded,val => {
      if(val != null){
        if(val == 'true'){
          this.props.navigation.navigate('Home')
        } else {
          this.drawContent()
        }
      } else {
        this.drawContent()
      }
    })
  }

  checkIsLoggedIn(){
    this.validate(Constants.userInfoObj,'Home')
  }

  validate(constant,screen){
    AsyncStorageHandler.get(constant, val => {
      if (val == null) {
        this.drawContent()
        return
      } else {
        MobxStore.updateUserObj(val)
        AsyncStorageHandler.get(Constants.isInterestSelected, isSelected => {
          if (isSelected != null && isSelected != true) {
            this.props.navigation.navigate('SelectionScreen')
            return
          } else {
            this.props.navigation.navigate('Home')
          }
        })
      }
    })
  }

  isLangSelected(screenParams) {
    let { isForLanguageChange } = screenParams ? screenParams : {};

    if (isForLanguageChange) {
      this.setState({ renderContent: true });
      // return
    } else {
      AsyncStorageHandler.get(Constants.LANGUAGE_SELECTED, val => {
        if (val == null) {
          this.drawContent();
        } else {
            NavigationService.navigate("loginStack", {});
        }
      });
    }
  }

  haveAccount(callback) {
    AsyncStorageHandler.get(Constants.HAS_ACCOUNT, val => {
        callback(val)
    });
  }

  drawContent() {
    this.setState({ renderContent: true });
  }

  renderChildren() {
    let { children } = this.props;
    return children;
  }

  render() {
    return <>{this.state.renderContent && this.renderChildren()}</>;
  }
}

export default withNavigation(ScreenMemory)