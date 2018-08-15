import React from "react";
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

const RootStack = createStackNavigator(
  {
    Experiment: Experiment,
    VerseList: VerseList,
    NewVerseForm: NewVerseForm,
    VersePractice: VersePractice,
    VerseReview: VerseReview,
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
      headerTintColor: "white"
    }
  }
);

export default class App extends React.PureComponent {
  render() {
    return <RootStack />;
  }
}
