import React, { Component, PropTypes } from 'react'
import {
  TouchableHighlight,
  View,
  Text
} from 'react-native'
import styles from './style'

class Button extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.button, this.props.style]}>
          <Text>
            {this.props.label}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

Button.propTypes = {
  onPress: PropTypes.func,
  label: PropTypes.string
}

module.exports = Button