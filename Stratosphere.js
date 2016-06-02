import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native'
import Forecast from './Forecast'
import LocationButton from './LocationButton'

const api = {
  route: 'http://api.openweathermap.org/data/2.5/weather?',
  key: 'b4afab9fa539c83f01699f131bc30ab7', // if you're looking at this, go ahead, steal it.
  units: '&units=imperial&mode=json'
}

class Stratosphere extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      forecast: null,
      text: ''
    }
  }

  componentDidMount() {
    this.fetchData(this.createSearchRequestUrl())
  }

  setForecast(response) {
    const {
      weather: [ weather ],
      main,
      name
    } = response
    const farenheit = {
      symbol: '°F',
      current: Math.floor(main.temp),
      high: Math.floor(main.temp_min),
      low: Math.floor(main.temp_max)
    }

    return {
      forecast: {
        main: weather.main,
        description: weather.description,
        image: `http://openweathermap.org/img/w/${weather.icon}.png`,
        name,
        farenheit,
        celsius: {
          symbol: '°C',
          current: Math.floor((farenheit.current - 32) / 1.8),
          high: Math.floor((farenheit.high - 32) / 1.8),
          low: Math.floor((farenheit.low - 32) / 1.8)
        }
      }
    }
  }

  createCoordinateRequestUrl(lat, lon) {
    return `${api.route}lat=${lat}&lon=${lon}${api.units}&appid=${api.key}`
  }

  createSearchRequestUrl(location) {
    const query = location ? location.split(' ').join('%20') : 'Prospect%20Heights,NY'
    this.setState({ query, text: '' })
    return `${api.route}q=${query}${api.units}&appid=${api.key}`
  }

  fetchData(url) {
    fetch(url)
      .then(x => x.json())
      .then(this.setForecast)
      .then(x => this.setState(x))
      .catch(e => console.warn(e))
  }

  handleCoordinateSubmit(lat, lon) {
    this.fetchData(this.createCoordinateRequestUrl(lat, lon))
  }

  handleQuerySubmit(e) {
    const location = e.nativeEvent.text
    this.fetchData(this.createSearchRequestUrl(location))
  }

  render() {
    return (
      <View style={styles.container}>


          <View style={styles.overlay}>

            {this.state.forecast !== null ? (
              <Forecast {...this.state.forecast} />
            ) : null}

            <View style={styles.row}>
              <View style={styles.inputView}>
                <TextInput
                  ref={i => this['🍟'] = i}
                  style={styles.search}
                  returnKeyType="go"
                  onChangeText={text => this.setState({ text })}
                  onSubmitEditing={e => this.handleQuerySubmit(e)}
                  value={this.state.text}
                  selectionColor="#ffffff"
                />
              </View>
            </View>
            <Text style={styles.caption}>Find some other location</Text>
            <LocationButton
              onGetCoords={(lat, lon) => this.handleCoordinateSubmit(lat, lon)}
            />
          </View>

      </View>
    )
  }
}

const baseFontSize = 16
const fontFamily = 'helveticaneue-thin'
const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    fontSize: 28,
    fontStyle: 'italic'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: '#7BAFD4'
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    color: '#FFFFFF'
  },
  subtitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    color: '#FFFFFF'
  },
  caption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#FFFFFF',
    paddingBottom: 20,
    fontSize: 12
  },
  overlay: {
    paddingTop: 75,
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 125
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 20
  },
  inputView: {
    flex: 1,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
    marginBottom: -15,
    paddingTop: 70
  },
  search: {
    flex: 1,
    fontFamily,
    width: 150,
    height: 30,
    fontSize: 24,
    textAlign: 'center',
    color: '#ffffff'
  },
  mainText: {
    flex: 1,
    fontFamily,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
})

module.exports = Stratosphere
