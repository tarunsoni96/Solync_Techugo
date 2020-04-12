import {observable} from 'mobx';
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import Constants from 'Helpers/Constants'
class MobxStore {
  @observable userObj = []
  @observable addedUserChat = []
  @observable addedUserNamesChat = []
  @observable filterType = ''
  @observable isOnChatScreen = false
  @observable isAnyUnreadMsg = false
  @observable reloadConvList = false
  
  addUser (item) {
    this.removeAllUsers()
    this.addedUserChat.push(...item)
    names = item.map((item,index) => {
        return item.first_name
    } )

    this.addedUserNamesChat.push(', '+names)
  }


  removeAllUsers(){
    this.addedUserChat = []
    this.addedUserNamesChat = []
  }

  updateUserObj(obj){ 
    this.userObj = obj
    AsyncStorageHandler.delete(Constants.userInfoObj,()=>{
      AsyncStorageHandler.store(Constants.userInfoObj,obj)
    })
  }

  getUserObj(){
    return this.userObj
  }

  isFilterChanged(cat){
    this.filterType = cat
  }

  resetFilterChange(){
    this.filterType = ''
  }

  updateUserSettings(settingsObj){
    const {result} = settingsObj
    let obj = {...this.userObj}
    obj.in_app_vibration = result.in_app_vibration
    obj.in_app_sound = result.in_app_sound
    obj.message_status = result.message_status

    this.updateUserObj(obj)
    AsyncStorageHandler.store(Constants.userInfoObj,obj)


  }

}
export default new MobxStore();