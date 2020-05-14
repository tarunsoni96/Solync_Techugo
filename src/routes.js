import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import Login from "./screens/Auth/login";
import LandingScreen from "./screens/Auth/landingScreen";
import ForgotPassword from "./screens/Auth/forgotPassword";
import InstructionSent from "./screens/Auth/instructionSent";
import ResetPassword from "./screens/Auth/resetPassword";
import Home from "./screens/Home/homeScreen";
import SelectionScreen from "./screens/Home/selectionScreen";
import MultipleView from "./screens/Home/multipleView";
import Settings from "./screens/User/settings";
import BlockedUser from "./screens/User/blockedUser";
import EditProfile from "./screens/User/editProfile";
import MyProfile from "./screens/User/myProfile";
import SearchBy from "./screens/Music/searchBy";
import SearchByUnique from "./screens/Music/searchByUnique";
import chatScreen from "./screens/chat/chatScreen";
import ChatOneToOne from "./screens/chat/chatOneToOne";
import ContactUs from "./screens/User/contactUs";
import EventList from "./screens/Music/eventList";
import UploadPhoto from "./screens/User/uploadPhoto";
import LookingGood from "./screens/User/lookingGood";
import NoConcert from "./screens/Music/noConcert";
import Splash from "./splash";
import FindPeople from "./screens/Music/findPeople";
import FindPeopleSports from "./screens/Music/findPeopleSports";
import FindPeopleTravel from "./screens/Music/findPeopleTravel";
import registerTest from "./screens/Auth/registerTest";
import ChatRoom from "./screens/ChatRoom/ChatRoom";
import AddPersonChat from "./screens/AddPersonChat/AddPersonChat";
import AskQues from "./screens/AskQues/AskQues";
import CropImage from "./screens/CropImage/CropImage";
import TermsConditions from "./screens/TermsConditions/TermsConditions";
import ImageCaraousal from "./screens/ImageCaraousal/ImageCaraousal";

const loginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: "none"
  }
);

const landingStack = createStackNavigator(
  {
    LandingScreen: {
      screen: LandingScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },

    Login: {
      screen: Login,
      navigationOptions: {
        gesturesEnabled: false
      }
    },

    Register: {
      screen: registerTest,
      navigationOptions: {
        gesturesEnabled: false
      }
    },

    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        gesturesEnabled: false
      }
    },

    InstructionSent: {
      screen: InstructionSent,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    headerMode: "none",
    initialRouteName: "LandingScreen"
  }
);

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SelectionScreen: {
      screen: SelectionScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    MultipleView: {
      key:'MultipleView',
      screen: MultipleView,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    BlockedUser: {
      screen: BlockedUser,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    MyProfile: {
      screen: MyProfile,
      key:'MyProfile',
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SearchBy: {
      screen: SearchBy,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    chatScreen: {
      screen: chatScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ChatOneToOne: {
      screen: ChatOneToOne,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ContactUs: {
      screen: ContactUs,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    EventList: {
      screen: EventList,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    UploadPhoto: {
      screen: UploadPhoto,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    LookingGood: {
      screen: LookingGood,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    NoConcert: {
      screen: NoConcert,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SearchByUnique: {
      screen: SearchByUnique,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Splash: {
      screen: Splash,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    FindPeople: {
      screen: FindPeople,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    FindPeopleSports: {
      screen: FindPeopleSports,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    FindPeopleTravel: {
      screen: FindPeopleTravel,
      navigationOptions: {
        gesturesEnabled: false
      }
    },

    ChatRoom: {
      screen: ChatRoom,
      navigationOptions: {
        gesturesEnabled: false
      }
    },

    AddPersonChat:{
      screen:AddPersonChat
    },

    AskQues:{
      screen:AskQues
    },

    CropImage:{
      screen:CropImage
    },


    TermsConditions:TermsConditions,
    ImageCaraousal:ImageCaraousal
  },
  {
    headerMode: "none",
    initialRouteName:'Home'
  }
);

const TopLevelNavigator = createSwitchNavigator({
  landingStack,
  App, 
  loginStack,
});

export default createAppContainer(TopLevelNavigator);
