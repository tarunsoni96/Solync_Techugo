import React, { Component } from 'react'
import { Text, View,Image, } from 'react-native'
import { Input } from "react-native-elements";

export default class SearchInput extends Component {

    state = {
        search:''
    }

    

    setText(text){
        this.setState({search:text})
        if(this.props.textGetter)
        this.props.textGetter(text)
    }
    render() {
        return (
              <View
                style={{
                  width:'100%',
                  ...this.props.style
                }}
              >
                <Input
                  value={this.state.search}
                  onChangeText={text => this.setText(text)}
                  label='Search'
              fontFamily={"Montserrat-Bold"}
                  fontSize={18}
                  leftIcon={()=>(
                <Image style={{width:20,height:20,marginLeft:-15,marginRight:10}} resizeMode='contain' source={require("../assets/Images/search.png")} />

                  )}
                />
          </View>
        )
    }
}
