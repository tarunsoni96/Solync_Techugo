import React, { Component } from 'react'
import {
    Text,
    TouchableWithoutFeedback,
    View,
    Dimensions,
    SafeAreaView,
    ScrollView,
    Image,
    BackHandler
} from 'react-native'
const { height, width } = Dimensions.get('screen')
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";

import Header from '../../common/headerCommon'
import ScreenHeader from '../../components/ScreenHeader';
export default class ContactUs extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
    <BackHandlerSingleton />
               <ScreenHeader  title='Contact Us' isCenter />

<TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('AskQues',{type:'Report a technical issue',contactType:'technicalIssue'})} >

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: width - 30, height: '10%', alignSelf: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 18, width: '70%' }}>Report a technical issue</Text>
                    <Image style={{ alignSelf: 'center' }} source={require('../../assets/Images/@arrow-right.png')} />
                </View>

                </TouchableWithoutFeedback>
                <View style={{ alignSelf: 'center', height: 1, width: width - 30, backgroundColor: '#DCDCDC' }}></View>

                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('AskQues',{type:'Ask a question',contactType:'question'})} >

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: width - 30, height: '10%', alignSelf: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 18, width: '70%' }}>Ask a question</Text>
                    <Image style={{ alignSelf: 'center' }} source={require('../../assets/Images/@arrow-right.png')} />
                </View>
                </TouchableWithoutFeedback>
                <View style={{ alignSelf: 'center', height: 1, width: width - 30, backgroundColor: '#DCDCDC' }}></View>
                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('AskQues',{type:'How can we improve?',contactType:'improvementSuggestion'})} >

                <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: width - 30, height: '10%', alignSelf: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 18, width: '70%' }}>How can we improve?</Text>
                    <Image style={{ alignSelf: 'center' }} source={require('../../assets/Images/@arrow-right.png')} />
                </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        )
    }
}