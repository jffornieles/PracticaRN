import React, {Component} from 'react';
import {StatusBar, TouchableOpacity, Text} from 'react-native';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';
import * as api from '../api/';
import * as Colors from '../assets/colors';
import Routes from './system/routes';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../redux/';
const reducer = combineReducers(reducers);
const store = createStore(
  reducer,
  applyMiddleware(thunk.withExtraArgument(api)),
);

export default class App extends Component {
  constructor(props) {
    super(props);
    api.configure();
    StatusBar.setBarStyle('light-content');
  }

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
