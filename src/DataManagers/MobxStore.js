import {observable} from 'mobx';

class MobxStore {
  @observable addedUserChat = []
  @observable addedUserNamesChat = []

  addUser (item) {
    this.addedUserChat.push(...item)
    names = item.filter((item,index) => {
      item.userName
    } )

    alert(JSON.stringify( names))
    // this.addedUserNamesChat.push()
  }
}
export default new MobxStore();