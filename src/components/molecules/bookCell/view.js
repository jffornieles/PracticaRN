import React, {Component} from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';
import styles from './styles';
import * as Colors from '../../../assets/colors';

export default class extends Component {
  static defaultProps = {
    book: null,
    onBookPress: () => {},
  };

  render() {
    const {book} = this.props;
    const imageUri = book.volumeInfo.imageLinks.thumbnail;
    const image = imageUri
      ? {uri: imageUri}
      : require('../../../assets/images/placeholder.png');
    return (
      <TouchableOpacity
        onPress={() => this.props.onBookPress(book)}
        style={styles.cellContainer}>
        <Image
          source={image}
          style={{width: '100%', height: '85%'}}
          resizeMode={'cover'}
        />
        <Text numberOfLines={1} style={styles.text}>
          {book.volumeInfo.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
