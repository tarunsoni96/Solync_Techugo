import React, { Component } from 'react'
import { Text,TouchableOpacity,Dimensions, View } from 'react-native'
import { withNavigation } from 'react-navigation'
const { height, width } = Dimensions.get('screen')

class EventNotSetup extends Component {
    render() {
        const {eventName,eventId} = this.props
        return (
            <>
            <View style={{ height: 70,width:'100%', flexDirection: 'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:18, alignSelf: 'center', backgroundColor: 'transparent' }}>

            <View style={{ height: 70,  justifyContent: 'center', marginTop: 0, backgroundColor: '#fff' }}>
              <Text style={{ opacity: 1, fontSize: 16, fontFamily: 'Montserrat-ExtraBold', color: '#000' }}>{eventName}</Text>
              <Text style={{ color: '#808c94', fontSize: 13, fontFamily: 'Montserrat-SemiBold',marginTop:3 }}>Not set up</Text>
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MultipleView', { type: eventName,typeId: eventId})} >
                <Text style={{ color: '#781672', fontSize: 15, fontFamily: 'Montserrat-ExtraBold' }}>ADD PREFERENCES</Text>
            </TouchableOpacity>
          </View>

          <View style={{width:'91%',height:1,backgroundColor:'#eee',marginHorizontal:18,}} />
          </>
        )
    }
}

export default withNavigation(EventNotSetup)