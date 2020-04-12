import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Platform,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image
} from 'react-native'
import {
    scaleHeight,
    scaleWidth,
    normalizeFontMenu
} from '../common/responsive'
//import{connect} from 'react-redux'
import TRAVEL from '../screens/Home/TRAVEL'
import MUSIC from '../screens/Home/MUSIC'
import SPORTS from '../screens/Home/SPORTS'
const { height, width } = Dimensions.get('screen')
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: ''
        }
    }


    render() {
        let { textRight, textTitle, onPressText, onPressBack } = this.props
        return (
            <SafeAreaView style={{ height: '13%' }}>
                <View style={{ alignItems: 'center', flexDirection: 'row', height: '100%', width: width - 30, justifyContent: 'space-between', borderColor: '#DCDCDC' }}>
                    <View style={{ height: '100%', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={onPressBack}>
                            <Image source={require('../assets/Images/Left.png')} style={{
                                height: height / 40,
                                width: width / 20, marginLeft: 12
                            }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: '100%', justifyContent: 'center', alignSelf: 'center', width: '50%' }}>
                        <Text style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>{textTitle}</Text>
                    </View>
                    <View style={{ height: '100%', justifyContent: 'center', marginRight: '2%' }}>
                        <Text style={{ fontSize: 20, color: '#B52050', fontWeight: 'bold', alignSelf: 'center' }} onPress={onPressText}>{textRight}</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}
