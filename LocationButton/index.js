import React, { Component, PropTypes } from 'react'
import Button from '../Button'
import styles from './style'

const geoOptions = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 1000
}

class LocationButton extends Component {
  getExactLocation() {
    navigator.geolocation.getCurrentPosition(
      initialPosition => (
        this.props.onGetCoords(
          initialPosition.coords.latitude,
          initialPosition.coords.longitude
        )
      ),
      e => alert(e.message),
      geoOptions
    )
  }

  render() {
    return (
      <Button
        label={this.props.fetching ? 'Locating...' : 'Use Current Location'}
        style={styles.locationButton}
        onPress={_ => this.getExactLocation()}
      />
    )
  }
}

LocationButton.propTypes = {
  onGetCoords: PropTypes.func.isRequired
}

module.exports = LocationButton