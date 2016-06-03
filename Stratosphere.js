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
      forecast: null,
      text: '',
      fetching: true,
      message: 'Find some other location'
    }
  }

  componentDidMount() {
    this.fetchFromQuery('Prospect%20Heights,NY')
  }

  fetchFromCoordinate(lat, lon) {
    this.fetchData(
      `${api.route}lat=${lat}&lon=${lon}${api.units}&appid=${api.key}`
    )
  }

  fetchFromQuery(query) {
    this.fetchData(
      `${api.route}q=${query}${api.units}&appid=${api.key}`
    )
  }

  setForecast({ weather, main, name }) {
    return {
      fetching: false,
      message: 'Find some other location',
      forecast: {
        name,
        main: weather.main,
        description: weather.description,
        image: `http://openweathermap.org/img/w/${weather.icon}.png`,
        farenheit: {
          symbol: '°F',
          current: Math.floor(main.temp),
          low: Math.floor(main.temp_min),
          high: Math.floor(main.temp_max)
        },
        celsius: {
          symbol: '°C',
          current: Math.floor((main.temp - 32) / 1.8),
          high: Math.floor((main.temp_max - 32) / 1.8),
          low: Math.floor((main.temp_min - 32) / 1.8)
        }
      }
    }
  }

  handleResponse(x) {
    if (x.cod !== 200) {
      return {
        ...this.state,
        fetching: false,
        message: 'No matches found'
      }
    }

    return this.setForecast({
      weather: x.weather[0],
      main: x.main,
      name: x.name
    })
  }

  fetchData(url) {
    this.setState({ fetching: true })

    fetch(url)
      .then(x => x.json())
      .then(x => this.handleResponse(x))
      .then(x => this.setState(x))
      .catch(e => console.warn(e))
  }

  handleCoordinateSubmit(lat, lon) {
    this.fetchFromCoordinate(lat, lon)
  }

  handleQuerySubmit(e) {
    this.setState({ text: '' })

    this.fetchFromQuery(
      e.nativeEvent.text.split(' ').join('%20')
    )
  }

  render() {
    return (
      <View style={styles.root}>{this.state.forecast !== null ? (
        <View>
          <Forecast {...this.state.forecast} />
          <View style={styles.row}>
            <LocationButton
              fetching={this.state.fetching}
              onGetCoords={(lat, lon) => this.handleCoordinateSubmit(lat, lon)}
            />
          </View>
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
          <Text style={styles.caption}>{this.state.message}</Text>
        </View>
        ) : (
        <Text>Loading...</Text>
      )}</View>
    )
  }
}

const fontFamily = 'helveticaneue-thin'
const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    fontSize: 28,
    fontStyle: 'italic'
  },
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 100,
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
    textAlign: 'center',
    color: '#FFFFFF',
    paddingBottom: 20,
    fontSize: 12
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
    paddingTop: 30
  },
  search: {
    flex: 1,
    fontFamily,
    height: 30,
    fontSize: 24,
    textAlign: 'center',
    color: '#ffffff'
  },
  mainText: {
    flex: 1,
    fontFamily,
    fontSize: 16,
    color: '#FFFFFF'
  }
})

module.exports = Stratosphere
