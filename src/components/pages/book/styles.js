import {StyleSheet} from 'react-native';
import * as Colors from '../../../assets/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.black,
  },
  detailContainer: {
    padding: 20,
    flexDirection: 'row',
    flex: 1,
  },
  detailItem: {
    flexDirection: 'column',
    flex: 1,
    padding: 1,
  },
  detailCount: {
    textAlign: 'center',
    height: 60,
    fontSize: 35,
    color: 'white',
  },
  image: {
    width: '100%',
    height: 0,
  },
  titleText: {
    textAlign: 'center',
    height: 20,
    fontSize: 16,
    color: 'white',
    backgroundColor: 'grey',
  },
  dataContainer: {
    padding: 20,
  },
  text: {
    color: 'white',
  },
});
