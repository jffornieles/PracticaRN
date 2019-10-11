import React, {Component} from 'react';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';
import {Books, Book, BookAdd} from '../../pages';
import {sceneDefaultStyles} from './styles';
import {StatusBar, TouchableOpacity, Text} from 'react-native';

const AddBookButton = props => (
  <TouchableOpacity onPress={() => Actions.bookAdd()}>
    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
      {'  +  '}
    </Text>
  </TouchableOpacity>
);
const Routes = () => (
  <Router>
    <Stack key="root">
      <Scene
        key="books"
        component={Books}
        hideNavBar={false}
        initial={true}
        title="STEPHEN KING'S BOOKS"
        renderRightButton={AddBookButton}
        {...sceneDefaultStyles}
      />
      <Scene key="book" component={Book} {...sceneDefaultStyles} />
      <Scene
        key="bookAdd"
        title={'ANADIR NUEVO LIBRO'}
        component={BookAdd}
        {...sceneDefaultStyles}
      />
    </Stack>
  </Router>
);

export default Routes;
