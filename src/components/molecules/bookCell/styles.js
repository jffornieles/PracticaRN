import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import * as Colors from '../../../assets/colors';

export default StyleSheet.create({
  cellContainer: {
    overflow: 'hidden',
    width: width / 2,
    height: height / 2,
    backgroundColor: Colors.black,
    borderRadius: 15,
    borderColor: Colors.black,
    borderWidth: 10,
  },
  text: {
    textAlign: 'center',
    height: '8%',
    fontSize: 16,
    color: 'white',
    backgroundColor: 'grey',
  },
});
