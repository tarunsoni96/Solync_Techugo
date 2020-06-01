import React, { Component } from 'react'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Image,
    ImageBackground,
    BackHandler
} from 'react-native'
const { height, width } = Dimensions.get('screen')
import Header from '../../common/headerCommon'
import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from '../../components/ScreenHeader';
import BackHandlerSingleton from '../../ServiceProviders/BackHandlerSingleton';
export default class SearchBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showViewLocation: true,
            showViewArtist: true,
            disableButton: true,
            artist: '',
            location: '',
            subCat: []
        }
    }



    componentWillMount() {
        this.renderContent()
    }

    tryFunc() {
        let { params } = this.props.navigation.state
        let arrdata = []
        params?.dataArr.forEach(function (item) {
            if (item.isSelect == true) {
                arrdata.push(item.sub_id)
            }
        })
        var abc = params?.type
        var data = arrdata
        this.props.navigation.navigate('SearchByUnique', { search: 'Artist', type: abc, dataArr: data, typeId: params?.typeId })
    }
    _locationFunc() {
        let { params } = this.props.navigation.state
        var data = params
        this.props.navigation.navigate('SearchByUnique', { search: 'Location', type: abc, dataArr: data, typeId: params?.typeId })
    }
    _searchByArtist(text) {
        this.setState({
            artist: text
        })
    }
    _changeViewLocation(text) {
        this.setState({
            location: text
        })
    }
    changeViewLocation() {
        this.setState({
            showViewLocation: false
        })
    }


    renderContent(){
        title = ''
        firstInputTitle = ''
        const {params} = this.props.navigation.state
        switch(params?.type){
          case 'Music':
            firstInputTitle = 'Search by artist or festival'
            title = 'What concert/festival would you like to attend?'
            break
    
            case 'Sports':
                firstInputTitle = 'Search by event'
              title = 'Which sporting event would you like to attend?'
              break
    
              case "Travel":
                firstInputTitle = 'Travel'
              title = 'Travel'
                break
        }

    }


    render() {
        let { params } = this.props.navigation.state;
        let arrdata = []
        let arrSubName = []
        params?.dataArr.forEach(function (item) {
            if (item.isSelect == true) {
                arrdata.push(item.sub_id)
                arrSubName.push(item.sub_id_name)
            }
        })

        var dataSubName = arrSubName
        var data = arrdata
        let abc = params?.type
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
    <BackHandlerSingleton  onBackPress={()=> this.props.navigation.pop()} />
                
                <ScreenHeader style={{marginTop:30,}} isCenter={false} title={title} />

                <View style={{marginTop:45}}>

                    <View style={{ height: height / 4, alignSelf: 'center', justifyContent: 'center' }}>
                        <View style={{ height: height / 5, backgroundColor: '#f6f7f8', justifyContent: 'center', alignSelf: 'center', borderRadius: 8 }}>

                            <Text style={{ color: '#000', fontSize: 17, alignSelf: 'center', fontFamily: 'Montserrat-Bold' }}>{firstInputTitle}</Text>

                            <TouchableOpacity style={{ height: '50%' }} onPress={() => this.props.navigation.navigate('SearchByUnique', { type: abc,selectedCats:params?.selectedCats,inputPlaceHolder:'Enter artist or festival name', searchType:'event',inputTitle:firstInputTitle, data: data, typeId: params?.typeId, dataSubName: dataSubName })}>
                                <View style={{ textAlign: 'center', borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderBottomColor: '#edeff0', borderWidth: 2, width: width - 50, height: '100%', opacity: 2.0, alignSelf: 'center', justifyContent: 'center' }}
                                >
                                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', alignSelf: 'center', color: '#a7a8a8' }}
                                    >Enter artist or festival name</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                <Text style={{ fontSize: 17, color: '#7f7f7f', textAlign: 'center', fontFamily: 'Montserrat-SemiBold' }}>OR</Text>

                <View style={{ height: height / 4,  alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ height: height / 5, backgroundColor: '#f6f7f8', justifyContent: 'center', alignSelf: 'center', borderRadius: 8 }}>
                        <Text style={{ color: '#000', fontSize: 17, alignSelf: 'center', fontFamily: 'Montserrat-Bold' }}>Search by location</Text>
                        <TouchableOpacity style={{ height: '50%' }} onPress={() => this.props.navigation.navigate('SearchByUnique', { type: abc,selectedCats:params?.selectedCats, searchType:'location',inputTitle:'Search by location (City)', data: data, typeId: params?.typeId, dataSubName: dataSubName })}>
                            <View style={{ textAlign: 'center', borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderBottomColor: '#edeff0', borderWidth: 2, width: width - 50, height: '100%', opacity: 2.0, alignSelf: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', alignSelf: 'center', color: '#a7a8a8' }}>Enter location</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>

            </SafeAreaView>
        )
    }
}
