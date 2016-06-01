import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

class Forecast extends Component {
  constructor(props) {
    super(props)

    this.state = {
      converted: false,
      ...props.farenheit
    }
  }

  componentWillReceiveProps(nextProps) {
    const { celsius, farenheit } = nextProps
    const scale = this.state.converted ? celsius : farenheit
    this.setState({
      ...this.state,
      ...scale
    })
  }

  setTempColor(temp) {
    if (temp < 70) {
      if (temp < 45) {
        styles.cold
      } else {
        style.cool
      }
    } else if (temp > 90) {
      styles.hot
    } else {
      styles.warm
    }
  }

  convertTemp(converted) {
    const { celsius, farenheit } = this.props
    const scale = converted ? celsius : farenheit
    this.setState({
      converted,
      ...scale
    })
  }

  render() {
    const {
      main,
      description,
      name,
      image,
    } = this.props
    const {
      current,
      symbol,
      high,
      low,
      converted
    } = this.state
    const midTemp = !converted ? 70 : 21
    const tempColor = current < midTemp ? styles.cool : styles.warm

    return (
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text
          style={[styles.temp, tempColor]}
          onPress={_ => this.convertTemp(!converted)}>
          {current}°<Text style={styles.scale}>
            {symbol}
          </Text>
        </Text>

        <View style={styles.imageView}>
          <Image
            style={styles.icon}
            source={{ uri: image }}
          />
          <Text style={styles.shortDesc}>{main}</Text>
          <Text style={styles.extendedDesc}>specifically, {description}.</Text>
        </View>

        <Text style={styles.temps}>HI: {high}°  •  LO: {low}°</Text>

      </View>
    );
  }
}

const fontFamily = 'helveticaneue-thin'
const styles = StyleSheet.create({

  scale: {
    fontSize: 14,
    color: '#ffffff',
    width: 5
  },
  cold: {
    color: '#f1f1f1'
  },
  cool: {
    color: '#f8f8f8'
  },
  warm: {
    color: '#fff000'
  },
  hot: {
    color: '#ff0022'
  },
  name: {
    fontFamily,
    flex: 2,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  temp: {
    fontFamily,
    fontSize: 90,
    flex: 2,
    margin: 10,
    marginRight: -10,
    textAlign: 'center'
  },
  imageView: {
    flex: 1,
    alignItems: 'center'
  },
  icon: {
    width: 50,
    height: 50
  },
  shortDesc: {
    fontFamily,
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  extendedDesc: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 20
  },
  temps: {
    flex: 1,
    textAlign: 'center',
    fontFamily,
    fontSize: 12,
    color: '#FFFFFF'
  }
})

module.exports = Forecast
