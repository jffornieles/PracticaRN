import * as types from './types';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';
const LIMIT = 8;

function setFetching(value) {
  return {
    type: types.BOOKS_SET_FETCHING,
    value: value,
  };
}

export function setList(value) {
  return {
    type: types.BOOKS_UPDATE_LIST,
    value,
  };
}

export function setItem(value) {
  return {
    type: types.BOOKS_SET_ITEM,
    value,
  };
}

export const updateOffset = value => {
  return {
    type: types.BOOKS_UPDATE_OFFSET,
    value,
  };
};

export const initBooksList = () => {
  return async dispatch => {
    dispatch(setList([], 0));
    dispatch(updateOffset(0));
    dispatch(fetchBooksList());
  };
};

export const updateBooksListOffset = () => {
  return async (dispatch, getState) => {
    const {offset} = getState().books;
    const newOffset = offset + LIMIT;
    dispatch(updateOffset(newOffset));
    dispatch(fetchBooksList());
  };
};

export function fetchBooksList() {
  return (dispatch, getState, api) => {
    const {offset, list} = getState().books;
    AsyncStorage.getItem('booksList', (error, result) => {
      if (result && !error) {
        const newList = [...list, result];
        const booksList = JSON.parse(newList);
        const total = booksList.totalItems;
        dispatch(setList(booksList, total));
      } else {
        dispatch(setFetching(true));
      }
    });

    api
      .fetchBooks()
      .then(res => {
        dispatch(setFetching(false));
        dispatch(setList(res.data.items));
        AsyncStorage.setItem('booksList', JSON.stringify(res.data.items));
      })
      .catch(err => {
        dispatch(setFetching(false));
        console.log('fetchBooksList error: ', err);
      });
  };
}
