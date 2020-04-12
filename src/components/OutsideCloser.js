import React, {Component} from 'react';
import {Text, View, TouchableWithoutFeedback} from 'react-native';

export default class OutsideCloser extends Component {
  render() {
    const {show} = this.props;
    return (
      <>
        {show && (
          <TouchableWithoutFeedback>
            {this.props.children}
          </TouchableWithoutFeedback>
        )}
      </>
    );
  }
}
