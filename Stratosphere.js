import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

class Stratosphere extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zip: ''
    }
  }

  handleTextChange(e) {
    console.log(e.nativeEvent.text);
    this.setState({
      zip: e.nativeEvent.text
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Náive!
        </Text>
        <Text style={styles.welcome}>
          The weather is terrible around {this.state.zip}.
        </Text>
        <TextInput
          style={styles.input}
          onChange={e => this.handleTextChange(e)} />
        <Text style={styles.instructions}>
          Shake it and rub it down for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    borderWidth: 2,
    height: 40,
    borderColor: 'transparent',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c1c1c1',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
  },
})

module.exports = Stratosphere
