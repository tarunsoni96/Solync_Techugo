import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    TextInput,
    FlatList,
    Keyboard,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
const { width } = Dimensions.get('screen')
/* IMPORTING HEADER */
import Icons from 'AppLevelComponents/UI/Icons'
import {getAddPersons} from 'ServiceProviders/ApiCaller'
import MobxStore from '../../StorageHelpers/MobxStore'
import HelperMethods from 'Helpers/Methods'
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import {observer} from 'mobx-react'
/* IMPORTING SWIPEABLE FLATLIST MODULE */
import { withNavigation } from 'react-navigation'
import GradButton from '../../common/gradientButton'
import Container from '../../AppLevelComponents/UI/Container'
import NetworkAwareContent from '../../AppLevelComponents/UI/NetworkAwareContent'
import SearchInput from '../../components/SearchInput'

let dataBackup = []
@observer
class AddPersonChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            data: [],
            showBlockModal: false,
            showDeleteModal: false,
            addedUsers:[],
            changed:false,
        }
    }

    componentWillMount(){
        params = this.props.navigation.state?.params
        tintColor = params?.tintColor
    }

    componentDidMount(){
        let selectedUsers = [...MobxStore.addedUserChat]
        this.setState({addedUsers:selectedUsers})
        this.fetchData()
    }

    fetchData(){
         this.setState({isApiCall:true})
         
         getAddPersons(params?.group_id,params?.chattingWith).then(resp => {
             dataBackup = resp.result
              this.setState({isApiCall:false,data:resp.result})
              
            }).catch(err => {
              this.setState({isApiCall:'failed'})
            })
    }

    search(text){
        this.setState({search:text})
        if(text.length == 0){
            HelperMethods.animateLayout()
            this.setState({data:dataBackup})
        } else {
            let filteredArr = dataBackup.filter((item,index) => {
                return item.first_name.toLowerCase().includes(text.toLowerCase())
            })
            HelperMethods.animateLayout()
            this.setState({data:filteredArr})
        }
    }

    addUser(item){
        this.setState({changed:true})
        let users = [...this.state.addedUsers]
        let index = users.findIndex(v => v.user_id == item.user_id)
        if(index >= 0) {
            users.splice(index,1)
            if(users.length == 0 && MobxStore.addedUserChat.length > 0){
                this.setState({removedAllUsers:true})
            } else {
                this.setState({removedAllUsers:false})
            }
        } else {
            users.push(item)
        }
        HelperMethods.animateLayout()
        this.setState({addedUsers:users})
    }

    _renderItem = ({item, index}) => {
        return (
            <View style={{ height: 110 }}>
                <TouchableWithoutFeedback style={{ height: 110, justifyContent: 'center' }} onPress={() => this.addUser(item)}>
                <View>
                    <View style={{ justifyContent: 'center', flexDirection: 'column', alignSelf: 'center', height: 110 }}>
                    <View style={{ height: 110, width: width - 30, marginTop: 0, justifyContent: 'space-between', alignSelf: 'center', flexDirection: 'row' }}>
                            <Image style={{ height: 65, width: 65, borderRadius: 65 / 2, alignSelf: 'center', justifyContent: 'center' }} source={{ uri: item.profile_picture }} />
                            <View style={{ height: 110, width: '75%', justifyContent: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                                <View style={{alignItems:'flex-start'}}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{item.first_name}</Text>
                                </View>
                                    
                                    <TouchableOpacity onPress={()=>this.addUser(item)} >
                                    {this.state.addedUsers.findIndex(v => v.user_id == item.user_id) >= 0 ? 
                                    <Icons lib='AntDesign' name='checkcircle' color={tintColor} size={30} style={{paddingRight:10}} />
                                    :
                                    <Icons lib='AntDesign' name='pluscircleo' color={tintColor} size={30} style={{paddingRight:10}} />

                                    }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 1, backgroundColor: '#C0C0C0', width: width - 30, alignSelf: 'center' }}></View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    setAddedUser(){
        MobxStore.addUser(this.state.addedUsers)
        this.props.navigation.goBack()
    }

    removeAllUsers(){
        MobxStore.removeAllUsers()
        this.props.navigation.goBack()
    }

    render() {
        return (
            <>
            <Container>
                    <View style={{alignItems:'center',zIndex:1000, flexDirection: 'row',  width: width, justifyContent: 'space-between', borderColor: '#DCDCDC', alignSelf: 'center',marginVertical:50, }}>
                        <View style={{ flexDirection:'row',alignItems:'center',width: width,  justifyContent: 'space-around', alignSelf: 'center', }}>
                            <View />
                            <Text style={{ fontSize: 17, alignSelf: 'center', fontFamily: 'Montserrat-Bold' }}>Add users to chat</Text>
                            <Icons lib='Material' name='close' size={27} onPress={()=>this.props.navigation.pop()} color='#808C94' />
                        </View>
                    </View>
                
         <SearchInput textGetter={text => this.search(text)} />

                <NetworkAwareContent isApiCall={this.state.isApiCall} data={this.state.data} >

                <FlatList  
                    data={this.state.data}
                    renderItem={this._renderItem}
                    extraData={this.state}
                    onScrollBeginDrag={Keyboard.dismiss}
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}
                />
                </NetworkAwareContent>

                   
                </Container>

                 <View style={{width:'100%'}} >

{this.state.addedUsers.length > 0 && this.state.changed ?
<GradButton onPress={()=>this.setAddedUser()} text='Add users' />
:
<>
{this.state.removedAllUsers && 
<GradButton onPress={()=>this.removeAllUsers()} text='Remove all users' />
}
</>

}
    </View>

    </>
            
        )
    }
}

export default withNavigation(AddPersonChat)