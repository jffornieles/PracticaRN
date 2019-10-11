import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import styles from './styles';
import {Actions} from 'react-native-router-flux';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageExpanded: false,
      animatedHeight: new Animated.Value(0),
    };
  }

  _onShowImage() {
    if (this.state.imageExpanded) {
      Animated.timing(this.state.animatedHeight, {
        toValue: 0,
        duration: 1000,
      }).start();
      this.setState({imageExpanded: false});
    } else {
      Animated.timing(this.state.animatedHeight, {
        toValue: 300,
        duration: 1000,
      }).start();
      this.setState({imageExpanded: true});
    }
  }

  componentWillMount() {
    this._onShowImage();
  }

  render() {
    const {book} = this.props;
    const imageUri = book.volumeInfo.imageLinks.thumbnail;
    const image = imageUri
      ? {uri: imageUri}
      : require('../../../assets/images/placeholder.png');
    const description = book.volumeInfo.description
      ? book.volumeInfo.description
      : '';
    return (
      <ScrollView style={styles.container}>
        <Animated.Image
          source={image}
          resizeMode={'cover'}
          style={[styles.image, {height: this.state.animatedHeight}]}
        />
        <View style={styles.dataContainer}>
          <Text numberOfLines={1} style={styles.titleText}>
            {book.volumeInfo.title.toUpperCase()}
          </Text>
          <Text style={styles.text}>{description}</Text>
        </View>
      </ScrollView>
    );
  }
}
