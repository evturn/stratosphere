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
    console.log(main)
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
          <Text style={styles.temps}>HI: {high}°  •  LO: {low}°</Text>
        </View>

      </View>
    )
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
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  temp: {
    fontFamily,
    fontSize: 90,
    flex: 3,
    marginRight: -10,
    textAlign: 'center'
  },
  imageView: {
    flex: 3,
    alignItems: 'center',
    paddingBottom: 20
  },
  icon: {
    flex: 1,
    width: 50,
    height: 50,
    paddingBottom: 40
  },
  shortDesc: {
    fontFamily,
    flex: 1,
    fontSize: 22,
    textAlign: 'center',
    paddingBottom: 20,
    color: '#FFFFFF'
  },
  extendedDesc: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily,
    textAlign: 'center',
    paddingBottom: 10
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
