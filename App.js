import React from "react";
import { Platform } from "react-native";
import NewVerseForm from "./components/NewVerseForm/NewVerseForm";
import VerseList from "./components/VerseList/VerseList";
import { createStackNavigator } from "react-navigation";
import VersePractice from "./components/VersePractice/VersePractice";
import VerseReview from "./components/VerseReview/VerseReview";
import Experiment from "./components/experiment/Experiment";
import LanguageList from "./components/VerseDownload/LanguageList";
import ThemeColors from "./util/ThemeColors";
import BookList from "./components/VerseDownload/BookList";
import ChapterList from "./components/VerseDownload/ChapterList";
import VersePicker from "./components/AddVerse/VersePicker";
import VersePreview from "./components/VerseDownload/VersePreview";
import VersionList from "./components/VerseDownload/VersionList";
import BibleGateway from "./components/AddVerse/BibleGateway";
import AddVerseMenu from "./components/AddVerse/AddVerseMenu";
import BookPicker from "./components/AddVerse/BookPicker";
import ChapterPicker from "./components/AddVerse/ChapterPicker";
import TextEntry from "./components/AddVerse/TextEntry";
import checkVersionAndDoUpdates from "./util/checkVersionAndDoUpdates";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import SplashScreen from "react-native-splash-screen";

const isIOS = Platform.OS == "ios";
const uriPrefix = isIOS ? "biblehead://" : "biblehead://biblehead/";

const RootStack = createStackNavigator(
  {
    Experiment: Experiment,
    VerseList: {
      screen: VerseList,
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
    TextEntry: TextEntry
  },
  {
    initialRouteName: "VerseList",
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
