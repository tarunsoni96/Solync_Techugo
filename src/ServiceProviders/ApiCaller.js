import HelperMethods from 'Helpers/Methods';
import {AsyncStorage,Platform,} from 'react-native'
import {storeToken,storeUserInfo} from 'DataManagers/UserDataManager'
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import Constants from 'Helpers/Constants'
import MobxStore from '../StorageHelpers/MobxStore';
let client_id = 1;
let client_secret = '76AAuoQVpLujL1CYCRGFGhKaPuW0FzySxBXxWmam';


export const signupWithEmail = function(emailAddress,firstName,dateOfBirth,password,occupation,latitude=28.5355,longitude =77.3910) {
  return new Promise(function(resolve, reject) {

    const formData = {email:emailAddress,first_name:firstName,dob:dateOfBirth,password,occupation,lat:latitude,lng:longitude}
    HelperMethods.makeNetworkCall(`user/signup`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};


export const getSettings = function(user_id) {
  return new Promise(function(resolve, reject) {
    const formData = {user_id}
    HelperMethods.makeNetworkCall(`user/getSettings`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};

export const getEventLocation = function(event_name) {
  return new Promise(function(resolve, reject) {
    const formData = {event_name}
    HelperMethods.makeNetworkCall(`user/getEventLocation`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};


export const getEventDates = function(event_name,event_location) {
  return new Promise(function(resolve, reject) {
    const formData = {event_name,event_location}
    HelperMethods.makeNetworkCall(`user/getEventDates`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};

export const getEventDetails = function(event_name,event_location,start_time) {
  return new Promise(function(resolve, reject) {
    const formData = {event_name,event_location,start_time}
    HelperMethods.makeNetworkCall(`user/getEventDetails`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};



export const getCountries = function(country) {
  return new Promise(function(resolve, reject) {
    const formData = {country}
    HelperMethods.makeNetworkCall(`user/getCountry`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};

export const getCitites = function(country_id,city) {
  return new Promise(function(resolve, reject) {
    const formData = {country_id,city}
    HelperMethods.makeNetworkCall(`user/getCity`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};

export const contactUs = function(user_id,type,msg) {
  return new Promise(function(resolve, reject) {
    const formData = {user_id,type,msg}
    HelperMethods.makeNetworkCall(`user/contactUs`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};

export const getCats = function(typeId,type,endPoint = 'subCategory') {
  return new Promise(function(resolve, reject) {
    const formData = {category_id:typeId,type}
    HelperMethods.makeNetworkCall(`user/${endPoint}`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};

export const updateSettings = function(user_id,message_status,age_range_from,age_range_to,gender,profile_status,in_app_vibration,in_app_sound) {
  return new Promise(function(resolve, reject) {
    const formData = { user_id,message_status,age_range_from,age_range_to,gender,profile_status,in_app_vibration,in_app_sound}
    
    HelperMethods.makeNetworkCall(`user/updateSettings`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};


export const blockDeleteUser = function(id,type) {
  return new Promise(function(resolve, reject) {
    const formData = { user_id:MobxStore.userObj.user_id, other_user_id:id,type}
    HelperMethods.makeNetworkCall(`user/blockDelete`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};
export const fetchUserImages = function(user_id) {
  return new Promise(function(resolve, reject) {
    const formData = { user_id}
    HelperMethods.makeNetworkCall(`user/userProfileImages`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};

export const cancelSignup = function(email) {
  return new Promise(function(resolve, reject) {
    const formData = { email}
    HelperMethods.makeNetworkCall(`user/emailDelete`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};


export const getBlockedUsers = function() {
  return new Promise(function(resolve, reject) {
    const formData = { user_id:MobxStore.userObj.user_id || 1, }
    HelperMethods.makeNetworkCall(`user/blockUsersList`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};


export const getAddPersons = function(group_id,chattingWith) {
  return new Promise(function(resolve, reject) {
    const formData = { user_id:MobxStore.userObj.user_id || 1,group_id,chattingWith }
    HelperMethods.makeNetworkCall(`user/myConnectionList`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
  });
};

export const uploadImages = function(images) {
  return new Promise(function(resolve, reject) {
    let formdata = new FormData();
    for (let i = 0; i < images.length; i++) {
        formdata.append('images',{
          name:`photo${i}.png`,
          type:'image/jpg',
          uri:images[i].uri,
          filename:'imageanme'+i+'.png'
        })
    }

    fetch("http://13.232.62.239:6565/api/user/uploadMedia", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body:formdata
    }).then((responser) => responser.json())
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(true)
      });

    
  });
};

export const socialLoginFB = function(email,facebook_id,first_name,profile_picture,lat=23,lng=12) {
  return new Promise(function(resolve, reject) {
    AsyncStorage.getItem(Constants.currentLocation).then(val=>{
      if(val != null){
        const {latitude,longitude} = JSON.parse(val)
        lat = latitude
        lng = longitude
      }
      
      const formData = {email,facebook_id,first_name,profile_picture,lat,lng}
    HelperMethods.makeNetworkCall(`user/socialLogin`,formData,(resp, isError) => {
        if (!isError) {
          resolve(resp)
        } else {
          reject(true);
        }
      },
      'POST'
    );
   })
  });
};



export const getStudentInfo = function(id,promise,email) {
  return new Promise(function(resolve, reject) {
    HelperMethods.makeNetworkCall(`api/studentinfo/${id}`,{},(resp, isError) => {
        if (!isError) {
          storeUserInfo(resp).then(()=>{
            AsyncStorage.getItem("fcmToken").then(val=>{
              registerDevice(id,email,val)
              promise(resp);
           })

          })
        } else {
          reject(true);
        }
      },
      'GET'
    );
  });
};



export const forgotPassSendMail = function(email) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/forgotPassword/${email}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET',true
      );
    });
  };


  export const resetPass = function(email,pass) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/resetpassword/${email}/${pass}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };

  

  export const getEvents = function(id) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/academics/schoolevent`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };

  export const getCurriculam = function(classId,session,date = 0) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/academics/curriculam/${date}/${classId}/${session}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };


  export const getChildPhotos = function(classId,sectionId,session,date = 0) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/academics/photograph/${date}/${classId}/${sectionId}/${session}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };


  export const getHolidays = function() {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/holidaylist`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };


  export const getMessages = function(userId) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/academics/message/${userId}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };


  export const getCircular = function(classId,sectionId,session,date = 0) {
    return new Promise(function(resolve, reject) {
      HelperMethods.makeNetworkCall(`api/academics/circular/${date}/${classId}/${sectionId}/${session}`,{},(resp, isError) => {
          if (!isError) {
            resolve(resp);
          } else {
            reject(true);
          }
        },
        'GET'
      );
    });
  };



  export const registerDevice = function(id,email,token) {
    return new Promise(function(resolve, reject) {
      const formData = new FormData();
      formData.append('user_id',id)
      formData.append('fcm_token',token)
      formData.append('email_address',email)
      formData.append('device_type',Platform.OS)
      
      HelperMethods.makeNetworkCall('api/registerDevice',formData,(resp, isError) => {
          if (resp) {
            // HelperMethods.snackbar('Device registered.')
            resolve(true)
          } else {
            reject(isError);
          }
        },
        'POST',
      );
    });
  };



