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
      query: '',
      forecast: null,
      text: ''
    }
  }

  componentDidMount() {
    this.fetchData(this.createRequestUrl())
  }

  setForecast(response) {
    console.log(response)
    const {
      weather: [ weather ],
      main,
      name
    } = response

    return {
      forecast: {
        main: weather.main,
        description: weather.description,
        temp: main.temp,
        name
      }
    }
  }

  createRequestUrl(location) {
    const query = location ? location.split(' ').join('%20') : 'Prospect%20Heights,NY'
    this.setState({ query, text: '' })
    return `${api.route}q=${query}&units=imperial&mode=json&appid=${api.key}`
  }

  fetchData(url) {
    fetch(url)
      .then(x => x.json())
      .then(this.setForecast)
      .then(x => this.setState(x))
      .catch(e => console.warn(e))
  }

  handleSubmit(e) {
    const location = e.nativeEvent.text
    this.fetchData(this.createRequestUrl(location))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backdrop}
          source={require('./ios/Stratosphere/Images.xcassets/Image.imageset/sky.png')}
          resizeMode="cover">

          <View style={styles.overlay}>

              <Text style={[styles.mainText, styles.header]}>
                Stratosphere
              </Text>
              <Text style={styles.subtitle}>Readable Weather.</Text>

            <View style={styles.row}>
              <View style={styles.zipContainer}>

                <TextInput
                  ref={i => this['🍟'] = i}
                  style={[styles.zipCode, styles.mainText]}
                  returnKeyType="go"
                  onChangeText={text => this.setState({ text })}
                  onSubmitEditing={e => this.handleSubmit(e)}
                  value={this.state.text}
                />
              </View>

            </View>

            <Text style={styles.caption}>Some location</Text>

            {this.state.forecast !== null ? (
              <Forecast
                main={this.state.forecast.main}
                name={this.state.forecast.name}
                description={this.state.forecast.description}
                temp={this.state.forecast.temp}
              />
            ) : null}

          </View>
        </Image>
      </View>
    )
  }
}

const baseFontSize = 16
const styles = StyleSheet.create({
  header: {
    paddingTop: 30,
    fontSize: 28,
    fontStyle: 'italic'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
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
    padding: 20
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginBottom: -20
  },
  zipCode: {
    flex: 1,
    width: 200,
    height: 20,
    fontSize: 40,
    textAlign: 'center'
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
})

module.exports = Stratosphere
