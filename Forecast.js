import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

class Forecast extends Component {
  render() {
    return (
      <View>
        <Text style={styles.bigText}>
          {this.props.main}
        </Text>
        <Text style={styles.mainText}>
          but more like <Text style={styles.desc}>{this.props.description}</Text>
        </Text>
        <Text style={styles.bigText}>
          <Text style={styles.temp}>{this.props.temp}°F</Text>
        </Text>
        <Text style={[styles.mainText, styles.name]}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  desc: {
    color: '#FF000D',
    fontSize: 18
  },
  bigText: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  temp: {
    fontSize: 54
  },
  name: {
    fontSize: 24,
    paddingBottom: 30
  },
  mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF'
} })

module.exports = Forecast
