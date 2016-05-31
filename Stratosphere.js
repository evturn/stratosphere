import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native'
import Forecast from './Forecast'

class Stratosphere extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zip: '',
      forecast: {
        main: 'Overcast',
        description: 'super shitty',
        temp: 46
      }
    }
  }

  handleTextChange(e) {
    console.log(e.nativeEvent.text)
    this.setState({
      zip: e.nativeEvent.text
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('image!sky')}
          resizeMode='cover'
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Stratosphere: Where weather is, also.
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={styles.input}
                  returnKeyType='go'
                  onSubmitEditing={e => this.handleTextChange(e)}
                />
              </View>
            </View>
            <Forecast
              main={this.state.forecast.main}
              description={this.state.forecast.description}
              temp={this.state.forecast.temp}
            />
          </View>
        </Image>
      </View>
    )
  }
}

const baseFontSize = 16
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: baseFontSize,
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
})

module.exports = Stratosphere
