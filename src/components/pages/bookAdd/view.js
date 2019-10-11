import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';
import * as Colors from '../../../assets/colors';
import {Actions} from 'react-native-router-flux';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      image: null,
    };
    this.options = {
      title: 'Seleciona imagen',
      maxWidth: 800,
      maxHeight: 800,
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Hacer foto',
      chooseFromLibraryButtonTitle: 'Carrete',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  }

  _renderTextInput(label, key, placeholder = '', style) {
    return (
      <TextInput
        label={label}
        style={style}
        placeholderTextColor={'gray'}
        value={this.state[key]}
        onChangeText={v => this.setState({[key]: v})}
        placeholder={placeholder}
      />
    );
  }

  _renderImageInput() {
    const image = this.state.image
      ? this.state.image.preview
      : require('../../../assets/images/placeholder.png');
    return (
      <TouchableOpacity onPress={() => this._onImagePickerTapped()}>
        <Image source={image} resizeMode={'cover'} style={[styles.image]} />
        <Text style={styles.imageText}>{'SELECCIONAR IMAGEN'}</Text>
      </TouchableOpacity>
    );
  }

  _onImagePickerTapped() {
    ImagePicker.showImagePicker(this.options, response => {
      console.log(
        `response.uri: ${response.uri} response.data: ${response.data}`,
      );
      if (response.uri) {
        let preview = {uri: response.uri};
        let data = 'data:image/jpeg;base64,' + response.data;
        this.setState({
          image: {preview, data},
        });
      }
    });
  }

  _validateForm() {
    const {title, description, image} = this.state;
    if (title && description && image) {
      return true;
    } else {
      return false;
    }
  }

  _onSubmit() {
    if (this._validateForm()) {
      Alert.alert('Great!!', 'A new book has been added');
      Actions.pop();
    } else {
      Alert.alert('Oops!!', 'Please, check the fields');
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>{this._renderImageInput()}</View>
        <View style={styles.dataContainer}>
          {this._renderTextInput(
            this.state.title,
            'title',
            'Book-Title...',
            styles.titleText,
          )}
          {this._renderTextInput(
            this.state.title,
            'description',
            'Book-Description....',
            styles.text,
          )}
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: Colors.primay,
          }}>
          <Button
            title={'CREAR LIBRO'}
            color={'white'}
            style={styles.button}
            onPress={() => this._onSubmit()}
          />
        </View>
      </SafeAreaView>
    );
  }
}
