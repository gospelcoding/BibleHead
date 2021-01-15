import ThemeColors from './ThemeColors';
import {Platform, StyleSheet} from 'react-native';

const isIOS = Platform.OS == 'ios';

const styles = StyleSheet.create({
  headerOptions: {},
  picker: {},
  listHeader: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    padding: 8,
  },
  textInput: {
    fontSize: 24,
    borderBottomColor: ThemeColors.grey,
  },
  shadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
  },
});

export default styles;

export const buttonRowStyles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    height: 65,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 36,
  },
  iconButtonText: {},
});
