import ThemeColors from './ThemeColors';
import {Platform, StyleSheet} from 'react-native';

const isIOS = Platform.OS == 'ios';

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: ThemeColors.white,
  },
  headerOptions: {},
  picker: {},
  listHeader: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    padding: 8,
  },
  textView: {
    backgroundColor: 'white',
    fontSize: 18,
    padding: 8,
    margin: isIOS ? 0 : 8,
    elevation: isIOS ? 0 : 4,
  },
  textInput: {
    fontSize: 24,
    borderBottomColor: ThemeColors.grey,
  },
  androidDialogButtonText: {
    color: ThemeColors.buttonBlue,
  },
  androidDialogButton: {backgroundColor: 'transparent', elevation: 0},
});

export default styles;
