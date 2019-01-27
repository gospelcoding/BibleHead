import React from "react";
import { Platform } from "react-native";
import NewVerseForm from "./components/NewVerseForm/NewVerseForm";
import VerseListScreen from "./components/VerseList/VerseListScreen";
import { createStackNavigator } from "react-navigation";
import VersePractice from "./components/VersePractice/VersePractice";
import VerseReview from "./components/VerseReview/VerseReview";
import Experiment from "./components/experiment/Experiment";
import ThemeColors from "./util/ThemeColors";
import VersePicker from "./components/AddVerse/VersePicker";
import BibleGateway from "./components/AddVerse/BibleGateway";
import AddVerseMenu from "./components/AddVerse/AddVerseMenu";
import BookPicker from "./components/AddVerse/BookPicker";
import ChapterPicker from "./components/AddVerse/ChapterPicker";
import TextEntry from "./components/AddVerse/TextEntry";
import checkVersionAndDoUpdates from "./util/checkVersionAndDoUpdates";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import SplashScreen from "react-native-splash-screen";
import PassageSplitter from "./components/PassageSplitter/PassageSplitter";
import SettingsView from "./components/SettingsView/SettingsView";

const isIOS = Platform.OS == "ios";
const uriPrefix = isIOS ? "biblehead://" : "biblehead://biblehead/";

const RootStack = createStackNavigator(
  {
    Experiment: Experiment,
    VerseListScreen: {
      screen: VerseListScreen,
      path: "list/:action"
    },
    NewVerseForm: NewVerseForm,
    VersePractice: VersePractice,
    VerseReview: {
      screen: VerseReview
    },
    AddVerseMenu: AddVerseMenu,
    BibleGateway: BibleGateway,
    BookPicker: BookPicker,
    ChapterPicker: ChapterPicker,
    VersePicker: VersePicker,
    TextEntry: TextEntry,
    PassageSplitter: PassageSplitter,
    SettingsView: SettingsView
  },
  {
    initialRouteName: "VerseListScreen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: ThemeColors.blue
      },
      headerTintColor: "white",
      headerTruncatedBackTitle: ""
    }
  }
);

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  async componentDidMount() {
    await checkVersionAndDoUpdates();
    this.setState({ loaded: true });
    SplashScreen.hide();
  }

  render() {
    return this.state.loaded ? (
      <RootStack uriPrefix={uriPrefix} />
    ) : (
      <LoadingScreen />
    );
  }
}
