import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import BibleHeadApp from './src/BibleHeadApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => BibleHeadApp);
