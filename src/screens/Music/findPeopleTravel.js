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
    KeyboardAvoidingView,
    Keyboard,
    FlatList,
    BackHandler

} from 'react-native'

const { height, width } = Dimensions.get('screen')
import Header from '../../common/headerCommon'
import LinearGradient from 'react-native-linear-gradient';
export default class FindPeopleTravel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showViewLocation: true,
            showViewArtist: true,
            disableButton: true,
            artist: '',
            location: '',
            visible: false,
            onFocus: true,
            showLocation: false,
            monthData: [
                { key: 'Liverpool' },
                { key: 'Sheffield' },
                { key: 'Manchester' },
                { key: 'Cardiff' },
                { key: 'Sheffield' },
                { key: 'Manchester' },
                { key: 'Cardiff' }

            ]
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    }
    handleBackButton() {
        return true;
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }

    _showDate() {
        if (this.state.showLocation == true) {
            this.setState({
                showLocation: false
            })
        }
        else {
            this.setState({
                showLocation: true
            })
        }
    }

    _renderItem(item, index) {
        return (
            <View style={{ width: 290, alignSelf: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => this.setState({ showLocation: false })}>
                    <Text style={{ alignSelf: 'center', color: '#000', fontSize: 19, fontFamily: 'Montserrat-SemiBold', height: 50, textAlignVertical: 'center' }}>{item.key}</Text>
                    <View style={{ height: 1, backgroundColor: '#DCDCDC' }}></View>
                </TouchableOpacity>

            </View>
        )
    }


    render() {
        let { params } = this.props.navigation.state;
        debugger
        return (

            <KeyboardAvoidingView style={{ flex: 1 }}>

                {params.type == 'Music' ?
                    <SafeAreaView style={{ height: '17%' }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', height: '100%', width: width, justifyContent: 'center', borderColor: '#DCDCDC' }}>

                            <View style={{ height: '100%', justifyContent: 'center', width: width / 5 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchBy')}>
                                    <Image source={require('../../assets/Images/Left.png')} style={{ height: height / 40, width: width / 20, alignSelf: 'center' }} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: '100%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'column', width: width / 1.2 }}>
                                <Text style={{ fontSize: 22, fontFamily: 'Montserrat-ExtraBold' }}>What music do you like?</Text>
                                <Text style={{ fontSize: 13, fontStyle: 'italic', color: 'grey', fontFamily: 'Montserrat-SemiBoldItalic' }}>Please select two or more options.</Text>
                            </View>



                        </View>





                    </SafeAreaView> :
                    params.type == 'Travel' ?

                        <SafeAreaView style={{ height: '17%' }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row', height: '100%', width: width, justifyContent: 'center', borderColor: '#DCDCDC' }}>

                                <View style={{ height: '100%', justifyContent: 'center', width: width / 6 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                        <Image source={require('../../assets/Images/Left.png')} style={{ height: height / 40, width: width / 20, alignSelf: 'center' }} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>


                                <View style={{ height: '100%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'column', width: width / 1.2 }}>
                                    <Text style={{ fontSize: 21, fontFamily: 'Montserrat-ExtraBold' }}>What type of traveller are you?</Text>
                                    <Text style={{ fontSize: 13, fontStyle: 'italic', color: 'grey', fontFamily: 'Montserrat-SemiBoldItalic' }}>Please select two or more options.</Text>
                                </View>

                            </View>





                        </SafeAreaView> :

                        <SafeAreaView style={{ height: '17%' }}>
                            <View style={{ alignItems: 'center', flexDirection: 'row', height: '100%', width: width, justifyContent: 'center', borderColor: '#DCDCDC' }}>

                                <View style={{ height: '100%', justifyContent: 'center', width: width / 6, alignSelf: 'center' }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchBy')}>
                                        <Image source={require('../../assets/Images/Left.png')} style={{ height: height / 40, width: width / 20, alignSelf: 'center' }} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ height: '100%', justifyContent: 'center', alignSelf: 'center', flexDirection: 'column', width: width / 1.2 }}>
                                    <Text style={{ fontSize: 21, fontFamily: 'Montserrat-ExtraBold' }}>What kind of sport are you interested in?</Text>
                                    <Text style={{ fontSize: 13, fontStyle: 'italic', color: 'grey', fontFamily: 'Montserrat-SemiBoldItalic' }}>Please select two or more options.</Text>
                                </View>


                            </View>





                        </SafeAreaView>
                }
                <View style={{ height: 20, width: width }}></View>
                <View style={{ position: 'relative', height: height / 7, width: width - 30, alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ opacity: 1, fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: '#879299' }}> Country</Text>

                    </View>
                    <View style={{ width: width, height: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: width - 30, backgroundColor: 'transparent', justifyContent: 'space-between', flexDirection: 'row', borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderLeftWidth: 0, borderRightWidth: 0, borderBottomColor: 'lightgrey', borderWidth: 2, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}> Africa</Text>

                        </View>




                    </View>


                </View>
                <View style={{ position: 'relative', height: height / 7, width: width - 30, alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ opacity: 1, fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: '#879299' }}> City</Text>

                    </View>
                    <View style={{ width: width, height: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: width - 30, backgroundColor: 'transparent', justifyContent: 'space-between', flexDirection: 'row', borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderLeftWidth: 0, borderRightWidth: 0, borderBottomColor: 'lightgrey', borderWidth: 2, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}> Lagos</Text>

                        </View>




                    </View>


                </View>
                <View style={{ position: 'relative', height: height / 7, width: width - 30, alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ opacity: 1, fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: '#879299' }}> Month</Text>

                    </View>
                    <View style={{ width: width, height: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: width - 30, backgroundColor: 'transparent', justifyContent: 'space-between', flexDirection: 'row', borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderLeftWidth: 0, borderRightWidth: 0, borderBottomColor: 'lightgrey', borderWidth: 2, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}> Apr-Jun</Text>
                            <TouchableOpacity style={{ alignSelf: 'center' }} >
                                <Image source={require('../../assets/Images/DropDown.png')} style={{ alignSelf: 'center', width: 14, height: 10 }} />
                            </TouchableOpacity>
                        </View>




                    </View>


                </View>

                <View style={{ position: 'relative', height: height / 7, width: width - 30, alignSelf: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ opacity: 1, fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: '#879299' }}> Year</Text>

                    </View>
                    <View style={{ width: width, height: '50%', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: width - 30, backgroundColor: 'transparent', justifyContent: 'space-between', flexDirection: 'row', borderTopColor: 'transparent', borderRightColor: 'transparent', borderLeftColor: 'transparent', borderLeftWidth: 0, borderRightWidth: 0, borderBottomColor: 'lightgrey', borderWidth: 2, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold', alignSelf: 'center' }}> 2020</Text>
                            <TouchableOpacity style={{ alignSelf: 'center' }} >
                                <Image source={require('../../assets/Images/DropDown.png')} style={{ alignSelf: 'center', width: 14, height: 10 }} />
                            </TouchableOpacity>
                        </View>




                    </View>


                </View>
                <ImageBackground source={require('../../assets/Images/GradientButton.png')} style={{ height: height / 8, width: '100%', alignSelf: 'center', borderRadius: 48, justifyContent: 'center', opacity: 1, position: 'absolute', bottom: 0 }}>
                    <Text style={{ textAlign: 'center', opacity: 1, fontSize: 19, fontFamily: 'Montserrat-Bold', color: '#fff', alignSelf: 'center' }}
                        onPress={() => this.props.navigation.navigate('Home')}>Find me my people</Text>
                </ImageBackground>

            </KeyboardAvoidingView>
        )
    }
}
