import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native'
import Forecast from './Forecast'

const api = {
  route: 'http://api.openweathermap.org/data/2.5/weather?',
  key: 'b4afab9fa539c83f01699f131bc30ab7' // if you're looking at this, go ahead, steal it.
}

class Stratosphere extends Component {
  constructor(props) {
    super(props)

    this.state = {
      zip: '',
      forecast: null
    }
  }

  setForecast(response) {
    const {
      weather: [ weather ],
      main
    } = response

    return {
      forecast: {
        main: weather.main,
        description: weather.description,
        temp: main.temp
      }
    }
  }

  handleTextChange(e) {
    const zip = e.nativeEvent.text
    const url = `${api.route}q=${zip}&units=imperial&mode=json&appid=${api.key}`

    this.setState({ zip })

    fetch(url)
      .then(x => x.json())
      .then(this.setForecast)
      .then(x => this.setState(x))
      .catch(e => console.warn(e))
  }

  render() {
    const content = this.state.forecast !== null ? (
      <Forecast
        main={this.state.forecast.main}
        description={this.state.forecast.description}
        temp={this.state.forecast.temp}
      />
    ) : null

    return (
      <View style={styles.container}>
        <Image
          style={styles.backdrop}
          source={require('./ios/Stratosphere/Images.xcassets/Image.imageset/sky.png')}
          resizeMode='cover'>

          <View style={styles.overlay}>

            <View style={styles.row}>
              <Text style={styles.mainText}>
                Stratosphere: Where weather is, also.
              </Text>

              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  returnKeyType='go'
                  onSubmitEditing={e => this.handleTextChange(e)}
                />
              </View>
            </View>

            {content}

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
    backgroundColor: '#c1c1c1',
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
    color: '#011101'
  }
})

module.exports = Stratosphere
