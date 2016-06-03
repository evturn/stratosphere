import React, { Component } from 'react'
import {
  Image,
  CameraRoll
} from 'react-native'
import styles from './style.js'

class PhotoBackdrop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photoSource: null
    }
  }

  componentDidMount() {
    CameraRoll.getPhotos({
      first: 1
    })
    .then(x => this.pullPhotoFromCameraRoll(x))
    .catch(e => console.warn(e))
  }

  pullPhotoFromCameraRoll(data) {
    this.setState({
      photoSource: {
        uri: data.edges[0].node.image.uri
      }
    })
  }

  render() {
    return (
      <Image
        style={styles.backdrop}
        source={this.state.photoSource}
        resizeMode='cover'>
        {this.props.children}
      </Image>
    )
  }
}

module.exports = PhotoBackdrop
