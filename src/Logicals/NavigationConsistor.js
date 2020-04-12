import {blockDeleteUser} from 'ServiceProviders/ApiCaller'  
import MobxStore from '../StorageHelpers/MobxStore';
  const NavigationConsistor = {
        navigateToChat:function(navigation,userObj,clientId,event,eventYr,eventType){
            navigation.navigate('ChatRoom',{userObj,clientId,event,eventYr,eventType})
        },

        turnOffChatListeners:function(classInstance,events){
            events.forEach((event,index) => {
                classInstance.offEvent(event);    
            })
        },

        blockUser:function(socketio,action,userId,callBack){
            blockDeleteUser(userId,action).then((resp) => {
                callBack(resp)
                socketio.emitToEvent('blockUser',{
                    "s_id":MobxStore.userObj.user_id,
                    "id":userId
                })


            })
        },

        deleteUser:function(userId,callBack){
            blockDeleteUser(userId,'delete').then((resp) => {
                callBack(resp)
            })
        },


        formatMonth:function(date) {
            var monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sept",
              "Oct",
              "Nov",
              "Dec"
            ];
            date = new Date(date);
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            return monthNames[monthIndex];
          },


          _formatYear:function(date) {
            var monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ];
            date = new Date(date);
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();
            console.log(
              "======",
              JSON.stringify(day + " " + monthNames[monthIndex] + " " + year)
            );
        
            return year;
          }


    }

    export default NavigationConsistor