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
import VersePicker from "./components/VerseDownload/VersePicker";
import VersePreview from "./components/VerseDownload/VersePreview";
import VersionList from "./components/VerseDownload/VersionList";

const RootStack = createStackNavigator(
  {
    Experiment: Experiment,
    VerseList: VerseList,
    NewVerseForm: NewVerseForm,
    VersePractice: VersePractice,
    VerseReview: VerseReview,
    LanguageList: LanguageList,
    VersionList: VersionList,
    BookList: BookList,
    ChapterList: ChapterList,
    VersePicker: VersePicker,
    VersePreview: VersePreview
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
