import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {BookCell} from '../../molecules';
import styles from './styles';
import {connect} from 'react-redux';
import * as BooksActions from '../../../redux/books/actions';

class Books extends Component {
  componentDidMount() {
    this.props.initBooksList();
  }

  _onBookTapped(book) {
    this.props.onBookTapped(book);
  }

  _renderItem({item}) {
    return <BookCell book={item} onBookPress={v => this._onBookTapped(v)} />;
  }

  _renderActivityIndicator() {
    if (!this.props.isFetching) {
      return null;
    }
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}>
        <ActivityIndicator size={'large'} color={'white'} animating={true} />
      </View>
    );
  }

  _onEndReached = ({distanceFromEnd}) => {
    const {isFetching, list, total} = this.props;
    const onEndReached =
      distanceFromEnd > 100 && !isFetching && list.length < total;
    if (onEndReached) {
      this.props.updateBooksListOffset();
    }
  };

  render() {
    const {list, isFetching} = this.props;
    return (
      <View style={styles.container}>
        {this._renderActivityIndicator()}

        <FlatList
          data={list}
          renderItem={value => this._renderItem(value)}
          keyExtractor={(item, i) => 'cell' + item.id}
          extraData={this.props}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={0.8}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={this.props.initBooksList}
              tintColor={'white'}
              colors={['white']}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.books.isFetching,
    list: state.books.list,
    total: state.books.total,
    offset: state.books.offset,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // fetchBooksList: () => {
    //   dispatch(BooksActions.fetchBooksList());
    // },
    initBooksList: () => {
      dispatch(BooksActions.initBooksList());
    },
    updateBooksListOffset: () => {
      dispatch(BooksActions.updateBooksListOffset());
    },
    onBookTapped: book => {
      dispatch(BooksActions.setItem(book));
      Actions.book({title: book.volumeInfo.title, book: book});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Books);
