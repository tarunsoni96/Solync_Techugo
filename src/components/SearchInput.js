import React, { Component } from 'react'
import { Text, View,Image,Keyboard } from 'react-native'
import { Input } from "react-native-elements";

export default class SearchInput extends Component {

  constructor(props){
    super(props)

    this.input = null
  }
    state = {
        search:''
    }

    componentDidMount(){
      Keyboard.addListener('keyboardDidHide',this.KeyboardDidHide)
    }

    componentWillUnmount(){
      Keyboard.removeListener('keyboardDidHide')
    }

    KeyboardDidHide = () => {
      if(this.input){
        this.input.blur()
      }
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
                  padding:10,
                  ...this.props.style
                }}
              >
                <Input
                ref={input => this.input = input}
                  value={this.state.search}
                  onChangeText={text => this.setText(text)}
                  label='Search'
                  inputStyle={{fontFamily:'Montserrat-SemiBold',fontSize:17}}
                  leftIcon={()=>(
                <Image style={{width:20,height:20,marginLeft:-15,marginRight:10}} resizeMode='contain' source={require("../assets/Images/search.png")} />

                  )}
                />
          </View>
        )
    }
}
